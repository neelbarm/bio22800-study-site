import { saveLead } from './leadstore.ts'

/**
 * Delivers a lead (form submission or scan) to you. Uses whatever is configured:
 * - LEADS_WEBHOOK_URL: posts JSON (works with Slack/Discord incoming webhooks, Zapier, Make, n8n)
 * - RESEND_API_KEY + LEADS_TO_EMAIL (+ LEADS_FROM_EMAIL): sends you an email
 * - A private Vercel Blob store, if connected: every lead is saved and listed at /admin/leads
 * Always logs to the server console (visible in Vercel logs) as a fallback.
 */
export interface Lead {
  kind: 'diagnosis' | 'sprint' | 'agency' | 'scan' | 'scan-report' | 'contact'
  name?: string
  email?: string
  url?: string
  fields?: Record<string, string>
  summary?: string
}

export async function deliverLead(lead: Lead): Promise<{ delivered: string[] }> {
  const delivered: string[] = []
  const title = `New ${lead.kind} lead${lead.name ? ` from ${lead.name}` : ''}${lead.url ? ` (${lead.url})` : ''}`
  const lines = [
    title,
    lead.email ? `Email: ${lead.email}` : '',
    lead.summary || '',
    ...Object.entries(lead.fields || {}).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
  ].filter(Boolean)
  const text = lines.join('\n')
  console.log('[lead]', JSON.stringify({ ...lead, at: new Date().toISOString() }))
  if (await saveLead(lead)) delivered.push('store')

  const hook = process.env.LEADS_WEBHOOK_URL
  if (hook) {
    try {
      const body = /discord(?:app)?\.com\/api\/webhooks/.test(hook) ? { content: text.slice(0, 1900) } : { text, lead }
      const r = await fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(5000) })
      if (r.ok) delivered.push('webhook')
    } catch (e) {
      console.error('[lead] webhook failed', (e as Error).message)
    }
  }
  const key = process.env.RESEND_API_KEY
  const to = process.env.LEADS_TO_EMAIL
  if (key && to) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEADS_FROM_EMAIL || 'ShipReady <onboarding@resend.dev>',
          to: [to],
          reply_to: lead.email || undefined,
          subject: title.slice(0, 150),
          text,
        }),
        signal: AbortSignal.timeout(6000),
      })
      if (r.ok) delivered.push('email')
      else console.error('[lead] resend error', r.status, await r.text().catch(() => ''))
    } catch (e) {
      console.error('[lead] email failed', (e as Error).message)
    }
  }
  return { delivered }
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[a-z]{2,}$/i
export const isEmail = (s: unknown): s is string => typeof s === 'string' && s.length <= 254 && EMAIL_RE.test(s.trim())

/** Trims and caps every string field; drops non-strings. */
export function cleanFields(input: Record<string, unknown>, allowed: string[], max = 2000): Record<string, string> {
  const out: Record<string, string> = {}
  for (const k of allowed) {
    const v = input[k]
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, max)
    else if (typeof v === 'boolean') out[k] = v ? 'yes' : 'no'
  }
  return out
}
