import { safeFetch, assertPublicUrl } from './net.ts'
import {
  checkHeaders,
  countFromContentRange,
  detectPlatform,
  extractChunkUrls,
  extractScripts,
  findSecrets,
  findSupabase,
  isSensitiveTable,
  scoreFindings,
  tablesFromCode,
  tablesFromOpenApi,
  type SupabaseRef,
} from './analyze.ts'
import { mask } from './patterns.ts'
import { SEVERITY_ORDER, type Finding, type ScanResult, type Severity } from './types.ts'

const MAX_SCRIPTS = 25
const MAX_TOTAL_BYTES = 20_000_000
const MAX_TABLES = 15

export interface ScanOptions {
  /** Inject a fetcher for tests. */
  fetcher?: typeof safeFetch
  deadlineMs?: number
}

export async function scanUrl(rawUrl: string, opts: ScanOptions = {}): Promise<ScanResult> {
  const started = Date.now()
  const deadline = started + (opts.deadlineMs ?? 22_000)
  const get = opts.fetcher ?? safeFetch
  const findings: Finding[] = []
  const passed: string[] = []
  const notes: string[] = []

  const normalized = /^https?:\/\//i.test(rawUrl.trim()) ? rawUrl.trim() : `https://${rawUrl.trim()}`
  if (!opts.fetcher) await assertPublicUrl(normalized)

  const page = await get(normalized, { timeoutMs: 10_000 })
  if (page.status >= 400) throw new Error(`The site returned HTTP ${page.status}. Make sure the URL is public and try again.`)
  const finalUrl = page.url
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

  // Collect JavaScript: inline scripts, script tags, and chunks they import.
  const { urls, inline } = extractScripts(page.text, finalUrl)
  const bodies: { where: string; text: string }[] = [{ where: finalUrl, text: page.text }]
  inline.forEach((t, i) => bodies.push({ where: `${finalUrl} (inline script ${i + 1})`, text: t }))
  const queue = [...urls]
  const fetched = new Set<string>()
  let totalBytes = page.bytes
  const sourceMapCandidates: string[] = []
  while (queue.length && fetched.size < MAX_SCRIPTS && totalBytes < MAX_TOTAL_BYTES && Date.now() < deadline - 6000) {
    const batch = queue.splice(0, 5).filter(u => !fetched.has(u))
    batch.forEach(u => fetched.add(u))
    const results = await Promise.all(
      batch.map(u => get(u, { timeoutMs: 8000, maxBytes: 5_000_000 }).then(r => ({ u, r })).catch(() => null)),
    )
    for (const item of results) {
      if (!item || item.r.status >= 400) continue
      totalBytes += item.r.bytes
      bodies.push({ where: item.u, text: item.r.text })
      if (/\/\/[#@]\s*sourceMappingURL=(?!data:)\S+/.test(item.r.text.slice(-500))) sourceMapCandidates.push(item.u)
      for (const c of extractChunkUrls(item.r.text, item.u)) if (!fetched.has(c) && !queue.includes(c)) queue.push(c)
    }
  }
  if (queue.length) notes.push(`Checked ${fetched.size} JavaScript files; ${queue.length} more were skipped to keep the scan fast. The paid diagnosis reviews the full source.`)

  const { platform, backend } = detectPlatform(page.text, bodies.map(b => b.where), page.headers)
  const allText = bodies.map(b => b.text).join('\n')
  const detected = detectPlatform(allText, [], page.headers)
  const platformAll = [...new Set([...platform, ...detected.platform])]
  const backendAll = [...new Set([...backend, ...detected.backend])]

  // 1. Secrets in shipped JavaScript.
  const secretHits = bodies.flatMap(b => findSecrets(b.text, b.where))
  const byPattern = new Map<string, typeof secretHits>()
  for (const h of secretHits) byPattern.set(h.patternId, [...(byPattern.get(h.patternId) || []), h])
  for (const [, hits] of byPattern) {
    const h = hits[0]
    findings.push({
      id: `secret-${h.patternId}`,
      severity: h.severity,
      title: `${h.name} is visible in your site's JavaScript`,
      detail: 'Anything in your front-end code can be read by any visitor with browser dev tools. A leaked key lets others use your account, run up bills or read your data.',
      fix: h.fix,
      where: h.where,
      evidence: hits.map(x => x.masked).slice(0, 3).join(', '),
    })
  }
  if (!secretHits.some(h => h.severity === 'critical' || h.severity === 'high')) passed.push('No high-risk secret keys found in shipped JavaScript')

  // 2. Supabase.
  const supa: SupabaseRef[] = []
  for (const b of bodies) findSupabase(b.text, b.where, supa)
  const projects = supa.filter(r => r.url)
  for (const ref of supa) {
    const leaked = ref.keys.filter(k => k.kind === 'service_role' || k.kind === 'secret')
    if (leaked.length) {
      findings.push({
        id: 'supabase-service-key-exposed',
        severity: 'critical',
        title: 'Supabase admin key (service role) is exposed in the browser',
        detail: 'This key bypasses all row-level security. Anyone who opens your site can read, change or delete every row in your database and every file in storage.',
        fix: 'Rotate the key now in Supabase (Project Settings, API). Use only the anon or publishable key in front-end code, and move admin operations into Edge Functions or server routes.',
        where: leaked[0].where,
        evidence: mask(leaked[0].value),
      })
    }
  }
  if (projects.length) {
    for (const ref of projects.slice(0, 2)) {
      const anon = ref.keys.find(k => k.kind === 'anon' || k.kind === 'publishable')
      if (!anon) {
        notes.push(`Found Supabase project ${ref.url} but no public key, so the database exposure check was skipped.`)
        continue
      }
      if (Date.now() > deadline - 4000) {
        notes.push('Ran out of time before checking database exposure. Run the scan again or book the diagnosis.')
        break
      }
      const codeTables = [...new Set(bodies.flatMap(b => tablesFromCode(b.text)))]
      await probeSupabase(ref.url, anon.value, get, findings, passed, notes, deadline, codeTables)
    }
  } else if (backendAll.includes('Supabase')) {
    notes.push('Supabase is referenced but the project URL was not found in the scanned files.')
  }

  // 3. Exposed files.
  const exposures = await Promise.all([
    probeText(get, `${origin}/.env`, t => /^\s*[A-Z][A-Z0-9_]{2,}\s*=\s*\S+/m.test(t) && !/<html|<!doctype/i.test(t)),
    probeText(get, `${origin}/.git/config`, t => /\[core\]/.test(t) && /repositoryformatversion/.test(t)),
  ])
  if (exposures[0]) {
    findings.push({
      id: 'env-file-exposed',
      severity: 'critical',
      title: 'Your .env file can be downloaded by anyone',
      detail: 'Environment files usually hold database passwords and API keys. Anyone can fetch it from your domain.',
      fix: 'Remove .env from the deployed files, add it to .gitignore, and rotate every key it contains.',
      where: `${origin}/.env`,
    })
  } else passed.push('.env file is not publicly downloadable')
  if (exposures[1]) {
    findings.push({
      id: 'git-exposed',
      severity: 'high',
      title: 'Your .git folder is publicly accessible',
      detail: 'Attackers can rebuild your full source code and history, including any secrets ever committed.',
      fix: 'Block /.git in your host config and redeploy only the build output folder.',
      where: `${origin}/.git/config`,
    })
  }

  // 4. Source maps.
  let mapsFound = 0
  for (const u of sourceMapCandidates.slice(0, 3)) {
    const r = await get(`${u}.map`, { method: 'GET', timeoutMs: 5000, maxBytes: 4096 }).catch(() => null)
    if (r && r.status === 200 && /"(?:version|sources|mappings)"/.test(r.text)) mapsFound++
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
  notes.push('This free scan only sees what your live site sends to browsers. It cannot see server code, Supabase policies on tables it could not list, storage rules, auth flows or payment webhooks. The paid diagnosis covers those.')
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

/**
 * Read-only checks with the public key the site already ships to every visitor:
 * 1) auth settings (is email confirmation off?), 2) which tables the API exposes,
 * 3) for each, a HEAD request with count=exact to learn whether anonymous visitors can read rows.
 * No row data is ever downloaded.
 */
async function probeSupabase(
  projectUrl: string,
  key: string,
  get: typeof safeFetch,
  findings: Finding[],
  passed: string[],
  notes: string[],
  deadline: number,
  codeTables: string[] = [],
): Promise<void> {
  const headers = { apikey: key, authorization: `Bearer ${key}`, accept: 'application/json' }
  const host = new URL(projectUrl).host

  try {
    const s = await get(`${projectUrl}/auth/v1/settings`, { headers, timeoutMs: 6000, maxBytes: 65536 })
    if (s.status === 200) {
      const settings = JSON.parse(s.text)
      if (settings.mailer_autoconfirm === true && settings.disable_signup !== true) {
        findings.push({
          id: 'supabase-autoconfirm',
          severity: 'low',
          title: 'Anyone can sign up without confirming their email',
          detail: 'Email confirmation is off, so people can create accounts with addresses they do not own. Combined with loose table policies, this lets strangers get "logged-in" access quickly.',
          fix: 'In Supabase Auth settings, turn on "Confirm email" unless you have a specific reason not to.',
          where: `${host}/auth/v1/settings`,
        })
      } else passed.push('Email confirmation is required for new accounts')
    }
  } catch {
    /* ignore */
  }

  // Tables come from two places: the API's own listing (if it shows one to anonymous visitors)
  // and the table names the app's code queries. Either is enough to test exposure.
  let listed: string[] = []
  try {
    const r = await get(`${projectUrl}/rest/v1/`, { headers: { ...headers, accept: 'application/openapi+json, application/json' }, timeoutMs: 8000, maxBytes: 2_000_000 })
    if (r.status === 200) listed = tablesFromOpenApi(JSON.parse(r.text))
  } catch {
    /* listing is optional */
  }
  const tables = [...new Set([...codeTables, ...listed])]
  if (!tables.length) {
    notes.push('Could not find any table names to test (the database API does not list them and none were found in the code). The diagnosis checks every table directly.')
    return
  }

  const readable: { name: string; count: number }[] = []
  const toCheck = tables.slice(0, MAX_TABLES)
  for (let i = 0; i < toCheck.length; i += 5) {
    if (Date.now() > deadline - 2500) {
      notes.push(`Checked ${i} of ${tables.length} tables before the time limit.`)
      break
    }
    const batch = toCheck.slice(i, i + 5)
    const res = await Promise.all(
      batch.map(t =>
        get(`${projectUrl}/rest/v1/${encodeURIComponent(t)}?select=*`, {
          method: 'HEAD',
          headers: { ...headers, prefer: 'count=exact', range: '0-0', 'range-unit': 'items' },
          timeoutMs: 6000,
        })
          .then(r => ({ t, r }))
          .catch(() => null),
      ),
    )
    for (const x of res) {
      if (!x) continue
      if (x.r.status === 200 || x.r.status === 206) {
        const n = countFromContentRange(x.r.headers.get('content-range'))
        if (n && n > 0) readable.push({ name: x.t, count: n })
      }
    }
  }
  if (tables.length > MAX_TABLES) notes.push(`Your API exposes ${tables.length} tables; the free scan checked the first ${MAX_TABLES}.`)

  if (!readable.length) {
    passed.push(`None of the ${Math.min(tables.length, MAX_TABLES)} tables checked return rows to anonymous visitors`)
    return
  }
  const sensitive = readable.filter(r => isSensitiveTable(r.name))
  const list = readable.map(r => `${r.name} (${r.count.toLocaleString('en-US')} rows)`).join(', ')
  findings.push({
    id: 'supabase-tables-public',
    severity: sensitive.length ? 'critical' : 'high',
    title: `${readable.length} database table${readable.length > 1 ? 's are' : ' is'} readable by anyone on the internet`,
    detail: `Using only the public key your site gives every visitor, these tables return rows: ${list}. If any of them hold personal, customer or business data, that data is effectively public. This usually means row-level security (RLS) is off or a policy allows everyone to read.`,
    fix: 'Enable RLS on every table in the public schema and add policies that limit reads to the right users (for example auth.uid() = user_id). Tables that really are public (like a product catalog) can keep a read-only policy. We confirm which is which in the diagnosis.',
    where: `${host}/rest/v1`,
  })
}
