import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import { config } from '@/lib/config.ts'
import { OG_BASE } from '@/lib/seo.ts'
import { LEGAL_LINKS } from '@/lib/legal.ts'
import './globals.css'

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: `${config.brand}: make your AI-built app safe to launch`, template: `%s | ${config.brand}` },
  description:
    'Free security scan and fixed-price fixes for apps built with Lovable, Bolt, Base44, v0 and Cursor. We find open databases, leaked keys and broken auth and payments, then fix them.',
  openGraph: OG_BASE,
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0d131b' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="logo" aria-label={`${config.brand} home`}>
              <span className="logo-box" aria-hidden="true" />
              {config.brand}
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href="/#pricing">Pricing</Link>
              <Link href="/sample-report">Sample report</Link>
              <Link href="/agencies">For agencies</Link>
              <Link href="/scan" className="btn btn-primary" style={{ minHeight: 40, padding: '8px 16px', fontSize: 15 }}>
                Free scan
              </Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <span>
              © {new Date().getFullYear()} {config.brand}.{' '}
              {config.contactEmail ? <>Questions: <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a></> : <>Questions? <Link href="/diagnosis">Send us a note</Link>.</>}
            </span>
            <nav aria-label="Footer">
              <Link href="/scan">Free scan</Link>
              <Link href="/diagnosis">Book a diagnosis</Link>
              <Link href="/agencies">Agencies</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href={LEGAL_LINKS.serviceAgreement}>Service agreement</Link>
              <Link href={LEGAL_LINKS.diagnosisTerms}>Diagnosis terms</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  )
}
