import type { MetadataRoute } from 'next'
import { config } from '@/lib/config.ts'

export default function robots(): MetadataRoute.Robots {
  // Never index Vercel preview deployments.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return { rules: [{ userAgent: '*', disallow: '/' }] }
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/thanks', '/admin/'] }], sitemap: `${config.siteUrl}/sitemap.xml` }
}
