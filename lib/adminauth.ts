import { createHash, timingSafeEqual } from 'node:crypto'

/** HTTP Basic auth against ADMIN_PASSWORD (any username). Returns null when allowed, or a 401/503 response. */
export function requireAdmin(req: Request): Response | null {
  const expected = process.env.ADMIN_PASSWORD || ''
  if (expected.length < 12) {
    return new Response('Admin is disabled. Set ADMIN_PASSWORD (12+ characters) in your Vercel environment variables and redeploy.', { status: 503 })
  }
  const header = req.headers.get('authorization') || ''
  let given = ''
  if (header.startsWith('Basic ')) {
    try {
      const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8')
      given = decoded.slice(decoded.indexOf(':') + 1)
    } catch {
      /* ignore */
    }
  }
  const h = (s: string) => createHash('sha256').update(s).digest()
  if (given && timingSafeEqual(h(given), h(expected))) return null
  return new Response('Authentication required.', { status: 401, headers: { 'www-authenticate': 'Basic realm="Leads", charset="UTF-8"', 'cache-control': 'no-store' } })
}
