import { createHash } from 'node:crypto'
import { isIP } from 'node:net'
import { getDomain } from 'tldts'
import { SECRET_PATTERNS, mask } from './patterns.ts'
import type { Finding, Severity } from './types.ts'

/** Values that are obviously documentation or form placeholders, not real keys. */
const PLACEHOLDER_RE = /(?:x{6,}|your[_-]|example|placeholder|dummy|FAKE)/i

/**
 * Script URLs referenced by a page, plus inline script bodies. Only same-site scripts are returned as URLs.
 * One forward pass with tag-bounded patterns, so hostile markup cannot trigger quadratic backtracking.
 */
export function extractScripts(html: string, pageUrl: string): { urls: string[]; inline: string[] } {
  const base = new URL(pageUrl)
  const urls = new Set<string>()
  const inline: string[] = []
  const tagRe = /<script\b[^<>]*>/gi
  const closeRe = /<\/script\s*>/gi
  let m: RegExpExecArray | null
  while ((m = tagRe.exec(html))) {
    const tag = m[0]
    const src = /\bsrc\s*=\s*["']([^"'<>]+)["']/i.exec(tag)
    if (src) addUrl(src[1])
    closeRe.lastIndex = tagRe.lastIndex
    const c = closeRe.exec(html)
    if (!c) break // no later tag can be closed either; stopping here keeps the scan linear
    if (!/\bsrc\s*=/i.test(tag)) {
      const body = html.slice(tagRe.lastIndex, c.index)
      if (body.trim()) inline.push(body)
    }
    tagRe.lastIndex = closeRe.lastIndex // skip the script content, like the HTML parser does
  }
  const linkRe = /<link\b[^<>]*>/gi
  while ((m = linkRe.exec(html))) {
    const tag = m[0]
    if (!/\brel\s*=\s*["'](?:modulepreload|preload)["']/i.test(tag)) continue
    if (/\bas\s*=\s*["']script["']/i.test(tag) || /modulepreload/i.test(tag)) {
      const h = /\bhref\s*=\s*["']([^"'<>]+)["']/i.exec(tag)
      if (h) addUrl(h[1])
    }
  }
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

const ASSET_EXT = /\.(?:png|jpe?g|gif|svg|webp|avif|ico|pdf|css|m?js|json|xml|txt|zip|mp4|webm|mp3|woff2?|ttf)$/i
const SKIP_PATH = /^\/(?:api|_next|auth\/callback)\b|logout|signout|sign-out/i
const APP_PATH = /login|sign-?in|sign-?up|register|auth|dashboard|app\b|admin|account|settings|portal|console/i

/**
 * Same-origin pages linked from a page (<a href>), app-like paths (login, dashboard, admin...) first.
 * Used to load route-specific JavaScript that the entered page never references.
 */
export function extractPageLinks(html: string, pageUrl: string, limit = 8): string[] {
  const base = new URL(pageUrl)
  const here = base.origin + base.pathname
  const out: string[] = []
  const re = /<a\b[^<>]*>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) && out.length < 200) {
    const h = /\bhref\s*=\s*["']([^"'<>]+)["']/i.exec(m[0])
    if (!h) continue
    const href = h[1].trim()
    if (/^(?:mailto|tel|javascript|data):/i.test(href)) continue
    let u: URL
    try {
      u = new URL(href, base)
    } catch {
      continue
    }
    if ((u.protocol !== 'https:' && u.protocol !== 'http:') || u.origin !== base.origin) continue
    u.hash = ''
    if (ASSET_EXT.test(u.pathname) || SKIP_PATH.test(u.pathname)) continue
    const s = u.toString()
    if (u.origin + u.pathname === here || out.includes(s)) continue
    out.push(s)
  }
  const score = (s: string) => (APP_PATH.test(new URL(s).pathname) ? 0 : 1)
  return out
    .map((s, i) => ({ s, i }))
    .sort((a, b) => score(a.s) - score(b.s) || a.i - b.i)
    .map(x => x.s)
    .slice(0, limit)
}

/**
 * Same registrable domain, using the Public Suffix List including its private section, so tenants on shared
 * hosts (alice.lovable.app vs bob.lovable.app, a.vercel.app) and multi-part TLDs (co.uk) stay separate.
 * IP literals only match themselves.
 */
export function sameSite(a: string, b: string): boolean {
  const norm = (h: string) => h.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.+$/, '')
  a = norm(a)
  b = norm(b)
  if (a === b) return true
  if (isIP(a) || isIP(b)) return false
  const da = getDomain(a, { allowPrivateDomains: true })
  return da !== null && da === getDomain(b, { allowPrivateDomains: true })
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
  /** Short hash of the raw value, used only to merge duplicates. Never copy it into a Finding. */
  fp: string
}

export function findSecrets(text: string, where: string): SecretHit[] {
  const hits: SecretHit[] = []
  const seen = new Set<string>()
  for (const p of SECRET_PATTERNS) {
    p.regex.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = p.regex.exec(text))) {
      const v = m[0]
      if (PLACEHOLDER_RE.test(v)) continue
      const key = p.id + v
      if (seen.has(key)) continue
      seen.add(key)
      hits.push({ patternId: p.id, name: p.name, severity: p.severity, fix: p.fix, masked: mask(v), where, fp: createHash('sha256').update(v).digest('hex').slice(0, 16) })
      if (hits.length > 50) return hits
    }
  }
  return hits
}

export type SupabaseKeyKind = 'anon' | 'service_role' | 'publishable' | 'secret' | 'other'

export interface SupabaseRef {
  /** Project API origin, or '' for keys whose project could not be identified. */
  url: string
  keys: {
    kind: SupabaseKeyKind
    value: string
    where: string
    projectRef?: string
    /** Paired by elimination (several projects, nothing tying the key to one); the scan checks it first. */
    candidate?: boolean
  }[]
  /** Only seen as a public storage URL (hot-linked image), never as an API base. */
  storageOnly?: boolean
  /** A non-supabase.co origin found next to a key (custom domain); must be confirmed before probing. */
  unverified?: boolean
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

/** True for a hosted Supabase project API origin (https://<ref or vanity>.supabase.co). */
export function isSupabaseProjectUrl(u: string): boolean {
  try {
    const x = new URL(u)
    return x.protocol === 'https:' && /^[a-z0-9][a-z0-9-]{2,62}\.supabase\.(?:co|in)$/.test(x.hostname)
  } catch {
    return false
  }
}

const SUPA_URL_RE = /https:\/\/([a-z0-9][a-z0-9-]{2,62})\.supabase\.(?:co|in)(?![a-z0-9.-])/g
/** Left boundary makes this linear: a match cannot start inside another base64url run. */
const JWT_RE = /(?<![A-Za-z0-9_-])eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g
const NEW_KEY_RE = /(?<![A-Za-z0-9_-])sb_(publishable|secret)_([A-Za-z0-9_-]{22,128})(?![A-Za-z0-9_-])/g
const SUPA_PLACEHOLDER_RE = /(?:x{6,}|your[_-]|example|placeholder)/i

interface UrlHit {
  url: string
  index: number
  storage: boolean
}

function supabaseUrlsIn(text: string): UrlHit[] {
  const out: UrlHit[] = []
  SUPA_URL_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = SUPA_URL_RE.exec(text))) {
    const end = m.index + m[0].length
    out.push({ url: `https://${m[1]}.supabase.co`, index: m.index, storage: /^\/storage\/v1\/(?:object|render)\//.test(text.slice(end, end + 40)) })
  }
  return out
}

/**
 * Finds Supabase project URLs and API keys (legacy JWT keys and sb_publishable_/sb_secret_ keys) across
 * every body of a site. URLs are collected from all bodies first, so pairing does not depend on file order.
 * Keys without a project ref are paired, in order, with: the nearest project URL in the same file; a custom
 * API origin passed right next to the key (createClient("https://db.example.com", key)); the only project
 * on the site; or, when there are several, every project as a candidate.
 */
export function collectSupabase(bodies: { text: string; where: string }[], acc: SupabaseRef[] = []): SupabaseRef[] {
  const perBody = bodies.map(b => supabaseUrlsIn(b.text))
  const ensure = (url: string): SupabaseRef => {
    let r = acc.find(x => x.url === url)
    if (!r) {
      r = { url, keys: [], storageOnly: true }
      acc.push(r)
    }
    return r
  }
  for (const hits of perBody) for (const h of hits) {
    const r = ensure(h.url)
    if (!h.storage) r.storageOnly = false
  }
  const add = (r: SupabaseRef, key: SupabaseRef['keys'][number]) => {
    if (!r.keys.some(k => k.value === key.value)) r.keys.push(key)
  }

  bodies.forEach((b, bi) => {
    const text = b.text
    const apiHits = perBody[bi].filter(h => !h.storage)
    const pair = (key: SupabaseRef['keys'][number], index: number) => {
      // (a) nearest project URL in the same file: just before the key (createClient(url, key)), else after it.
      if (apiHits.length) {
        const before = apiHits.filter(h => h.index < index)
        const near = before.length && index - before[before.length - 1].index <= 2000 ? before[before.length - 1] : apiHits.find(h => h.index > index) ?? before[before.length - 1]
        return add(ensure(near.url), key)
      }
      // (b) a custom-domain API origin passed as the argument right before the key.
      if (key.kind === 'publishable' || key.kind === 'anon') {
        const lead = text.slice(Math.max(0, index - 300), index)
        const call = /["'`](https:\/\/[a-z0-9.-]+(?::443)?)\/?["'`]\s*,\s*["'`]$/.exec(lead)
        if (call && !/\.supabase\.(?:co|in)$/.test(new URL(call[1]).hostname)) {
          const r = ensure(new URL(call[1]).origin)
          r.storageOnly = false
          r.unverified = true
          return add(r, key)
        }
      }
      const projects = acc.filter(r => r.url && !r.storageOnly && !r.unverified)
      // (c) the only project on the site.
      if (projects.length === 1) return add(projects[0], key)
      // (d) several: a candidate for each; the scan keeps the project that accepts it.
      if (projects.length > 1) return projects.forEach(r => add(r, { ...key, candidate: true }))
      // (e) a nearby https origin when no project URL exists anywhere (custom domain set via a variable).
      if (key.kind === 'publishable' || key.kind === 'anon') {
        const lead = text.slice(Math.max(0, index - 400), index)
        const lits = [...lead.matchAll(/["'`](https:\/\/[a-z0-9.-]+)(?::443)?\/?["'`]/g)]
        if (lits.length) {
          const r = ensure(new URL(lits[lits.length - 1][1]).origin)
          r.storageOnly = false
          r.unverified = true
          return add(r, key)
        }
      }
      let orphan = acc.find(r => !r.url)
      if (!orphan) {
        orphan = { url: '', keys: [] }
        acc.push(orphan)
      }
      add(orphan, key)
    }

    let m: RegExpExecArray | null
    JWT_RE.lastIndex = 0
    while ((m = JWT_RE.exec(text))) {
      const payload = decodeJwtPayload(m[0])
      if (!payload || payload.iss !== 'supabase') continue
      const role = String(payload.role || '')
      // The token is unsigned as far as we can tell, so only accept a real project ref shape as a probe target.
      const ref = typeof payload.ref === 'string' && /^[a-z0-9]{20}$/.test(payload.ref) ? payload.ref : undefined
      const kind: SupabaseKeyKind = role === 'service_role' ? 'service_role' : role === 'anon' ? 'anon' : 'other'
      const key = { kind, value: m[0], where: b.where, projectRef: ref }
      if (ref) {
        const r = ensure(`https://${ref}.supabase.co`)
        r.storageOnly = false
        add(r, key)
      } else pair(key, m.index)
    }
    NEW_KEY_RE.lastIndex = 0
    while ((m = NEW_KEY_RE.exec(text))) {
      if (SUPA_PLACEHOLDER_RE.test(m[2])) continue
      pair({ kind: m[1] === 'secret' ? 'secret' : 'publishable', value: m[0], where: b.where }, m.index)
    }
  })
  return acc
}

/** Single-file form of collectSupabase. */
export function findSupabase(text: string, where: string, acc: SupabaseRef[] = []): SupabaseRef[] {
  return collectSupabase([{ text, where }], acc)
}

/** True when a pk_live_/pk_test_ key decodes to a Clerk frontend API host ("<slug>.clerk.accounts.dev$"). */
export function isClerkPublishableKey(k: string): boolean {
  const m = /^pk_(?:live|test)_([A-Za-z0-9+/=_-]+)$/.exec(k)
  if (!m) return false
  try {
    const decoded = Buffer.from(m[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
    return decoded.endsWith('$') && (decoded.includes('.clerk.') || decoded.includes('clerk.accounts.dev'))
  } catch {
    return false
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
  if (/supabase\.(?:co|in)\b/.test(all)) backend.add('Supabase')
  if (/firebaseio\.com|firebaseapp\.com|apiKey:\s*["']AIza/.test(all)) backend.add('Firebase')
  const pks = [...all.matchAll(/(?<![A-Za-z0-9_])pk_(?:live|test)_[A-Za-z0-9+/=_-]{10,200}/g)].map(m => m[0])
  const clerkKey = pks.some(isClerkPublishableKey)
  if (/js\.stripe\.com/.test(all) || pks.some(k => !isClerkPublishableKey(k))) backend.add('Stripe')
  if (clerkKey || /clerk\.(?:com|accounts)/.test(all)) backend.add('Clerk')
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

/** Lower-case word tokens of a table name, singularised: "userProfiles" -> ["user", "profile"]. */
function tableTokens(name: string): string[] {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map(t => {
      if (/(?:ss|us)$/.test(t)) return t
      if (/(?:sses|xes|ches|shes)$/.test(t)) return t.slice(0, -2)
      if (/ies$/.test(t) && t.length > 4) return t.slice(0, -3) + 'y'
      return t.endsWith('s') && t.length > 3 ? t.slice(0, -1) : t
    })
}

const SENSITIVE_WORDS = new Set(
  'user profile account customer client order payment invoice subscription subscriber billing message chat conversation document file upload note address phone email patient lead contact transaction token secret credential password session employee salary payroll booking appointment wallet payout purchase medical member'.split(' '),
)
const CARD_QUALIFIERS = new Set(['credit', 'debit', 'payment', 'bank', 'saved', 'stored'])
const HEALTH_QUALIFIERS = new Set(['record', 'patient', 'medical', 'data', 'info', 'profile'])

/** Table names that usually hold personal or business data. Whole-word matching, so "leaderboard" is not a lead. */
export function isSensitiveTable(name: string): boolean {
  const tokens = tableTokens(name)
  if (tokens.some(t => SENSITIVE_WORDS.has(t))) return true
  if (tokens.includes('card') && tokens.some(t => CARD_QUALIFIERS.has(t))) return true
  if (tokens.includes('health') && tokens.some(t => HEALTH_QUALIFIERS.has(t))) return true
  // Glued lower-case names ("userprofiles", "chatmessages").
  const flat = name.toLowerCase().replace(/[^a-z]/g, '')
  if (/^(?:leaderboard|scoreboard|flashcard|scorecard|healthcheck|notebook)/.test(flat)) return false
  return /^(?:user|profile|customer|payment|message|chat|patient|employee|creditcard)/.test(flat)
}

const PUBLIC_WORDS = new Set(
  'product image variant category collection tag post blog article page faq testimonial plan pricing tier feature service menu course lesson country city region currency language'.split(' '),
)
const PUBLIC_NAMES = new Set(['menu_items', 'menu_item'])

/** Catalog-style names that are commonly public on purpose (products, categories, blog posts). Sensitive names always win. */
export function isLikelyPublicTable(name: string): boolean {
  if (isSensitiveTable(name)) return false
  if (PUBLIC_NAMES.has(name.toLowerCase())) return true
  const tokens = tableTokens(name)
  return tokens.length > 0 && tokens.every(t => PUBLIC_WORDS.has(t))
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

/** Database function names (/rpc/<name>) listed in a PostgREST OpenAPI document. */
export function rpcFromOpenApi(doc: unknown): string[] {
  if (!doc || typeof doc !== 'object') return []
  const paths = (doc as { paths?: Record<string, unknown> }).paths || {}
  return Object.keys(paths)
    .filter(p => p.startsWith('/rpc/'))
    .map(p => p.slice(5))
    .filter(n => /^[\w.-]+$/.test(n))
}

/** Database functions the app calls through supabase-js: .rpc("get_orders", {...}). Never invoked by the scan. */
export function rpcFromCode(js: string, limit = 20): string[] {
  const out = new Set<string>()
  const re = /\.rpc\(\s*["'`]([A-Za-z_]\w{0,62})["'`]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(js)) && out.size < limit) out.add(m[1])
  return [...out]
}

/**
 * Table names the app itself queries through supabase-js: .from("todos"), .from('profiles').
 * Storage calls (storage.from("bucket")) are excluded.
 */
export function tablesFromCode(js: string, limit = 40): string[] {
  const out = new Set<string>()
  const re = /(storage\s*\.\s*)?\.from\(\s*["'`]([A-Za-z_][\w]{0,62})["'`]\s*\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(js)) && out.size < limit) {
    if (m[1]) continue
    const before = js.slice(Math.max(0, m.index - 12), m.index)
    if (/storage\s*$|Array\s*$|Buffer\s*$/.test(before)) continue
    out.add(m[2])
  }
  return [...out]
}

/** "0-0/123" or "* /0" style Content-Range -> total count, or null. */
export function countFromContentRange(h: string | null): number | null {
  if (!h) return null
  const m = /\/(\d+|\*)\s*$/.exec(h)
  if (!m || m[1] === '*') return null
  return Number(m[1])
}
