// Check 6: dangerous code patterns.
import { snippet } from '../patterns.mjs';
import { lineAt, lineText, isCodeFile, isServerFile, isCommentLine, isTestFile } from '../context.mjs';
import { USER_CHECK } from './auth.mjs';

const CORS_WILDCARD = /Access-Control-Allow-Origin['"]?\s*[:,]\s*['"]\*['"]|\borigin\s*:\s*['"]\*['"]|\bcors\(\s*\)/;
const SERVICE = /service_role|SERVICE_ROLE|serviceRole|SUPABASE_SERVICE_KEY|SUPABASE_SECRET_KEY|sb_secret_/;
const CREDENTIALS = /Access-Control-Allow-Credentials['"]?\s*[:,]\s*['"]?true|credentials\s*:\s*true/;
const PRIVILEGED = new RegExp(`${SERVICE.source}|${CREDENTIALS.source}`);
// Cookie-based auth: with CORS * plus credentials the browser sends the user's cookies.
const COOKIE_AUTH = /\bcookies\s*\(\s*\)|headers\.get\(\s*['"]cookie['"]|req\.cookies\b|document\.cookie/;
const SENSITIVE_LOG = /console\.(?:log|info|debug|warn)\s*\((?=[^\n]*\b(?:token|access_token|refresh_token|session|password|secret|jwt|apiKey|api_key)\b)/i;
// Identifiers that are safe to log: Stripe checkout session ids/urls and other non-secret fields.
const SAFE_SESSION_FIELD = /\b(?:session|checkoutSession|stripeSession)\s*\??\.\s*(?:id|url|status|payment_status|mode|customer|customer_email|amount_total|currency|client_reference_id|metadata)\b/g;
const STRIPE_SESSION_FILE = /checkout\.sessions\.(?:create|retrieve)|Stripe\.Checkout\.Session/;

/** Drop string contents (keep ${...} in templates) and safe session fields before looking for secrets in a log call. */
function logArgs(line, stripeOnlySession) {
  let s = line
    .replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, (t) => (t.match(/\$\{[^}]*\}/g) || []).join(' '))
    .replace(SAFE_SESSION_FIELD, '');
  if (stripeOnlySession) s = s.replace(/\bsession\b/g, ''); // a Stripe Checkout Session, not an auth session
  return s;
}

export function checkCode(ctx) {
  const code = ctx.files.filter((f) => isCodeFile(f.path) && !isTestFile(f.path));

  // Supabase functions that use service role (to judge shared CORS headers).
  const privilegedFns = code.filter((f) => /(^|\/)supabase\/functions\//.test(f.path) && PRIVILEGED.test(f.text));
  // CORS * only matters when the browser sends credentials (cookies) or when a privileged
  // endpoint does not check the caller. Bearer-token auth with getUser() is not exposed by it.
  const corsRisk = (t) => CREDENTIALS.test(t) || COOKIE_AUTH.test(t) || (SERVICE.test(t) && !USER_CHECK.test(t));

  for (const f of code) {
    // dangerouslySetInnerHTML with non-literal content
    const reHtml = /dangerouslySetInnerHTML\s*=\s*\{\s*\{\s*__html\s*:\s*/g;
    let m;
    while ((m = reHtml.exec(f.text))) {
      const rest = f.text.slice(reHtml.lastIndex, reHtml.lastIndex + 300);
      const expr = rest.slice(0, Math.max(rest.indexOf('}}'), 0) || rest.length).trim();
      if (/^(['"])[^'"]*\1$/.test(expr) || /^`[^`$]*`$/.test(expr)) continue; // string literal
      if (/sanitize|DOMPurify|purify|escapeHtml|xss\(/i.test(expr)) continue;
      if (/components\/ui\/chart\.[jt]sx?$/.test(f.path) || /^Object\.entries\(THEMES\)/.test(expr)) continue; // shadcn chart theme CSS
      if (/application\/ld\+json/.test(f.text.slice(Math.max(0, m.index - 200), m.index)) && /JSON\.stringify/.test(expr)) continue; // JSON-LD
      const line = lineAt(f.text, m.index);
      ctx.add('code.dangerous-html', { file: f.path, line, evidence: snippet(lineText(f.text, line)) });
    }

    const lines = f.text.split('\n');
    let logHits = [];
    const stripeOnlySession = STRIPE_SESSION_FILE.test(f.text) && !/getSession\s*\(|onAuthStateChange/.test(f.text);
    lines.forEach((text, i) => {
      if (isCommentLine(text)) return;
      if (/(?<![\w.$])eval\s*\(/.test(text) || /\bnew\s+Function\s*\(/.test(text)) {
        ctx.add('code.eval', { file: f.path, line: i + 1, evidence: snippet(text) });
      }
      if (/console\.(?:log|info|debug|warn)\s*\(/.test(text) && SENSITIVE_LOG.test(logArgs(text, stripeOnlySession))) logHits.push(i + 1);
    });
    if (logHits.length) {
      ctx.add('code.console-log-sensitive', {
        file: f.path, line: logHits[0],
        evidence: snippet(lines[logHits[0] - 1]) + (logHits.length > 1 ? ` (+${logHits.length - 1} more in this file)` : ''),
      });
    }

    // CORS * on privileged server code
    if (isServerFile(f.path, f.text, ctx) && CORS_WILDCARD.test(f.text)) {
      const users = /(^|\/)supabase\/functions\/_shared\//.test(f.path) ? privilegedFns.filter((p) => /corsHeaders|cors/.test(p.text)) : [];
      if (PRIVILEGED.test(f.text) || users.length) {
        const risky = corsRisk(f.text) || users.some((p) => corsRisk(p.text));
        const line = lineAt(f.text, f.text.search(CORS_WILDCARD));
        ctx.add('code.cors-wildcard', {
          ...(risky ? {} : {
            severity: 'info',
            title: 'CORS allows any origin (endpoints use Bearer tokens and check the caller)',
            why: 'With `Access-Control-Allow-Origin: *` and no credentials, browsers send no cookies cross-origin, and a Bearer token has to be added by the calling page, which another site cannot read. So this is not exposed as long as every function keeps checking the caller.',
            fix: 'Optional: allow only your own domains. Keep the `auth.getUser(token)` check in every function that uses the service role.',
          }),
          file: f.path, line,
          evidence: snippet(lineText(f.text, line)) + (users.length ? ` (shared by functions that use service_role${risky ? ', at least one without a caller check' : ''})` : ''),
        });
      }
    }
  }
}
