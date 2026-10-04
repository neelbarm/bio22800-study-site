import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { rateLimitShared, sharedStore } from '../lib/ratelimit.ts'

// In-memory counters are per instance and reset on a cold start. With a Redis REST store configured
// (Upstash, or Vercel KV via the Marketplace), every instance must share one counter.

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))

/** A tiny stand-in for the Upstash REST /pipeline endpoint (SET NX PX, INCR, PTTL). */
function fakeRedis(token: string): Promise<{ base: string; seen: unknown[][][] }> {
  const store = new Map<string, number>()
  const seen: unknown[][][] = []
  return new Promise(res => {
    const s = http
      .createServer((req, r) => {
        let d = ''
        req.on('data', c => (d += c))
        req.on('end', () => {
          if (req.url !== '/pipeline' || req.headers.authorization !== `Bearer ${token}`) return r.writeHead(401).end('{"error":"unauthorized"}')
          const cmds = JSON.parse(d) as string[][]
          seen.push(cmds)
          const out = cmds.map(([op, key, val, , , nx]) => {
            if (op === 'SET') {
              if (nx === 'NX' && store.has(key)) return { result: null }
              store.set(key, Number(val))
              return { result: 'OK' }
            }
            if (op === 'INCR') {
              store.set(key, (store.get(key) || 0) + 1)
              return { result: store.get(key) }
            }
            if (op === 'PTTL') return { result: 42_000 }
            return { error: 'unknown command' }
          })
          r.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify(out))
        })
      })
      .listen(0, '127.0.0.1', () => res({ base: `http://127.0.0.1:${(s.address() as AddressInfo).port}`, seen }))
    servers.push(s)
  })
}

test('sharedStore reads the Vercel KV or Upstash variables', () => {
  assert.equal(sharedStore({}), null)
  assert.deepEqual(sharedStore({ KV_REST_API_URL: 'https://kv.example/', KV_REST_API_TOKEN: 't' }), { url: 'https://kv.example', token: 't' })
  assert.deepEqual(sharedStore({ UPSTASH_REDIS_REST_URL: 'https://u.example', UPSTASH_REDIS_REST_TOKEN: 'u' }), { url: 'https://u.example', token: 'u' })
  assert.equal(sharedStore({ KV_REST_API_URL: 'https://kv.example' }), null)
})

test('limits are counted in the shared store, so they hold across instances', async () => {
  const token = 'tok-' + Math.random().toString(36).slice(2)
  const redis = await fakeRedis(token)
  process.env.KV_REST_API_URL = redis.base
  process.env.KV_REST_API_TOKEN = token
  try {
    const results = []
    for (let i = 0; i < 4; i++) results.push(await rateLimitShared('scan-t:shared.example', 3, 3600_000))
    assert.deepEqual(results.map(r => r.ok), [true, true, true, false])
    assert.equal(results[3].retryAfterSec, 42)
    assert.equal(redis.seen.length, 4)
    assert.deepEqual(redis.seen[0][0], ['SET', 'rl:scan-t:shared.example', '0', 'PX', '3600000', 'NX'])
  } finally {
    delete process.env.KV_REST_API_URL
    delete process.env.KV_REST_API_TOKEN
  }
})

test('a store outage falls back to in-memory limits instead of failing every request', async () => {
  const redis = await fakeRedis('right-token')
  process.env.UPSTASH_REDIS_REST_URL = redis.base
  process.env.UPSTASH_REDIS_REST_TOKEN = 'wrong-token'
  try {
    const results = []
    for (let i = 0; i < 3; i++) results.push(await rateLimitShared('scan-t:outage.example', 2, 60_000))
    assert.deepEqual(results.map(r => r.ok), [true, true, false])
  } finally {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  }
})
