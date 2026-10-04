import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo.ts'
import { renderMarkdownFile } from '@/lib/markdown.ts'

export const metadata: Metadata = { title: 'Terms of use', ...pageMeta('/terms') }

export default async function TermsPage() {
  const html = await renderMarkdownFile('business/legal/site-terms.md')
  return <div className="wrap"><article className="prose page-head" dangerouslySetInnerHTML={{ __html: html }} /></div>
}
