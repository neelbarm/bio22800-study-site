import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm, { type PaymentOption } from '@/components/LeadForm.tsx'
import { PRICES, config, usd } from '@/lib/config.ts'
import { parseScanParams } from '@/lib/scan-params.ts'

export const metadata: Metadata = {
  title: 'Book a Ship-Ready Diagnosis',
  description: `A 48-hour engineering review of your AI-built app: database policies, auth, secrets and payments. ${usd(PRICES.diagnosis)}, credited to the fix.`,
}

type SP = Promise<Record<string, string | string[] | undefined>>

export default async function DiagnosisPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const { appUrl: url, host, score } = parseScanParams(sp)
  const payments: PaymentOption[] = []
  if (config.introAvailable) {
    payments.push({ label: `Pay the founding price: ${usd(PRICES.diagnosisIntro)}`, href: config.stripe.diagnosisIntro, primary: true, note: `For the next ${config.introSpotsLeft} client${config.introSpotsLeft > 1 ? 's' : ''}, in exchange for a short testimonial if you're happy.` })
  }
  if (config.stripe.diagnosis) {
    payments.push({ label: `Pay ${usd(PRICES.diagnosis)} and book your slot`, href: config.stripe.diagnosis, primary: payments.length === 0 })
  }
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Ship-Ready Diagnosis · {usd(PRICES.diagnosis)} · 48 hours</p>
        <h1>Find out exactly what's wrong and what it costs to fix.</h1>
        <p className="lede">
          An engineer reviews your code, database policies, storage rules, login flows and payments. You get a written report ranked by severity, a video walkthrough and a fixed-price quote. The fee is credited to the fix, and refunded if we find nothing material.
        </p>
        {host && (
          <p className="callout card">
            You came here from a free scan of <span className="mono">{host}</span>
            {score !== null && <> (score {score}/100 as shown on your results page)</>}. Mention anything in it you want us to look at first.
          </p>
        )}
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 28, alignItems: 'start' }} data-stack>
        <LeadForm
          kind="diagnosis"
          contactEmail={config.contactEmail}
          submitLabel={payments.length ? 'Continue to payment' : 'Request the diagnosis'}
          successTitle={payments.length ? 'Thanks. One last step.' : 'Thanks. We got it.'}
          successText={
            payments.length
              ? "Pay below to reserve your slot. After payment you'll see how to share access, and we'll email you within one business day (usually the same day) to confirm and start. The 48-hour clock starts once we have payment and access to your code."
              : `We'll reply within one business day with a payment link and access instructions. ${config.contactEmail ? `If anything is urgent, email ${config.contactEmail}.` : ''}`
          }
          payments={payments}
          fields={[
            { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
            { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
            { name: 'appUrl', label: 'Live app URL', type: 'url', required: true, placeholder: 'https://your-app.com', defaultValue: url },
            { name: 'builder', label: 'What did you build it with?', type: 'select', required: true, options: ['Lovable', 'Bolt', 'Base44', 'v0', 'Replit', 'Cursor / Claude Code / Windsurf', 'A developer or agency', 'Other'] },
            { name: 'stack', label: 'Backend and payments', type: 'text', placeholder: 'e.g. Supabase + Stripe, Firebase, not sure' },
            { name: 'users', label: 'Real users today', type: 'select', required: true, options: ['None yet', 'Under 100', '100 to 1,000', 'Over 1,000'] },
            { name: 'revenue', label: 'Money involved', type: 'select', required: true, options: ['No payments yet', 'Taking payments', 'Paying B2B customers or pilots', 'Raising money or investor demo soon'] },
            { name: 'deadline', label: 'Any deadline?', type: 'text', placeholder: 'e.g. launch on the 20th, security review next month' },
            { name: 'problem', label: "What's wrong, or what worries you?", type: 'textarea', required: true, placeholder: 'Broken login, data showing to the wrong users, Stripe not updating accounts, deploy failing, or just "I don\'t know if it\'s safe".' },
            { name: 'repoAccess', label: 'Can you give us access to the code?', type: 'select', required: true, options: ['Yes, it is on GitHub', 'I can export it from the builder', 'Not sure how'] },
          ]}
        />
        <aside className="grid" style={{ gap: 16 }}>
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ marginBottom: 10 }}>What you get</h3>
            <ul className="plain-list">
              <li>Every Supabase table and storage bucket checked for who can read and write</li>
              <li>Secrets and environment variables audited</li>
              <li>Login, sessions and admin access tested</li>
              <li>Stripe checkout and webhooks traced end to end</li>
              <li>Report ranked by severity, with evidence and fixes</li>
              <li>10-minute video walkthrough</li>
              <li>Fixed-price fix quote, with the {usd(PRICES.diagnosis)} credited</li>
            </ul>
          </div>
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ marginBottom: 10 }}>How we handle access</h3>
            <p className="muted" style={{ fontSize: 15 }}>
              We ask for GitHub collaborator access (or a code export) and read-only access to a staging or production database. We never ask for passwords in chat, never put your keys into AI tools, and remove our access when we're done.
            </p>
          </div>
          <p className="note">
            Not sure yet? <Link href="/scan">Run the free scan</Link> or <Link href="/sample-report">see a sample report</Link>.
          </p>
        </aside>
      </div>
      <style>{`@media (max-width: 880px) { [data-stack] { grid-template-columns: minmax(0, 1fr) !important; } }`}</style>
    </div>
  )
}
