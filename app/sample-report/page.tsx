import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo.ts'
import Link from 'next/link'
import { renderMarkdownFile } from '@/lib/markdown.ts'
import { PRICES, usd } from '@/lib/config.ts'

export const metadata: Metadata = {
  title: 'Sample diagnosis report',
  description: 'See exactly what the 48-hour Ship-Ready Diagnosis delivers: findings ranked by severity, evidence, fixes and a fixed-price quote.',
  ...pageMeta('/sample-report'),
}

export default async function SampleReportPage() {
  const html = await renderMarkdownFile('business/sample-report.md')
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Sample report</p>
        <h1>This is what the {usd(PRICES.diagnosis)} diagnosis looks like.</h1>
        <p className="lede">An example report for a fictional app, so you can see the format before you buy. Real reports also come with a 10-minute video walkthrough.</p>
        <div className="btn-row">
          <Link href="/diagnosis" className="btn btn-primary">Book your diagnosis</Link>
          <Link href="/scan" className="btn btn-secondary">Run the free scan first</Link>
        </div>
      </div>
      <article className="card prose" style={{ padding: 'clamp(20px, 4vw, 40px)', maxWidth: 860 }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
