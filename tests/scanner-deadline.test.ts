import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { safeFetch } from '../lib/scanner/net.ts'
import { scanUrl } from '../lib/scanner/scan.ts'

// scanUrl's `deadline` only gates the script loop and the Supabase probe. The exposed-file probes
// (/.env, /.git/config, 5 s each), the source-map probes (3 x 5 s, sequential) and the initial page fetch
// (10 s per hop, up to 5 hops) ignore it, so a slow target holds the function past maxDuration (30 s).

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))
function listen(handler: http.RequestListener): Promise<string> {
  return new Promise(res => {
    const s = http.createServer(handler).listen(0, '127.0.0.1', () => res(`http://127.0.0.1:${(s.address() as AddressInfo).port}`))
    servers.push(s)
  })
}

test('scanUrl finishes close to its deadline even when probes are slow', async () => {
  const app = await listen((req, res) => {
    if (req.url === '/') return res.writeHead(200, { 'content-type': 'text/html' }).end('<html></html>')
    setTimeout(() => res.writeHead(404).end(), 3000) // /.env and /.git/config answer slowly
  })
  const fetcher: typeof safeFetch = (u, o = {}) => safeFetch(u, { ...o, unsafeAllowPrivate: true })
  const deadlineMs = 1000
  const started = Date.now()
  await scanUrl(app + '/', { fetcher, deadlineMs })
  const elapsed = Date.now() - started
  assert.ok(elapsed < deadlineMs + 1000, `scan ran ${elapsed} ms with a ${deadlineMs} ms deadline`)
})

test('skipped checks are named in the notes when the deadline is too close', async () => {
  const app = await listen((req, res) => {
    if (req.url === '/') return res.writeHead(200, { 'content-type': 'text/html' }).end('<html></html>')
    setTimeout(() => res.writeHead(404).end(), 3000)
  })
  const fetcher: typeof safeFetch = (u, o = {}) => safeFetch(u, { ...o, unsafeAllowPrivate: true })
  const r = await scanUrl(app + '/', { fetcher, deadlineMs: 1000 })
  assert.ok(r.notes.some(n => /Skipped the exposed-file and source-map checks/.test(n)), r.notes.join(' / '))
})

test('slow exposed-file and source-map probes are cut off at the deadline', async () => {
  const app = await listen((req, res) => {
    if (req.url === '/') return res.writeHead(200, { 'content-type': 'text/html' }).end('<script src="/assets/index-1.js"></script>')
    setTimeout(() => res.writeHead(404).end(), 3000) // scripts, .map, /.env and /.git/config all answer slowly
  })
  const fetcher: typeof safeFetch = (u, o = {}) => safeFetch(u, { ...o, unsafeAllowPrivate: true })
  const deadlineMs = 2500
  const started = Date.now()
  await scanUrl(app + '/', { fetcher, deadlineMs })
  const elapsed = Date.now() - started
  assert.ok(elapsed < deadlineMs + 1000, `scan ran ${elapsed} ms with a ${deadlineMs} ms deadline`)
})

test('a slow redirect chain is bounded by the scan deadline, not 10 s per hop', async () => {
  let n = 0
  const app = await listen((_req, res) => {
    setTimeout(() => res.writeHead(302, { location: `/hop${++n}` }).end(), 900)
  })
  const fetcher: typeof safeFetch = (u, o = {}) => safeFetch(u, { ...o, unsafeAllowPrivate: true })
  const started = Date.now()
  await scanUrl(app + '/', { fetcher, deadlineMs: 1500 }).catch(() => null)
  const elapsed = Date.now() - started
  assert.ok(elapsed < 2500, `redirect chain held the scan for ${elapsed} ms`)
})

test('a page that trickles bytes is cut off by the time budget', async () => {
  const app = await listen((_req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    const t = setInterval(() => res.write('<p>.</p>'), 100)
    res.on('close', () => clearInterval(t))
  })
  const started = Date.now()
  await assert.rejects(safeFetch(app + '/', { timeoutMs: 1000, unsafeAllowPrivate: true }), /timed out/)
  const elapsed = Date.now() - started
  assert.ok(elapsed < 2000, `trickling body held the request for ${elapsed} ms`)
})
