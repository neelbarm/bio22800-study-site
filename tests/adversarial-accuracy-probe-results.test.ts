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
