import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { safeFetch } from '../lib/scanner/net.ts'
import { scanUrl } from '../lib/scanner/scan.ts'

// Real HTTP round trip against local servers: a vulnerable Vite-style app and a mock Supabase API.
const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const REF = 'zyxwvutsrqponmlkjihg'
const ANON = `${b64({ alg: 'HS256' })}.${b64({ iss: 'supabase', ref: REF, role: 'anon' })}.${'a'.repeat(43)}`

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))
function listen(handler: http.RequestListener): Promise<string> {
  return new Promise(res => {
    const s = http.createServer(handler).listen(0, '127.0.0.1', () => res(`http://127.0.0.1:${(s.address() as AddressInfo).port}`))
    servers.push(s)
  })
}

test('scan over real HTTP with redirects, chunks, HEAD counts and size caps', async () => {
  const seen: { method: string; url: string; headers: http.IncomingHttpHeaders }[] = []
  const supa = await listen((req, res) => {
    seen.push({ method: req.method!, url: req.url!, headers: req.headers })
    if (req.headers.apikey !== ANON) return res.writeHead(401).end()
    if (req.url === '/auth/v1/settings') return res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ mailer_autoconfirm: false }))
    if (req.url === '/rest/v1/') return res.writeHead(200).end(JSON.stringify({ paths: { '/': {}, '/messages': {}, '/countries': {}, '/rpc/x': {} } }))
    if (req.url!.startsWith('/rest/v1/messages')) return res.writeHead(206, { 'content-range': '0-0/77' }).end(req.method === 'HEAD' ? undefined : '[{"secret":"row"}]')
    if (req.url!.startsWith('/rest/v1/countries')) return res.writeHead(200, { 'content-range': '*/0' }).end()
    res.writeHead(404).end()
  })
  const app = await listen((req, res) => {
    if (req.url === '/') return res.writeHead(301, { location: '/app/' }).end()
    if (req.url === '/app/') return res.writeHead(200, { 'content-type': 'text/html' }).end('<html><script type="module" src="/assets/index-1.js"></script></html>')
    if (req.url === '/assets/index-1.js') return res.writeHead(200).end(`const c=createClient("https://${REF}.supabase.co","${ANON}");import("./Big-2.js")`)
    if (req.url === '/assets/Big-2.js') return res.writeHead(200).end('x'.repeat(6_000_000) + 'sk_live_' + 'Z'.repeat(30))
    if (req.url === '/.env') return res.writeHead(200, { 'content-type': 'text/html' }).end('<!doctype html><html></html>')
    res.writeHead(404).end()
  })
  const fetcher: typeof safeFetch = (u, o = {}) =>
    safeFetch(u.replace(`https://${REF}.supabase.co`, supa), { ...o, unsafeAllowPrivate: true })
  const r = await scanUrl(app + '/', { fetcher })
  assert.equal(r.finalUrl, app + '/app/')
  const ids = r.findings.map(f => f.id)
  assert.ok(ids.includes('supabase-tables-public'), ids.join())
  assert.ok(ids.includes('no-https'))
  const t = r.findings.find(f => f.id === 'supabase-tables-public')!
  assert.equal(t.severity, 'critical') // "messages" is sensitive
  assert.match(t.detail, /messages \(77 rows\)/)
  assert.doesNotMatch(t.detail, /countries/)
  // The 5MB cap truncated the giant chunk before the key at its end.
  assert.ok(!ids.includes('secret-stripe-secret-live'))
  // Table checks were HEAD requests only.
  const tableReqs = seen.filter(x => /\/rest\/v1\/\w/.test(x.url))
  assert.ok(tableReqs.length === 2 && tableReqs.every(x => x.method === 'HEAD'))
  assert.ok(r.passed.some(p => /Email confirmation/.test(p)))
})

test('safeFetch blocks private targets without the test flag', async () => {
  const app = await listen((_, res) => res.end('ok'))
  await assert.rejects(() => safeFetch(app), /public|ports/)
})

test('cloud metadata address is always blocked', async () => {
  await assert.rejects(() => safeFetch('http://169.254.169.254/latest/meta-data'), /public/)
  await assert.rejects(() => safeFetch('http://[::ffff:169.254.169.254]/'), /public|ports/)
})
