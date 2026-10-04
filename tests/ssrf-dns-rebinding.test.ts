import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import dns from 'node:dns'
import { syncBuiltinESMExports } from 'node:module'

// DNS rebinding / TOCTOU: assertPublicUrl() resolves the hostname with dns/promises.lookup and checks the
// addresses, then fetch() resolves the same hostname AGAIN on its own and connects to whatever it gets.
// An attacker DNS server that answers "public IP" for the first query and "127.0.0.1 / 169.254.169.254 /
// 10.x" for the second gets the scanner to talk to internal addresses.
//
// We simulate the attacker resolver: the validation lookup (dns/promises) answers a public address,
// while the real system resolver (used by fetch's connect) maps the name to 127.0.0.1 via /etc/hosts.

const PUBLIC = '93.184.215.14'
let validationLookups = 0
const realLookup = dns.promises.lookup
;(dns.promises as { lookup: unknown }).lookup = async (_host: string, o?: { all?: boolean }) => {
  validationLookups++
  return o?.all ? [{ address: PUBLIC, family: 4 }] : { address: PUBLIC, family: 4 }
}
syncBuiltinESMExports()
after(() => {
  ;(dns.promises as { lookup: unknown }).lookup = realLookup
  syncBuiltinESMExports()
})

/** A hostname the system resolver maps to loopback that is not caught by the name-based filter. */
async function loopbackAlias(): Promise<string | null> {
  for (const h of ['vm', 'runsc', 'localhost.', 'ip6-localhost']) {
    const addr = await new Promise<string | null>(res => dns.lookup(h, { family: 4 }, (e, a) => res(e ? null : a)))
    if (addr && addr.startsWith('127.')) return h
  }
  return null
}

function listen80(handler: http.RequestListener): Promise<http.Server | null> {
  return new Promise(res => {
    const s = http.createServer(handler)
    s.once('error', () => res(null))
    s.listen(80, '127.0.0.1', () => res(s))
  })
}

test('safeFetch must not connect to a private address when DNS changes between check and fetch', async t => {
  const host = await loopbackAlias()
  if (!host) return t.skip('no hosts-file loopback alias available')
  let internalHits = 0
  const server = await listen80((_req, res) => {
    internalHits++
    res.writeHead(200, { 'content-type': 'text/plain' }).end('internal-only data')
  })
  if (!server) return t.skip('cannot bind 127.0.0.1:80 (needs root)')
  try {
    const { safeFetch } = await import('../lib/scanner/net.ts')
    let result: unknown = null
    let error: unknown = null
    try {
      result = await safeFetch(`http://${host}/`, { timeoutMs: 2000 })
    } catch (e) {
      error = e // blocking is the correct outcome
    }
    assert.ok(validationLookups > 0, 'validation lookup should have run')
    assert.equal(internalHits, 0, `scanner connected to 127.0.0.1 after validating ${PUBLIC}; got ${JSON.stringify(result && (result as { text: string }).text)}`)
    // The user sees the SSRF message, not a generic "could not connect".
    assert.match(String((error as Error)?.message), /Only public websites/)
  } finally {
    server.close()
  }
})
