// Check 6: dangerous code patterns.
import { snippet } from '../patterns.mjs';
import { lineAt, lineText, isCodeFile, isServerFile, isCommentLine, isTestFile } from '../context.mjs';

const CORS_WILDCARD = /Access-Control-Allow-Origin['"]?\s*[:,]\s*['"]\*['"]|\borigin\s*:\s*['"]\*['"]|\bcors\(\s*\)/;
const PRIVILEGED = /service_role|SERVICE_ROLE|serviceRole|Access-Control-Allow-Credentials['"]?\s*[:,]\s*['"]?true|credentials\s*:\s*true/;
const SENSITIVE_LOG = /console\.(?:log|info|debug|warn)\s*\((?=[^\n]*\b(?:token|access_token|refresh_token|session|password|secret|jwt|apiKey|api_key)\b)/i;

export function checkCode(ctx) {
  const code = ctx.files.filter((f) => isCodeFile(f.path) && !isTestFile(f.path));

  // Supabase functions that use service role (to judge shared CORS headers).
  const privilegedFns = code.filter((f) => /^supabase\/functions\//.test(f.path) && PRIVILEGED.test(f.text));

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
    lines.forEach((text, i) => {
      if (isCommentLine(text)) return;
      if (/(?<![\w.$])eval\s*\(/.test(text) || /\bnew\s+Function\s*\(/.test(text)) {
        ctx.add('code.eval', { file: f.path, line: i + 1, evidence: snippet(text) });
      }
      if (SENSITIVE_LOG.test(text)) logHits.push(i + 1);
    });
    if (logHits.length) {
      ctx.add('code.console-log-sensitive', {
        file: f.path, line: logHits[0],
        evidence: snippet(lines[logHits[0] - 1]) + (logHits.length > 1 ? ` (+${logHits.length - 1} more in this file)` : ''),
      });
    }

    // CORS * on privileged server code
    if (isServerFile(f.path, f.text) && CORS_WILDCARD.test(f.text)) {
      const sharedHeaders = /^supabase\/functions\/_shared\//.test(f.path) && privilegedFns.some((p) => /corsHeaders|cors/.test(p.text));
      if (PRIVILEGED.test(f.text) || sharedHeaders) {
        const line = lineAt(f.text, f.text.search(CORS_WILDCARD));
        ctx.add('code.cors-wildcard', {
          file: f.path, line,
          evidence: snippet(lineText(f.text, line)) + (sharedHeaders ? ' (shared by functions that use service_role)' : ''),
        });
      }
    }
  }
}
