import type { Metadata } from 'next'
import { renderMarkdownFile } from '@/lib/markdown.ts'

export const metadata: Metadata = { title: 'Privacy policy' }

export default async function PrivacyPage() {
  const html = await renderMarkdownFile('business/legal/site-privacy.md')
  return <div className="wrap"><article className="prose page-head" dangerouslySetInnerHTML={{ __html: html }} /></div>
}
