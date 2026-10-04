import type { Metadata } from 'next'
import ScanClient from '@/components/ScanClient.tsx'
import { config } from '@/lib/config.ts'

export const metadata: Metadata = {
  title: 'Free security scan for Lovable, Bolt and Supabase apps',
  description: 'Check in 60 seconds whether your AI-built app leaks API keys, exposes database tables or ships source maps. Free, no signup.',
}

export default function ScanPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Free Ship-Ready Scan</p>
        <h1>What does your live app expose to anyone?</h1>
        <p className="lede">
          Paste the URL of your deployed app. We load it like a visitor would and check the code it ships, your Supabase tables, exposed files and security headers. Takes about a minute.
        </p>
      </div>
      <ScanClient brand={config.brand} />
    </div>
  )
}
