import type { Metadata } from 'next'
import { config } from './config.ts'

/** Site-wide Open Graph defaults (the image comes from app/opengraph-image.tsx). */
export const OG_BASE = {
  title: `${config.brand}: make your AI-built app safe to launch`,
  description: 'Free scan for apps built with Lovable, Bolt, Base44, v0 and Cursor. Find open databases and leaked keys in 60 seconds.',
  type: 'website' as const,
  siteName: config.brand,
}

/**
 * Canonical URL and og:url for one page, relative to metadataBase (the resolved site URL). Set per page, never in
 * the root layout, which would make every page canonical to the home page.
 */
export function pageMeta(path: string): Pick<Metadata, 'alternates' | 'openGraph'> {
  return { alternates: { canonical: path }, openGraph: { ...OG_BASE, url: path } }
}
