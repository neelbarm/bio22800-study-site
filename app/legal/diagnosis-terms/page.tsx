import type { Metadata } from 'next'
import Link from 'next/link'
import { renderMarkdownFile } from '@/lib/markdown.ts'
import { LEGAL_LINKS, fillAgreement } from '@/lib/legal.ts'
import { pageMeta } from '@/lib/seo.ts'

export const metadata: Metadata = {
  title: 'Ship-Ready Diagnosis terms',
  description: 'The standard statement of work for the Ship-Ready Diagnosis: scope, timeline, fees, refund and credit rules.',
  ...pageMeta(LEGAL_LINKS.diagnosisTerms),
}

export default async function DiagnosisTermsPage() {
  const html = await renderMarkdownFile('business/legal/sow-diagnosis.md', md => fillAgreement(md).replace(/^# .*\n/m, ''))
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Diagnosis terms</p>
        <h1>Statement of Work: Ship-Ready Diagnosis</h1>
        <p className="lede">
          These are the terms of the Ship-Ready Diagnosis you buy on this site. They sit under our <Link href={LEGAL_LINKS.serviceAgreement}>service agreement</Link>. Paying for a diagnosis means you accept both.
        </p>
      </div>
      <article className="prose" style={{ maxWidth: 860 }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
