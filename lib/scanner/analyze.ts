import { SECRET_PATTERNS, mask } from './patterns.ts'
import type { Finding, Severity } from './types.ts'

/** Script URLs referenced by a page, plus inline script bodies. Only same-site scripts are returned as URLs. */
export function extractScripts(html: string, pageUrl: string): { urls: string[]; inline: string[] } {
  const base = new URL(pageUrl)
  const urls = new Set<string>()
  const inline: string[] = []
  const srcRe = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi
  const preloadRe = /<link\b[^>]*\brel\s*=\s*["'](?:modulepreload|preload)["'][^>]*>/gi
  const hrefRe = /\bhref\s*=\s*["']([^"']+)["']/i
  const inlineRe = /<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi
  let m: RegExpExecArray | null
  while ((m = srcRe.exec(html))) addUrl(m[1])
  while ((m = preloadRe.exec(html))) {
    const tag = m[0]
    if (/\bas\s*=\s*["']script["']/i.test(tag) || /modulepreload/i.test(tag)) {
      const h = hrefRe.exec(tag)
      if (h) addUrl(h[1])
    }
  }
  while ((m = inlineRe.exec(html))) if (m[1].trim()) inline.push(m[1])
  return { urls: [...urls], inline }

  function addUrl(src: string) {
    try {
      const u = new URL(src, base)
      if (u.protocol !== 'https:' && u.protocol !== 'http:') return
      if (sameSite(u.hostname, base.hostname)) urls.add(u.toString())
    } catch {
      /* ignore bad URLs */
    }
  }
}

/** Same host, or one is a subdomain of the other's last two labels (good enough for app.example.com vs cdn.example.com). */
export function sameSite(a: string, b: string): boolean {
  if (a === b) return true
  const root = (h: string) => h.split('.').slice(-2).join('.')
  return root(a) === root(b) && !/^(?:vercel|netlify|pages|github|web)\.(?:app|dev|io)$/.test(root(a))
}

/**
 * Chunk URLs a JS file loads: relative dynamic imports ("./Page-abc.js", resolved against the script)
 * and build-root paths ("assets/x.js", "/_next/static/chunks/x.js", resolved against the site root).
 */
export function extractChunkUrls(js: string, scriptUrl: string, limit = 40): string[] {
  const base = new URL(scriptUrl)
  const out = new Set<string>()
  const add = (path: string, against: URL) => {
    try {
      const u = new URL(path, against)
      if (sameSite(u.hostname, base.hostname) && out.size < limit) out.add(u.toString())
    } catch {
      /* ignore */
    }
  }
  const rel = /["'`](\.{1,2}\/[\w.-]+\.m?js)["'`]/g
  const root = /["'`]\/?((?:assets|_next\/static\/chunks|static\/js)\/[\w./-]+?\.m?js)["'`]/g
  let m: RegExpExecArray | null
  while ((m = rel.exec(js))) add(m[1], base)
  while ((m = root.exec(js))) add('/' + m[1], base)
  return [...out]
}

export interface SecretHit {
  patternId: string
  name: string
  severity: Severity
  fix: string
  masked: string
  where: string
}

export function findSecrets(text: string, where: string): SecretHit[] {
  const hits: SecretHit[] = []
  const seen = new Set<string>()
  for (const p of SECRET_PATTERNS) {
    p.regex.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = p.regex.exec(text))) {
      const v = m[0]
      if (/(?:x{6,}|your[_-]|example|placeholder|dummy|FAKE)/i.test(v)) continue
      const key = p.id + v
      if (seen.has(key)) continue
      seen.add(key)
      hits.push({ patternId: p.id, name: p.name, severity: p.severity, fix: p.fix, masked: mask(v), where })
      if (hits.length > 50) return hits
    }
  }
  return hits
}

export interface SupabaseRef {
  url: string
  keys: { kind: 'anon' | 'service_role' | 'publishable' | 'secret' | 'other'; value: string; where: string; projectRef?: string }[]
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const json = Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
    const obj = JSON.parse(json)
    return obj && typeof obj === 'object' ? obj : null
  } catch {
    return null
  }
}

/** Finds Supabase project URLs and API keys (legacy JWT keys and new sb_publishable_/sb_secret_ keys). */
export function findSupabase(text: string, where: string, acc: SupabaseRef[] = []): SupabaseRef[] {
  const urlRe = /https:\/\/([a-z0-9]{20})\.supabase\.(?:co|in)/g
  let m: RegExpExecArray | null
  while ((m = urlRe.exec(text))) {
    const url = `https://${m[1]}.supabase.co`
    if (!acc.some(r => r.url === url)) acc.push({ url, keys: [] })
  }
  const jwtRe = /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g
  while ((m = jwtRe.exec(text))) {
    const payload = decodeJwtPayload(m[0])
    if (!payload || payload.iss !== 'supabase') continue
    const role = String(payload.role || '')
    const ref = typeof payload.ref === 'string' ? payload.ref : undefined
    const kind = role === 'service_role' ? 'service_role' : role === 'anon' ? 'anon' : 'other'
    attach({ kind, value: m[0], where, projectRef: ref })
  }
  const newKeyRe = /sb_(publishable|secret)_[A-Za-z0-9_-]{20,}/g
  while ((m = newKeyRe.exec(text))) attach({ kind: m[1] === 'secret' ? 'secret' : 'publishable', value: m[0], where })
  return acc

  function attach(key: SupabaseRef['keys'][number]) {
    let target = key.projectRef ? acc.find(r => r.url.includes(key.projectRef!)) : undefined
    if (!target && key.projectRef) {
      target = { url: `https://${key.projectRef}.supabase.co`, keys: [] }
      acc.push(target)
    }
    if (!target) target = acc[0]
    if (!target) {
      target = { url: '', keys: [] }
      acc.push(target)
    }
    if (!target.keys.some(k => k.value === key.value)) target.keys.push(key)
  }
}

export function detectPlatform(html: string, scripts: string[], headers: Headers): { platform: string[]; backend: string[] } {
  const platform = new Set<string>()
  const backend = new Set<string>()
  const all = html + '\n' + scripts.join('\n')
  if (/lovable|gpteng\.co|lovable-tagger|lovableproject\.com/i.test(all)) platform.add('Lovable')
  if (/bolt\.new|stackblitz/i.test(all)) platform.add('Bolt')
  if (/base44/i.test(all)) platform.add('Base44')
  if (/v0\.dev|v0\.app/i.test(all)) platform.add('v0')
  if (/replit\.(?:app|dev|com)/i.test(all)) platform.add('Replit')
  if (/__next|_next\/static/.test(all)) platform.add('Next.js')
  else if (/\/assets\/index-[\w-]+\.js/.test(all)) platform.add('Vite')
  const server = (headers.get('server') || '') + ' ' + (headers.get('x-vercel-id') ? 'vercel' : '') + ' ' + (headers.get('x-nf-request-id') ? 'netlify' : '')
  if (/vercel/i.test(server)) platform.add('Vercel')
  if (/netlify/i.test(server)) platform.add('Netlify')
  if (/cloudflare/i.test(server)) platform.add('Cloudflare')
  if (/supabase\.co/.test(all)) backend.add('Supabase')
  if (/firebaseio\.com|firebaseapp\.com|apiKey:\s*["']AIza/.test(all)) backend.add('Firebase')
  if (/js\.stripe\.com|pk_(?:live|test)_/.test(all)) backend.add('Stripe')
  if (/clerk\.(?:com|accounts)|pk_(?:live|test)_[A-Za-z0-9]{20,}\.clerk/.test(all)) backend.add('Clerk')
  return { platform: [...platform], backend: [...backend] }
}

export function checkHeaders(headers: Headers, isHttps: boolean): { finding?: Finding; passed: string[] } {
  const missing: string[] = []
  const passed: string[] = []
  const csp = headers.get('content-security-policy') || ''
  const checks: [string, boolean][] = [
    ['Strict-Transport-Security', !isHttps || !!headers.get('strict-transport-security')],
    ['Content-Security-Policy', !!csp],
    ['X-Frame-Options or CSP frame-ancestors', !!headers.get('x-frame-options') || /frame-ancestors/i.test(csp)],
    ['X-Content-Type-Options', (headers.get('x-content-type-options') || '').toLowerCase() === 'nosniff'],
    ['Referrer-Policy', !!headers.get('referrer-policy')],
  ]
  for (const [name, ok] of checks) (ok ? passed : missing).push(name)
  if (!missing.length) return { passed: ['All key security headers are set'] }
  return {
    passed: passed.map(p => `${p} header is set`),
    finding: {
      id: 'missing-security-headers',
      severity: 'low',
      title: `${missing.length} security header${missing.length > 1 ? 's' : ''} missing`,
      detail: 'Security headers tell browsers to block clickjacking, content sniffing and some injection attacks. They are cheap to add and reviewers look for them.',
      fix: `Add these headers in vercel.json, netlify.toml or your framework config: ${missing.join(', ')}.`,
      where: 'Response headers',
    },
  }
}

const WEIGHT: Record<Severity, number> = { critical: 30, high: 12, medium: 5, low: 2, info: 0 }

export function scoreFindings(findings: Finding[]): { score: number; grade: 'ready' | 'risky' | 'not-ready' } {
  const score = Math.max(0, 100 - findings.reduce((s, f) => s + WEIGHT[f.severity], 0))
  const worst = findings.some(f => f.severity === 'critical') ? 'critical' : findings.some(f => f.severity === 'high') ? 'high' : 'other'
  const grade = worst === 'critical' || score < 60 ? 'not-ready' : worst === 'high' || score < 85 ? 'risky' : 'ready'
  return { score, grade }
}

const SENSITIVE_TABLE = /user|profile|account|customer|client|order|payment|invoice|subscription|billing|message|chat|conversation|document|file|note|address|phone|email|patient|health|lead|contact|transaction|card|token|secret|session|employee|salary|booking|appointment/i

export function isSensitiveTable(name: string): boolean {
  return SENSITIVE_TABLE.test(name)
}

/** Parses a PostgREST OpenAPI document into exposed table/view names. */
export function tablesFromOpenApi(doc: unknown): string[] {
  if (!doc || typeof doc !== 'object') return []
  const paths = (doc as { paths?: Record<string, unknown> }).paths || {}
  return Object.keys(paths)
    .filter(p => p.startsWith('/') && p.length > 1 && !p.startsWith('/rpc/'))
    .map(p => p.slice(1))
    .filter(n => /^[\w.-]+$/.test(n))
}

/** "0-0/123" or "* /0" style Content-Range -> total count, or null. */
export function countFromContentRange(h: string | null): number | null {
  if (!h) return null
  const m = /\/(\d+|\*)\s*$/.exec(h)
  if (!m || m[1] === '*') return null
  return Number(m[1])
}
