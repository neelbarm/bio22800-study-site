import { requireAdmin } from '@/lib/adminauth.ts'
import { leadStoreEnabled, listLeads, type StoredLead } from '@/lib/leadstore.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const csvCell = (s: unknown) => {
  let v = String(s ?? '')
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}` // neutralize spreadsheet formulas
  return `"${v.replace(/"/g, '""')}"`
}

export async function GET(req: Request) {
  const denied = requireAdmin(req)
  if (denied) return denied
  const format = new URL(req.url).searchParams.get('format')
  if (!leadStoreEnabled()) {
    return new Response('Lead storage is not connected. In Vercel: Storage > Create > Blob (private), connect it to this project, then redeploy.', { status: 503 })
  }
  const leads = await listLeads(500)
  if (format === 'csv') {
    const cols = ['at', 'kind', 'name', 'email', 'url', 'summary', 'fields']
    const rows = leads.map(l => [l.at, l.kind, l.name, l.email, l.url, l.summary, JSON.stringify(l.fields || {})].map(csvCell).join(','))
    return new Response([cols.join(','), ...rows].join('\n'), {
      headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="leads.csv"', 'cache-control': 'no-store' },
    })
  }
  const row = (l: StoredLead) => `<tr>
    <td class="m">${esc(l.at.replace('T', ' ').slice(0, 16))}</td>
    <td><span class="k k-${esc(l.kind)}">${esc(l.kind)}</span></td>
    <td>${esc(l.name)}${l.email ? `<br><a href="mailto:${esc(l.email)}">${esc(l.email)}</a>` : ''}</td>
    <td class="m">${l.url ? esc(l.url) : ''}</td>
    <td>${esc(l.summary)}${l.fields ? `<details><summary>details</summary><dl>${Object.entries(l.fields).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></details>` : ''}</td>
  </tr>`
  const counts = leads.reduce<Record<string, number>>((m, l) => ((m[l.kind] = (m[l.kind] || 0) + 1), m), {})
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Leads</title>
<style>
:root{--bg:#f3f4f0;--fg:#0f1b2d;--mu:#566273;--ru:#d8dce1;--sh:#fff;--mk:#f2c230;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#0d131b;--fg:#e7ebf0;--mu:#96a3b4;--ru:#263241;--sh:#141c26;color-scheme:dark}}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif;padding:20px}
h1{margin:0 0 6px}p{color:var(--mu);margin:0 0 16px}.wrap{overflow-x:auto;background:var(--sh);border:1px solid var(--ru);border-radius:10px}
table{border-collapse:collapse;width:100%;min-width:760px}th,td{text-align:left;vertical-align:top;padding:10px 12px;border-bottom:1px solid var(--ru)}
th{font:600 12px ui-monospace,monospace;text-transform:uppercase;color:var(--mu)}.m{font-family:ui-monospace,monospace;font-size:13px;word-break:break-all}
.k{font:600 11px ui-monospace,monospace;text-transform:uppercase;padding:3px 6px;border-radius:4px;background:var(--ru)}.k-diagnosis,.k-agency{background:var(--mk);color:#0f1b2d}
dl{margin:6px 0 0}dt{font-weight:600}dd{margin:0 0 6px;color:var(--mu);white-space:pre-wrap}a{color:inherit}
</style></head><body>
<h1>Leads</h1><p>${leads.length} most recent · ${Object.entries(counts).map(([k, n]) => `${esc(k)}: ${n}`).join(' · ') || 'none yet'} · <a href="?format=csv">Download CSV</a></p>
<div class="wrap"><table><thead><tr><th>When (UTC)</th><th>Type</th><th>Who</th><th>App</th><th>Details</th></tr></thead><tbody>
${leads.map(row).join('') || '<tr><td colspan="5">No leads yet. Share the free scan.</td></tr>'}
</tbody></table></div></body></html>`
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } })
}
