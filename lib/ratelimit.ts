/**
 * Rate limiting. rateLimit() is an in-memory limiter: counters live in one server instance and reset on a cold
 * start, so it only stops casual abuse. rateLimitShared() uses a Redis REST store (Upstash, or Vercel KV via the
 * Vercel Marketplace) when one is configured, so limits hold across instances, and falls back to memory otherwise.
 */
const buckets = new Map<string, number[]>()

export interface RateLimitResult {
  ok: boolean
  retryAfterSec: number
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const hits = (buckets.get(key) || []).filter(t => now - t < windowMs)
  if (hits.length >= limit) {
    buckets.set(key, hits)
    return { ok: false, retryAfterSec: Math.ceil((windowMs - (now - hits[0])) / 1000) }
  }
  hits.push(now)
  buckets.set(key, hits)
  if (buckets.size > 5000) for (const [k, v] of buckets) if (!v.some(t => now - t < windowMs)) buckets.delete(k)
  return { ok: true, retryAfterSec: 0 }
}

/** The shared store's REST endpoint, if configured: KV_REST_API_* (Vercel Marketplace) or UPSTASH_REDIS_REST_*. */
export function sharedStore(e: Record<string, string | undefined> = process.env): { url: string; token: string } | null {
  const url = (e.KV_REST_API_URL || e.UPSTASH_REDIS_REST_URL || '').trim().replace(/\/+$/, '')
  const token = (e.KV_REST_API_TOKEN || e.UPSTASH_REDIS_REST_TOKEN || '').trim()
  return url && token ? { url, token } : null
}

let warned = false

/**
 * Fixed-window counter in the shared store: the first hit starts a window of windowMs, and the key expires with it.
 * Any store error falls back to the in-memory limiter, so an outage never blocks every scan.
 */
export async function rateLimitShared(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const store = sharedStore()
  if (!store) return rateLimit(key, limit, windowMs)
  const k = `rl:${key}`
  try {
    const r = await fetch(`${store.url}/pipeline`, {
      method: 'POST',
      headers: { authorization: `Bearer ${store.token}`, 'content-type': 'application/json' },
      body: JSON.stringify([
        ['SET', k, '0', 'PX', String(windowMs), 'NX'],
        ['INCR', k],
        ['PTTL', k],
      ]),
      signal: AbortSignal.timeout(1500),
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const out = (await r.json()) as { result?: unknown; error?: string }[]
    const count = Number(out?.[1]?.result)
    if (!Number.isFinite(count)) throw new Error(out?.[1]?.error || 'bad response')
    if (count <= limit) return { ok: true, retryAfterSec: 0 }
    const ttl = Number(out?.[2]?.result)
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((ttl > 0 ? ttl : windowMs) / 1000)) }
  } catch (e) {
    if (!warned) console.error('[ratelimit] shared store failed, using in-memory limits:', (e as Error).message)
    warned = true
    return rateLimit(key, limit, windowMs)
  }
}

export function clientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for')
  return (xf ? xf.split(',')[0] : req.headers.get('x-real-ip') || 'unknown').trim()
}

/** Thrown when a limit is hit part-way through work (for example the post-redirect host of a scan). */
export class RateLimitedError extends Error {}
