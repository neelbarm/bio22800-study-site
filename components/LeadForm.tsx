'use client'

import { useState } from 'react'

export type FieldDef =
  | { name: string; label: string; type: 'text' | 'email' | 'url'; required?: boolean; placeholder?: string; hint?: string; autoComplete?: string; defaultValue?: string }
  | { name: string; label: string; type: 'textarea'; required?: boolean; placeholder?: string; hint?: string; defaultValue?: string }
  | { name: string; label: string; type: 'select'; options: string[]; required?: boolean; hint?: string; defaultValue?: string }

export interface PaymentOption {
  label: string
  href: string
  note?: string
  primary?: boolean
}

export default function LeadForm({
  kind,
  fields,
  submitLabel,
  successTitle,
  successText,
  payments = [],
  contactEmail,
}: {
  kind: string
  fields: FieldDef[]
  submitLabel: string
  successTitle: string
  successText: string
  payments?: PaymentOption[]
  contactEmail: string
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState<{ email: string; ref: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const body: Record<string, string> = { kind }
    fd.forEach((v, k) => {
      if (typeof v === 'string') body[k] = v
    })
    setState('sending')
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setState('idle')
        return
      }
      setSubmitted({ email: body.email || '', ref: data.ref || '' })
      setState('done')
    } catch {
      setError(`Could not send the form. Please email ${contactEmail} instead.`)
      setState('idle')
    }
  }

  if (state === 'done' && submitted) {
    return (
      <div className="card callout" role="status">
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)' }}>{successTitle}</h2>
        <p className="muted">{successText}</p>
        {payments.length > 0 && (
          <div className="grid" style={{ gap: 10 }}>
            {payments.map(p => {
              const u = new URL(p.href)
              if (submitted.email) u.searchParams.set('prefilled_email', submitted.email)
              if (submitted.ref) u.searchParams.set('client_reference_id', submitted.ref)
              return (
                <div key={p.label} className="grid" style={{ gap: 4 }}>
                  <a className={`btn ${p.primary ? 'btn-primary' : 'btn-secondary'}`} href={u.toString()} style={{ justifySelf: 'start' }}>{p.label}</a>
                  {p.note && <span className="note">{p.note}</span>}
                </div>
              )
            })}
          </div>
        )}
        <p className="note">Reference: <span className="mono">{submitted.ref}</span>. Questions? <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      </div>
    )
  }

  return (
    <form className="card form" style={{ padding: 24 }} onSubmit={onSubmit}>
      {fields.map(f => (
        <div className="field" key={f.name}>
          <label htmlFor={`f-${f.name}`}>
            {f.label}
            {!f.required && <span className="muted" style={{ fontWeight: 400 }}> (optional)</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea id={`f-${f.name}`} name={f.name} required={f.required} placeholder={f.placeholder} defaultValue={f.defaultValue} maxLength={2000} />
          ) : f.type === 'select' ? (
            <select id={`f-${f.name}`} name={f.name} required={f.required} defaultValue={f.defaultValue ?? ''}>
              <option value="" disabled>Choose one</option>
              {f.options.map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input id={`f-${f.name}`} name={f.name} type={f.type === 'url' ? 'text' : f.type} inputMode={f.type === 'url' ? 'url' : undefined} required={f.required} placeholder={f.placeholder} autoComplete={f.autoComplete} defaultValue={f.defaultValue} maxLength={500} />
          )}
          {f.hint && <span className="hint">{f.hint}</span>}
        </div>
      ))}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Leave this empty</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={state === 'sending'} style={{ justifySelf: 'start' }}>
        {state === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
