// Orchestrates the walk and the checks, then computes score, counts and the fix plan.
import { existsSync, statSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { walkRepo } from './walk.mjs';
import { readGitTrackedPaths, isCodeFile } from './context.mjs';
import { catalogEntry, SEVERITY_RANK, SCORE_PENALTY } from './catalog.mjs';
import { checkSecrets } from './checks/secrets.mjs';
import { checkEnv } from './checks/env.mjs';
import { checkSupabase, SUPABASE_EXPORT_SQL } from './checks/supabase.mjs';
import { checkStripe } from './checks/stripe.mjs';
import { checkAuth } from './checks/auth.mjs';
import { checkCode } from './checks/code.mjs';
import { checkDeploy } from './checks/deploy.mjs';

export const VERSION = '0.1.0';

export const SPRINT_TIERS = [
  { id: 'sprint-5', price: 1500, name: 'Fix & Ship Sprint: up to 5 issues', delivery: '5-10 days' },
  { id: 'sprint-10', price: 2500, name: 'Fix & Ship Sprint: up to 10 issues + production deploy', delivery: '5-10 days' },
  { id: 'sprint-rebuild', price: 4000, name: 'Fix & Ship Sprint: adds payments, auth rebuild or multi-tenant', delivery: '5-10 days' },
];

export const MANUAL_CHECKS = [
  { area: 'Supabase RLS', item: 'In the Supabase dashboard, confirm every table in exposed schemas has RLS on, and review every policy (run the export SQL in the appendix). Migrations in git can drift from the live database.' },
  { area: 'Supabase RLS', item: 'Test as an anonymous visitor and as a second ordinary user with the anon key: try to select, insert, update and delete other users\' rows through the REST API.' },
  { area: 'Supabase advisors', item: 'Open Advisors > Security and Performance and record every warning (RLS disabled, security definer views/functions, mutable search_path, leaked password protection).' },
  { area: 'Storage', item: 'Review each bucket\'s public flag and the storage.objects policies: who can upload, list, overwrite and delete, and whether paths are scoped to auth.uid().' },
  { area: 'Auth settings', item: 'Check Auth settings: email confirmation on, redirect URL allow-list has no wildcards, unused providers disabled, minimum password length and leaked-password protection, OTP/JWT expiry, MFA on admin accounts.' },
  { area: 'Stripe', item: 'In the Stripe dashboard, confirm the webhook endpoint URL points at production, only needed events are subscribed, recent deliveries succeed, and the signing secret matches the deployed env var.' },
  { area: 'Stripe', item: 'Confirm live vs test mode: live keys only in Production, test keys in Preview/dev, no secret or restricted keys outside server env vars; check Radar rules and the customer portal settings.' },
  { area: 'Backups', item: 'Confirm the Supabase plan includes daily backups or PITR, and that a restore has been tested (or schedule one).' },
  { area: 'Rate limits', item: 'Check Supabase Auth rate limits, rate limiting on Edge Functions / API routes (especially AI and email endpoints), and spend caps on OpenAI/Anthropic/email providers.' },
  { area: 'Hosting env', item: 'In Vercel/Netlify, review environment variable scopes (Production / Preview / Development): no secrets in public-prefixed vars, service-role and Stripe secrets not exposed to Preview builds from forks, preview deployments protected.' },
  { area: 'Git history', item: 'This tool scans the working tree only. Scan history for secrets that were deleted but never rotated (e.g. `git log -p | grep -E "sk_live_|service_role"` or gitleaks) and rotate anything found.' },
  { area: 'Live app', item: 'Run the app and the production build locally, click through sign-up, login, checkout and the main flows, and run the free live-URL scan against the deployed site (bundled secrets, exposed source maps, headers).' },
];

const EFFORT_RANK = { S: 1, M: 2, L: 3 };
const EFFORT_HOURS = { S: 1.5, M: 5, L: 12 };

export function score(findings) {
  const penalty = findings.reduce((sum, f) => sum + (SCORE_PENALTY[f.severity] || 0), 0);
  return Math.max(0, 100 - penalty);
}

export function countBySeverity(findings) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of findings) counts[f.severity] = (counts[f.severity] || 0) + 1;
  return counts;
}

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'];
const SEV_RANK = (s) => SEVERITY_RANK[s] ?? 0;

/** Group findings into sprint "issues" and pick a tier. */
export function buildFixPlan(findings) {
  const groups = new Map();
  for (const f of findings) {
    if (f.severity === 'info') continue;
    let key = f.id;
    let title = f.title;
    if (f.id.startsWith('secret.') || f.id === 'env.dotenv-committed' || f.id === 'env.example-real-values') {
      key = 'secrets';
      title = 'Rotate exposed credentials and move them to server-side env vars';
    } else if (f.severity === 'low') {
      key = 'hygiene';
      title = 'Hygiene bundle (low-severity items)';
    }
    if (!groups.has(key)) groups.set(key, { key, title, severity: f.severity, effort: f.effort, category: f.category, tier4: null, items: [] });
    const g = groups.get(key);
    if (SEV_RANK(f.severity) > SEV_RANK(g.severity)) g.severity = f.severity;
    if (EFFORT_RANK[f.effort] > EFFORT_RANK[g.effort]) g.effort = f.effort;
    if (f.tier4) g.tier4 = f.tier4;
    g.items.push({ id: f.id, title: f.title, where: f.file ? `${f.file}${f.line ? `:${f.line}` : ''}` : '' });
  }
  for (const g of groups.values()) {
    if (g.key !== 'hygiene' && g.key !== 'secrets' && g.items.length > 1) g.title = `${catalogEntry(g.key)?.title || g.items[0].title} (${g.items.length} places)`;
    if (g.items.length > 4 && g.effort === 'S') g.effort = 'M';
  }
  const issues = [...groups.values()].sort(
    (a, b) => SEV_RANK(b.severity) - SEV_RANK(a.severity) || (a.key === 'hygiene') - (b.key === 'hygiene') || a.title.localeCompare(b.title),
  );
  issues.forEach((g, i) => { g.n = i + 1; });

  const n = issues.length;
  const tier4 = [...new Set(issues.map((i) => i.tier4).filter(Boolean))];
  const deployWork = issues.some((i) => i.category === 'deploy' && i.key !== 'hygiene');
  const reasons = [];
  let tier = null;
  if (n === 0) {
    reasons.push('No actionable findings from the automated scan. Confirm with the manual checks, then offer the Maintain & Extend retainer.');
  } else if (tier4.length) {
    tier = SPRINT_TIERS[2];
    reasons.push(`Findings need a ${tier4.map((t) => (t === 'payments' ? 'payments rework' : t === 'auth' ? 'server-side auth/roles rebuild' : t)).join(' and ')}.`);
    if (tier4.includes('auth')) reasons.push('The auth/roles finding is a heuristic. Confirm in the manual review that no server route or RLS policy enforces the role before quoting this tier.');
    if (n > 10) reasons.push(`${n} issues: more than the 10 in the standard sprint; confirm scope or split into two sprints.`);
  } else if (n > 10) {
    tier = SPRINT_TIERS[2];
    reasons.push(`${n} issues: more than the 10 covered by the $2,500 sprint. Quote the $4,000 sprint or split the work.`);
  } else if (n > 5 || deployWork) {
    tier = SPRINT_TIERS[1];
    reasons.push(n > 5 ? `${n} issues (6-10 fits this tier), including a production deploy.` : `${n} issue(s), but deploy configuration needs fixing, so include the production deploy.`);
  } else {
    tier = SPRINT_TIERS[0];
    reasons.push(`${n} issue(s): fits the 5-issue sprint.`);
  }
  reasons.push('Multi-tenant work (orgs/teams sharing data) cannot be detected automatically; if the app has it, quote the $4,000 tier.');
  const hours = issues.reduce((s, i) => s + EFFORT_HOURS[i.effort], 0);
  return { tier, reasons, issues, issueCount: n, estimatedHours: Math.round(hours * 2) / 2 };
}

function readPackages(files) {
  let pkg = null;
  const allDeps = {};
  const packageFlags = {};
  for (const f of files.filter((x) => /(^|\/)package\.json$/.test(x.path))) {
    try {
      const json = JSON.parse(f.text);
      const deps = { ...(json.dependencies || {}), ...(json.devDependencies || {}) };
      if (f.path === 'package.json') pkg = json;
      else if (!/(^|\/)supabase\//.test(f.path)) packageFlags[f.path.slice(0, -'package.json'.length)] = { isNext: !!deps.next, isVite: !!deps.vite };
      Object.assign(allDeps, deps);
    } catch { /* ignore invalid package.json */ }
  }
  return { pkg, allDeps, packageFlags };
}

/** Nested package directories (monorepos): every folder with a package.json or its own supabase/ folder. */
function packageRootsOf(files, packageFlags) {
  const roots = new Set(Object.keys(packageFlags));
  for (const f of files) {
    const m = /^(.+\/)supabase\/(?:config\.toml$|migrations\/|functions\/)/.exec(f.path);
    if (m && !/(^|\/)node_modules\//.test(m[1])) roots.add(m[1]);
  }
  for (const f of files) {
    const m = /^(.+\/)(?:next|vite)\.config\.[cm]?[jt]s$/.exec(f.path);
    if (m && roots.has(m[1])) {
      const flags = packageFlags[m[1]] || (packageFlags[m[1]] = { isNext: false, isVite: false });
      if (/next\.config/.test(f.path)) flags.isNext = true; else flags.isVite = true;
    }
  }
  return [...roots].sort((a, b) => b.length - a.length);
}

export function audit(repoPath, { exclude = [], now = new Date() } = {}) {
  const root = resolve(repoPath);
  if (!existsSync(root) || !statSync(root).isDirectory()) throw new Error(`Not a directory: ${root}`);
  const { files, skipped } = walkRepo(root, { exclude });
  const { pkg, allDeps, packageFlags } = readPackages(files);
  const deps = Object.keys(allDeps);
  const has = (re) => files.some((f) => re.test(f.path));

  const ctx = {
    root,
    repoName: pkg?.name || basename(root),
    files,
    pkg,
    allDeps,
    isNext: !!allDeps.next || has(/(^|\/)next\.config\./),
    isVite: !!allDeps.vite || has(/(^|\/)vite\.config\./),
    packageRoots: packageRootsOf(files, packageFlags),
    packageFlags,
    usesSupabase: deps.some((d) => d.startsWith('@supabase/')) || has(/(^|\/)supabase\//) || files.some((f) => isCodeFile(f.path) && /@supabase\/supabase-js|\.supabase\.co\b/.test(f.text)),
    usesStripe: deps.some((d) => d === 'stripe' || d.startsWith('@stripe/')) || files.some((f) => isCodeFile(f.path) && /\bstripe\b/i.test(f.text)),
    gitTracked: readGitTrackedPaths(root),
    findings: [],
  };
  ctx.add = (id, data) => {
    const base = catalogEntry(id) || {};
    const f = {
      id,
      severity: data.severity || base.severity || 'low',
      category: base.category || id.split('.')[0],
      title: data.title || base.title || id,
      file: data.file ?? null,
      line: data.line ?? null,
      evidence: data.evidence ?? '',
      why: data.why || base.why || '',
      fix: data.fix || base.fix || '',
      effort: data.effort || base.effort || 'S',
    };
    const tier4 = data.tier4 ?? base.tier4;
    if (tier4) f.tier4 = tier4;
    if (data.value) f.maskedValue = data.value;
    ctx.findings.push(f);
    return f;
  };

  for (const check of [checkSecrets, checkEnv, checkSupabase, checkStripe, checkAuth, checkCode, checkDeploy]) check(ctx);

  const seen = new Set();
  const findings = ctx.findings
    .filter((f) => {
      const key = `${f.id}|${f.file}|${f.line}|${f.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => SEV_RANK(b.severity) - SEV_RANK(a.severity) || String(a.file).localeCompare(String(b.file)) || (a.line ?? 0) - (b.line ?? 0));

  const stack = [
    ctx.isNext && 'Next.js', ctx.isVite && 'Vite', allDeps.react && 'React', allDeps['react-scripts'] && 'Create React App', allDeps.expo && 'Expo',
    ctx.usesSupabase && 'Supabase', ctx.usesStripe && 'Stripe',
    has(/^vercel\.json$/) && 'Vercel', has(/^netlify\.toml$/) && 'Netlify',
  ].filter(Boolean);

  return {
    tool: 'shipready-audit',
    version: VERSION,
    repo: ctx.repoName,
    path: root,
    generatedAt: now.toISOString(),
    date: now.toISOString().slice(0, 10),
    stack,
    stats: { filesScanned: files.length, skipped, gitIndexRead: ctx.gitTracked !== null },
    score: score(findings),
    counts: countBySeverity(findings),
    findings,
    fixPlan: buildFixPlan(findings),
    manualChecks: MANUAL_CHECKS,
    supabaseExportSql: ctx.usesSupabase ? SUPABASE_EXPORT_SQL : null,
  };
}

export const SEVERITY_LIST = SEVERITY_ORDER;

/** True when any finding is at or above the threshold severity (info never counts). */
export function meetsFailOn(findings, threshold) {
  const min = SEVERITY_RANK[threshold];
  return findings.some((f) => f.severity !== 'info' && SEVERITY_RANK[f.severity] >= min);
}
