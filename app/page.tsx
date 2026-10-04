import Link from 'next/link'
import { PRICES, config, usd } from '@/lib/config.ts'

const ISSUES = [
  {
    sev: 'critical',
    title: 'Your database is readable by anyone',
    body: 'Row-level security is off, or a policy says "allow everyone". Your users, orders and messages can be pulled with the public key your site already ships.',
  },
  {
    sev: 'critical',
    title: 'Admin keys shipped to the browser',
    body: 'A Supabase service-role key, Stripe secret key or OpenAI key ends up in front-end code or a VITE_ variable. Anyone can copy it and use your accounts.',
  },
  {
    sev: 'high',
    title: 'Payments that can be faked',
    body: 'Orders are marked paid on the success page, or the Stripe webhook never checks its signature. People get paid features without paying.',
  },
  {
    sev: 'high',
    title: 'Admin pages guarded only by the UI',
    body: 'The button is hidden, but the data behind it is not. Anyone who calls the API directly gets admin access.',
  },
  {
    sev: 'medium',
    title: 'Fixes that break other things',
    body: 'Each new prompt to the builder quietly undoes an earlier fix. Without tests nobody notices until a user does.',
  },
  {
    sev: 'medium',
    title: 'No way to see what broke',
    body: 'No error monitoring, no logs, no rate limits. The first sign of trouble is a refund request or a surprise bill.',
  },
]

const FAQ = [
  ['Why not just ask Lovable (or Bolt) to fix it?', "Builder AIs are great at features and weak at checking their own security. They often report a problem as fixed when it isn't, and later prompts can undo fixes. We verify every fix with tests and check the database policies directly."],
  ['Is my data safe with you?', 'We work from a branch or staging copy where possible, use read-only access to production, never paste your keys into chat or AI prompts, and remove our access at handover. We sign NDAs on request.'],
  ['What does the free scan actually check?', 'It loads your live site the way a visitor would and checks the JavaScript it ships for leaked keys, looks for an exposed .env file and source maps, checks security headers, and, for Supabase apps, checks whether your tables return rows to anonymous visitors. It never downloads your data. It only runs on apps you own or are authorized to test.'],
  ['Can you guarantee my app is secure?', 'No honest engineer can. We guarantee the work: every issue we find is documented with evidence, and every fix we agree on is delivered and tested. If the diagnosis finds nothing material, you get your money back.'],
  ['What if my app was built with something else?', 'Most of our work is React or Next.js front ends on Supabase, Stripe and Vercel or Netlify, whichever builder made them. Firebase, Replit-native and Base44-native backends are quoted as migrations after the diagnosis.'],
  ['How fast is it?', 'The diagnosis lands within 48 hours of payment and repo access. Fix sprints take 5 to 10 days depending on the tier.'],
]

export default function Home() {
  return (
    <>
      <section className="wrap hero">
        <div className="hero-copy">
          <p className="eyebrow">For apps built with AI app builders</p>
          <h1>
            Your app works in the demo. Make it <span className="mark">safe for real users.</span>
          </h1>
          <p className="lede">
            We find and fix what AI builders get wrong: open databases, leaked keys, payments that can be faked and logins that leak data. Before your users, investors or a security review find them.
          </p>
          <div className="btn-row">
            <Link href="/scan" className="btn btn-primary">Run the free 60-second scan</Link>
            <Link href="/diagnosis" className="btn btn-secondary">Book a {usd(PRICES.diagnosis)} diagnosis</Link>
          </div>
          <div className="builders" aria-label="Builders we work with">
            {['Lovable', 'Bolt', 'Base44', 'v0', 'Cursor', 'Supabase', 'Stripe', 'Vercel'].map(b => (
              <span className="tag" key={b}>{b}</span>
            ))}
          </div>
        </div>
        <div className="card checklist" aria-label="Example scan result">
          <div className="checklist-head">
            <span className="eyebrow">Example scan · demo app</span>
            <span className="mono small">score 22/100</span>
          </div>
          {[
            ['fail', '✕', 'profiles table readable by anyone (1,342 rows)', 'critical'],
            ['fail', '✕', 'Stripe live secret key in JavaScript bundle', 'critical'],
            ['warn', '!', 'Source code published via source maps', 'medium'],
            ['warn', '!', '3 security headers missing', 'low'],
            ['ok', '✓', 'Served over HTTPS', 'pass'],
            ['ok', '✓', '.env file not downloadable', 'pass'],
          ].map(([cls, sym, text, sev]) => (
            <div className="check" key={text}>
              <span className={`tick ${cls}`} aria-hidden="true">{sym}</span>
              <span>{text}</span>
              <span className={`sev sev-${sev}`}>{sev}</span>
            </div>
          ))}
          <p className="note" style={{ marginTop: 10 }}>Illustrative example. Your results show only what your own site exposes.</p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="issues">
        <div className="section-head">
          <p className="eyebrow">What we find most often</p>
          <h2 id="issues">Six problems that show up in almost every AI-built app</h2>
          <p className="lede">They don't show in the demo. They show up when real people, real money and real data arrive.</p>
        </div>
        <div className="grid grid-3">
          {ISSUES.map(i => (
            <article className="card issue" key={i.title}>
              <span className={`sev sev-${i.sev}`} style={{ justifySelf: 'start' }}>{i.sev}</span>
              <h3>{i.title}</h3>
              <p>{i.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="how">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 id="how">From "it works on my screen" to ready for launch</h2>
        </div>
        <div className="grid grid-4">
          {[
            ['01', 'Free scan', '60 seconds', 'Paste your live URL. See what your site exposes to anyone, ranked by severity.'],
            ['02', 'Diagnosis', `${usd(PRICES.diagnosis)} · 48 hours`, 'An engineer reviews your code, database policies, auth and payments. You get a written report, a video walkthrough and a fixed quote. The fee is credited to the fix.'],
            ['03', 'Fix & Ship sprint', `from ${usd(PRICES.sprint[0].price)} · 5–10 days`, 'We fix what we found, add tests so fixes stay fixed, and deploy to production.'],
            ['04', 'Keep it healthy', `from ${usd(PRICES.retainer[0].price)}/mo`, 'Updates, monitoring and small changes every month, so new prompts and new features don’t undo the work.'],
          ].map(([n, t, p, b]) => (
            <article className="card step" key={n}>
              <span className="step-num">{n}</span>
              <h3>{t}</h3>
              <span className="price">{p}</span>
              <p className="muted" style={{ fontSize: 15.5 }}>{b}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section" id="pricing" aria-labelledby="pricing-h">
        <div className="section-head">
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-h">Fixed prices. No hourly surprises.</h2>
          <p className="lede">Start with the diagnosis. If we find nothing material, you get your money back.</p>
        </div>
        <div className="grid grid-2" style={{ marginBottom: 16 }}>
          <article className="card price-card featured">
            <p className="eyebrow">Start here</p>
            <h3>Ship-Ready Diagnosis</h3>
            <p className="price-big">
              {usd(PRICES.diagnosis)} <small>one time · 48 hours</small>
            </p>
            <ul>
              <li>Database policies (RLS) and storage rules reviewed table by table</li>
              <li>Auth, sessions and admin access checked</li>
              <li>Secrets and environment variables audited</li>
              <li>Stripe checkout and webhooks traced end to end</li>
              <li>Written report ranked by severity, plus a video walkthrough</li>
              <li>Fixed-price fix plan. The {usd(PRICES.diagnosis)} is credited to it</li>
            </ul>
            <Link href="/diagnosis" className="btn btn-primary">Book the diagnosis</Link>
            {config.introSpotsLeft > 0 && (
              <p className="note">
                Founding offer: {usd(PRICES.diagnosisIntro)} for {config.introSpotsLeft} more client{config.introSpotsLeft > 1 ? 's' : ''} in exchange for a short testimonial.
              </p>
            )}
          </article>
          <article className="card price-card">
            <p className="eyebrow">Ongoing</p>
            <h3>Maintain &amp; Extend</h3>
            <div className="grid" style={{ gap: 12 }}>
              {PRICES.retainer.map(r => (
                <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid var(--rule)', paddingBottom: 10 }}>
                  <div>
                    <strong>{r.name}</strong>
                    <p className="note">{r.items.join(' · ')}</p>
                  </div>
                  <span className="mono" style={{ whiteSpace: 'nowrap' }}>{usd(r.price)}/mo</span>
                </div>
              ))}
            </div>
            <p className="note">
              Integrations and automations (CRM, Google Workspace, Slack, email, n8n, inbound AI receptionist): ${PRICES.wireItUp} fixed. Extra work: {usd(PRICES.changeOrderHourly)}/hr or a fixed quote.
            </p>
          </article>
        </div>
        <div className="grid grid-3">
          {PRICES.sprint.map((s, i) => (
            <article className="card price-card" key={s.name}>
              <p className="eyebrow">Fix sprint {i + 1}</p>
              <h3>{s.name}</h3>
              <p className="price-big">{usd(s.price)}</p>
              <ul>
                {s.items.map(x => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="note" style={{ marginTop: 12 }}>Sprints are quoted after the diagnosis, so you only pay for what your app needs. 50% to start, 50% on delivery.</p>
      </section>

      <section className="wrap section" aria-labelledby="compare">
        <div className="section-head">
          <p className="eyebrow">Your options</p>
          <h2 id="compare">Why not the other ways?</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Re-prompt the builder</th>
                <th scope="col">$30 gig</th>
                <th scope="col">Agency audit</th>
                <th scope="col">{config.brand}</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Checks database policies directly', 'Rarely', 'Rarely', 'Yes', 'Yes'],
                ['Tests so fixes stay fixed', 'No', 'No', 'Yes', 'Yes'],
                ['Production deploy and monitoring', 'No', 'Sometimes', 'Yes', 'Yes'],
                ['Typical cost', 'Credits', '$30–$150', '$1,500–$10,000+', `${usd(PRICES.diagnosis)}, then from ${usd(PRICES.sprint[0].price)}`],
                ['Time to a written answer', 'Minutes, unverified', 'Varies', '1–2 weeks', '48 hours'],
              ].map(row => (
                <tr key={row[0]}>
                  <th scope="row" style={{ font: '600 15px/1.4 var(--body)', textTransform: 'none', letterSpacing: 0, color: 'var(--ink)' }}>{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td className="us">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="agencies-h">
        <div className="card callout">
          <p className="eyebrow">For AI and automation agencies</p>
          <h2 id="agencies-h" style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>Sold a build you can't ship? We'll do it under your brand.</h2>
          <p className="muted">White-label diagnoses, fixes and production deploys at {PRICES.agencyDiscount} off list. You keep the client relationship.</p>
          <div className="btn-row"><Link href="/agencies" className="btn btn-secondary">See the partner program</Link></div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="faq-h">
        <div className="section-head">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-h">Straight answers</h2>
        </div>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="card callout" style={{ borderLeftColor: 'var(--ink)' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>Find out in 60 seconds what your app exposes.</h2>
          <p className="muted">Free. No signup. Runs only on apps you own or are authorized to test.</p>
          <div className="btn-row"><Link href="/scan" className="btn btn-mark">Run the free scan</Link></div>
        </div>
      </section>
    </>
  )
}
