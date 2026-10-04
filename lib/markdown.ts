import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { marked } from 'marked'
import { config } from './config.ts'

/** Reads a Markdown file from the business/ folder at build time and returns HTML. Replaces [BRAND], [SITE_URL] and [CONTACT_EMAIL]. */
export async function renderMarkdownFile(rel: string): Promise<string> {
  let md: string
  try {
    md = await readFile(path.join(process.cwd(), 'business', rel.replace(/^business\//, '')), 'utf8')
  } catch {
    return `<p>This page is being updated. ${config.contactEmail ? `Email <a href="mailto:${config.contactEmail}">${config.contactEmail}</a> with any questions.` : 'Use the contact form on this site with any questions.'}</p>`
  }
  const L = config.legal
  const legalName = L.name || config.brand
  const contact = config.contactEmail || 'the contact form on this site'
  md = md
    .replace(/\[(?:BRAND|BRAND NAME|COMPANY NAME|ShipReady)\]/g, config.brand)
    .replace(/\[(?:SITE_URL|SITE URL|WEBSITE URL|WEBSITE)\]/g, config.siteUrl)
    .replace(/\[(?:CONTACT_EMAIL|CONTACT EMAIL|EMAIL|PRIVACY EMAIL|SUPPORT EMAIL)\]/g, contact)
    .replace(/\[BUSINESS LEGAL NAME\]/g, legalName)
    .replace(/\[CITY, STATE\]/g, L.location)
    .replace(/\[GOVERNING LAW\]/g, L.state ? `the State of ${L.state}` : `the state in which ${legalName} is based`)
    .replace(/\[VENUE\]/g, L.state ? (L.county ? `${L.county} County, ${L.state}` : L.state) : 'that state')
    .replace(/^\[MAILING ADDRESS\]\s*$/gm, L.address || '')
  const html = marked.parse(md, { async: false, gfm: true }) as string
  return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
}
