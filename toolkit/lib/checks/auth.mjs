// Check 5: auth heuristics (service-role endpoints without user checks, sign-up, admin checks).
import { snippet } from '../patterns.mjs';
import { lineAt, lineText, isClientFile, isServerFile, isServerHandler, isCodeFile, isCommentLine, isTestFile } from '../context.mjs';
import { isStripeWebhookFile } from './stripe.mjs';

const SERVICE_ROLE = /SUPABASE_SERVICE_ROLE|SERVICE_ROLE_KEY|service_role|serviceRole|SUPABASE_SERVICE_KEY/;
const USER_CHECK =
  /auth\.getUser\s*\(|\bgetUser\s*\(|getClaims\s*\(|jwtVerify\s*\(|jwt\.verify\s*\(|verifyJWT|verifyToken|getServerSession\s*\(|currentUser\s*\(|\bauth\s*\(\s*\)|getAuth\s*\(|verifyIdToken|CRON_SECRET|withAuth\s*\(|requireUser|requireAuth|clerkClient/;
const EMAIL_CONFIRM = /emailRedirectTo|email_confirmed_at|confirm(?:ation)? (?:your )?email|check your (?:email|inbox)|verify your email|enable_confirmations\s*=\s*true|mailer_autoconfirm/i;
const HARDCODED_ADMIN = [
  /\bemail\s*(?:===|==|!==|!=)\s*['"`][^'"`\s]+@[^'"`\s]+['"`]/,
  /['"`][^'"`\s]+@[^'"`\s]+['"`]\s*(?:===|==)\s*[\w.?]*email\b/,
  /\badmin\w*\s*[:=]\s*\[?\s*['"`][^'"`\s]+@[^'"`\s]+['"`]/i,
];
const ADMIN_CHECK = /\bisAdmin\b|\bis_admin\b|\brole\s*===?\s*['"]admin['"]|['"]admin['"]\s*===?\s*[\w.?]*role\b/;

export function checkAuth(ctx) {
  // 5a. Server handlers using service role without verifying the caller.
  for (const f of ctx.files) {
    if (!isCodeFile(f.path) || isTestFile(f.path) || !isServerHandler(f.path)) continue;
    if (!SERVICE_ROLE.test(f.text) || USER_CHECK.test(f.text) || isStripeWebhookFile(f)) continue;
    const idx = f.text.search(SERVICE_ROLE);
    const line = lineAt(f.text, idx);
    ctx.add('auth.service-role-no-user-check', { file: f.path, line, evidence: snippet(lineText(f.text, line)) });
  }

  // 5b. signUp without any sign of email confirmation.
  const signUp = ctx.files.find((f) => isCodeFile(f.path) && /auth\.signUp\s*\(/.test(f.text));
  if (signUp) {
    const config = ctx.files.find((f) => f.path === 'supabase/config.toml');
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

  // 5c. Hard-coded admin emails.
  const flaggedAdminFiles = new Set();
  for (const f of ctx.files) {
    if (!isCodeFile(f.path) || isTestFile(f.path)) continue;
    const client = isClientFile(f.path, f.text, ctx);
    f.text.split('\n').forEach((text, i) => {
      if (isCommentLine(text) || !HARDCODED_ADMIN.some((r) => r.test(text))) return;
      if (!/admin|owner|staff|role|super/i.test(text) && !/admin|owner|staff|role/i.test(f.path) && !ADMIN_CHECK.test(f.text)) return;
      flaggedAdminFiles.add(f.path);
      ctx.add('auth.hardcoded-admin-email', {
        severity: client ? 'high' : 'medium',
        title: client ? 'Admin access decided in the browser by a hard-coded email' : 'Admin access decided by a hard-coded email (server-side)',
        file: f.path, line: i + 1, evidence: snippet(text),
      });
    });
  }

  // 5d. isAdmin checks only on the client.
  const serverEnforced =
    ctx.files.some((f) => /\.sql$/i.test(f.path) && /admin/i.test(f.text)) ||
    ctx.files.some((f) => isCodeFile(f.path) && isServerFile(f.path, f.text) && /admin/i.test(f.text) && USER_CHECK.test(f.text));
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
      });
    }
  }
}
