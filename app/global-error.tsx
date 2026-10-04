'use client'

const CONTACT = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim()

/** Last-resort page for errors thrown in the root layout itself. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24, background: '#f3f4f0', color: '#0f1b2d' }}>
        <h1>Something went wrong.</h1>
        <p>
          Try again{CONTACT ? <>, or email <a href={`mailto:${CONTACT}`}>{CONTACT}</a></> : null}.
        </p>
        <button type="button" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
