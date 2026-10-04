import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanUrl } from '../lib/scanner/scan.ts'
import { rpcFromOpenApi, tablesFromOpenApi } from '../lib/scanner/analyze.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// Since April 2025 hosted Supabase answers GET /rest/v1/ with 401/403 for public keys. A 200 listing now
// means an older self-hosted PostgREST or a proxy is publishing every table and column: a low finding.
// A refused listing is normal and must not produce one.

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const REF = 'abcdefghijklmnopqrst'
const SUPA = `https://${REF}.supabase.co`
const ANON = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', ref: REF, role: 'anon' })}.${'s'.repeat(43)}`
const LISTING = { paths: { '/': {}, '/profiles': {}, '/invoices': {}, '/rpc/grant_admin': {}, '/rpc/get_stats': {} } }

function run(listing: Partial<FetchResult>) {
  const routes: Record<string, Partial<FetchResult>> = {
    'https://app.example.com/': { text: '<script type="module" src="/assets/index-1.js"></script>' },
    'https://app.example.com/assets/index-1.js': { text: `const s=createClient("${SUPA}","${ANON}")` },
    [`${SUPA}/auth/v1/settings`]: { text: JSON.stringify({ external: { email: true }, mailer_autoconfirm: false }) },
    [`${SUPA}/rest/v1/`]: listing,
    [`${SUPA}/rest/v1/profiles?`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
    [`${SUPA}/rest/v1/invoices?`]: { status: 200, headers: new Headers({ 'content-range': '*/0' }) },
  }
  const calls: string[] = []
  const fn = async (url: string): Promise<FetchResult> => {
    calls.push(url)
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('?') && url.startsWith(k)))
    const spec = key ? routes[key] : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers(), text, bytes: text.length, truncated: false }
  }
  return { scan: scanUrl('https://app.example.com/', { fetcher: fn as never }), calls }
}

test('a 200 listing with tables adds the low supabase-schema-public finding and feeds the table checks', async () => {
  const { scan, calls } = run({ status: 200, text: JSON.stringify(LISTING) })
  const r = await scan
  const f = r.findings.find(x => x.id === 'supabase-schema-public')
  assert.ok(f, r.findings.map(x => x.id).join(','))
  assert.equal(f!.severity, 'low')
  assert.equal(f!.where, `${REF}.supabase.co/rest/v1/`)
  assert.ok(calls.some(u => u.startsWith(`${SUPA}/rest/v1/invoices?`)), 'listed table was not checked')
})

test('RPCs from the listing are reported as functions callable from the browser', async () => {
  const r = await run({ status: 200, text: JSON.stringify(LISTING) }).scan
  const note = r.notes.find(n => /database functions directly from the browser/.test(n))
  assert.ok(note && note.includes('grant_admin') && note.includes('get_stats'), r.notes.join(' / '))
})

for (const status of [401, 403]) {
  test(`a ${status} listing (hosted Supabase today) gives no schema finding`, async () => {
    const r = await run({ status, text: '{"message":"Access to schema is forbidden"}' }).scan
    assert.ok(!r.findings.some(x => x.id === 'supabase-schema-public'), r.findings.map(x => x.id).join(','))
  })
}

test('a 200 listing with no tables gives no schema finding', async () => {
  const r = await run({ status: 200, text: JSON.stringify({ paths: { '/': {} } }) }).scan
  assert.ok(!r.findings.some(x => x.id === 'supabase-schema-public'))
})

test('rpcFromOpenApi and tablesFromOpenApi split a listing into functions and tables', () => {
  assert.deepEqual(rpcFromOpenApi(LISTING).sort(), ['get_stats', 'grant_admin'])
  assert.deepEqual(tablesFromOpenApi(LISTING).sort(), ['invoices', 'profiles'])
})
