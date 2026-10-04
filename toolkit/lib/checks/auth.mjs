// Check 5: auth heuristics (service-role endpoints without user checks, sign-up, admin checks).
import { snippet } from '../patterns.mjs';
import {
  lineAt, lineText, isClientFile, isServerFile, isServerHandler, isCodeFile, isCommentLine, isTestFile,
  isNextServerPage, hasServerSignals, frameworkOf, importsOf,
} from '../context.mjs';
import { isStripeWebhookFile } from './stripe.mjs';

const SERVICE_ROLE = /SUPABASE_SERVICE_ROLE|SERVICE_ROLE_KEY|service_role|serviceRole|SUPABASE_SERVICE_KEY|SUPABASE_SECRET_KEY|sb_secret_/;
const AUTH_ADMIN = /\.auth\.admin\.\w+\s*\(/;
export const USER_CHECK =
  /auth\.getUser\s*\(|\bgetUser\s*\(|getClaims\s*\(|jwtVerify\s*\(|jwt\.verify\s*\(|verifyJWT|verifyToken|getServerSession\s*\(|currentUser\s*\(|\bauth\s*\(\s*\)|getAuth\s*\(|verifyIdToken|CRON_SECRET|withAuth\s*\(|requireUser|requireAuth|requireAdmin|requireRole|assertAdmin|getCurrentUser\s*\(|clerkClient/;
const EMAIL_CONFIRM = /emailRedirectTo|email_confirmed_at|confirm(?:ation)? (?:your )?email|check your (?:email|inbox)|verify your email|enable_confirmations\s*=\s*true|mailer_autoconfirm/i;
const HARDCODED_ADMIN = [
  /\bemail\s*(?:===|==|!==|!=)\s*['"`][^'"`\s]+@[^'"`\s]+['"`]/,
  /['"`][^'"`\s]+@[^'"`\s]+['"`]\s*(?:===|==)\s*[\w.?]*email\b/,
];
// ADMIN_EMAILS = ['a@b.com'] / adminEmail: "a@b.com". Only an access check when the name is
// later compared with the user's email; otherwise it is usually a contact or notification address.
const ADMIN_CHECK = /\bisAdmin\b|\bis_admin\b|\brole\s*===?\s*['"]admin['"]|['"]admin['"]\s*===?\s*[\w.?]*role\b/;
const ADMIN_ASSIGN = /\b(admin\w*)\s*[:=]\s*\[?\s*['"`][^'"`\s]+@[^'"`\s]+['"`]/i;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const comparedAsEmail = (name, files) => {
  const n = escapeRe(name);
  const re = new RegExp(
    `\\b${n}\\s*(?:===|!==|==|!=)|(?:===|!==|==|!=)\\s*(?:[\\w$]+\\??\\.)*${n}\\b|\\b${n}\\s*\\??\\.\\s*(?:includes|indexOf|some|has|find|findIndex)\\s*\\(`,
  );
  return files.some((f) => re.test(f.text));
};

/**
 * Modules that build a service-role Supabase client, with the exports that hand it out
 * (createAdminClient, supabaseAdmin, getServiceClient, ...): path -> Set(export names, 'default').
 */
function adminModules(ctx) {
  const out = new Map();
  for (const f of ctx.files) {
    if (!isCodeFile(f.path) || isTestFile(f.path)) continue;
    if (!SERVICE_ROLE.test(f.text) || !/\bcreate(?:Server)?Client\s*\(/.test(f.text)) continue;
    const exports = [...f.text.matchAll(/export\s+(default\s+)?(?:async\s+)?(?:(?:const|let|var|function)\s+([A-Za-z_$][\w$]*))?/g)]
      .map((m, i, all) => ({ name: m[1] ? 'default' : m[2], chunk: f.text.slice(m.index, all[i + 1]?.index ?? f.text.length) }))
      .filter((e) => e.name);
    for (const m of f.text.matchAll(/export\s*\{([^}]*)\}/g)) {
      for (const part of m[1].split(',')) { const n = part.trim().split(/\s+as\s+/).pop(); if (n) exports.push({ name: n, chunk: '' }); }
    }
    // Exports whose own code names the key; else admin-sounding names; else the only export.
    let names = exports.filter((e) => SERVICE_ROLE.test(e.chunk)).map((e) => e.name);
    if (!names.length) names = exports.filter((e) => /admin|service|privileged|elevated/i.test(e.name)).map((e) => e.name);
    if (!names.length && exports.length === 1) names = [exports[0].name];
    if (names.length) out.set(f.path, new Set(names));
  }
  return out;
}

/** Where the handler gets privileged access: the key itself, auth.admin.*, or an imported admin client. */
function privilegedAt(f, ctx, admins) {
  const direct = f.text.search(SERVICE_ROLE);
  if (direct >= 0) return direct;
  const admin = f.text.search(AUTH_ADMIN);
  if (admin >= 0) return admin;
  const anyAdminName = new Set([...admins.values()].flatMap((s) => [...s]).filter((n) => n !== 'default'));
  for (const imp of importsOf(f, ctx)) {
    const exported = imp.module ? admins.get(imp.module.path) : null;
    // Resolved: bindings of that module's admin exports. Unresolved alias: a known admin export name.
    const locals = imp.bindings
      .filter((b) => (exported ? exported.has(b.imported) || b.imported === '*' : !imp.module && anyAdminName.has(b.imported)))
      .map((b) => b.local);
    const rest = f.text.slice(imp.end);
    const used = locals.map((n) => rest.search(new RegExp(`(?<![\\w$.])${escapeRe(n)}\\b`))).filter((x) => x >= 0);
    if (used.length) return imp.end + Math.min(...used);
  }
  return -1;
}

export function checkAuth(ctx) {
  // 5a. Server handlers (route handlers, Edge Functions, 'use server' actions) using the
  // service role without verifying the caller.
  const admins = adminModules(ctx);
  for (const f of ctx.files) {
    if (!isCodeFile(f.path) || isTestFile(f.path) || !isServerHandler(f.path, f.text, ctx)) continue;
    if (USER_CHECK.test(f.text) || isStripeWebhookFile(f, ctx)) continue;
    const idx = privilegedAt(f, ctx, admins);
    if (idx < 0) continue;
    const line = lineAt(f.text, idx);
    ctx.add('auth.service-role-no-user-check', { file: f.path, line, evidence: snippet(lineText(f.text, line)) });
  }

  // 5b. signUp without any sign of email confirmation.
  const signUp = ctx.files.find((f) => isCodeFile(f.path) && /auth\.signUp\s*\(/.test(f.text));
  if (signUp) {
    const config = ctx.files.find((f) => /(^|\/)supabase\/config\.toml$/.test(f.path));
    const disabled = config && /enable_confirmations\s*=\s*false/.test(config.text);
    const mentioned = ctx.files.some((f) => EMAIL_CONFIRM.test(f.text));
    if (disabled || !mentioned) {
      const line = lineAt(signUp.text, signUp.text.search(/auth\.signUp\s*\(/));
      ctx.add('auth.signup-no-email-confirmation', {
        title: disabled ? 'Email confirmation is disabled in supabase/config.toml' : 'Sign-up flow with no sign of email confirmation',
        file: disabled ? config.path : signUp.path,
        line: disabled ? lineAt(config.text, config.text.search(/enable_confirmations\s*=\s*false/)) : line,
        evidence: disabled ? 'enable_confirmations = false' : snippet(lineText(signUp.text, line)),
      });
    }
  }

  // Is admin access enforced anywhere on the server (SQL, server code, Next server pages)?
  const serverSide = (f) =>
    isServerFile(f.path, f.text, ctx) || isNextServerPage(f.path, f.text, ctx) ||
    (frameworkOf(f.path, ctx).isNext && !isClientFile(f.path, f.text, ctx) && hasServerSignals(f.text));
  const sqlFiles = ctx.files.filter((f) => /\.sql$/i.test(f.path));
  const serverEnforced =
    sqlFiles.some((f) => /admin/i.test(f.text)) ||
    ctx.files.some((f) => isCodeFile(f.path) && !isTestFile(f.path) && serverSide(f) && /admin/i.test(f.text) && USER_CHECK.test(f.text));
  // Pricing: a client-side admin check means an auth/roles rebuild only when nothing on the
  // server enforces the role and the migrations (if any) define none either.
  const authTier = serverEnforced ? false : 'auth';
  const codeFiles = ctx.files.filter((f) => isCodeFile(f.path) && !isTestFile(f.path));

  // 5c. Hard-coded admin emails.
  const flaggedAdminFiles = new Set();
  for (const f of codeFiles) {
    const client = isClientFile(f.path, f.text, ctx);
    f.text.split('\n').forEach((text, i) => {
      if (isCommentLine(text)) return;
      const assign = ADMIN_ASSIGN.exec(text);
      const hit = HARDCODED_ADMIN.some((r) => r.test(text)) || (assign && comparedAsEmail(assign[1], codeFiles));
      if (!hit) return;
      if (!/admin|owner|staff|role|super/i.test(text) && !/admin|owner|staff|role/i.test(f.path) && !ADMIN_CHECK.test(f.text)) return;
      flaggedAdminFiles.add(f.path);
      ctx.add('auth.hardcoded-admin-email', {
        severity: client ? 'high' : 'medium',
        title: client ? 'Admin access decided in the browser by a hard-coded email' : 'Admin access decided by a hard-coded email (server-side)',
        file: f.path, line: i + 1, evidence: snippet(text),
        ...(client ? { tier4: authTier } : {}),
      });
    });
  }

  // 5d. isAdmin checks only on the client.
  if (!serverEnforced) {
    const hits = [];
    for (const f of ctx.files) {
      if (!isClientFile(f.path, f.text, ctx) || flaggedAdminFiles.has(f.path)) continue;
      const idx = f.text.search(ADMIN_CHECK);
      if (idx >= 0) hits.push({ f, line: lineAt(f.text, idx) });
    }
    if (hits.length) {
      const { f, line } = hits[0];
      ctx.add('auth.client-only-admin-check', {
        file: f.path, line,
        evidence: snippet(lineText(f.text, line)) + (hits.length > 1 ? ` (+${hits.length - 1} more file(s))` : ''),
        // Without migrations in the repo there is no corroboration that the database has no role model.
        ...(sqlFiles.length ? {} : { tier4: false, title: 'Admin checks found only in the browser (no migrations in the repo to confirm; verify)' }),
      });
    }
  }
}
