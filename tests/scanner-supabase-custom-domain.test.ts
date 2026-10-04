import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanUrl } from '../lib/scanner/scan.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// Custom-domain and vanity Supabase APIs are real (supabase.com/docs/guides/platform/custom-domains), but an
// origin next to a key is only a guess. It may be probed only when it belongs to the scanned site and only
// after it answers like Supabase Auth; a third-party origin planted next to a key must never be contacted.
// Keys are assembled at runtime.

const PUB = 'sb_' + 'publishable_' + 'Q7mZ2vLk9TnB4xWcR8pYsA_' + 'h3K9pQ2w'
const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const FORGED_ANON = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', role: 'anon' })}.${'s'.repeat(43)}`

type Spec = Partial<FetchResult> & { status?: number }
function fakeFetcher(routes: Record<string, Spec>) {
  const calls: string[] = []
  const fn = async (url: string): Promise<FetchResult> => {
    calls.push(url)
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('*') && url.startsWith(k.slice(0, -1))))
    const spec: Spec = key ? routes[key] : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers(), text, bytes: text.length, truncated: false }
  }
  return { fn, calls }
}

const gotrue = { text: JSON.stringify({ external: { email: true }, disable_signup: false, mailer_autoconfirm: false }) }
const readableProfiles = { status: 206, headers: new Headers({ 'content-range': '0-0/4210' }) }

function app(origin: string, js: string, extra: Record<string, Spec> = {}) {
  return fakeFetcher({
    [`${origin}/`]: { text: '<!doctype html><script type="module" src="/assets/index-1.js"></script>' },
    [`${origin}/assets/index-1.js`]: { text: js },
    ...extra,
  })
}

test('a publishable key next to a third-party https literal never causes a request to that host', async () => {
  const victim = 'https://victim.other-company.com'
  const { fn, calls } = app('https://shop.example.com', `const sb=createClient("${victim}","${PUB}");sb.from("profiles").select("*")`, {
    [`${victim}/auth/v1/settings`]: gotrue,
    [`${victim}/rest/v1/profiles*`]: readableProfiles,
  })
  const r = await scanUrl('https://shop.example.com/', { fetcher: fn as never })
  assert.deepEqual(calls.filter(u => u.startsWith(victim)), [])
  assert.ok(!r.findings.some(f => f.id === 'supabase-tables-public'))
  assert.ok(r.notes.some(n => n.includes('victim.other-company.com') && /not contacted/.test(n)), r.notes.join(' / '))
})

test('a forged no-ref anon JWT near a third-party literal never causes a request to that host', async () => {
  const victim = 'https://api.unrelated.example'
  const { fn, calls } = app('https://shop.example.com', `const u="${victim}";const k="${FORGED_ANON}";createClient(u,k).from("orders").select()`, {
    [`${victim}/auth/v1/settings`]: gotrue,
  })
  await scanUrl('https://shop.example.com/', { fetcher: fn as never })
  assert.deepEqual(calls.filter(u => u.startsWith(victim)), [])
})

test('a same-site custom domain (api.<site>) is still probed and reported', async () => {
  const api = 'https://api.shop.example.com'
  const { fn } = app('https://shop.example.com', `const sb=createClient("${api}","${PUB}");sb.from("profiles").select("*")`, {
    [`${api}/auth/v1/settings`]: gotrue,
    [`${api}/rest/v1/profiles*`]: readableProfiles,
  })
  const r = await scanUrl('https://shop.example.com/', { fetcher: fn as never })
  assert.ok(r.findings.some(f => f.id === 'supabase-tables-public'), r.findings.map(f => f.id).join(','))
  assert.ok(r.backend.includes('Supabase'))
})

for (const [label, settings] of [
  ['an HTML page', { status: 200, text: '<!doctype html><html>app shell</html>' }],
  ['a 404', { status: 404, text: 'not found' }],
  ['JSON that is not GoTrue', { status: 200, text: '{"ok":true}' }],
] as [string, Spec][]) {
  test(`a same-site origin whose /auth/v1/settings is ${label} gets no table probes`, async () => {
    const api = 'https://db.shop.example.com'
    const { fn, calls } = app('https://shop.example.com', `const sb=createClient("${api}","${PUB}");sb.from("profiles").select("*")`, {
      [`${api}/auth/v1/settings`]: settings,
      [`${api}/rest/v1/profiles*`]: readableProfiles,
    })
    const r = await scanUrl('https://shop.example.com/', { fetcher: fn as never })
    assert.deepEqual(calls.filter(u => u.startsWith(`${api}/rest/`)), [])
    assert.ok(r.notes.some(n => n.includes('db.shop.example.com') && /could not confirm it is a Supabase API/.test(n)), r.notes.join(' / '))
  })
}

test('a vanity subdomain (not a 20-character ref) with a publishable key is detected and probed', async () => {
  const vanity = 'https://myapp.supabase.co'
  const { fn, calls } = app('https://myapp.example.com', `const sb=createClient("${vanity}","${PUB}");sb.from("profiles").select("*")`, {
    [`${vanity}/auth/v1/settings`]: gotrue,
    [`${vanity}/rest/v1/`]: { status: 401, text: '{"message":"Access to schema is forbidden"}' },
    [`${vanity}/rest/v1/profiles*`]: readableProfiles,
  })
  const r = await scanUrl('https://myapp.example.com/', { fetcher: fn as never })
  assert.ok(calls.some(u => u.startsWith(`${vanity}/rest/v1/profiles`)), calls.join(' | '))
  assert.ok(r.findings.some(f => f.id === 'supabase-tables-public'), r.findings.map(f => f.id).join(','))
  assert.ok(r.backend.includes('Supabase'))
})
