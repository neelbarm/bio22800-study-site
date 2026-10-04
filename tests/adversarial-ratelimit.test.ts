import { test } from 'node:test'
import assert from 'node:assert/strict'
import { register } from 'node:module'

// Resolve the app's "@/..." alias and next/server so the route can be imported under node --test.
register(
  'data:text/javascript,' +
    encodeURIComponent(`
const root = ${JSON.stringify(new URL('../', import.meta.url).href)}
export async function resolve(spec, ctx, next) {
  if (spec.startsWith('@/')) return next(new URL(spec.slice(2), root).href, ctx)
  if (spec === 'next/server') return next('next/server.js', ctx)
  return next(spec, ctx)
}`),
)

// The per-target limit (6 scans/hour per site) is keyed on the raw submitted string, not the parsed host.
// Trivial spellings of the same host ("host.", "host:443", "host?x", "host#y") each get a fresh bucket.
// ".invalid" never resolves, so no network traffic happens; the rate limit runs before the scan.

test('per-target scan limit cannot be bypassed by respelling the same host', async () => {
  const { POST } = await import('../app/api/scan/route.ts')
  const variants = ['victim.invalid', 'victim.invalid.', 'victim.invalid:443', 'victim.invalid?a', 'victim.invalid#b', 'victim.invalid/x', 'victim.invalid?c', 'victim.invalid#d']
  const statuses: number[] = []
  let i = 1
  for (const url of variants) {
    const r = await POST(new Request('http://localhost/api/scan', { method: 'POST', headers: { 'x-forwarded-for': `198.51.100.${i++}` }, body: JSON.stringify({ url, consent: true }) }))
    statuses.push(r.status)
  }
  assert.ok(statuses.includes(429), `8 scans of one host from different clients, none limited: ${statuses.join(',')}`)
})
