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

export const FAKE = Object.freeze({
  STRIPE_LIVE: 'sk_' + 'live_' + 'FAKE'.repeat(8),
  OPENAI: 'sk-' + 'proj-' + 'FAKE'.repeat(12),
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
