import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  extractScripts,
  extractChunkUrls,
  findSecrets,
  findSupabase,
  scoreFindings,
  tablesFromOpenApi,
  countFromContentRange,
  checkHeaders,
  sameSite,
} from '../lib/scanner/analyze.ts'
import { isPrivateAddress, assertPublicUrl } from '../lib/scanner/net.ts'
import { scanUrl } from '../lib/scanner/scan.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const jwt = (payload: object) => `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64(payload)}.${'s'.repeat(43)}`
const REF = 'abcdefghijklmnopqrst'
const ANON = jwt({ iss: 'supabase', ref: REF, role: 'anon', iat: 1700000000, exp: 2000000000 })
const SERVICE = jwt({ iss: 'supabase', ref: REF, role: 'service_role', iat: 1700000000, exp: 2000000000 })
const STRIPE_LIVE = 'sk_live_' + '51Habc' + 'Q'.repeat(30)

test('private address detection', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0', '::1', 'fd00::1', 'fe80::1', '::ffff:127.0.0.1', '224.0.0.1'])
    assert.equal(isPrivateAddress(ip), true, ip)
  for (const ip of ['8.8.8.8', '76.76.21.21', '2606:4700::1111']) assert.equal(isPrivateAddress(ip), false, ip)
})

test('assertPublicUrl rejects unsafe targets', async () => {
  for (const u of ['http://localhost:3000', 'http://127.0.0.1', 'http://169.254.169.254/latest/meta-data', 'ftp://example.com', 'https://user:pw@example.com', 'https://example.com:8080', 'http://[::1]/', 'https://foo.internal', 'not a url'])
    await assert.rejects(() => assertPublicUrl(u), u)
})

test('extractScripts keeps same-site scripts and inline bodies', () => {
  const html = `<html><head><script type="module" crossorigin src="/assets/index-AbC123.js"></script>
  <link rel="modulepreload" href="/assets/vendor-x.js"><script src="https://cdn.gpteng.co/gptengineer.js"></script>
  <script>window.cfg={a:1}</script></head></html>`
  const r = extractScripts(html, 'https://myapp.lovable.app/')
  assert.deepEqual(r.urls.sort(), ['https://myapp.lovable.app/assets/index-AbC123.js', 'https://myapp.lovable.app/assets/vendor-x.js'])
  assert.equal(r.inline.length, 1)
})

test('sameSite does not treat shared hosting roots as one site', () => {
  assert.equal(sameSite('a.example.com', 'b.example.com'), true)
  assert.equal(sameSite('a.vercel.app', 'b.vercel.app'), false)
})

test('extractChunkUrls finds Vite chunks', () => {
  const js = `import("./Dashboard-9f8e.js");const d=["assets/chart-1.js","/_next/static/chunks/app-2.js"]`
  const r = extractChunkUrls(js, 'https://x.com/assets/index-1.js')
  assert.ok(r.includes('https://x.com/assets/Dashboard-9f8e.js'), r.join())
  assert.ok(r.includes('https://x.com/assets/chart-1.js'), r.join())
  assert.ok(r.includes('https://x.com/_next/static/chunks/app-2.js'), r.join())
})

test('findSecrets detects and masks, skips placeholders', () => {
  const hits = findSecrets(`const k="${STRIPE_LIVE}"; const p="${'sk_' + 'live_' + 'X'.repeat(24)}"`, 'bundle.js')
  assert.equal(hits.length, 1)
  assert.equal(hits[0].patternId, 'stripe-secret-live')
  assert.ok(!hits[0].masked.includes(STRIPE_LIVE.slice(8, 30)))
  assert.match(hits[0].masked, /^sk_liv…/)
})

test('findSupabase classifies anon vs service_role keys', () => {
  const refs = findSupabase(`createClient("https://${REF}.supabase.co","${ANON}");const admin="${SERVICE}"`, 'a.js')
  assert.equal(refs.length, 1)
  assert.equal(refs[0].url, `https://${REF}.supabase.co`)
  assert.deepEqual(refs[0].keys.map(k => k.kind).sort(), ['anon', 'service_role'])
})

test('findSupabase ignores non-supabase JWTs', () => {
  const refs = findSupabase(jwt({ iss: 'other', role: 'service_role', sub: '1234567890' }), 'a.js')
  assert.equal(refs.length, 0)
})

test('helpers', () => {
  assert.deepEqual(tablesFromOpenApi({ paths: { '/': {}, '/profiles': {}, '/rpc/do_thing': {}, '/orders': {} } }), ['profiles', 'orders'])
  assert.equal(countFromContentRange('0-0/123'), 123)
  assert.equal(countFromContentRange('*/0'), 0)
  assert.equal(countFromContentRange('0-0/*'), null)
  assert.equal(scoreFindings([]).grade, 'ready')
  assert.equal(scoreFindings([{ id: 'x', severity: 'critical', title: '', detail: '', fix: '' }]).grade, 'not-ready')
  const h = checkHeaders(new Headers({ 'strict-transport-security': 'max-age=1' }), true)
  assert.equal(h.finding?.severity, 'low')
})

function fakeFetcher(routes: Record<string, Partial<FetchResult> | ((init: { method?: string; headers?: Record<string, string> }) => Partial<FetchResult>)>) {
  const calls: { url: string; method?: string; headers?: Record<string, string> }[] = []
  const fn = async (url: string, opts: { method?: 'GET' | 'HEAD'; headers?: Record<string, string> } = {}): Promise<FetchResult> => {
    calls.push({ url, method: opts.method, headers: opts.headers })
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('*') && url.startsWith(k.slice(0, -1))))
    const spec = key ? (typeof routes[key] === 'function' ? (routes[key] as Function)(opts) : routes[key]) : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers(), text, bytes: text.length, truncated: false }
  }
  return { fn, calls }
}

test('scanUrl end to end on a vulnerable Lovable-style app (fake network)', async () => {
  const site = 'https://demo-app.lovable.app/'
  const supa = `https://${REF}.supabase.co`
  const { fn, calls } = fakeFetcher({
    [site]: { text: `<!doctype html><script type="module" src="/assets/index-a1.js"></script>`, headers: new Headers({ 'content-type': 'text/html' }) },
    'https://demo-app.lovable.app/assets/index-a1.js': {
      text: `const s=createClient("${supa}","${ANON}");const stripe="${STRIPE_LIVE}";import("./Admin-b2.js")\n//# sourceMappingURL=index-a1.js.map`,
    },
    'https://demo-app.lovable.app/assets/Admin-b2.js': { text: `const admin="${SERVICE}"` },
    'https://demo-app.lovable.app/assets/index-a1.js.map': { text: '{"version":3,"sources":["src/App.tsx"],"mappings":"AAAA"}' },
    'https://demo-app.lovable.app/.env': { text: 'VITE_SUPABASE_URL=x\nSTRIPE_SECRET=y' },
    [`${supa}/auth/v1/settings`]: { text: JSON.stringify({ mailer_autoconfirm: true, disable_signup: false }) },
    [`${supa}/rest/v1/`]: { text: JSON.stringify({ paths: { '/': {}, '/profiles': {}, '/products': {}, '/empty_table': {} } }) },
    [`${supa}/rest/v1/profiles*`]: { status: 206, headers: new Headers({ 'content-range': '0-0/1342' }) },
    [`${supa}/rest/v1/products*`]: { status: 200, headers: new Headers({ 'content-range': '0-0/12' }) },
    [`${supa}/rest/v1/empty_table*`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  const ids = r.findings.map(f => f.id)
  for (const id of ['supabase-service-key-exposed', 'secret-stripe-secret-live', 'env-file-exposed', 'supabase-tables-public', 'supabase-autoconfirm', 'source-maps-public', 'missing-security-headers'])
    assert.ok(ids.includes(id), `expected ${id}, got ${ids.join(',')}`)
  const tables = r.findings.find(f => f.id === 'supabase-tables-public')!
  assert.equal(tables.severity, 'critical')
  assert.match(tables.detail, /profiles \(1,342 rows\)/)
  assert.doesNotMatch(tables.detail, /empty_table/)
  assert.equal(r.grade, 'not-ready')
  assert.equal(r.score, 0)
  assert.ok(r.platform.includes('Lovable'))
  assert.ok(r.backend.includes('Supabase'))
  // Never leaks a full secret in the result.
  const json = JSON.stringify(r)
  for (const s of [STRIPE_LIVE, SERVICE, ANON]) assert.ok(!json.includes(s), 'full secret leaked into result')
  // Table checks are HEAD-only with count, never GET row data.
  const tableCalls = calls.filter(c => /\/rest\/v1\/[a-z]/.test(c.url))
  assert.ok(tableCalls.length >= 3 && tableCalls.every(c => c.method === 'HEAD'))
})

test('scanUrl on a clean app gives a good grade', async () => {
  const site = 'https://clean.example.com/'
  const { fn } = fakeFetcher({
    [site]: {
      text: '<script src="/assets/index-z.js"></script>',
      headers: new Headers({
        'strict-transport-security': 'max-age=63072000',
        'content-security-policy': "default-src 'self'; frame-ancestors 'none'",
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'strict-origin-when-cross-origin',
      }),
    },
    'https://clean.example.com/assets/index-z.js': { text: 'console.log("hello")' },
    'https://clean.example.com/.env': { status: 200, text: '<!doctype html><html>SPA fallback</html>' },
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  assert.equal(r.findings.length, 0, JSON.stringify(r.findings))
  assert.equal(r.grade, 'ready')
  assert.equal(r.score, 100)
})

test('tablesFromCode finds supabase-js tables and skips storage buckets', async () => {
  const { tablesFromCode } = await import('../lib/scanner/analyze.ts')
  const js = `a.from("profiles").select("*");b.from('orders').insert(x);c.storage.from("avatars").upload(f);Array.from(set);d.from(\`todo_items\`)`
  assert.deepEqual(tablesFromCode(js).sort(), ['orders', 'profiles', 'todo_items'])
})

test('table exposure is tested from code-discovered names even when the API hides its listing', async () => {
  const site = 'https://hidden.example.com/'
  const supa = `https://${REF}.supabase.co`
  const { fn } = fakeFetcher({
    [site]: { text: '<script src="/assets/index-q.js"></script>' },
    'https://hidden.example.com/assets/index-q.js': { text: `const s=createClient("${supa}","${ANON}");s.from("customers").select("*")` },
    [`${supa}/rest/v1/`]: { status: 401, text: '{"message":"no"}' },
    [`${supa}/rest/v1/customers*`]: { status: 206, headers: new Headers({ 'content-range': '0-0/58' }) },
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  const t = r.findings.find(f => f.id === 'supabase-tables-public')
  assert.ok(t, JSON.stringify(r.findings.map(f => f.id)))
  assert.match(t!.detail, /customers \(58 rows\)/)
})

test('admin auth: disabled without a strong password, 401 without credentials, allows correct password', async () => {
  const { requireAdmin } = await import('../lib/adminauth.ts')
  const req = (auth?: string) => new Request('https://x/admin/leads', { headers: auth ? { authorization: auth } : {} })
  const prev = process.env.ADMIN_PASSWORD
  delete process.env.ADMIN_PASSWORD
  assert.equal(requireAdmin(req())?.status, 503)
  process.env.ADMIN_PASSWORD = 'correct horse battery'
  assert.equal(requireAdmin(req())?.status, 401)
  assert.equal(requireAdmin(req('Basic ' + Buffer.from('a:wrong password!!').toString('base64')))?.status, 401)
  assert.equal(requireAdmin(req('Basic ' + Buffer.from('anyone:correct horse battery').toString('base64'))), null)
  if (prev === undefined) delete process.env.ADMIN_PASSWORD
  else process.env.ADMIN_PASSWORD = prev
})
