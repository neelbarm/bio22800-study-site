import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm.tsx'
import { PRICES, config, usd } from '@/lib/config.ts'

export const metadata: Metadata = {
  title: 'White-label partner program for AI agencies',
  description: 'Sold an AI build you can’t ship? We diagnose, fix and deploy under your brand at 15–20% off list.',
}

export default function AgenciesPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="eyebrow">Partner program</p>
        <h1>Your brand on the invoice. Our engineering behind it.</h1>
        <p className="lede">
          You sell AI apps, automations and agents. When a build gets stuck, needs a security review or has to go to production, we do the engineering under your name and you keep the client.
        </p>
      </div>
      <div className="grid grid-3" style={{ marginBottom: 28 }}>
        {[
          ['Partner pricing', `${PRICES.agencyDiscount} off every list price: diagnosis (list ${usd(PRICES.diagnosis)}), fix sprints (list ${usd(PRICES.sprint[0].price)}–${usd(PRICES.sprint[2].price)}) and retainers. You set your own resale price.`],
          ['Invisible to your client', 'We work in your repos and tools, use your email templates and never contact your clients unless you ask us to.'],
          ['Fast and fixed', 'Diagnosis in 48 hours, sprints in 5–10 days, fixed prices agreed before work starts. Tests and a handover doc on every job.'],
        ].map(([t, b]) => (
          <article className="card issue" key={t}>
            <h3>{t}</h3>
            <p>{b}</p>
          </article>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 28, alignItems: 'start' }} data-stack>
        <LeadForm
          kind="agency"
          contactEmail={config.contactEmail}
          submitLabel="Apply to partner"
          successTitle="Thanks. We'll be in touch within one business day."
          successText="We'll send the partner terms and a short form for your first project. If you have a stuck build right now, reply to that email with the details."
          fields={[
            { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
            { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
            { name: 'company', label: 'Agency name and website', type: 'text', required: true },
            { name: 'clients', label: 'What do you build for clients?', type: 'textarea', required: true, placeholder: 'e.g. Lovable MVPs for coaches, n8n automations, voice agents for clinics' },
            { name: 'volume', label: 'Projects per month that need engineering help', type: 'select', required: true, options: ['1', '2–4', '5–10', 'More than 10'] },
            { name: 'message', label: 'Anything stuck right now?', type: 'textarea' },
          ]}
        />
        <aside className="card" style={{ padding: 22 }}>
          <h3 style={{ marginBottom: 10 }}>Typical partner work</h3>
          <ul className="plain-list">
            <li>Finishing a Lovable or Bolt app the client already paid for</li>
            <li>Security review before the client's launch or investor demo</li>
            <li>Stripe subscriptions and webhooks that actually update accounts</li>
            <li>Moving a prototype to a production domain with monitoring</li>
            <li>Integrations with CRMs, Google Workspace and Slack</li>
            <li>Monthly maintenance you resell as a care plan</li>
          </ul>
        </aside>
      </div>
      <style>{`@media (max-width: 880px) { [data-stack] { grid-template-columns: minmax(0, 1fr) !important; } }`}</style>
    </div>
  )
}
