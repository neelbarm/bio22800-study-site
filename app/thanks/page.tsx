import type { Metadata } from 'next'
import Link from 'next/link'
import { config } from '@/lib/config.ts'
import { THANKS_STEPS, thanksKind } from '@/lib/thanks.ts'

export const metadata: Metadata = { title: 'Payment received', robots: { index: false } }

type SP = Promise<Record<string, string | string[] | undefined>>

export default async function ThanksPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const kind = thanksKind(sp.p)
  const { lede, steps } = THANKS_STEPS[kind]
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Payment received</p>
        <h1>You're booked. Here's what happens next.</h1>
        <p className="lede">{lede}</p>
      </div>
      <ol className="grid" style={{ gap: 12, paddingLeft: 0, listStyle: 'none', maxWidth: 780 }}>
        {steps.map(([t, b], i) => (
          <li className="card step" key={t}>
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t}</h3>
            <p className="muted" style={{ fontSize: 15.5 }}>{b}</p>
          </li>
        ))}
      </ol>
      {config.calUrl && (
        <p style={{ marginTop: 20 }}>
          <a href={config.calUrl}>Book a 15-minute kickoff call</a> (optional).
        </p>
      )}
      <p className="muted" style={{ marginTop: 24 }}>
        {config.contactEmail ? <>Questions? Email <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>. </> : <>Questions? Reply to your Stripe receipt email and we’ll get it. </>}<Link href="/">Back to home</Link>
      </p>
    </div>
  )
}
