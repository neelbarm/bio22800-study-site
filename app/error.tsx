'use client'

import Link from 'next/link'

// Inlined at build time, so the recovery page can show it without loading server config.
const CONTACT = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim()

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Something went wrong</p>
        <h1>This page hit an error.</h1>
        <p className="lede">
          Nothing you sent was lost. Try again, or {CONTACT ? <>email <a href={`mailto:${CONTACT}`}>{CONTACT}</a></> : <>go back to the <Link href="/">home page</Link></>} and we'll sort it out.
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>Try again</button>
          <Link href="/" className="btn btn-secondary">Home</Link>
        </div>
      </div>
    </div>
  )
}
