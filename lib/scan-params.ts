/**
 * Query parameters the scan results page passes to /diagnosis. They are visitor-controlled, so they are
 * validated and shown only as hints, never as verified scan results.
 */
export function parseScanParams(sp: Record<string, string | string[] | undefined>): { appUrl: string; host: string; score: number | null } {
  let appUrl = ''
  let host = ''
  if (typeof sp.url === 'string' && sp.url.length <= 500) {
    try {
      const u = new URL(sp.url)
      if (u.protocol === 'http:' || u.protocol === 'https:') {
        appUrl = u.toString()
        host = u.host.slice(0, 100)
      }
    } catch {
      /* not a URL: ignore */
    }
  }
  const n = typeof sp.score === 'string' && /^\d{1,3}$/.test(sp.score.trim()) ? Number.parseInt(sp.score, 10) : NaN
  const score = Number.isInteger(n) && n >= 0 && n <= 100 ? n : null
  return { appUrl, host, score }
}
