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
    return `<p>This page is being updated. Email <a href="mailto:${config.contactEmail}">${config.contactEmail}</a> with any questions.</p>`
  }
  md = md
    .replace(/\[(?:BRAND|BRAND NAME|COMPANY NAME|ShipReady)\]/g, config.brand)
    .replace(/\[(?:SITE_URL|WEBSITE URL|WEBSITE)\]/g, config.siteUrl)
    .replace(/\[(?:CONTACT_EMAIL|CONTACT EMAIL|EMAIL|PRIVACY EMAIL|SUPPORT EMAIL)\]/g, config.contactEmail)
  const html = marked.parse(md, { async: false, gfm: true }) as string
  return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
}
