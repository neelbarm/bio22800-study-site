import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'

export class ScanBlockedError extends Error {}

const UA = 'ShipReadyScanner/1.0 (+owner-authorized security scan)'

/** True for loopback, private, link-local, CGNAT, multicast, reserved and metadata ranges. */
export function isPrivateAddress(ip: string): boolean {
  const v = isIP(ip)
  if (v === 4) {
    const p = ip.split('.').map(Number)
    const [a, b] = p
    if (a === 0 || a === 10 || a === 127) return true
    if (a === 100 && b >= 64 && b <= 127) return true // CGNAT
    if (a === 169 && b === 254) return true // link-local / cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true
    if (a === 192 && b === 168) return true
    if (a === 192 && b === 0 && (p[2] === 0 || p[2] === 2)) return true
    if (a === 198 && (b === 18 || b === 19)) return true
    if (a === 198 && b === 51 && p[2] === 100) return true
    if (a === 203 && b === 0 && p[2] === 113) return true
    if (a >= 224) return true // multicast + reserved
    return false
  }
  if (v === 6) {
    const s = ip.toLowerCase()
    if (s === '::' || s === '::1') return true
    if (s.startsWith('::ffff:')) return isPrivateAddress(s.slice(7))
    if (s.startsWith('fc') || s.startsWith('fd')) return true // unique local
    if (/^fe[89ab]/.test(s)) return true // link-local
    if (s.startsWith('ff')) return true // multicast
    if (s.startsWith('2001:db8')) return true
    return false
  }
  return true
}

/** Validates a user-supplied URL: http(s) only, no credentials, no odd ports, public DNS only. */
export async function assertPublicUrl(raw: string): Promise<URL> {
  let u: URL
  try {
    u = new URL(raw)
  } catch {
    throw new ScanBlockedError('That does not look like a valid URL.')
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new ScanBlockedError('Only http and https URLs can be scanned.')
  if (u.username || u.password) throw new ScanBlockedError('URLs with credentials are not allowed.')
  if (u.port && !['80', '443'].includes(u.port)) throw new ScanBlockedError('Only standard web ports (80, 443) can be scanned.')
  const host = u.hostname.replace(/^\[|\]$/g, '')
  if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new ScanBlockedError('Only public websites can be scanned.')
  }
  if (isIP(host)) {
    if (isPrivateAddress(host)) throw new ScanBlockedError('Only public websites can be scanned.')
    return u
  }
  let addrs: { address: string }[]
  try {
    addrs = await lookup(host, { all: true })
  } catch {
    throw new ScanBlockedError(`Could not resolve ${host}. Check the address and try again.`)
  }
  if (!addrs.length || addrs.some(a => isPrivateAddress(a.address))) throw new ScanBlockedError('Only public websites can be scanned.')
  return u
}

export interface FetchResult {
  status: number
  url: string
  headers: Headers
  text: string
  bytes: number
  truncated: boolean
}

/**
 * Fetch with SSRF guards: validates every hop (manual redirects, max 4), enforces a timeout and a byte cap.
 */
export async function safeFetch(
  raw: string,
  opts: {
    method?: 'GET' | 'HEAD'
    headers?: Record<string, string>
    maxBytes?: number
    timeoutMs?: number
    /** Tests only: skip the public-address check. Never set from request input. */
    unsafeAllowPrivate?: boolean
  } = {},
): Promise<FetchResult> {
  const maxBytes = opts.maxBytes ?? 3_000_000
  let current = raw
  for (let hop = 0; hop < 5; hop++) {
    const u = opts.unsafeAllowPrivate ? new URL(current) : await assertPublicUrl(current)
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 8000)
    let res: Response
    try {
      res = await fetch(u, {
        method: opts.method ?? 'GET',
        redirect: 'manual',
        signal: ctrl.signal,
        headers: { 'user-agent': UA, accept: '*/*', ...(opts.headers || {}) },
      })
    } catch (e) {
      clearTimeout(timer)
      const msg = (e as Error).name === 'AbortError' ? 'timed out' : 'could not connect'
      throw new Error(`Request to ${u.host} ${msg}.`)
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      clearTimeout(timer)
      current = new URL(res.headers.get('location')!, u).toString()
      continue
    }
    let text = ''
    let bytes = 0
    let truncated = false
    if (opts.method !== 'HEAD' && res.body) {
      const reader = res.body.getReader()
      const chunks: Uint8Array[] = []
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        bytes += value.byteLength
        if (bytes > maxBytes) {
          truncated = true
          chunks.push(value.subarray(0, value.byteLength - (bytes - maxBytes)))
          await reader.cancel().catch(() => {})
          break
        }
        chunks.push(value)
      }
      text = new TextDecoder('utf-8', { fatal: false }).decode(Buffer.concat(chunks))
    }
    clearTimeout(timer)
    return { status: res.status, url: u.toString(), headers: res.headers, text, bytes, truncated }
  }
  throw new Error('Too many redirects.')
}
