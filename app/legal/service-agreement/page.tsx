import type { Metadata } from 'next'
import Link from 'next/link'
import { renderMarkdownFile } from '@/lib/markdown.ts'
import { LEGAL_LINKS, fillAgreement } from '@/lib/legal.ts'
import { pageMeta } from '@/lib/seo.ts'

export const metadata: Metadata = {
  title: 'Master Services Agreement',
  description: 'The standard agreement that applies to every paid diagnosis, fix sprint and retainer.',
  ...pageMeta(LEGAL_LINKS.serviceAgreement),
}

export default async function ServiceAgreementPage() {
  const html = await renderMarkdownFile('business/legal/master-services-agreement.md', md => fillAgreement(md).replace(/^# .*\n/m, ''))
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Service agreement</p>
        <h1>Master Services Agreement</h1>
        <p className="lede">
          This agreement applies to every paid service: the diagnosis, fix sprints and retainers. Paying a Payment Link or invoice means you accept it, together with the statement of work for that service (for the diagnosis, the <Link href={LEGAL_LINKS.diagnosisTerms}>diagnosis terms</Link>). Questions before you pay? Ask us; we'll answer in plain English.
        </p>
      </div>
      <article className="prose" style={{ maxWidth: 860 }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
