import type { MetadataRoute } from 'next'
import { config } from '@/lib/config.ts'
import { loadGuides } from '@/lib/guides.ts'
import { LEGAL_LINKS } from '@/lib/legal.ts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = (await loadGuides()).map(g => `/guides/${g.slug}`)
  return ['', '/scan', '/diagnosis', '/sample-report', '/agencies', '/guides', ...guides, '/privacy', '/terms', LEGAL_LINKS.serviceAgreement, LEGAL_LINKS.diagnosisTerms].map(p => ({ url: `${config.siteUrl}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }))
}
