import type { Metadata } from 'next'
import Link from 'next/link'
import { loadGuides } from '@/lib/guides.ts'

export const metadata: Metadata = {
  title: 'Guides for shipping AI-built apps safely',
  description: 'Practical guides on Supabase row-level security, leaked keys, Stripe webhooks and launching apps built with Lovable, Bolt and other AI builders.',
}

export default async function GuidesPage() {
  const guides = await loadGuides()
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Guides</p>
        <h1>What we check before an AI-built app goes live</h1>
        <p className="lede">The problems we find most often, how to check for them yourself, and how to fix them.</p>
      </div>
      <div className="grid grid-2">
        {guides.map(g => (
          <article className="card issue" key={g.slug}>
            <h2 style={{ fontSize: 22 }}>
              <Link href={`/guides/${g.slug}`} style={{ color: 'inherit' }}>{g.title}</Link>
            </h2>
            <p>{g.description}</p>
            <Link href={`/guides/${g.slug}`}>Read the guide</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
