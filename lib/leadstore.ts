/**
 * Durable lead storage in a private Vercel Blob store, so no lead is lost even before email or a
 * webhook is configured (Vercel's free plan keeps runtime logs for about an hour).
 * Enabled automatically when the project has a Blob store connected (BLOB_READ_WRITE_TOKEN is set).
 */
import { put, list, get } from '@vercel/blob'

export interface StoredLead {
  id: string
  at: string
  kind: string
  name?: string
  email?: string
  url?: string
  summary?: string
  fields?: Record<string, string>
}

export const leadStoreEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export async function saveLead(lead: Omit<StoredLead, 'id' | 'at'>): Promise<boolean> {
  if (!leadStoreEnabled()) return false
  const at = new Date().toISOString()
  const id = `${at.replace(/[:.]/g, '-')}-${lead.kind}-${Math.random().toString(36).slice(2, 8)}`
  try {
    await put(`leads/${at.slice(0, 7)}/${id}.json`, JSON.stringify({ id, at, ...lead }), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      abortSignal: AbortSignal.timeout(4000),
    })
    return true
  } catch (e) {
    console.error('[leadstore] save failed', (e as Error).message)
    return false
  }
}

/** Newest first. Reads at most `limit` leads. */
export async function listLeads(limit = 200): Promise<StoredLead[]> {
  if (!leadStoreEnabled()) return []
  const blobs: { pathname: string; uploadedAt: Date }[] = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: 'leads/', limit: 1000, cursor })
    blobs.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor && blobs.length < 5000)
  blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
  const out: StoredLead[] = []
  const pick = blobs.slice(0, limit)
  for (let i = 0; i < pick.length; i += 20) {
    const batch = await Promise.all(
      pick.slice(i, i + 20).map(async b => {
        try {
          const r = await get(b.pathname, { access: 'private' })
          if (!r) return null
          return JSON.parse(await new Response(r.stream).text()) as StoredLead
        } catch {
          return null
        }
      }),
    )
    out.push(...(batch.filter(Boolean) as StoredLead[]))
  }
  return out
}
