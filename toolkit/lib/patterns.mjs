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
  const ids = new Set(raw.patterns.map((p) => p.id));
  const all = [...raw.patterns, ...TOOLKIT_PATTERNS.filter((p) => !ids.has(p.id))];
  const patterns = all.map((p) => ({ ...p, re: new RegExp(p.regex, 'g') }));
  cache = { path, patterns };
  return patterns;
}

// Patterns the repo audit needs that the shared file does not have yet. The web scanner
// detects Supabase secret keys on its own, so these stay local to the toolkit.
// A shared pattern with the same id replaces the local one.
export const TOOLKIT_PATTERNS = [
  {
    id: 'supabase-secret-key', name: 'Supabase secret API key', regex: 'sb_secret_[A-Za-z0-9_-]{20,}', severity: 'critical',
    fix: 'This key bypasses Row Level Security like the old service_role key. Delete it in the Supabase dashboard (Project Settings > API Keys), create a new one, and use it only in server code (Edge Functions or server routes).',
  },
];

// Known key prefixes. What follows the prefix decides whether a match is a real key
// or a documentation placeholder (the prefix followed by a run of x or 0, or 'your-key-here').
const KEY_PREFIX =
  /^(?:sk_live_|sk_test_|rk_live_|rk_test_|whsec_|sk-ant-(?:api|admin)\d{2}-|sk-(?:proj-|svcacct-|admin-)?|AIza|AKIA|ASIA|gh[pousr]_|github_pat_|re_|SG\.|xox[baprs]-|sb_secret_|key-)/;
const PLACEHOLDER_WORD = /(your|example|placeholder|here|xxxx|changeme|change_me|replace|dummy|sample|redacted|insert|todo)/i;

/** True when a key-shaped match is a placeholder: a known prefix followed by x's, 0's, a repeated unit or words like 'your-key-here'. */
export function isPlaceholderSecret(match) {
  const m = KEY_PREFIX.exec(String(match));
  if (!m) return false; // no known prefix (private key header, webhook URL): judge it real
  const rest = String(match).slice(m[0].length);
  if (!rest) return true;
  if (/^(.{1,4})\1+.{0,3}$/.test(rest)) return true; // one character or a short unit repeated
  if (/^[xX0*._-]+$/.test(rest)) return true;
  if (PLACEHOLDER_WORD.test(rest)) return true;
  return entropy(rest) < 3;
}

// Defaults published in public docs that only work against a local stack.
export const PUBLIC_DEFAULT_VALUES = new Set([
  'super-secret-jwt-token-with-at-least-32-characters-long', // Supabase CLI JWT secret
]);

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
// The lookbehind makes each identifier run a single match attempt (no quadratic rescans).
const QUOTED_ASSIGN =
  /(?<![A-Za-z0-9_$.-])([A-Za-z0-9_$.-]*(?:secret|token|private[_-]?key|password|passwd|api[_-]?key|apikey|service[_-]?role|access[_-]?key|auth[_-]?key|credential)[A-Za-z0-9_$-]*["']?\s*[:=]\s*)(["'`])([^"'`\s]{8,})\2/gi;
// .env style: NAME=value (unquoted or quoted), any *_KEY counts here
const ENV_ASSIGN =
  /^(\s*(?:export\s+)?[A-Za-z0-9_]*(?:SECRET|TOKEN|PRIVATE|PASSWORD|PASSWD|PASS\b|PWD|AUTH|API_KEY|APIKEY|SERVICE_ROLE|ACCESS_KEY|_KEY|CREDENTIAL)[A-Za-z0-9_]*\s*=\s*)(["']?)([^"'\s#]{8,})\2/gim;
const URL_CREDS = /(\b[a-z][a-z0-9+.-]*:\/\/[^:\s/@]+:)([^@\s/]{3,})@/gi;

// A whole private key block, or everything after a BEGIN header when the END is missing.
const PRIVATE_KEY_BLOCK = /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?(?:-----END [A-Z ]*PRIVATE KEY-----|$)/g;

const alreadyMasked = (v) => v.includes('****');

export function redact(text, patterns = loadPatterns()) {
  let out = String(text);
  out = out.replace(PRIVATE_KEY_BLOCK, '[private key redacted]');
  for (const p of patterns) out = out.replace(new RegExp(p.re.source, 'g'), (m) => mask(m));
  out = out.replace(new RegExp(JWT_RE.source, 'g'), (m) => mask(m));
  out = out.replace(QUOTED_ASSIGN, (m, pre, q, val) => (alreadyMasked(val) ? m : `${pre}${q}${mask(val)}${q}`));
  out = out.replace(ENV_ASSIGN, (m, pre, q, val) => (alreadyMasked(val) ? m : `${pre}${q}${mask(val)}${q}`));
  out = out.replace(URL_CREDS, (m, pre) => `${pre}****@`);
  return out;
}

const LONG_LINE = 1000;
const TOKEN_CHAR = /[^\s"'`,;(){}[\]<>]/;

/**
 * Cut a very long line to a window around `at` before redacting it, so redaction stays fast
 * on minified bundles and JSON dumps. Partial tokens at the cut edges are dropped, so a
 * fragment of a secret can never survive without the prefix redact() needs to find it.
 */
function windowed(s, at) {
  if (s.length <= LONG_LINE) return s;
  let start = Math.max(0, Math.min(at, s.length) - 200);
  let end = Math.min(s.length, start + 600);
  if (start > 0) while (start < end && TOKEN_CHAR.test(s[start - 1]) && TOKEN_CHAR.test(s[start])) start++;
  if (end < s.length) while (end > start && TOKEN_CHAR.test(s[end]) && TOKEN_CHAR.test(s[end - 1])) end--;
  if (end <= start) return `(${s.length}-character line; value masked)`;
  return s.slice(start, end);
}

/** Redacted, trimmed, length-capped one-line evidence string. `at` is the column of the match on long lines. */
export function snippet(line, max = 180, at = 0) {
  const s = redact(windowed(String(line ?? ''), at)).trim().replace(/\s+/g, ' ');
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** Mask the value of an env assignment: URL passwords only for connection strings, else mask(). */
export function maskEnvValue(value) {
  const v = String(value).trim().replace(/^["']|["']$/g, '');
  if (/^[a-z][a-z0-9+.-]*:\/\/[^:\s/@]+:[^@\s]+@/i.test(v)) return v.replace(/(:\/\/[^:\s/@]+:)[^@\s]+@/, '$1****@');
  return mask(v);
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
