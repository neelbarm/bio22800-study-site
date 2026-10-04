import { safeFetch, assertPublicUrl, normalizeTarget, ScanBlockedError, type FetchResult } from './net.ts'
import {
  checkHeaders,
  collectSupabase,
  countFromContentRange,
  detectPlatform,
  extractChunkUrls,
  extractPageLinks,
  extractScripts,
  findSecrets,
  isLikelyPublicTable,
  isSensitiveTable,
  isSupabaseProjectUrl,
  rpcFromCode,
  rpcFromOpenApi,
  scoreFindings,
  tablesFromCode,
  tablesFromOpenApi,
  type SupabaseRef,
} from './analyze.ts'
import { mask } from './patterns.ts'
import { SEVERITY_ORDER, type Finding, type ScanResult, type Severity } from './types.ts'

const MAX_SCRIPTS = 40
const MAX_PAGES = 6
const MAX_TOTAL_BYTES = 20_000_000
const MAX_TABLES = 15
/** App routes worth loading on Next.js sites, where each route ships its own chunks. */
const COMMON_PATHS = ['/login', '/signin', '/sign-in', '/dashboard', '/app', '/admin', '/account']
const PUBLIC_ENV_PREFIX = /^(?:VITE_|NEXT_PUBLIC_|PUBLIC_|REACT_APP_|EXPO_PUBLIC_|NUXT_PUBLIC_|GATSBY_)/

export interface ScanOptions {
  /** Inject a fetcher for tests. */
  fetcher?: typeof safeFetch
  deadlineMs?: number
  /** Called with the final page URL (after redirects) before anything else is fetched. Throw to stop the scan. */
  onFinalUrl?: (finalUrl: string) => void | Promise<void>
}

export async function scanUrl(rawUrl: string, opts: ScanOptions = {}): Promise<ScanResult> {
  const started = Date.now()
  const deadline = started + (opts.deadlineMs ?? 22_000)
  const remaining = () => deadline - Date.now()
  const base = opts.fetcher ?? safeFetch
  // Every request in the scan, however deep, shares the scan's deadline.
  const get: typeof safeFetch = (u, o = {}) => base(u, { ...o, deadline: Math.min(o.deadline ?? Infinity, deadline) })
  const findings: Finding[] = []
  const passed: string[] = []
  const notes: string[] = []

  let normalized: string
  try {
    normalized = normalizeTarget(rawUrl).toString()
  } catch {
    throw new ScanBlockedError('That does not look like a valid URL.')
  }
  if (!opts.fetcher) await assertPublicUrl(normalized)

  const page = await get(normalized, { timeoutMs: 10_000 })
  if (page.status >= 400) throw new Error(`The site returned HTTP ${page.status}. Make sure the URL is public and try again.`)
  const finalUrl = page.url
  await opts.onFinalUrl?.(finalUrl)
  const origin = new URL(finalUrl).origin
  const isHttps = finalUrl.startsWith('https:')

  if (!isHttps) {
    findings.push({
      id: 'no-https',
      severity: 'high',
      title: 'Site is served over plain HTTP',
      detail: 'Passwords, session tokens and payment details can be read or changed by anyone on the same network.',
      fix: 'Serve the app only over HTTPS. Vercel and Netlify do this automatically on your production domain.',
      where: finalUrl,
    })
  } else passed.push('Served over HTTPS')

  // Collect JavaScript: inline scripts, script tags, a few linked pages' scripts, and chunks they import.
  const { urls, inline } = extractScripts(page.text, finalUrl)
  const bodies: { where: string; text: string }[] = [{ where: finalUrl, text: page.text }]
  inline.forEach((t, i) => bodies.push({ where: `${finalUrl} (inline script ${i + 1})`, text: t }))
  // Fetch order: scripts only other pages load (few, route-specific), then the entered page's own scripts,
  // then chunks found inside scripts. Shared framework chunks cannot starve route code this way.
  const routeQueue: string[] = []
  const entryQueue = [...urls]
  const chunkQueue: string[] = []
  const queues = [routeQueue, entryQueue, chunkQueue]
  const fetched = new Set<string>()
  const queued = (u: string) => fetched.has(u) || queues.some(q => q.includes(u))
  let totalBytes = page.bytes

  // Next.js App Router ships each route's client code only from that route's HTML, so load a few pages.
  const looksNext = /\/_next\/|self\.__next_f/.test(page.text)
  const scannedPages: string[] = []
  const pageCandidates = [...extractPageLinks(page.text, finalUrl)]
  if (looksNext) for (const p of COMMON_PATHS) pageCandidates.push(new URL(p, origin).toString())
  const pagesToTry = [...new Set(pageCandidates)].filter(u => u !== finalUrl && u !== normalized).slice(0, MAX_PAGES)
  if (pagesToTry.length && remaining() > 12_000) {
    const results = await Promise.all(pagesToTry.map(u => get(u, { timeoutMs: 5000, maxBytes: 2_000_000 }).catch(() => null)))
    results.forEach((r, i) => {
      if (!r || r.status >= 400) return
      let finalPage: URL
      try {
        finalPage = new URL(r.url)
      } catch {
        return
      }
      if (finalPage.origin !== origin) return // redirected off-site (auth provider, other domain)
      const ct = r.headers.get('content-type')
      if (ct && !/html/i.test(ct)) return
      if (r.text === page.text) return // SPA fallback: same shell as the entered page
      totalBytes += r.bytes
      const found = extractScripts(r.text, r.url)
      bodies.push({ where: r.url, text: r.text })
      found.inline.forEach((t, j) => bodies.push({ where: `${r.url} (inline script ${j + 1})`, text: t }))
      for (const u of found.urls) if (!queued(u)) routeQueue.push(u)
      scannedPages.push(new URL(pagesToTry[i]).pathname)
    })
  }
  if (scannedPages.length) notes.push(`Also checked these pages: ${scannedPages.join(', ')}.`)
  else if (looksNext) notes.push('Only the page you entered was checked; code for other pages (like /login or /dashboard) was not loaded.')

  const sourceMapCandidates: string[] = []
  const pending = () => queues.some(q => q.length)
  while (pending() && fetched.size < MAX_SCRIPTS && totalBytes < MAX_TOTAL_BYTES && remaining() > 6000) {
    const batch: string[] = []
    while (batch.length < Math.min(5, MAX_SCRIPTS - fetched.size) && pending()) {
      const u = queues.find(q => q.length)!.shift()!
      if (!fetched.has(u) && !batch.includes(u)) batch.push(u)
    }
    batch.forEach(u => fetched.add(u))
    // A batch started late must not run past the time reserved for the remaining checks.
    const timeoutMs = Math.max(500, Math.min(8000, remaining() - 6000))
    const results = await Promise.all(batch.map(u => get(u, { timeoutMs, maxBytes: 5_000_000 }).then(r => ({ u, r })).catch(() => null)))
    for (const item of results) {
      if (!item || item.r.status >= 400) continue
      totalBytes += item.r.bytes
      bodies.push({ where: item.u, text: item.r.text })
      if (/\/\/[#@]\s*sourceMappingURL=(?!data:)\S+/.test(item.r.text.slice(-500))) sourceMapCandidates.push(item.u)
      for (const c of extractChunkUrls(item.r.text, item.u)) if (!queued(c)) chunkQueue.push(c)
    }
  }
  const skipped = new Set(queues.flat().filter(u => !fetched.has(u))).size
  if (skipped) notes.push(`Checked ${fetched.size} JavaScript files; ${skipped} more were skipped to keep the scan fast. The paid diagnosis reviews the full source.`)

  const { platform, backend } = detectPlatform(page.text, bodies.map(b => b.where), page.headers)
  const allText = bodies.map(b => b.text).join('\n')
  const detected = detectPlatform(allText, [], page.headers)
  const platformAll = [...new Set([...platform, ...detected.platform])]
  const backendAll = [...new Set([...backend, ...detected.backend])]
  const hasClerk = backendAll.includes('Clerk')
  const hasStripe = backendAll.includes('Stripe')

  // 1. Secrets in shipped JavaScript. The same key in several files (or in the page and its inline
  // script) is one leak, so merge by value; prefer the most specific location.
  const secretHits = bodies.flatMap(b => findSecrets(b.text, b.where))
  const ordered = [...secretHits.filter(h => h.where !== finalUrl), ...secretHits.filter(h => h.where === finalUrl)]
  const byPattern = new Map<string, typeof secretHits>()
  const seenFp = new Set<string>()
  for (const h of ordered) {
    const k = `${h.patternId}:${h.fp}`
    if (seenFp.has(k)) continue
    seenFp.add(k)
    byPattern.set(h.patternId, [...(byPattern.get(h.patternId) || []), h])
  }
  for (const [, hits] of byPattern) {
    const h = hits[0]
    let id = `secret-${h.patternId}`
    let title = `${h.name} is visible in your site's JavaScript`
    let fix = h.fix
    if ((h.patternId === 'stripe-secret-live' || h.patternId === 'stripe-secret-test') && hasClerk) {
      // Clerk secret keys use the same sk_live_/sk_test_ prefix as Stripe.
      const mode = h.patternId.endsWith('live') ? 'live' : 'test'
      if (!hasStripe) {
        id = `secret-clerk-secret-${mode}`
        title = `Clerk ${mode} secret key is visible in your site's JavaScript`
        fix = "Rotate the secret key in the Clerk Dashboard (API keys), then call Clerk's Backend API only from server code and read the key from a server-only environment variable (no VITE_/NEXT_PUBLIC_ prefix)."
      } else {
        title = `${mode === 'live' ? 'Live' : 'Test'} secret key (sk_${mode}_, used by Stripe and Clerk) is visible in your site's JavaScript`
        fix = 'Roll it in whichever dashboard issued it (Stripe: Developers > API keys; Clerk: API keys), then move the calls that need it to server code and read it from a server-only environment variable.'
      }
    }
    findings.push({
      id,
      severity: h.severity,
      title,
      detail: 'Anything in your front-end code can be read by any visitor with browser dev tools. A leaked key lets others use your account, run up bills or read your data.',
      fix,
      where: h.where,
      evidence: hits.map(x => x.masked).slice(0, 3).join(', '),
    })
  }

  // 2. Supabase.
  const supa = collectSupabase(bodies)
  const leaked = new Map<string, SupabaseRef['keys'][number]>()
  for (const ref of supa) for (const k of ref.keys) if (k.kind === 'service_role' || k.kind === 'secret') leaked.set(k.value, k)
  if (leaked.size) {
    const keys = [...leaked.values()]
    findings.push({
      id: 'supabase-service-key-exposed',
      severity: 'critical',
      title: 'Supabase admin key (service role) is exposed in the browser',
      detail: 'This key bypasses all row-level security. Anyone who opens your site can read, change or delete every row in your database and every file in storage.',
      fix: 'Rotate the key now in Supabase (Project Settings, API). Use only the anon or publishable key in front-end code, and move admin operations into Edge Functions or server routes.',
      where: keys[0].where,
      evidence: keys.map(k => mask(k.value)).slice(0, 3).join(', '),
    })
  }
  const keyLeak = findings.some(f => (f.id.startsWith('secret-') || f.id === 'supabase-service-key-exposed') && (f.severity === 'critical' || f.severity === 'high'))
  if (!keyLeak) passed.push('No high-risk secret keys found in shipped JavaScript')

  const publicKeys = (r: SupabaseRef) => r.keys.filter(k => k.kind === 'anon' || k.kind === 'publishable')
  if (supa.some(r => r.keys.length) && !backendAll.includes('Supabase')) backendAll.push('Supabase')
  const projects = supa
    .filter(r => r.url && !r.storageOnly && (isSupabaseProjectUrl(r.url) || r.unverified))
    .sort((a, b) => Number(publicKeys(b).length > 0) - Number(publicKeys(a).length > 0))
  const supabaseSeen = projects.length > 0 || backendAll.includes('Supabase')
  const rpcNames = new Set(supabaseSeen ? bodies.flatMap(b => rpcFromCode(b.text)) : [])
  if (projects.length) {
    const codeTables = [...new Set(bodies.flatMap(b => tablesFromCode(b.text)))]
    for (const ref of projects.slice(0, 2)) {
      const host = new URL(ref.url).host
      const keys = publicKeys(ref).sort((a, b) => Number(!!a.candidate) - Number(!!b.candidate))
      if (!keys.length) {
        notes.push(`Found Supabase project ${ref.url} but no public key, so the database exposure check was skipped.`)
        continue
      }
      if (remaining() < 4000) {
        notes.push('Ran out of time before checking database exposure. Run the scan again or book the diagnosis.')
        break
      }
      await probeSupabase({ projectUrl: ref.url, host, keys: keys.map(k => k.value), unverified: !!ref.unverified, get, findings, passed, notes, deadline, codeTables, rpcNames })
    }
  } else if (supa.some(r => publicKeys(r).length)) {
    notes.push("Found a Supabase public key, but could not identify which project URL it belongs to, so the database exposure check was skipped.")
  } else if (backendAll.includes('Supabase')) {
    notes.push('Supabase is referenced but the project URL was not found in the scanned files.')
  }
  if (rpcNames.size) {
    const names = [...rpcNames]
    notes.push(
      `Your site calls these database functions directly from the browser: ${names.slice(0, 8).join(', ')}${names.length > 8 ? ` and ${names.length - 8} more` : ''}. The free scan does not run them because they can change data. If any is SECURITY DEFINER and executable by anonymous or logged-in users, it bypasses row-level security. The diagnosis checks each one.`,
    )
  }

  // 3. Exposed files and 4. source maps, together, only if there is time left for them.
  let mapsFound = 0
  if (remaining() < 1500) {
    notes.push('Skipped the exposed-file and source-map checks to finish within the time limit. Run the scan again to include them.')
  } else {
    const mapProbes = sourceMapCandidates.slice(0, 3).map(u =>
      get(`${u}.map`, { method: 'GET', timeoutMs: 5000, maxBytes: 4096 })
        .then(r => r.status === 200 && /"(?:version|sources|mappings)"/.test(r.text))
        .catch(() => false),
    )
    const [env, git, ...maps] = await Promise.all([
      probeEnv(get, `${origin}/.env`),
      probeText(get, `${origin}/.git/config`, t => /\[core\]/.test(t) && /repositoryformatversion/.test(t)),
      ...mapProbes,
    ])
    mapsFound = maps.filter(Boolean).length
    if (env) findings.push(envFinding(env, `${origin}/.env`))
    else passed.push('.env file is not publicly downloadable')
    if (git) {
      findings.push({
        id: 'git-exposed',
        severity: 'high',
        title: 'Your .git folder is publicly accessible',
        detail: 'Attackers can rebuild your full source code and history, including any secrets ever committed.',
        fix: 'Block /.git in your host config and redeploy only the build output folder.',
        where: `${origin}/.git/config`,
      })
    }
  }
  if (mapsFound) {
    findings.push({
      id: 'source-maps-public',
      severity: 'medium',
      title: 'Your original source code is published via source maps',
      detail: 'Source maps let anyone read your un-minified code, including comments and internal logic. This makes finding other weaknesses much easier.',
      fix: 'Turn off production source maps (Vite: build.sourcemap = false; Next.js: productionBrowserSourceMaps = false) or upload them privately to your error tracker.',
      where: sourceMapCandidates[0] + '.map',
    })
  }

  // 5. Headers.
  const hdr = checkHeaders(page.headers, isHttps)
  if (hdr.finding) findings.push(hdr.finding)
  passed.push(...hdr.passed)

  findings.sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity))
  const counts = Object.fromEntries(SEVERITY_ORDER.map(s => [s, findings.filter(f => f.severity === s).length])) as Record<Severity, number>
  const { score, grade } = scoreFindings(findings)
  notes.push("This free scan only sees what your live site sends to browsers. It cannot see server code, Supabase policies on tables your site's code does not mention, storage rules, auth flows or payment webhooks. The paid diagnosis covers those.")
  return {
    url: normalized,
    finalUrl,
    checkedAt: new Date().toISOString(),
    platform: platformAll,
    backend: backendAll,
    score,
    grade,
    counts,
    findings,
    passed,
    notes,
    stats: { scripts: fetched.size, bytes: totalBytes, ms: Date.now() - started },
  }
}

async function probeText(get: typeof safeFetch, url: string, test: (t: string) => boolean): Promise<boolean> {
  try {
    const r = await get(url, { timeoutMs: 5000, maxBytes: 8192 })
    return r.status === 200 && test(r.text)
  } catch {
    return false
  }
}

/** The .env response when the host serves a real dotenv file, else null. */
async function probeEnv(get: typeof safeFetch, url: string): Promise<FetchResult | null> {
  try {
    const r = await get(url, { timeoutMs: 5000, maxBytes: 8192 })
    return r.status === 200 && /^\s*[A-Z][A-Z0-9_]{2,}\s*=\s*\S+/m.test(r.text) && !/<html|<!doctype/i.test(r.text) ? r : null
  } catch {
    return null
  }
}

/** Grades an exposed .env: browser-public values only (VITE_ etc.) is a hygiene problem; anything else is critical. */
function envFinding(r: FetchResult, where: string): Finding {
  const vars: string[] = []
  for (const line of r.text.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line)
    if (!m) continue
    const value = m[2].trim().replace(/^(["'])(.*)\1$/, '$2')
    if (value) vars.push(m[1])
  }
  const hits = findSecrets(r.text, where).filter(h => h.severity === 'critical' || h.severity === 'high')
  const supa = collectSupabase([{ text: r.text, where }])
  const hasSecret = hits.length > 0 || supa.some(x => x.keys.some(k => k.kind === 'service_role' || k.kind === 'secret'))
  const names = vars.slice(0, 8).join(', ') + (vars.length > 8 ? ', …' : '')
  if (vars.length && !r.truncated && !hasSecret && vars.every(v => PUBLIC_ENV_PREFIX.test(v))) {
    return {
      id: 'env-file-exposed',
      severity: 'low',
      title: 'Your host serves dotfiles (.env is downloadable)',
      detail: 'The file currently holds only browser-public values (the kind your JavaScript already contains), but any server secret added to it later would be public too.',
      fix: 'Deploy only the build output (dist or .next) and block dotfiles in your host config. No key rotation is needed for these public values.',
      where,
      evidence: names,
    }
  }
  const masked = [...hits.map(h => h.masked), ...supa.flatMap(x => x.keys.filter(k => k.kind === 'service_role' || k.kind === 'secret').map(k => mask(k.value)))]
  return {
    id: 'env-file-exposed',
    severity: 'critical',
    title: 'Your .env file can be downloaded by anyone',
    detail: 'Environment files usually hold database passwords and API keys. Anyone can fetch it from your domain.',
    fix: 'Remove .env from the deployed files, add it to .gitignore, and rotate every key it contains.',
    where,
    evidence: [names, ...masked.slice(0, 3)].filter(Boolean).join(' · ') || undefined,
  }
}

interface ProbeInput {
  projectUrl: string
  host: string
  keys: string[]
  /** A custom domain found next to the key: only probe it once it answers like Supabase Auth. */
  unverified: boolean
  get: typeof safeFetch
  findings: Finding[]
  passed: string[]
  notes: string[]
  deadline: number
  codeTables: string[]
  rpcNames: Set<string>
}

/**
 * Read-only checks with the public key the site already ships to every visitor:
 * 1) auth settings (is email confirmation off? anonymous sign-ins?), 2) table names from the app's own
 * .from() calls, plus the API's listing if it still shows one, 3) for each table, a HEAD request with a
 * row count to learn whether anonymous visitors can read rows. No row data is ever downloaded, and
 * database functions (.rpc) are never called.
 */
async function probeSupabase(p: ProbeInput): Promise<void> {
  const { projectUrl, host, get, findings, passed, notes, deadline } = p
  const hdrs = (key: string) => ({ apikey: key, authorization: `Bearer ${key}`, accept: 'application/json' })

  // The OpenAPI listing (blocked for public keys on hosted Supabase since April 2025) runs alongside auth settings.
  const listing = p.unverified
    ? Promise.resolve(null)
    : get(`${projectUrl}/rest/v1/`, { headers: { ...hdrs(p.keys[0]), accept: 'application/openapi+json, application/json' }, timeoutMs: 4000, maxBytes: 2_000_000 }).catch(() => null)

  // 1. Pick a key the project accepts and read its auth settings.
  let key: string | null = null
  let settings: Record<string, unknown> | null = null
  let rejected = 0
  for (const k of p.keys.slice(0, 3)) {
    const s = await get(`${projectUrl}/auth/v1/settings`, { headers: hdrs(k), timeoutMs: 6000, maxBytes: 65536 }).catch(() => null)
    if (s && (s.status === 401 || s.status === 403)) {
      rejected++
      continue
    }
    let parsed: unknown = null
    if (s && s.status === 200) {
      try {
        parsed = JSON.parse(s.text)
      } catch {
        /* not JSON */
      }
    }
    const obj = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null
    const looksLikeAuth = !!obj && ((typeof obj.external === 'object' && obj.external !== null) || typeof obj.disable_signup === 'boolean')
    if (p.unverified && !looksLikeAuth) continue
    key = k
    settings = obj
    break
  }
  if (!key) {
    if (p.unverified) notes.push(`Found a Supabase public key next to ${host}, but could not confirm it is a Supabase API (custom domain?), so the database exposure check was skipped.`)
    else if (rejected) notes.push(`The public key in your site was rejected by ${host} (it may belong to another project or be a disabled legacy key), so the database exposure check could not run. The diagnosis checks it directly.`)
    else notes.push(`Could not reach ${host} to check database exposure. Run the scan again or book the diagnosis.`)
    await listing
    return
  }
  const headers = hdrs(key)

  if (settings) {
    const ext = (typeof settings.external === 'object' && settings.external !== null ? settings.external : {}) as Record<string, unknown>
    const emailOn = ext.email !== false // missing = assume enabled (older or self-hosted responses)
    if (settings.disable_signup === true) {
      passed.push('Public sign-ups are disabled')
    } else {
      if (emailOn && settings.mailer_autoconfirm === true) {
        findings.push({
          id: 'supabase-autoconfirm',
          severity: 'low',
          title: 'Anyone can sign up without confirming their email',
          detail: 'Email confirmation is off, so people can create accounts with addresses they do not own. Combined with loose table policies, this lets strangers get "logged-in" access quickly.',
          fix: 'In Supabase Auth settings, turn on "Confirm email" unless you have a specific reason not to.',
          where: `${host}/auth/v1/settings`,
        })
      } else if (emailOn && settings.mailer_autoconfirm === false) {
        passed.push('Email confirmation is required for new accounts')
      }
      if (ext.anonymous_users === true) {
        findings.push({
          id: 'supabase-anonymous-signins',
          severity: 'low',
          title: 'Anyone can get a logged-in session without an account',
          detail: 'Anonymous sign-ins are on. Anonymous users get the same "authenticated" database role as real users, so any table policy that allows "authenticated" users (instead of checking auth.uid() or the is_anonymous claim) is open to anyone on the internet.',
          fix: "Turn off anonymous sign-ins in Supabase Auth settings if you do not use them. If you do, add \"(auth.jwt()->>'is_anonymous')::boolean is false\" to policies meant for real accounts, and enable CAPTCHA.",
          where: `${host}/auth/v1/settings`,
        })
      }
    }
  }

  // 2. Table names: the app's own .from() calls, plus the API listing if it is still exposed.
  let listed: string[] = []
  const r = await listing
  if (r && r.status === 200) {
    try {
      const doc = JSON.parse(r.text)
      listed = tablesFromOpenApi(doc)
      for (const n of rpcFromOpenApi(doc)) p.rpcNames.add(n)
    } catch {
      /* listing is optional */
    }
    if (listed.length) {
      findings.push({
        id: 'supabase-schema-public',
        severity: 'low',
        title: 'Your full database schema is readable by anyone',
        detail: 'Hosted Supabase stopped showing the table listing to public keys in April 2025, so a listing here means an older self-hosted version or a proxy is exposing every table name and column.',
        fix: 'Update self-hosted Supabase/PostgREST, or block anonymous access to the API root path.',
        where: `${host}/rest/v1/`,
      })
    }
  }
  const tables = [...new Set([...p.codeTables, ...listed])]
  if (!tables.length) {
    notes.push(
      p.rpcNames.size
        ? 'No table names were found; the app appears to read data through the database functions listed below.'
        : 'Could not find any table names to test (none were found in the code). The diagnosis checks every table directly.',
    )
    return
  }

  // 3. Row counts. Only a clear answer counts: rows (readable), zero rows or a permission error (protected).
  const readable: { name: string; count: number; estimated?: boolean }[] = []
  const protectedTables: string[] = []
  const inconclusive: { name: string; reason: string }[] = []
  let hitDeadline = false
  const head = (t: string, prefer: string) =>
    get(`${projectUrl}/rest/v1/${encodeURIComponent(t)}?select=*`, {
      method: 'HEAD',
      headers: { ...headers, prefer, range: '0-0', 'range-unit': 'items' },
      timeoutMs: 6000,
    }).catch(() => null)
  const classify = async (t: string, res: FetchResult | null): Promise<void> => {
    if (res && (res.status === 200 || res.status === 206)) {
      const n = countFromContentRange(res.headers.get('content-range'))
      if (n === null) inconclusive.push({ name: t, reason: 'no row count returned' })
      else if (n > 0) readable.push({ name: t, count: n })
      else protectedTables.push(t)
      return
    }
    if (res && res.status === 404) return // not a table (or not exposed): leave it out of the count
    if (res && (res.status === 401 || res.status === 403)) {
      // HEAD has no body; a tiny GET (limit=0, no rows) reads the PostgREST error code.
      const g = await get(`${projectUrl}/rest/v1/${encodeURIComponent(t)}?select=*&limit=0`, { headers, timeoutMs: 4000, maxBytes: 4096 }).catch(() => null)
      let code = ''
      try {
        code = String(JSON.parse(g?.text || '').code || '')
      } catch {
        /* no JSON body */
      }
      if (code === '42501') protectedTables.push(t)
      else inconclusive.push({ name: t, reason: res.status === 401 ? 'key rejected' : 'access denied' })
      return
    }
    if (!res || res.status >= 500) {
      // Big tables can hit the anon statement timeout on an exact count; a planned count is cheap.
      if (Date.now() < deadline - 2500) {
        const again = await head(t, 'count=planned')
        const n = again && (again.status === 200 || again.status === 206) ? countFromContentRange(again.headers.get('content-range')) : null
        if (n && n > 0) {
          readable.push({ name: t, count: n, estimated: true })
          return
        }
      }
      inconclusive.push({ name: t, reason: !res ? 'no response' : 'database timed out or errored' })
      return
    }
    inconclusive.push({ name: t, reason: res.status === 429 ? 'rate limited' : `HTTP ${res.status}` })
  }
  const toCheck = tables.slice(0, MAX_TABLES)
  for (let i = 0; i < toCheck.length; i += 5) {
    if (Date.now() > deadline - 2500) {
      notes.push(`Checked ${i} of ${tables.length} tables before the time limit.`)
      hitDeadline = true
      break
    }
    const batch = toCheck.slice(i, i + 5)
    const res = await Promise.all(batch.map(t => head(t, 'count=exact')))
    await Promise.all(batch.map((t, j) => classify(t, res[j])))
  }
  if (tables.length > MAX_TABLES) notes.push(`Found ${tables.length} tables; the free scan checked the first ${MAX_TABLES}.`)
  if (inconclusive.length) {
    notes.push(`Could not verify ${inconclusive.map(x => `${x.name} (${x.reason})`).join(', ')}; the diagnosis checks these directly.`)
  }

  if (!readable.length) {
    if (protectedTables.length && !inconclusive.length && !hitDeadline) {
      passed.push(`None of the ${protectedTables.length} tables checked return rows to anonymous visitors`)
    }
    return
  }
  const sensitive = readable.filter(x => isSensitiveTable(x.name))
  const publicish = readable.filter(x => !isSensitiveTable(x.name) && isLikelyPublicTable(x.name))
  const unknown = readable.filter(x => !sensitive.includes(x) && !publicish.includes(x))
  const severity: Severity = sensitive.length ? 'critical' : unknown.length ? 'high' : 'medium'
  const fmt = (x: { name: string; count: number; estimated?: boolean }) =>
    `${x.name} (${x.estimated ? `about ${x.count.toLocaleString('en-US')} rows, estimated` : `${x.count.toLocaleString('en-US')} rows`})`
  if (severity === 'medium') {
    findings.push({
      id: 'supabase-tables-public',
      severity,
      title: `${readable.length} table${readable.length > 1 ? 's are' : ' is'} publicly readable: confirm this is intended`,
      detail: `Using only the public key your site gives every visitor, these tables return rows: ${readable.map(fmt).join(', ')}. That is fine for a catalog or blog, but only if row-level security (RLS) is on with a read-only (SELECT) policy. If RLS is off, anyone can probably also add, change or delete these rows.`,
      fix: 'In Supabase > Authentication > Policies, confirm RLS is enabled on these tables and that anonymous visitors have only a SELECT policy.',
      where: `${host}/rest/v1`,
    })
    return
  }
  const list = [...sensitive, ...unknown].map(fmt).join(', ') + (publicish.length ? `; likely intentional: ${publicish.map(fmt).join(', ')}` : '')
  findings.push({
    id: 'supabase-tables-public',
    severity,
    title: `${readable.length} database table${readable.length > 1 ? 's are' : ' is'} readable by anyone on the internet`,
    detail: `Using only the public key your site gives every visitor, these tables return rows: ${list}. If any of them hold personal, customer or business data, that data is effectively public. This usually means row-level security (RLS) is off or a policy allows everyone to read.`,
    fix: 'Enable RLS on every table in the public schema and add policies that limit reads to the right users (for example auth.uid() = user_id). Tables that really are public (like a product catalog) can keep a read-only policy. We confirm which is which in the diagnosis.',
    where: `${host}/rest/v1`,
  })
}
