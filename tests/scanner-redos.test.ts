import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractPageLinks, extractScripts, findSecrets, findSupabase } from '../lib/scanner/analyze.ts'

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
