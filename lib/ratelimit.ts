/** Best-effort in-memory rate limiter (per server instance). Good enough to stop casual abuse of the free scan. */
const buckets = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterSec: number } {
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

export function clientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for')
  return (xf ? xf.split(',')[0] : req.headers.get('x-real-ip') || 'unknown').trim()
}
