import { NextResponse } from 'next/server'
import { scanUrl } from '@/lib/scanner/scan.ts'
import { ScanBlockedError } from '@/lib/scanner/net.ts'
import { rateLimit, clientIp } from '@/lib/ratelimit.ts'
import { deliverLead, isEmail } from '@/lib/leads.ts'

export const runtime = 'nodejs'
export const maxDuration = 30
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const ip = clientIp(req)
  const perMinute = rateLimit(`scan-m:${ip}`, 3, 60_000)
  const perDay = rateLimit(`scan-d:${ip}`, 20, 24 * 3600_000)
  if (!perMinute.ok || !perDay.ok) {
    return NextResponse.json({ error: 'Too many scans from your network. Please wait a few minutes and try again.' }, { status: 429, headers: { 'retry-after': String(Math.max(perMinute.retryAfterSec, perDay.retryAfterSec)) } })
  }
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const url = typeof body.url === 'string' ? body.url.trim().slice(0, 500) : ''
  if (!url) return NextResponse.json({ error: 'Enter the URL of your live app.' }, { status: 400 })
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Please confirm you own this app or are authorized to test it.' }, { status: 400 })
  }
  if (typeof body.website === 'string' && body.website) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) // honeypot

  const perTarget = rateLimit(`scan-t:${url.toLowerCase().replace(/^https?:\/\//, '').split('/')[0]}`, 6, 3600_000)
  if (!perTarget.ok) return NextResponse.json({ error: 'This site was scanned several times in the last hour. Please try again later.' }, { status: 429 })

  try {
    const result = await scanUrl(url)
    const email = isEmail(body.email) ? String(body.email).trim() : undefined
    await deliverLead({
      kind: 'scan',
      email,
      url: result.finalUrl,
      summary: `Score ${result.score}/100 (${result.grade}). Critical ${result.counts.critical}, high ${result.counts.high}, medium ${result.counts.medium}, low ${result.counts.low}. Platform: ${[...result.platform, ...result.backend].join(', ') || 'unknown'}.`,
      fields: { findings: result.findings.map(f => `[${f.severity}] ${f.title}`).join(' | ').slice(0, 1500) },
    }).catch(() => {})
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof ScanBlockedError) return NextResponse.json({ error: e.message }, { status: 400 })
    const msg = (e as Error).message || 'Scan failed.'
    return NextResponse.json({ error: /HTTP|timed out|connect|resolve|redirect/i.test(msg) ? msg : 'The scan could not finish. Check that the URL is your live app and try again.' }, { status: 502 })
  }
}
