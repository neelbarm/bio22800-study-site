import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanUrl } from '../lib/scanner/scan.ts'
import { isSensitiveTable } from '../lib/scanner/analyze.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// Report-level accuracy: contradictions, duplicate evidence, and severity labels a prospect
// would immediately recognise as wrong. Secret-shaped values are assembled at runtime.

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const REF = 'abcdefghijklmnopqrst'
const SUPA = `https://${REF}.supabase.co`
const ANON = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', ref: REF, role: 'anon' })}.${'s'.repeat(43)}`
const SERVICE = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', ref: REF, role: 'service_role' })}.${'t'.repeat(43)}`
const STRIPE_LIVE = 'sk_' + 'live_' + '51Habc' + 'Q7w'.repeat(10)
const ALL_HEADERS = new Headers({
  'strict-transport-security': 'max-age=63072000',
  'content-security-policy': "default-src 'self'; frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
})

type Spec = Partial<FetchResult> & { status?: number }
function fakeFetcher(routes: Record<string, Spec>) {
  return async (url: string): Promise<FetchResult> => {
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('*') && url.startsWith(k.slice(0, -1))))
    const spec: Spec = key ? routes[key] : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers(), text, bytes: text.length, truncated: false }
  }
}

test('a leaked service_role key is not accompanied by "No high-risk secret keys found"', async () => {
  // The pass line only looks at findSecrets(); Supabase admin keys come from findSupabase().
  // Result: a CRITICAL "admin key exposed" finding and a green "no high-risk secret keys" tick.
  const fn = fakeFetcher({
    'https://app.example.com/': { text: '<script type="module" src="/assets/index-1.js"></script>', headers: ALL_HEADERS },
    'https://app.example.com/assets/index-1.js': { text: `const s=createClient("${SUPA}","${ANON}");const admin=createClient("${SUPA}","${SERVICE}")` },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(r.findings.some(f => f.id === 'supabase-service-key-exposed'))
  assert.ok(
    !r.passed.includes('No high-risk secret keys found in shipped JavaScript'),
    `contradiction: critical admin-key finding plus "${r.passed.find(p => /secret keys/.test(p))}"`,
  )
})

test('a key in an inline <script> is not listed twice in the evidence', async () => {
  // The HTML page body and each inline script are both scanned, so one key appears as
  // "sk_liv…Q7w, sk_liv…Q7w" (looks like two leaked keys).
  const fn = fakeFetcher({
    'https://app.example.com/': { text: `<!doctype html><script>window.cfg={stripe:"${STRIPE_LIVE}"}</script>`, headers: ALL_HEADERS },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  const f = r.findings.find(x => x.id === 'secret-stripe-secret-live')
  assert.ok(f)
  const parts = (f!.evidence || '').split(', ')
  assert.equal(new Set(parts).size, parts.length, `duplicate evidence: ${f!.evidence}`)
})

test('isSensitiveTable does not escalate obviously public tables via substring matches', () => {
  // "lead" matches leaderboard, "card" matches flashcards/scorecards, "health" matches
  // health_checks (uptime pings). A readable leaderboard becomes a CRITICAL "personal data" finding.
  for (const name of ['leaderboard', 'leaderboards', 'flashcards', 'flashcard_decks', 'scorecards', 'health_checks'])
    assert.equal(isSensitiveTable(name), false, name)
  // Must keep catching the real ones.
  for (const name of ['leads', 'user_profiles', 'credit_cards', 'patients', 'orders']) assert.equal(isSensitiveTable(name), true, name)
})

test('an intentionally public catalog table is not graded as a HIGH risk', async () => {
  // A products table with RLS on and `create policy "public read" on products for select using (true)`
  // is the documented pattern for catalogs/blogs. HEAD+count cannot distinguish that from RLS-off,
  // so calling it HIGH ("readable by anyone on the internet") and grading the app "risky" is a
  // false alarm the prospect will push back on. It should be informational/medium with a "confirm
  // this is intended" framing, and reserve HIGH/CRITICAL for sensitive names.
  const fn = fakeFetcher({
    'https://shop.example.com/': { text: '<script type="module" src="/assets/index-1.js"></script>', headers: ALL_HEADERS },
    'https://shop.example.com/assets/index-1.js': { text: `const s=createClient("${SUPA}","${ANON}");s.from("products").select("*");s.from("categories").select("*")` },
    [`${SUPA}/auth/v1/settings`]: { text: JSON.stringify({ mailer_autoconfirm: false }) },
    [`${SUPA}/rest/v1/`]: { status: 401, text: '' },
    [`${SUPA}/rest/v1/products*`]: { status: 206, headers: new Headers({ 'content-range': '0-0/48' }) },
    [`${SUPA}/rest/v1/categories*`]: { status: 206, headers: new Headers({ 'content-range': '0-0/6' }) },
  })
  const r = await scanUrl('https://shop.example.com/', { fetcher: fn as never })
  const t = r.findings.find(f => f.id === 'supabase-tables-public')
  assert.ok(t)
  assert.notEqual(t!.severity, 'high', 'non-sensitive public catalog reported as HIGH')
  assert.equal(r.grade, 'ready', `grade ${r.grade} for a shop whose only finding is a public catalog`)
})

test('an exposed .env holding only VITE_ public values is not a CRITICAL "rotate every key"', async () => {
  // Lovable writes a .env with VITE_SUPABASE_PROJECT_ID / VITE_SUPABASE_PUBLISHABLE_KEY /
  // VITE_SUPABASE_URL; every one of those values is already inlined in the public bundle.
  // Serving the file is sloppy, but "critical, rotate every key" is wrong and costs 30 points.
  const pub = 'sb_' + 'publishable_' + 'Q7mZ2vLk9TnB4xWcR8pYsA_h3K9pQ2w'
  const fn = fakeFetcher({
    'https://app.example.com/': { text: '<!doctype html><div id="root"></div>', headers: ALL_HEADERS },
    'https://app.example.com/.env': {
      text: `VITE_SUPABASE_PROJECT_ID="${REF}"\nVITE_SUPABASE_PUBLISHABLE_KEY="${pub}"\nVITE_SUPABASE_URL="${SUPA}"\n`,
      headers: new Headers({ 'content-type': 'application/octet-stream' }),
    },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  const env = r.findings.find(f => f.id === 'env-file-exposed')
  assert.ok(env)
  assert.notEqual(env!.severity, 'critical', '.env with only browser-public VITE_ values reported as critical')
})
