import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { findSupabase } from '../lib/scanner/analyze.ts'
import { safeFetch } from '../lib/scanner/net.ts'
import { scanUrl } from '../lib/scanner/scan.ts'

// SR-3: the `ref` claim of an (unverified) JWT on the scanned page must not decide where the Supabase probe
// sends requests. Only a real 20-character project ref may become a probe target.

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const forged = (ref: string, role = 'anon') => `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', ref, role })}.${'s'.repeat(43)}`

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))
function listen(handler: http.RequestListener): Promise<string> {
  return new Promise(res => {
    const s = http.createServer(handler).listen(0, '127.0.0.1', () => res(`http://127.0.0.1:${(s.address() as AddressInfo).port}`))
    servers.push(s)
  })
}

test('findSupabase never builds a probe URL outside *.supabase.co from a forged ref', () => {
  for (const ref of ['victim.example/path?', 'victim.example#', '127.0.0.1:8080/x?', 'ABCDEFGHIJKLMNOPQRST']) {
    const refs = findSupabase(`const k="${forged(ref)}"`, 'a.js')
    for (const r of refs) if (r.url) assert.match(new URL(r.url).hostname, /\.supabase\.co$/, `${ref} -> ${r.url}`)
    // The key itself is still recorded (leak detection keeps working).
    assert.equal(refs.flatMap(r => r.keys).length, 1)
  }
})

test('a forged service_role JWT with a bad ref is still reported as leaked', async () => {
  const fn = async (url: string): Promise<{ status: number; url: string; headers: Headers; text: string; bytes: number; truncated: boolean }> => {
    const text = url === 'https://app.example.com/' ? `<script>window.k="${forged('victim.example#', 'service_role')}"</script>` : ''
    return { status: url === 'https://app.example.com/' ? 200 : 404, url, headers: new Headers(), text, bytes: text.length, truncated: false }
  }
  const r = await scanUrl('https://app.example.com/', { fetcher: fn as never })
  assert.ok(r.findings.some(f => f.id === 'supabase-service-key-exposed'))
})

test('a full scan sends no requests to a host named in a forged ref', async () => {
  let victimHits = 0
  const victim = await listen((_q, res) => {
    victimHits++
    res.writeHead(200, { 'content-type': 'application/json' }).end('{}')
  })
  const port = new URL(victim).port
  const app = await listen((req, res) => {
    if (req.url === '/') {
      const keys = ['victim.test/path?', 'victim.test#', `127.0.0.1:${port}/x?`].map(r => `"${forged(r)}"`).join(',')
      return res.writeHead(200, { 'content-type': 'text/html' }).end(`<script>window.keys=[${keys}]</script>`)
    }
    res.writeHead(404).end()
  })
  // Anything aimed at https://victim.test (or the victim port) is routed to the local victim server.
  const fetcher: typeof safeFetch = (u, o = {}) => safeFetch(u.replace(/^https:\/\/victim\.test/, victim), { ...o, unsafeAllowPrivate: true })
  await scanUrl(app + '/', { fetcher })
  assert.equal(victimHits, 0)
})
