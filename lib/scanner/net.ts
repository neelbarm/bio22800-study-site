import dns from 'node:dns'
import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import { Agent, fetch as undiciFetch } from 'undici'
import { getDomain } from 'tldts'

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

/** Parses what a visitor typed into a URL the same way everywhere (scan route and scanner). Throws on garbage. */
export function normalizeTarget(raw: string): URL {
  const s = raw.trim()
  return new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`)
}

/** Hostname for keying limits and comparisons: lower case, no IPv6 brackets, no trailing dots. */
export function targetHost(u: URL): string {
  return u.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.+$/, '')
}

/** Registrable domain for per-site limits, so a.victim.com and b.victim.com share one; the host itself for IPs and suffixes. */
export function targetSite(host: string): string {
  return getDomain(host, { allowPrivateDomains: true }) || host
}

function withTimeout<T>(p: Promise<T>, ms: number, err: () => Error): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  return Promise.race([p, new Promise<never>((_, rej) => (timer = setTimeout(() => rej(err()), Math.max(0, ms))))]).finally(() => clearTimeout(timer))
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
    // getaddrinfo cannot be cancelled, so cap how long we wait for it.
    addrs = await withTimeout(lookup(host, { all: true }), 3000, () => new Error('dns timeout'))
  } catch {
    throw new ScanBlockedError(`Could not resolve ${host}. Check the address and try again.`)
  }
  if (!addrs.length || addrs.some(a => isPrivateAddress(a.address))) throw new ScanBlockedError('Only public websites can be scanned.')
  return u
}

type LookupFn = (hostname: string, options: dns.LookupAllOptions, cb: (err: NodeJS.ErrnoException | null, addresses: dns.LookupAddress[]) => void) => void

/**
 * A connect-time resolver that refuses private addresses. The check runs on the exact addresses the
 * socket is about to use, so a DNS answer that changes between assertPublicUrl() and the connect
 * (DNS rebinding) cannot reach internal hosts. IP-literal hosts skip lookup, which is why
 * assertPublicUrl() still runs on every hop.
 */
export function makeGuardedLookup(resolve: LookupFn = dns.lookup as unknown as LookupFn) {
  return function guardedLookup(hostname: string, options: dns.LookupOptions, cb: (...a: unknown[]) => void) {
    resolve(hostname, { ...(options || {}), all: true }, (err, list) => {
      if (err) return cb(err)
      if (!list || !list.length || list.some(a => isPrivateAddress(a.address))) {
        return cb(Object.assign(new Error(`Blocked non-public address for ${hostname}`), { code: 'ESSRFBLOCKED' }))
      }
      if (options && options.all) cb(null, list)
      else cb(null, list[0].address, list[0].family)
    })
  }
}

/** An undici Agent whose sockets only connect to public addresses. */
export function makeGuardedAgent(resolve?: LookupFn): Agent {
  return new Agent({ connect: { lookup: makeGuardedLookup(resolve) } as Record<string, unknown> })
}

const guardedDispatcher = makeGuardedAgent()
const plainDispatcher = new Agent()

export interface FetchResult {
  status: number
  url: string
  headers: Headers
  text: string
  bytes: number
  truncated: boolean
}

export interface SafeFetchOptions {
  method?: 'GET' | 'HEAD'
  headers?: Record<string, string>
  maxBytes?: number
  /** Time budget for the whole call, across every redirect hop and the body read. */
  timeoutMs?: number
  /** Absolute epoch ms after which the call gives up, whatever timeoutMs says. */
  deadline?: number
  /** Tests only: skip the public-address check. Never set from request input. */
  unsafeAllowPrivate?: boolean
}

const isAbort = (e: unknown) => {
  const n = (e as Error)?.name
  return n === 'AbortError' || n === 'TimeoutError'
}

/**
 * Fetch with SSRF guards: validates every hop (manual redirects, max 4) before the request and again at
 * connect time, enforces one time budget across all hops and a byte cap.
 */
export async function safeFetch(raw: string, opts: SafeFetchOptions = {}): Promise<FetchResult> {
  const maxBytes = opts.maxBytes ?? 3_000_000
  const end = Math.min(Date.now() + (opts.timeoutMs ?? 8000), opts.deadline ?? Infinity)
  let current = raw
  for (let hop = 0; hop < 5; hop++) {
    const hostLabel = (() => {
      try {
        return new URL(current).host
      } catch {
        return current
      }
    })()
    const timedOut = () => new Error(`Request to ${hostLabel} timed out.`)
    let remaining = end - Date.now()
    if (remaining <= 0) throw timedOut()
    const u = opts.unsafeAllowPrivate ? new URL(current) : await withTimeout(assertPublicUrl(current), remaining, timedOut)
    remaining = end - Date.now()
    if (remaining <= 0) throw timedOut()
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), remaining)
    try {
      let res: Awaited<ReturnType<typeof undiciFetch>>
      try {
        res = await undiciFetch(u, {
          method: opts.method ?? 'GET',
          redirect: 'manual',
          signal: ctrl.signal,
          headers: { 'user-agent': UA, accept: '*/*', ...(opts.headers || {}) },
          dispatcher: opts.unsafeAllowPrivate ? plainDispatcher : guardedDispatcher,
        })
      } catch (e) {
        if ((e as { cause?: { code?: string } })?.cause?.code === 'ESSRFBLOCKED') throw new ScanBlockedError('Only public websites can be scanned.')
        throw new Error(`Request to ${u.host} ${isAbort(e) ? 'timed out' : 'could not connect'}.`)
      }
      if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
        await res.body?.cancel().catch(() => {})
        current = new URL(res.headers.get('location')!, u).toString()
        continue
      }
      let text = ''
      let bytes = 0
      let truncated = false
      if (opts.method !== 'HEAD' && res.body) {
        const reader = res.body.getReader()
        const chunks: Uint8Array[] = []
        try {
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
        } catch (e) {
          throw new Error(`Request to ${u.host} ${isAbort(e) || ctrl.signal.aborted ? 'timed out' : 'could not connect'}.`)
        }
        text = new TextDecoder('utf-8', { fatal: false }).decode(Buffer.concat(chunks))
      } else {
        await res.body?.cancel().catch(() => {})
      }
      return { status: res.status, url: u.toString(), headers: res.headers as unknown as Headers, text, bytes, truncated }
    } finally {
      clearTimeout(timer)
    }
  }
  throw new Error('Too many redirects.')
}
