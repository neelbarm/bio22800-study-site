// Check 1: secrets in source (shared patterns + generic high-entropy assignments).
import { loadPatterns, snippet, entropy, mask, isPlaceholderSecret } from '../patterns.mjs';
import { lineAt, lineText, isEnvFile, isClientFile } from '../context.mjs';

const BUMP = { info: 'low', low: 'medium', medium: 'high', high: 'critical', critical: 'critical' };

const GENERIC_ASSIGN =
  /\b([A-Za-z0-9_]*(?:SECRET|TOKEN|PRIVATE_?KEY|PASSWORD|PASSWD|API_?KEY)[A-Za-z0-9_]*)["']?\s*[:=]\s*(["'`])([^"'`\s]{16,})\2/gi;
// Tokens that are public by design and meant to ship in browser code.
const PUBLIC_TOKEN = /^(?:pk\.|pk_live_|pk_test_|phc_|sb_publishable_)/;
const PLACEHOLDER = /(your|example|changeme|change_me|placeholder|dummy|sample|xxxx|\*\*\*|<|>|\$\{|process\.env|import\.meta|todo|insert|replace|redacted|null|undefined)/i;

export function checkSecrets(ctx) {
  const patterns = loadPatterns();
  for (const f of ctx.files) {
    const client = isClientFile(f.path, f.text, ctx);
    const hitLines = new Set();
    for (const p of patterns) {
      const re = new RegExp(p.re.source, 'g');
      let m;
      while ((m = re.exec(f.text))) {
        const line = lineAt(f.text, m.index);
        hitLines.add(line);
        if (isPlaceholderSecret(m[0])) continue; // docs and .env.example placeholders (prefix + xxxx)
        const severity = client && p.id !== 'google-ai-key' ? BUMP[p.severity] : p.severity;
        ctx.add(`secret.${p.id}`, {
          severity,
          title: `${p.name} in ${client ? 'client-side code' : 'source'}`,
          file: f.path,
          line,
          evidence: snippet(lineText(f.text, line), 180, column(f.text, m.index)),
          fix: `${p.fix} Then remove it from the code, rotate it and purge it from git history if the repo was ever shared.`,
          value: mask(m[0]),
        });
      }
    }
    if (isEnvFile(f.path)) continue; // .env files are handled by the env check
    const re = new RegExp(GENERIC_ASSIGN.source, 'gi');
    let m;
    while ((m = re.exec(f.text))) {
      const value = m[3];
      const line = lineAt(f.text, m.index);
      if (hitLines.has(line) || PLACEHOLDER.test(value) || /^eyJ/.test(value) || PUBLIC_TOKEN.test(value)) continue;
      if (entropy(value) < 3.5) continue;
      ctx.add('secret.generic-high-entropy', {
        title: `Hard-coded credential-like value assigned to ${m[1]}`,
        file: f.path,
        line,
        evidence: snippet(lineText(f.text, line), 180, column(f.text, m.index)),
        value: mask(value),
      });
    }
  }
}

const column = (text, index) => index - (text.lastIndexOf('\n', index - 1) + 1);
