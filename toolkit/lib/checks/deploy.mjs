// Check 7: deploy and hygiene.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { snippet } from '../patterns.mjs';
import { lineAt, lineText, isTestFile, isCodeFile } from '../context.mjs';
import { LOCKFILES } from '../walk.mjs';

const MONITORING = /^(@sentry\/|sentry$|@bugsnag\/|bugsnag|rollbar|@rollbar\/|logrocket|@highlight-run\/|highlight\.run|@datadog\/browser-|dd-trace|@honeybadger-io\/|@appsignal\/|newrelic|@newrelic\/|trackjs|raygun|@axiomhq\/|@baselime\/|posthog-js|@vercel\/otel)/;
const MIN_MAJOR = { next: 15, react: 18, '@supabase/supabase-js': 2 };

function majorOf(range) {
  if (typeof range !== 'string') return null;
  const r = range.trim();
  if (/^(workspace:|file:|link:|git|github:|https?:|npm:|latest|next|canary|beta|\*|x$)/i.test(r)) return null;
  const m = /(\d+)/.exec(r.replace(/^[\^~>=<v\s]+/, ''));
  return m ? Number(m[1]) : null;
}

export function checkDeploy(ctx) {
  const byPath = new Map(ctx.files.map((f) => [f.path, f]));
  const find = (re) => ctx.files.find((f) => re.test(f.path));

  // 7a. Security headers
  const vercel = byPath.get('vercel.json');
  const netlify = byPath.get('netlify.toml');
  const nextConfig = find(/^next\.config\.[cm]?[jt]s$/);
  const middleware = find(/^(src\/)?middleware\.[cm]?[jt]s$/);
  const hasHeaders =
    (vercel && /"headers"\s*:/.test(vercel.text)) ||
    (netlify && /\[\[\s*headers\s*\]\]/.test(netlify.text)) ||
    byPath.has('_headers') || byPath.has('public/_headers') || byPath.has('static/_headers') ||
    (nextConfig && /\bheaders\s*\(|headers\s*:\s*async/.test(nextConfig.text)) ||
    (middleware && /Content-Security-Policy|X-Frame-Options|Strict-Transport-Security/i.test(middleware.text));
  if (!hasHeaders) {
    ctx.add('deploy.no-security-headers', { file: '(repo)', line: null, evidence: 'no headers in vercel.json, netlify.toml, _headers, next.config or middleware' });
  }

  // 7b. Production source maps
  for (const f of ctx.files) {
    if (!/(^|\/)(next|vite)\.config\.[cm]?[jt]s$/.test(f.path)) continue;
    const re = /productionBrowserSourceMaps\s*:\s*true|\bsourcemap\s*:\s*(?:true|['"]inline['"])/g;
    let m;
    while ((m = re.exec(f.text))) {
      const line = lineAt(f.text, m.index);
      ctx.add('deploy.production-source-maps', { file: f.path, line, evidence: snippet(lineText(f.text, line)) });
    }
  }
  const deps = ctx.allDeps;
  if (deps['react-scripts'] && !ctx.files.some((f) => /GENERATE_SOURCEMAP\s*=\s*false/.test(f.text))) {
    ctx.add('deploy.production-source-maps', {
      title: 'Create React App builds publish source maps by default', file: 'package.json', line: null,
      evidence: 'react-scripts present and GENERATE_SOURCEMAP=false not set',
    });
  }

  // 7c. Error monitoring
  const hasMonitoring = Object.keys(deps).some((d) => MONITORING.test(d)) ||
    ctx.files.some((f) => isCodeFile(f.path) && /Sentry\.init\s*\(|npm:@sentry\/|deno\.land\/x\/sentry/.test(f.text));
  if (ctx.pkg && !hasMonitoring) {
    ctx.add('deploy.no-error-monitoring', { file: 'package.json', line: null, evidence: 'no Sentry or similar dependency found' });
  }

  // 7d. Tests
  const hasTests = ctx.files.some((f) => isCodeFile(f.path) && isTestFile(f.path)) || ctx.files.some((f) => /(^|\/)playwright\.config\.|(^|\/)cypress\.config\./.test(f.path));
  if (ctx.pkg && !hasTests) {
    ctx.add('deploy.no-tests', { file: '(repo)', line: null, evidence: 'no *.test.* / *.spec.* files or test folders found' });
  }

  // 7e. Lockfile
  if (ctx.pkg && ![...LOCKFILES].some((l) => existsSync(join(ctx.root, l)))) {
    ctx.add('deploy.no-lockfile', { file: 'package.json', line: null, evidence: 'no package-lock.json, yarn.lock, pnpm-lock.yaml or bun.lock at the repo root' });
  }

  // 7f. Outdated majors (root package.json ranges only)
  if (ctx.pkg) {
    const rootDeps = { ...(ctx.pkg.dependencies || {}), ...(ctx.pkg.devDependencies || {}) };
    for (const [name, min] of Object.entries(MIN_MAJOR)) {
      const major = majorOf(rootDeps[name]);
      if (major !== null && major < min) {
        const pkgFile = byPath.get('package.json');
        const idx = pkgFile ? pkgFile.text.search(new RegExp(`"${name.replace(/[/.]/g, '\\$&')}"\\s*:`)) : -1;
        ctx.add('deploy.outdated-major', {
          title: `Outdated major version: ${name} ${major} (current support starts at ${min})`,
          file: 'package.json', line: idx >= 0 ? lineAt(pkgFile.text, idx) : null,
          evidence: `"${name}": "${rootDeps[name]}"`,
        });
      }
    }
  }
}
