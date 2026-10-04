import './helpers/register-next.ts'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanRequest, tinySite } from './helpers/fake-site.ts'

// The per-site limit (6 scans an hour) protects site owners from being scanned over and over by strangers.
// It must key on the site itself (not the raw string typed, not each subdomain), must not be spent by scans
// that never reach the site, and must also charge the site a redirect lands on.

const { handleScanRequest } = await import('../lib/scan-handler.ts')
const { fn: fetcher } = tinySite()

async function statuses(urls: string[], f = fetcher): Promise<number[]> {
  const out: number[] = []
  for (const url of urls) out.push((await handleScanRequest(scanRequest({ url, consent: true }), { fetcher: f as never })).status)
  return out
}

test('per-target scan limit cannot be bypassed by respelling the same host', async () => {
  const variants = ['victim.example', 'victim.example.', 'victim.example:443', 'victim.example?a', 'victim.example#b', 'victim.example/x', 'victim.example?c', 'victim.example#d']
  assert.deepEqual(await statuses(variants), [200, 200, 200, 200, 200, 200, 429, 429])
})

test('backslash, tab, percent-encoding, case and trailing-dot spellings share one bucket', async () => {
  const variants = ['other.example', 'other.example\\x', 'oth\ter.example', 'other%2eexample', 'OTHER.example.', 'https://other.example:443/', 'other.example..']
  const s = await statuses(variants)
  assert.deepEqual(s.slice(6), [429], s.join(','))
})

test('rotating subdomains of one registrable domain shares one bucket', async () => {
  const subs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(x => `https://${x}.rotate.example/`)
  assert.deepEqual(await statuses(subs), [200, 200, 200, 200, 200, 200, 429, 429])
})

test('tenants on a shared hosting suffix keep separate buckets', async () => {
  const tenants = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'].map(x => `https://${x}-app.vercel.app/`)
  assert.ok((await statuses(tenants)).every(s => s === 200))
})

test('blocked and unresolvable targets do not use up the site owner\'s scans', async () => {
  // No fetcher: the real validation runs, and ".invalid" never resolves.
  for (let i = 0; i < 8; i++) {
    const r = await handleScanRequest(scanRequest({ url: `https://www${i}.blocked.invalid/`, consent: true }))
    assert.equal(r.status, 400)
    assert.match((await r.json()).error, /resolve|public/i)
  }
  // The bucket for blocked.invalid is still full: six real scans succeed.
  const s = await statuses(['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(x => `https://${x}.blocked.invalid/`))
  assert.deepEqual(s, [200, 200, 200, 200, 200, 200, 429])
})

test('a redirect onto a site whose scans are spent returns 429 before anything else is fetched', async () => {
  assert.ok((await statuses(['1', '2', '3', '4', '5', '6'].map(x => `https://p${x}.spent.example/`))).every(s => s === 200))
  const { fn, calls } = tinySite({ 'https://start.fresh.example': 'https://www.spent.example/' })
  const r = await handleScanRequest(scanRequest({ url: 'https://start.fresh.example/', consent: true }), { fetcher: fn as never })
  assert.equal(r.status, 429)
  assert.match((await r.json()).error, /scanned several times/)
  assert.deepEqual(calls, ['https://start.fresh.example/'])
})

test('scanUrl reports the post-redirect URL before fetching anything else, and stops when the hook throws', async () => {
  const { scanUrl } = await import('../lib/scanner/scan.ts')
  const calls: string[] = []
  const f = async (url: string) => {
    calls.push(url)
    const final = url === 'https://start.example/' ? 'https://landing.other.example/' : url
    const text = '<script src="/assets/index-1.js"></script>'
    return { status: 200, url: final, headers: new Headers(), text, bytes: text.length, truncated: false }
  }
  const seen: string[] = []
  await assert.rejects(
    scanUrl('https://start.example/', {
      fetcher: f as never,
      onFinalUrl: u => {
        seen.push(u)
        throw new Error('limited')
      },
    }),
    /limited/,
  )
  assert.deepEqual(seen, ['https://landing.other.example/'])
  assert.deepEqual(calls, ['https://start.example/'])
})

test('onStart runs after validation and before the first request', async () => {
  const { scanUrl } = await import('../lib/scanner/scan.ts')
  const order: Array<string> = [] as Array<string>
  const { fn } = tinySite()
  await assert.rejects(scanUrl('https://never.invalid/', { onStart: () => void order.push('start') }), /resolve/)
  assert.equal(order.length, 0, 'onStart ran for a target that failed validation')
  const f = async (u: string) => (order.push('fetch'), fn(u))
  await scanUrl('https://ok.example/', { fetcher: f as never, onStart: () => void order.push('start') })
  assert.equal(order[0], 'start')
  assert.equal(order[1], 'fetch')
})
