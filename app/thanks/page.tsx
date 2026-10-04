import type { Metadata } from 'next'
import Link from 'next/link'
import { config } from '@/lib/config.ts'

export const metadata: Metadata = { title: 'Payment received', robots: { index: false } }

export default function ThanksPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Payment received</p>
        <h1>You're booked. Here's what happens next.</h1>
        <p className="lede">Stripe has emailed you a receipt. We'll email you within a few hours (usually much sooner) to confirm and start.</p>
      </div>
      <ol className="grid" style={{ gap: 12, paddingLeft: 0, listStyle: 'none', maxWidth: 780 }}>
        {[
          ['Share the code', 'Invite us as a collaborator on your GitHub repo (read access is enough for the diagnosis), or export the project from your builder and send the zip. We’ll send our GitHub username in the confirmation email.'],
          ['Share database access safely', 'For Supabase: invite us to the project with the read-only or developer role, ideally on a staging copy. Never send passwords or keys by email or chat. We’ll send a secure link if we need anything sensitive.'],
          ['Tell us the important flows', 'Reply with the 3 things users must be able to do (for example: sign up, pay, see only their own data). We test those first.'],
          ['Get your report', 'Within 48 hours of access you get the written report, a video walkthrough and a fixed-price quote for the fixes.'],
        ].map(([t, b], i) => (
          <li className="card step" key={t}>
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t}</h3>
            <p className="muted" style={{ fontSize: 15.5 }}>{b}</p>
          </li>
        ))}
      </ol>
      <p className="muted" style={{ marginTop: 24 }}>
        Questions? Email <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>. <Link href="/">Back to home</Link>
      </p>
    </div>
  )
}
