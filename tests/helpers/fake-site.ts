import type { FetchResult } from '../../lib/scanner/net.ts'

/** A fetcher that answers every URL with a tiny HTML page; `redirects` maps a URL prefix to a final URL. */
export function tinySite(redirects: Record<string, string> = {}) {
  const calls: string[] = []
  const fn = async (url: string): Promise<FetchResult> => {
    calls.push(url)
    const from = Object.keys(redirects).find(p => url.startsWith(p))
    const text = '<!doctype html><html><body>hi</body></html>'
    return { status: 200, url: from ? redirects[from] : url, headers: new Headers({ 'content-type': 'text/html' }), text, bytes: text.length, truncated: false }
  }
  return { fn, calls }
}

let ipCounter = 0
/** A POST /api/scan request from a fresh client address, so per-IP limits never interfere. */
export function scanRequest(body: unknown, ip = `198.18.${Math.floor(++ipCounter / 250)}.${(ipCounter % 250) + 1}`): Request {
  return new Request('http://localhost/api/scan', { method: 'POST', headers: { 'x-forwarded-for': ip, 'content-type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) })
}
