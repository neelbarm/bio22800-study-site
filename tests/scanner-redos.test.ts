import { test } from 'node:test'
import assert from 'node:assert/strict'
import { collectSupabase, extractPageLinks, extractScripts, findSecrets, findSupabase } from '../lib/scanner/analyze.ts'

// The scanner runs regexes over attacker-controlled bodies: the page (up to 3 MB) and each chunk
// (up to 5 MB, 25 of them). Several regexes backtrack quadratically, and regex execution is synchronous,
// so the deadline checks in scanUrl never get a chance to run. A malicious page pins the function's
// event loop until Vercel kills it at maxDuration, stalling every other request on the same instance.
//
// Inputs below are 40-80 KB (tiny compared with the 3-5 MB caps). Linear-time code handles them in a few
// milliseconds; the current code takes seconds, and time grows with the square of the size
// (200 KB of "eyJ" took ~32 s when measured, so a 3 MB page would take hours).

const BUDGET_MS = 400
function timed(fn: () => unknown): number {
  const s = performance.now()
  fn()
  return performance.now() - s
}

test('findSupabase JWT regex is not quadratic on repeated "eyJ"', () => {
  const ms = timed(() => findSupabase('eyJ'.repeat(20_000), 'x')) // 60 KB
  assert.ok(ms < BUDGET_MS, `findSupabase took ${Math.round(ms)} ms on 60 KB`)
})

test('extractScripts is not quadratic on unterminated <script tags', () => {
  const ms = timed(() => extractScripts('<script '.repeat(10_000), 'https://a.example/')) // 80 KB
  assert.ok(ms < BUDGET_MS, `extractScripts took ${Math.round(ms)} ms on 80 KB`)
})

test('secret patterns (shared/secret-patterns.json openai-key) are not quadratic on repeated "sk-a"', () => {
  const ms = timed(() => findSecrets('sk-a'.repeat(12_000), 'x')) // 48 KB
  assert.ok(ms < BUDGET_MS, `findSecrets took ${Math.round(ms)} ms on 48 KB`)
})

// Shapes that defeat other regexes in the same code paths, plus 3 MB versions (the real page cap).
const MB3 = 3_000_000
const fill = (unit: string, size: number) => unit.repeat(Math.ceil(size / unit.length))

test('extractScripts is linear on <script> tags with no closing tag', () => {
  const ms = timed(() => extractScripts('<script>'.repeat(10_000), 'https://a.example/'))
  assert.ok(ms < BUDGET_MS, `extractScripts took ${Math.round(ms)} ms`)
})

test('extractScripts is linear on unterminated <link tags', () => {
  const ms = timed(() => extractScripts('<link '.repeat(15_000), 'https://a.example/'))
  assert.ok(ms < BUDGET_MS, `extractScripts took ${Math.round(ms)} ms`)
})

test('openai pattern is linear on repeated "sk--"', () => {
  const ms = timed(() => findSecrets('sk--'.repeat(12_000), 'x'))
  assert.ok(ms < BUDGET_MS, `findSecrets took ${Math.round(ms)} ms`)
})

test('3 MB hostile bodies stay within budget', () => {
  const cases: [string, () => unknown][] = [
    ['eyJ', () => findSupabase(fill('eyJ', MB3), 'x')],
    ['.eyJ', () => findSupabase(fill('.eyJ', MB3), 'x')],
    ['<script ', () => extractScripts(fill('<script ', MB3), 'https://a.example/')],
    ['<script>', () => extractScripts(fill('<script>', MB3), 'https://a.example/')],
    ['<link ', () => extractScripts(fill('<link ', MB3), 'https://a.example/')],
    ['<a href', () => extractPageLinks(fill('<a href="/x" ', MB3), 'https://a.example/')],
    ['sk-a', () => findSecrets(fill('sk-a', MB3), 'x')],
    ['sk--', () => findSecrets(fill('sk--', MB3), 'x')],
    ['private key header', () => findSecrets('-----BEGIN ' + 'PRIVATE KEY-----' + ' '.repeat(MB3) + '!', 'x')],
  ]
  for (const [name, fn] of cases) {
    const ms = timed(fn)
    assert.ok(ms < 1000, `${name}: ${Math.round(ms)} ms on 3 MB`)
  }
})

// collectSupabase did quadratic non-regex work: a linear search over every project URL and over every key
// already stored, with no cap. 60k distinct sb_publishable_ keys (2.5 MB) took 80 s.

const b64url = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const distinct = (i: number, width = 26) => i.toString(36).padStart(width, '0')

test('collectSupabase stays linear on tens of thousands of distinct publishable keys', () => {
  const keys = Array.from({ length: 60_000 }, (_, i) => `"${'sb_' + 'publishable_' + distinct(i)}"`).join(',') // ~2.5 MB
  let refs: ReturnType<typeof collectSupabase> = []
  const ms = timed(() => (refs = collectSupabase([{ text: keys, where: 'x' }])))
  assert.ok(ms < 1000, `collectSupabase took ${Math.round(ms)} ms on 60k distinct keys`)
  const total = refs.reduce((n, r) => n + r.keys.length, 0)
  assert.ok(total > 0 && total <= 100, `kept ${total} keys`)
})

test('collectSupabase stays linear on forged no-ref iss:supabase JWTs', () => {
  const head = b64url({ alg: 'HS256', typ: 'JWT' })
  const jwts = Array.from({ length: 20_000 }, (_, i) => `"${head}.${b64url({ iss: 'supabase', role: 'anon', n: i })}.${'s'.repeat(20)}"`).join(',')
  const ms = timed(() => collectSupabase([{ text: `createClient("https://abcdefghijklmnopqrst.supabase.co",x);` + jwts, where: 'x' }]))
  assert.ok(ms < 1000, `collectSupabase took ${Math.round(ms)} ms on 20k forged JWTs`)
})

test('collectSupabase stays linear on tens of thousands of distinct project URLs, with keys between them', () => {
  const parts: string[] = []
  for (let i = 0; i < 20_000; i++) parts.push(`"https://p${distinct(i, 12)}.supabase.co"`, i % 10 === 0 ? `"${'sb_' + 'publishable_' + distinct(i)}"` : '')
  let refs: ReturnType<typeof collectSupabase> = []
  const ms = timed(() => (refs = collectSupabase([{ text: parts.join(','), where: 'x' }, { text: parts.join(';'), where: 'y' }])))
  assert.ok(ms < 1000, `collectSupabase took ${Math.round(ms)} ms on 20k distinct URLs`)
  assert.ok(refs.filter(r => r.url).length <= 50, `kept ${refs.length} project URLs`)
  for (const r of refs) assert.ok(r.keys.length <= 20, `${r.url} kept ${r.keys.length} keys`)
})

test('the same key repeated many times is paired once and still found', () => {
  const key = 'sb_' + 'publishable_' + distinct(7)
  const text = `createClient("https://abcdefghijklmnopqrst.supabase.co","${key}");` + `k="${key}";`.repeat(100_000)
  let refs: ReturnType<typeof collectSupabase> = []
  const ms = timed(() => (refs = collectSupabase([{ text, where: 'x' }])))
  assert.ok(ms < 1000, `took ${Math.round(ms)} ms`)
  assert.deepEqual(refs.map(r => [r.url, r.keys.length]), [['https://abcdefghijklmnopqrst.supabase.co', 1]])
})
