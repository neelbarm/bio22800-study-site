import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadPatterns, mask, redact, snippet, decodeJwtPayload, PATTERNS_PATH } from '../lib/patterns.mjs';
import { splitSql, parseStatement } from '../lib/sql.mjs';
import { score, countBySeverity, buildFixPlan, meetsFailOn } from '../lib/audit.mjs';
import { readGitignore, isGitignored, isClientFile, readGitTrackedPaths } from '../lib/context.mjs';
import { FAKE } from './helpers.mjs';

test('secret patterns load from shared/secret-patterns.json next to the toolkit', () => {
  assert.match(PATTERNS_PATH.replace(/\\/g, '/'), /\/shared\/secret-patterns\.json$/);
  assert.ok(existsSync(PATTERNS_PATH));
  const ids = loadPatterns().map((p) => p.id);
  for (const id of ['stripe-secret-live', 'openai-key', 'anthropic-key', 'aws-access-key']) assert.ok(ids.includes(id), id);
});

test('fake fixture keys still match the shared regexes', () => {
  const byId = Object.fromEntries(loadPatterns().map((p) => [p.id, new RegExp(p.regex)]));
  assert.ok(byId['stripe-secret-live'].test(FAKE.STRIPE_LIVE));
  assert.ok(byId['openai-key'].test(FAKE.OPENAI));
  assert.equal(decodeJwtPayload(FAKE.SERVICE_ROLE_JWT).role, 'service_role');
  assert.equal(decodeJwtPayload(FAKE.ANON_JWT).role, 'anon');
});

test('mask keeps only the first 6 and last 4 characters', () => {
  const masked = mask(FAKE.STRIPE_LIVE);
  assert.equal(masked, `${FAKE.STRIPE_LIVE.slice(0, 6)}********${FAKE.STRIPE_LIVE.slice(-4)}`);
  assert.ok(!masked.includes(FAKE.STRIPE_LIVE.slice(6, -4)));
  assert.equal(mask('short-value'), 'sh****');
});

test('redact masks pattern matches, JWTs, secret assignments and URL passwords', () => {
  const line = `const a = '${FAKE.STRIPE_LIVE}'; const b = "${FAKE.SERVICE_ROLE_JWT}";`;
  const out = redact(line);
  assert.ok(!out.includes(FAKE.STRIPE_LIVE));
  assert.ok(!out.includes(FAKE.SERVICE_ROLE_JWT));
  assert.match(out, /sk_liv\*{8}FAKE/);
  assert.match(redact('const API_TOKEN = "q8Zr2LmP0vX7nB4kT1yW"'), /API_TOKEN = "q8Zr2L\*{8}T1yW"/);
  const dbUrl = 'DATABASE_URL=postgres://app:' + 'hunter2'.repeat(2) + '@db.example.com:5432/app';
  assert.match(redact(dbUrl), /app:\*\*\*\*@db/);
  assert.ok(snippet('x'.repeat(500)).length <= 180);
});

test('score: 100 minus 25/10/4/1 per critical/high/medium/low, floored at 0, info ignored', () => {
  const f = (severity) => ({ severity });
  assert.equal(score([]), 100);
  assert.equal(score([f('critical'), f('high'), f('medium'), f('low'), f('info')]), 60);
  assert.equal(score([f('critical'), f('critical'), f('critical'), f('critical'), f('low')]), 0);
  assert.deepEqual(countBySeverity([f('high'), f('high'), f('info')]), { critical: 0, high: 2, medium: 0, low: 0, info: 1 });
});

test('meetsFailOn compares against the threshold and ignores info', () => {
  const findings = [{ severity: 'medium' }, { severity: 'info' }];
  assert.equal(meetsFailOn(findings, 'critical'), false);
  assert.equal(meetsFailOn(findings, 'high'), false);
  assert.equal(meetsFailOn(findings, 'medium'), true);
  assert.equal(meetsFailOn(findings, 'low'), true);
  assert.equal(meetsFailOn([{ severity: 'info' }], 'low'), false);
});

test('fix plan maps issue counts to the sprint tiers', () => {
  const mk = (n, extra = {}) =>
    Array.from({ length: n }, (_, i) => ({ id: `x.issue-${i}`, severity: 'medium', effort: 'S', category: 'code', title: `Issue ${i}`, file: 'a.ts', line: i + 1, ...extra }));
  assert.equal(buildFixPlan([]).tier, null);
  assert.equal(buildFixPlan(mk(3)).tier.price, 1500);
  assert.equal(buildFixPlan(mk(5)).tier.price, 1500);
  assert.equal(buildFixPlan(mk(7)).tier.price, 2500);
  assert.equal(buildFixPlan(mk(12)).tier.price, 4000);
  assert.equal(buildFixPlan([...mk(2), { ...mk(1)[0], id: 'stripe.client-fulfillment', tier4: 'payments' }]).tier.price, 4000);
  // deploy work (medium+) moves a small plan to the tier that includes the production deploy
  assert.equal(buildFixPlan([...mk(2), { ...mk(1)[0], id: 'deploy.production-source-maps', category: 'deploy' }]).tier.price, 2500);
  // all low-severity items collapse into one hygiene issue
  const lows = mk(6, { severity: 'low' });
  assert.equal(buildFixPlan(lows).issueCount, 1);
});

test('SQL splitter respects dollar quoting and reports statement lines', () => {
  const sql = `-- comment; with semicolon\ncreate table public.a (id int);\n\ncreate function f() returns void language plpgsql security definer as $$\nbegin\n  perform 1; perform 2;\nend;\n$$;\nalter table a enable row level security;`;
  const stmts = splitSql(sql);
  assert.equal(stmts.length, 3);
  assert.deepEqual(stmts.map((s) => s.line), [2, 4, 9]);
  const fn = parseStatement(stmts[1].sql);
  assert.equal(fn.type, 'function');
  assert.equal(fn.securityDefiner, true);
  assert.equal(fn.hasSearchPath, false);
  assert.deepEqual(parseStatement(stmts[2].sql), { type: 'rls', table: { schema: 'public', name: 'a', full: 'public.a' }, enabled: true });
});

test('policy and bucket parsing', () => {
  const p = parseStatement('create policy "x" on public.notes as permissive for delete to anon, authenticated using ( true )');
  assert.equal(p.cmd, 'delete');
  assert.deepEqual(p.roles, ['anon', 'authenticated']);
  assert.equal(p.usingTrue, true);
  const owner = parseStatement('create policy "own" on notes for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)');
  assert.equal(owner.usingTrue, false);
  assert.equal(owner.checkTrue, false);
  assert.equal(owner.table.full, 'public.notes');
  const b = parseStatement("insert into storage.buckets (id, name, public) values ('a', 'a', true), ('b', 'b', false)");
  assert.deepEqual(b.buckets, [{ name: 'a', public: true }, { name: 'b', public: false }]);
});

test('.gitignore matching: *.local does not cover .env, .env* does', () => {
  const dir = mkdtempSync(join(tmpdir(), 'shipready-gi-'));
  try {
    writeFileSync(join(dir, '.gitignore'), 'node_modules\n*.local\n');
    let rules = readGitignore(dir);
    assert.equal(isGitignored(rules, '.env'), false);
    assert.equal(isGitignored(rules, '.env.local'), true);
    writeFileSync(join(dir, '.gitignore'), '.env*\n!.env.example\n');
    rules = readGitignore(dir);
    assert.equal(isGitignored(rules, '.env'), true);
    assert.equal(isGitignored(rules, '.env.example'), false);
    assert.equal(readGitTrackedPaths(dir), null); // no .git directory
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('client/server file classification', () => {
  const vite = { isNext: false };
  const next = { isNext: true };
  assert.equal(isClientFile('src/lib/x.ts', '', vite), true);
  assert.equal(isClientFile('supabase/functions/a/index.ts', '', vite), false);
  assert.equal(isClientFile('vite.config.ts', '', vite), false);
  assert.equal(isClientFile('app/page.tsx', '', next), false);
  assert.equal(isClientFile('app/page.tsx', "'use client';\n", next), true);
  assert.equal(isClientFile('pages/index.tsx', '', next), true);
  assert.equal(isClientFile('pages/api/hook.ts', '', next), false);
  assert.equal(isClientFile('app/api/x/route.ts', '', next), false);
});
