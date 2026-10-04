'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ScanResult, Finding } from '@/lib/scanner/types.ts'
import { scanFailure, scanOutcome } from '@/lib/scan-response.ts'

const STEPS = [
  'Loading your site like a visitor would…',
  'Collecting the JavaScript it ships…',
  'Looking for leaked keys and secrets…',
  'Checking your Supabase tables with the public key…',
  'Checking exposed files and security headers…',
  'Scoring the results…',
]

export default function ScanClient({ brand }: { brand: string }) {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [slow, setSlow] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const consentRef = useRef<HTMLInputElement>(null)

  // Prefill from ?url= after mount. Reading it here (not with useSearchParams) keeps the form in the server HTML.
  useEffect(() => {
    try {
      const u = new URLSearchParams(window.location.search).get('url')
      if (u) setUrl(u.slice(0, 300))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!loading) return
    setStep(0)
    const t = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 3500)
    return () => clearInterval(t)
  }, [loading])

  useEffect(() => {
    if (result) resultRef.current?.focus()
  }, [result])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSlow(false)
    setResult(null)
    if (!consent) {
      setConsentError(true)
      setError('Please confirm you own this app or are authorized to test it.')
      consentRef.current?.focus()
      return
    }
    setLoading(true)
    try {
      const website = (new FormData(e.currentTarget).get('website') as string) || ''
      const r = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url, email, consent, website }),
        signal: AbortSignal.timeout(75_000),
      })
      const outcome = scanOutcome<ScanResult>(r.status, await r.json().catch(() => null))
      if (outcome.kind === 'result') setResult(outcome.result)
      else {
        setSlow(outcome.slow)
        setError(outcome.message)
      }
    } catch (err) {
      const f = scanFailure(err)
      setSlow(f.slow)
      setError(f.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid" style={{ gap: 28 }}>
      <form className="card form" style={{ padding: 24 }} onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="scan-url">Your live app URL</label>
          <div className="scan-bar">
            <input
              id="scan-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="https://your-app.lovable.app"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Scanning…' : 'Scan my app'}
            </button>
          </div>
        </div>
        <div className="field">
          <label htmlFor="scan-email">Email (optional)</label>
          <input id="scan-email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
          <span className="hint">Add it if you want us to follow up on what the scan finds. No newsletter.</span>
        </div>
        <label className="consent" htmlFor="scan-consent">
          <input
            id="scan-consent"
            ref={consentRef}
            type="checkbox"
            checked={consent}
            aria-invalid={consentError || undefined}
            aria-describedby={consentError ? 'scan-error' : undefined}
            onChange={e => {
              setConsent(e.target.checked)
              if (e.target.checked) setConsentError(false)
            }}
          />
          <span>
            I own this app or have permission to test it. I understand the scan makes a small number of read-only requests, including to the app's database API using the public key the site already shares with every visitor, and never downloads data. See the <Link href="/terms">terms</Link>.
          </span>
        </label>
        <div className="hp" aria-hidden="true">
          <label htmlFor="scan-website">Leave this empty</label>
          <input id="scan-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {error && (
          <p className="error" role="alert" id="scan-error">
            {error}
            {slow && (
              <>
                {' '}
                <Link href={`/diagnosis?url=${encodeURIComponent(url)}`}>Book a diagnosis</Link>
              </>
            )}
          </p>
        )}
        {/* Always mounted, so screen readers announce each step as its text changes. */}
        <p className="sr-only" role="status" aria-live="polite">{loading ? STEPS[step] : ''}</p>
        {loading && (
          <div className="progress" aria-hidden="true">
            {STEPS.slice(0, step + 1).map((s, i) => (
              <span key={s} className={i === step ? 'now' : ''}>{i < step ? '✓ ' : '› '}{s}</span>
            ))}
          </div>
        )}
      </form>

      {result && (
        <div className="grid" style={{ gap: 16 }}>
          <Results result={result} brand={brand} email={email} headingRef={resultRef} />
        </div>
      )}
    </div>
  )
}

function Dial({ score }: { score: number }) {
  const r = 56
  const c = 2 * Math.PI * r
  const color = score >= 85 ? 'var(--pass)' : score >= 60 ? 'var(--med)' : 'var(--crit)'
  return (
    <div className="dial" role="img" aria-label={`Ship-ready score ${score} out of 100`}>
      <svg viewBox="0 0 132 132">
        <circle cx="66" cy="66" r={r} fill="none" stroke="var(--rule)" strokeWidth="12" />
        <circle cx="66" cy="66" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(score / 100) * c} ${c}`} />
      </svg>
      <div className="num">
        <span>{score}<small>of 100</small></span>
      </div>
    </div>
  )
}

const GRADE: Record<ScanResult['grade'], { label: string; text: string; cls: string }> = {
  'not-ready': { label: 'Not ready to launch', text: 'We found issues that could expose your data or your accounts right now.', cls: 'sev-critical' },
  risky: { label: 'Risky', text: 'Nothing catastrophic is visible from outside, but there are real gaps to close before you scale.', cls: 'sev-high' },
  ready: { label: 'Looks good from outside', text: 'Nothing serious is visible from the outside. The riskiest problems usually live where a scan can’t see: database policies, auth and payment code.', cls: 'sev-pass' },
}

function Results({ result, brand, email, headingRef }: { result: ScanResult; brand: string; email: string; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  const g = GRADE[result.grade]
  const host = (() => {
    try {
      return new URL(result.finalUrl).host
    } catch {
      return result.finalUrl
    }
  })()
  const serious = result.counts.critical + result.counts.high
  const diagnosisHref = `/diagnosis?url=${encodeURIComponent(result.finalUrl)}&score=${result.score}&serious=${serious}`
  return (
    <>
      <section className="card result-head" aria-label="Scan summary">
        <Dial score={result.score} />
        <div className="grid" style={{ gap: 10 }}>
          <span className={`sev ${g.cls}`} style={{ justifySelf: 'start' }}>{g.label}</span>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: 'clamp(22px, 3vw, 30px)', outline: 'none' }}>
            <span className="sr-only">Scan results for </span>
            {host}
          </h2>
          <p className="muted">{g.text}</p>
          <p className="mono small muted">
            {result.counts.critical} critical · {result.counts.high} high · {result.counts.medium} medium · {result.counts.low} low
            {result.platform.length + result.backend.length > 0 && <> · detected: {[...result.platform, ...result.backend].join(', ')}</>}
          </p>
        </div>
      </section>

      {result.findings.length > 0 && (
        <section className="grid" style={{ gap: 12 }} aria-label="Findings">
          {result.findings.map(f => (
            <FindingCard key={f.id} f={f} />
          ))}
        </section>
      )}

      <section className="card callout" aria-label="Next step">
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)' }}>
          {serious > 0 ? `Want these fixed? Start with a 48-hour diagnosis.` : 'The outside looks clean. The inside is where most problems live.'}
        </h2>
        <p className="muted">
          This scan only sees what your site sends to browsers. The diagnosis reviews your code, every database policy, storage rules, login flows and payment webhooks, then gives you a fixed price to fix what we find. The fee is credited to the fix.
        </p>
        <div className="btn-row">
          <Link href={diagnosisHref} className="btn btn-primary">Book the diagnosis</Link>
          <Link href="/sample-report" className="btn btn-secondary">See a sample report</Link>
        </div>
      </section>

      {result.passed.length > 0 && (
        <section className="card" style={{ padding: 22 }} aria-label="Passed checks">
          <h3 style={{ marginBottom: 10 }}>Passed</h3>
          <ul className="plain-list">
            {result.passed.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="card" style={{ padding: 22 }} aria-label="Notes and limits">
        <h3 style={{ marginBottom: 10 }}>What this scan could not check</h3>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6, color: 'var(--muted)', fontSize: 15 }}>
          {result.notes.map(n => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="mono small muted" style={{ marginTop: 12 }}>
          Checked {result.stats.scripts} JavaScript files ({Math.round(result.stats.bytes / 1024).toLocaleString('en-US')} KB) in {(result.stats.ms / 1000).toFixed(1)}s · {new Date(result.checkedAt).toLocaleString()}
        </p>
      </section>

      <EmailReport result={result} brand={brand} defaultEmail={email} />
    </>
  )
}

function FindingCard({ f }: { f: Finding }) {
  return (
    <article className="finding">
      <span className={`stripe-${f.severity}`} aria-hidden="true" />
      <div className="finding-body">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className={`sev sev-${f.severity}`}>{f.severity}</span>
          <h3>{f.title}</h3>
        </div>
        <p>{f.detail}</p>
        <p className="fix"><strong>Fix: </strong>{f.fix}</p>
        {(f.where || f.evidence) && (
          <p className="where">
            {f.where}
            {f.evidence && <> · {f.evidence}</>}
          </p>
        )}
      </div>
    </article>
  )
}

function EmailReport({ result, brand, defaultEmail }: { result: ScanResult; brand: string; defaultEmail: string }) {
  const [email, setEmail] = useState(defaultEmail)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const sentRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (state === 'sent') sentRef.current?.focus()
  }, [state])
  async function send(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    const r = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kind: 'scan-report',
        email,
        appUrl: result.finalUrl,
        scanScore: String(result.score),
        scanFindings: result.findings.map(f => `[${f.severity}] ${f.title}`).join(' | '),
      }),
    }).catch(() => null)
    const data = r ? await r.json().catch(() => ({})) : {}
    if (r && r.ok) setState('sent')
    else {
      setState('error')
      setMsg(data.error || 'Could not send. Please try again.')
    }
  }
  if (state === 'sent')
    return (
      <p className="success" ref={sentRef} tabIndex={-1}>
        Got it. {brand} will email you a written copy of these results with suggested next steps, usually within one business day.
      </p>
    )
  return (
    <form className="card form" style={{ padding: 22 }} onSubmit={send}>
      <div className="field">
        <label htmlFor="report-email">Want these results with fix steps in your inbox?</label>
        <div className="scan-bar">
          <input id="report-email" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="btn btn-secondary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Email me the results'}</button>
        </div>
      </div>
      {state === 'error' && <p className="error" role="alert">{msg}</p>}
    </form>
  )
}
