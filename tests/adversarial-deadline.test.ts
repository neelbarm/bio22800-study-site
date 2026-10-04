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
