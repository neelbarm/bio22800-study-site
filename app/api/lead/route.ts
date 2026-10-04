import { NextResponse } from 'next/server'
import { cleanFields, deliverLead, isEmail, type Lead } from '@/lib/leads.ts'
import { rateLimit, clientIp } from '@/lib/ratelimit.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KINDS: Lead['kind'][] = ['diagnosis', 'sprint', 'agency', 'scan-report', 'contact']
const FIELDS = ['appUrl', 'builder', 'stack', 'users', 'revenue', 'deadline', 'problem', 'repoAccess', 'company', 'clients', 'volume', 'message', 'budget', 'scanScore', 'scanFindings', 'role']

export async function POST(req: Request) {
  const ip = clientIp(req)
  if (!rateLimit(`lead:${ip}`, 8, 3600_000).ok) return NextResponse.json({ error: 'Too many submissions. Please email us instead.' }, { status: 429 })
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
  if (typeof body.website === 'string' && body.website) return NextResponse.json({ ok: true }) // honeypot: pretend success
  const kind = KINDS.includes(body.kind as Lead['kind']) ? (body.kind as Lead['kind']) : 'contact'
  if (!isEmail(body.email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : ''
  const fields = cleanFields(body, FIELDS)
  const ref = `${kind}-${Date.now().toString(36)}`
  await deliverLead({ kind, name, email: String(body.email).trim(), url: fields.appUrl, fields: { ...fields, ref } })
  return NextResponse.json({ ok: true, ref })
}
