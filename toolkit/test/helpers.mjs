// Test helpers: materialize a fixture into a temp dir with fake keys built at runtime.
// No key-shaped literal appears in any committed file; every fake value below is
// assembled from pieces so secret scanners (and GitHub push protection) stay quiet.
import { mkdtempSync, readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const TOOLKIT = fileURLToPath(new URL('..', import.meta.url));
export const FIXTURES = join(TOOLKIT, 'test', 'fixtures');
export const BIN = join(TOOLKIT, 'bin', 'shipready-audit.mjs');

const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
function fakeJwt(role) {
  const header = b64url({ alg: 'HS256', typ: 'JWT' });
  const payload = b64url({ iss: 'supabase', ref: 'fakefakefakefake', role, iat: 1700000000, exp: 2000000000 });
  return [header, payload, 'FAKE' + 'signature'.repeat(3)].join('.');
}

// Mixed filler so the fakes do not look like documentation placeholders (prefix + xxxx...),
// which the audit deliberately ignores. Still obviously fake: they start and end with FAKE.
const FILLER = 'Q7m2Xp9Lr4Vt8Kw3Zn6B' + 'd5Jc1Ns0Gy';

export const FAKE = Object.freeze({
  STRIPE_LIVE: 'sk_' + 'live_' + 'FAKE' + FILLER + 'FAKE',
  OPENAI: 'sk-' + 'proj-' + 'FAKE' + FILLER + FILLER.slice(0, 12) + 'FAKE',
  SERVICE_ROLE_JWT: fakeJwt('service' + '_role'),
  ANON_JWT: fakeJwt('anon'),
});

/** Copy fixtures/<name> to a fresh temp dir, substitute placeholders, rename dot-* files. */
export function materialize(name) {
  const src = join(FIXTURES, name);
  const dest = mkdtempSync(join(tmpdir(), `shipready-${name}-`));
  const walk = (dir) => {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const from = join(dir, ent.name);
      if (ent.isDirectory()) { walk(from); continue; }
      const rel = from.slice(src.length + 1);
      const parts = rel.split(/[\\/]/);
      parts[parts.length - 1] = parts[parts.length - 1].replace(/^dot-/, '.');
      const to = join(dest, ...parts);
      mkdirSync(dirname(to), { recursive: true });
      const text = readFileSync(from, 'utf8').replace(/\{\{FAKE_([A-Z_]+)\}\}/g, (m, key) => {
        if (!(key in FAKE)) throw new Error(`Unknown fixture placeholder ${m} in ${rel}`);
        return FAKE[key];
      });
      writeFileSync(to, text);
    }
  };
  walk(src);
  return dest;
}

export function cleanup(dir) {
  if (dir && dir.startsWith(tmpdir())) rmSync(dir, { recursive: true, force: true });
}

/** Assert helper: a string must not contain any full fake secret. */
export function leakedSecrets(text) {
  return Object.entries(FAKE).filter(([, v]) => text.includes(v)).map(([key]) => key);
}

/** Write a throwaway repo from { 'path/in/repo': 'contents' } into os.tmpdir(); returns its path. */
export function makeRepo(files, name = 'case') {
  const dest = mkdtempSync(join(tmpdir(), `shipready-${name}-`));
  for (const [rel, text] of Object.entries(files)) {
    const to = join(dest, ...rel.split('/'));
    mkdirSync(dirname(to), { recursive: true });
    writeFileSync(to, text);
  }
  return dest;
}

/** Deterministic mixed filler of length n (not placeholder-shaped), for fake values built at runtime. */
export function filler(n, seed = 7) {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let x = seed;
  let out = '';
  for (let i = 0; i < n; i++) { x = (x * 1103515245 + 12345) % 2147483648; out += abc[x % abc.length]; }
  return out;
}

/** A JWT-shaped string with the given payload (unsigned; for tests only). */
export function jwtWith(payload) {
  return [b64url({ alg: 'HS256', typ: 'JWT' }), b64url(payload), 'FAKE' + 'signature'.repeat(3)].join('.');
}
