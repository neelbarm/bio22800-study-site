// Secret pattern loading, masking and redaction.
// Nothing printed by the toolkit should ever contain a full secret value:
// every piece of evidence goes through redact() before it is stored.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const PATTERNS_PATH = fileURLToPath(new URL('../../shared/secret-patterns.json', import.meta.url));

let cache = null;

export function loadPatterns(path = process.env.SHIPREADY_PATTERNS || PATTERNS_PATH) {
  if (cache && cache.path === path) return cache.patterns;
  let raw;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(`Cannot load secret patterns from ${path}: ${err.message}`);
  }
  if (!raw || !Array.isArray(raw.patterns)) throw new Error(`Secret patterns file ${path} has no "patterns" array`);
  const patterns = raw.patterns.map((p) => ({ ...p, re: new RegExp(p.regex, 'g') }));
  cache = { path, patterns };
  return patterns;
}

/** Keep the first 6 and last 4 characters; hide the rest (and the real length). */
export function mask(value) {
  const s = String(value);
  if (s.length < 20) return `${s.slice(0, 2)}****`;
  return `${s.slice(0, 6)}********${s.slice(-4)}`;
}

export const JWT_RE = /eyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g;

export const SECRETISH_NAME =
  /(secret|token|private[_-]?key|password|passwd|api[_-]?key|apikey|service[_-]?role|access[_-]?key|auth[_-]?key|client[_-]?secret|credential)/i;

// NAME = "value" / NAME: 'value' / "NAME": "value"
const QUOTED_ASSIGN =
  /([A-Za-z0-9_$.-]*(?:secret|token|private[_-]?key|password|passwd|api[_-]?key|apikey|service[_-]?role|access[_-]?key|auth[_-]?key|credential)[A-Za-z0-9_$-]*["']?\s*[:=]\s*)(["'`])([^"'`\s]{8,})\2/gi;
// .env style: NAME=value (unquoted or quoted), any *_KEY counts here
const ENV_ASSIGN =
  /^(\s*(?:export\s+)?[A-Za-z0-9_]*(?:SECRET|TOKEN|PRIVATE|PASSWORD|PASSWD|API_KEY|APIKEY|SERVICE_ROLE|ACCESS_KEY|_KEY|CREDENTIAL)[A-Za-z0-9_]*\s*=\s*)(["']?)([^"'\s#]{8,})\2/gim;
const URL_CREDS = /(\b[a-z][a-z0-9+.-]*:\/\/[^:\s/@]+:)([^@\s/]{3,})@/gi;

const alreadyMasked = (v) => v.includes('****');

export function redact(text, patterns = loadPatterns()) {
  let out = String(text);
  for (const p of patterns) out = out.replace(new RegExp(p.re.source, 'g'), (m) => mask(m));
  out = out.replace(new RegExp(JWT_RE.source, 'g'), (m) => mask(m));
  out = out.replace(QUOTED_ASSIGN, (m, pre, q, val) => (alreadyMasked(val) ? m : `${pre}${q}${mask(val)}${q}`));
  out = out.replace(ENV_ASSIGN, (m, pre, q, val) => (alreadyMasked(val) ? m : `${pre}${q}${mask(val)}${q}`));
  out = out.replace(URL_CREDS, (m, pre) => `${pre}****@`);
  return out;
}

/** Redacted, trimmed, length-capped one-line evidence string. */
export function snippet(line, max = 180) {
  const s = redact(String(line ?? '')).trim().replace(/\s+/g, ' ');
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** Shannon entropy in bits per character. */
export function entropy(s) {
  if (!s) return 0;
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  let h = 0;
  for (const n of freq.values()) {
    const p = n / s.length;
    h -= p * Math.log2(p);
  }
  return h;
}

/** Decode the payload of a JWT-looking string; returns null when it isn't one. */
export function decodeJwtPayload(token) {
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  try {
    const json = Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    const payload = JSON.parse(json);
    return payload && typeof payload === 'object' ? payload : null;
  } catch {
    return null;
  }
}
