import type { MetadataRoute } from 'next'
import { config } from '@/lib/config.ts'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/scan', '/diagnosis', '/sample-report', '/agencies', '/privacy', '/terms'].map(p => ({ url: `${config.siteUrl}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }))
}
