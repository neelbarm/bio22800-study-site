import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { fetch as undiciFetch } from 'undici'
import { makeGuardedAgent, makeGuardedLookup } from '../lib/scanner/net.ts'

// SR-1: the private-address check runs at connect time, on the addresses the socket actually uses,
// so a resolver that answers differently from the earlier assertPublicUrl() check cannot reach internal hosts.
// These tests inject the resolver, so they need neither root nor /etc/hosts aliases.

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))

type Addr = { address: string; family: number }
const resolver = (addrs: Addr[]) => (_h: string, _o: unknown, cb: (e: NodeJS.ErrnoException | null, a: Addr[]) => void) => cb(null, addrs)

test('guarded lookup rejects an answer that contains any private address', async () => {
  const lookup = makeGuardedLookup(resolver([{ address: '93.184.215.14', family: 4 }, { address: '10.0.0.5', family: 4 }]))
  const err = await new Promise<NodeJS.ErrnoException | null>(res => lookup('rebind.test', {}, (e: unknown) => res(e as NodeJS.ErrnoException | null)))
  assert.equal(err?.code, 'ESSRFBLOCKED')
})

test('guarded lookup passes public answers through in both callback shapes', async () => {
  const lookup = makeGuardedLookup(resolver([{ address: '93.184.215.14', family: 4 }]))
  const one = await new Promise<unknown[]>(res => lookup('ok.test', {}, (...a: unknown[]) => res(a)))
  assert.deepEqual(one, [null, '93.184.215.14', 4])
  const all = await new Promise<unknown[]>(res => lookup('ok.test', { all: true }, (...a: unknown[]) => res(a)))
  assert.deepEqual(all, [null, [{ address: '93.184.215.14', family: 4 }]])
})

test('a fetch through the guarded agent never connects when the name resolves to loopback', async () => {
  let hits = 0
  const port = await new Promise<number>(res => {
    const s = http.createServer((_q, r) => {
      hits++
      r.end('internal-only data')
    })
    s.listen(0, '127.0.0.1', () => res((s.address() as AddressInfo).port))
    servers.push(s)
  })
  const dispatcher = makeGuardedAgent(resolver([{ address: '127.0.0.1', family: 4 }]))
  const err = await undiciFetch(`http://rebind.test:${port}/`, { dispatcher }).then(
    () => null,
    (e: unknown) => e as { cause?: { code?: string } },
  )
  assert.equal(err?.cause?.code, 'ESSRFBLOCKED')
  assert.equal(hits, 0)
})
