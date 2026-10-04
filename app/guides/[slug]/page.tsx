import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { loadGuides, renderGuide } from '@/lib/guides.ts'
import { pageMeta } from '@/lib/seo.ts'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return (await loadGuides()).map(g => ({ slug: g.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const g = (await loadGuides()).find(x => x.slug === slug)
  return g ? { title: g.title, description: g.description, ...pageMeta(`/guides/${g.slug}`) } : {}
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params
  const g = (await loadGuides()).find(x => x.slug === slug)
  if (!g) notFound()
  const html = await renderGuide(g)
  return (
    <div className="wrap">
      <article className="prose page-head">
        <p className="eyebrow"><Link href="/guides">Guides</Link></p>
        <h1>{g.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <div className="card callout" style={{ maxWidth: 760 }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)' }}>Check your own app in 60 seconds</h2>
        <p className="muted">Free. No signup. Runs only on apps you own or are authorized to test.</p>
        <div className="btn-row">
          <Link href="/scan" className="btn btn-primary">Run the free scan</Link>
          <Link href="/diagnosis" className="btn btn-secondary">Book a diagnosis</Link>
        </div>
      </div>
    </div>
  )
}
