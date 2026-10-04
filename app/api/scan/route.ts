import { NextResponse, after } from 'next/server'
import { scanUrl } from '@/lib/scanner/scan.ts'
import { ScanBlockedError, normalizeTarget, targetHost } from '@/lib/scanner/net.ts'
import { rateLimit, clientIp, RateLimitedError } from '@/lib/ratelimit.ts'
import { deliverLead, isEmail, type Lead } from '@/lib/leads.ts'
import { saveLead } from '@/lib/leadstore.ts'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const TARGET_LIMIT = 6
const TARGET_WINDOW = 3600_000
const TARGET_BUSY = 'This site was scanned several times in the last hour. Please try again later.'

/** Runs lead delivery after the response is sent; falls back to fire-and-forget outside a request scope. */
function background(task: () => Promise<unknown>) {
  const run = () => task().catch(() => {})
  try {
    after(run)
  } catch {
    void run()
  }
}

/** Scan leads reach the alert channel only when the visitor left an email; anonymous scans are just stored. */
function recordScanLead(lead: Lead) {
  background(async () => {
    if (lead.email) await deliverLead(lead)
    else {
      console.log('[lead]', JSON.stringify({ ...lead, at: new Date().toISOString() }))
      await saveLead(lead)
    }
  })
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  const perMinute = rateLimit(`scan-m:${ip}`, 3, 60_000)
  const perDay = rateLimit(`scan-d:${ip}`, 20, 24 * 3600_000)
  if (!perMinute.ok || !perDay.ok) {
    return NextResponse.json({ error: 'Too many scans from your network. Please wait a few minutes and try again.' }, { status: 429, headers: { 'retry-after': String(Math.max(perMinute.retryAfterSec, perDay.retryAfterSec)) } })
  }
  let parsed: unknown
  try {
    parsed = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const body = parsed as Record<string, unknown>
  const url = typeof body.url === 'string' ? body.url.trim().slice(0, 500) : ''
  if (!url) return NextResponse.json({ error: 'Enter the URL of your live app.' }, { status: 400 })
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Please confirm you own this app or are authorized to test it.' }, { status: 400 })
  }
  if (typeof body.website === 'string' && body.website) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) // honeypot

  // Key the per-site limit on the parsed hostname, so "host.", "host:443", "host?x" and "HOST#y" share one bucket.
  let host: string
  try {
    const u = normalizeTarget(url)
    if (!/^https?:$/.test(u.protocol) || u.username || u.password || (u.port && !['80', '443'].includes(u.port))) throw new Error('bad url')
    host = targetHost(u)
    if (!host) throw new Error('bad url')
  } catch {
    return NextResponse.json({ error: 'That does not look like a valid URL.' }, { status: 400 })
  }
  if (!rateLimit(`scan-t:${host}`, TARGET_LIMIT, TARGET_WINDOW).ok) return NextResponse.json({ error: TARGET_BUSY }, { status: 429 })

  const email = isEmail(body.email) ? String(body.email).trim() : undefined
  try {
    const result = await scanUrl(url, {
      // A redirect to another host (for example a wildcard subdomain) is charged to that host too.
      onFinalUrl: finalUrl => {
        const finalHost = targetHost(new URL(finalUrl))
        if (finalHost !== host && !rateLimit(`scan-t:${finalHost}`, TARGET_LIMIT, TARGET_WINDOW).ok) throw new RateLimitedError(TARGET_BUSY)
      },
    })
    recordScanLead({
      kind: 'scan',
      email,
      url: result.finalUrl,
      summary: `Score ${result.score}/100 (${result.grade}). Critical ${result.counts.critical}, high ${result.counts.high}, medium ${result.counts.medium}, low ${result.counts.low}. Platform: ${[...result.platform, ...result.backend].join(', ') || 'unknown'}.`,
      fields: { findings: result.findings.map(f => `[${f.severity}] ${f.title}`).join(' | ').slice(0, 1500) },
    })
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof RateLimitedError) return NextResponse.json({ error: e.message }, { status: 429 })
    if (e instanceof ScanBlockedError) return NextResponse.json({ error: e.message }, { status: 400 })
    const msg = (e as Error).message || 'Scan failed.'
    if (email) recordScanLead({ kind: 'scan', email, url, summary: `Scan failed: ${msg.slice(0, 200)}` })
    return NextResponse.json({ error: /HTTP|timed out|connect|resolve|redirect/i.test(msg) ? msg : 'The scan could not finish. Check that the URL is your live app and try again.' }, { status: 502 })
  }
}
