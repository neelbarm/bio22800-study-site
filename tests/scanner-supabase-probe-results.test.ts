import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanUrl } from '../lib/scanner/scan.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// The scanner turns "I could not tell" into "you passed". Each case below is a response real
// Supabase returns, and each one currently produces a reassuring line in `passed`.

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const REF = 'abcdefghijklmnopqrst'
const ANON = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', ref: REF, role: 'anon' })}.${'s'.repeat(43)}`
const SUPA = `https://${REF}.supabase.co`
const ALL_HEADERS = new Headers({
  'strict-transport-security': 'max-age=63072000',
  'content-security-policy': "default-src 'self'; frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
})

type Spec = Partial<FetchResult> & { status?: number }
function fakeFetcher(routes: Record<string, Spec>) {
  const calls: { url: string; method?: string }[] = []
  const fn = async (url: string, opts: { method?: 'GET' | 'HEAD' } = {}): Promise<FetchResult> => {
    calls.push({ url, method: opts.method })
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('*') && url.startsWith(k.slice(0, -1))))
    const spec: Spec = key ? routes[key] : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers(), text, bytes: text.length, truncated: false }
  }
  return { fn, calls }
}

function site(js: string, supaRoutes: Record<string, Spec>) {
  return fakeFetcher({
    'https://app.example.com/': { text: '<!doctype html><script type="module" src="/assets/index-1.js"></script>', headers: ALL_HEADERS },
    'https://app.example.com/assets/index-1.js': { text: js },
    [`${SUPA}/rest/v1/`]: { status: 401, text: '{"message":"Access to schema is forbidden"}' },
    ...supaRoutes,
  })
}

test('401 "Invalid API key" on every table is not reported as "no tables return rows"', async () => {
  // Happens with a rotated/disabled legacy key (legacy keys can be disabled since 2025-07 and
  // projects restored after 2025-11-01 have none), a key from another project, or a gateway that
  // rejects the Authorization header. Nothing was learned, yet the report says the tables passed.
  const { fn } = site(`const s=createClient("${SUPA}","${ANON}");s.from("profiles").select();s.from("orders").select()`, {
    [`${SUPA}/rest/v1/profiles*`]: { status: 401, text: '' },
    [`${SUPA}/rest/v1/orders*`]: { status: 401, text: '' },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  const falsePass = r.passed.find(p => /tables checked return rows/.test(p))
  assert.equal(falsePass, undefined, `claimed a pass after every probe was rejected: "${falsePass}"`)
})

test('statement timeout (500, 57014) on a large table is not counted as protected', async () => {
  // Supabase sets statement_timeout=3s for the anon role; count=exact on a big table with RLS off
  // can hit it. PostgREST answers 500 {"code":"57014"}. The table is very likely public.
  const { fn } = site(`const s=createClient("${SUPA}","${ANON}");s.from("messages").select()`, {
    [`${SUPA}/rest/v1/messages*`]: { status: 500, text: '' },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  const falsePass = r.passed.find(p => /tables checked return rows/.test(p))
  assert.equal(falsePass, undefined, `claimed messages is protected although the probe failed: "${falsePass}"`)
})

test('auth settings: no "email confirmation is required" pass when confirmation is actually off', async () => {
  // Field names verified against supabase/auth internal/api/settings.go (disable_signup,
  // mailer_autoconfirm, external.email, external.anonymous_users). When signups are disabled
  // the autoconfirm risk is moot, but the scanner still asserts confirmation is required.
  const { fn } = site(`const s=createClient("${SUPA}","${ANON}")`, {
    [`${SUPA}/auth/v1/settings`]: { text: JSON.stringify({ external: { email: true }, disable_signup: true, mailer_autoconfirm: true }) },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(!r.passed.includes('Email confirmation is required for new accounts'), `false statement in passed: ${r.passed.join(' / ')}`)
})

test('tables reached only through .rpc() are surfaced, not reported as "no table names found"', async () => {
  // Lovable/Bolt apps frequently read data through SECURITY DEFINER functions
  // (supabase.rpc("get_all_users")) which bypass RLS. The scan has no write-safe way to call
  // them, but it should tell the owner which functions it saw instead of implying nothing to test.
  const { fn } = site(`const s=createClient("${SUPA}","${ANON}");s.rpc("get_all_users_with_emails");s.rpc("admin_list_orders",{p:1})`, {
    [`${SUPA}/auth/v1/settings`]: { text: JSON.stringify({ mailer_autoconfirm: false }) },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  const text = JSON.stringify({ findings: r.findings, notes: r.notes })
  assert.match(text, /get_all_users_with_emails/, `RPC functions not mentioned; notes: ${r.notes.join(' / ')}`)
})

const JS = (tables: string[], extra = '') => `const s=createClient("${SUPA}","${ANON}");${tables.map(t => `s.from("${t}").select()`).join(';')}${extra}`

test('200 with a zero count is a verified pass', async () => {
  const { fn } = site(JS(['notes_public', 'items']), {
    [`${SUPA}/rest/v1/notes_public*`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
    [`${SUPA}/rest/v1/items*`]: { status: 206, headers: new Headers({ 'content-range': '0-0/0' }) },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(r.passed.includes('None of the 2 tables checked return rows to anonymous visitors'), r.passed.join(' / '))
})

test('a protected table plus a failing one gives no pass and a note naming the failing table', async () => {
  const { fn } = site(JS(['profiles', 'messages']), {
    [`${SUPA}/rest/v1/profiles*`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
    [`${SUPA}/rest/v1/messages*`]: { status: 500, text: '' },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(!r.passed.some(p => /tables checked return rows/.test(p)))
  assert.ok(r.notes.some(n => /Could not verify messages/.test(n)), r.notes.join(' / '))
})

test('a fetcher that throws on table probes gives no pass', async () => {
  const { fn } = site(JS(['profiles']), {})
  const throwing = async (url: string, o?: object) => {
    if (url.includes('/rest/v1/profiles')) throw new Error('Request timed out.')
    return fn(url, o as never)
  }
  const r = await scanUrl('https://app.example.com/', { fetcher: throwing as never })
  assert.ok(!r.passed.some(p => /tables checked return rows/.test(p)), r.passed.join(' / '))
})

test('a 404 table is left out of the count', async () => {
  const { fn } = site(JS(['profiles', 'old_table']), {
    [`${SUPA}/rest/v1/profiles*`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
    [`${SUPA}/rest/v1/old_table*`]: { status: 404, text: '' },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(r.passed.includes('None of the 1 tables checked return rows to anonymous visitors'), r.passed.join(' / '))
})

test('a 500 followed by a planned-count retry with rows reports the table as public', async () => {
  const { fn, calls } = site(JS(['messages']), {})
  const withRetry = async (url: string, o: { method?: 'GET' | 'HEAD'; headers?: Record<string, string> } = {}) => {
    if (url.startsWith(`${SUPA}/rest/v1/messages`)) {
      calls.push({ url, method: o.method })
      if (o.headers?.prefer === 'count=planned') return { status: 206, url, headers: new Headers({ 'content-range': '0-0/1200' }), text: '', bytes: 0, truncated: false }
      return { status: 500, url, headers: new Headers(), text: '', bytes: 0, truncated: false }
    }
    return fn(url, o)
  }
  const r = await scanUrl('https://app.example.com/', { fetcher: withRetry as never })
  const f = r.findings.find(x => x.id === 'supabase-tables-public')
  assert.ok(f, r.findings.map(x => x.id).join(','))
  assert.match(f!.detail, /messages \(about 1,200 rows, estimated\)/)
})

test('a 401 with PostgREST code 42501 (grants revoked) counts as protected', async () => {
  const { fn } = site(JS(['profiles']), {
    [`${SUPA}/rest/v1/profiles?select=*&limit=0`]: { status: 401, text: '{"code":"42501","message":"permission denied for table profiles"}' },
    [`${SUPA}/rest/v1/profiles*`]: { status: 401, text: '' },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(r.passed.includes('None of the 1 tables checked return rows to anonymous visitors'), `${r.passed.join(' / ')} | ${r.notes.join(' / ')}`)
})

test('a key the project rejects on auth settings gives a note and no pass', async () => {
  const { fn } = site(JS(['profiles']), {
    [`${SUPA}/auth/v1/settings`]: { status: 401, text: '{"message":"Invalid API key"}' },
    [`${SUPA}/rest/v1/profiles*`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(!r.passed.some(p => /tables checked return rows/.test(p)))
  assert.ok(r.notes.some(n => /was rejected by/.test(n)), r.notes.join(' / '))
})

// ACC-13: auth settings.
const settingsCase = async (settings: object) => {
  const { fn } = site(JS([]), { [`${SUPA}/auth/v1/settings`]: { text: JSON.stringify(settings) } })
  return scanUrl('https://app.example.com/', { fetcher: fn as never })
}

test('auth settings: sign-ups disabled is reported as such, with no autoconfirm finding', async () => {
  const r = await settingsCase({ disable_signup: true, mailer_autoconfirm: true, external: { email: true } })
  assert.ok(r.passed.includes('Public sign-ups are disabled'))
  assert.ok(!r.findings.some(f => f.id === 'supabase-autoconfirm'))
})

test('auth settings: email provider off means no email finding and no email pass', async () => {
  const r = await settingsCase({ disable_signup: false, mailer_autoconfirm: true, external: { email: false } })
  assert.ok(!r.findings.some(f => f.id === 'supabase-autoconfirm'))
  assert.ok(!r.passed.includes('Email confirmation is required for new accounts'))
})

test('auth settings: anonymous sign-ins are reported when sign-ups are open', async () => {
  const r = await settingsCase({ disable_signup: false, mailer_autoconfirm: false, external: { email: true, anonymous_users: true } })
  assert.ok(r.findings.some(f => f.id === 'supabase-anonymous-signins' && f.severity === 'low'))
  assert.ok(r.passed.includes('Email confirmation is required for new accounts'))
})

test('auth settings: anonymous sign-ins are not reported when sign-ups are disabled', async () => {
  const r = await settingsCase({ disable_signup: true, external: { email: true, anonymous_users: true } })
  assert.ok(!r.findings.some(f => f.id === 'supabase-anonymous-signins'))
})

// ACC-14: database functions.
test('rpcFromCode finds literal function names, dedupes and respects the limit', async () => {
  const { rpcFromCode } = await import('../lib/scanner/analyze.ts')
  assert.deepEqual(rpcFromCode('s.rpc("a",{p:1});t.rpc(\'b\');u.rpc(`c`);v.rpc(name);w.rpc("a")'), ['a', 'b', 'c'])
  assert.deepEqual(rpcFromCode('x.rpc("a");x.rpc("b");x.rpc("c")', 2), ['a', 'b'])
})

test('RPC names are listed alongside table results and are never called', async () => {
  const { fn, calls } = site(JS(['profiles'], ';s.rpc("get_stats")'), {
    [`${SUPA}/rest/v1/profiles*`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
  })
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(r.notes.some(n => n.includes('get_stats')), r.notes.join(' / '))
  assert.ok(!calls.some(c => c.url.includes('/rest/v1/rpc/')), calls.map(c => c.url).join(' | '))
})
