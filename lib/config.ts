/**
 * Every brand name, price and link the site shows lives here.
 * Links come from environment variables so you can set them in Vercel without touching code.
 */
const env = (k: string, fallback = '') => (process.env[k] || fallback).trim()

export const config = {
  brand: env('NEXT_PUBLIC_BRAND_NAME', 'ShipReady'),
  tagline: 'Your AI-built app, made safe to launch.',
  siteUrl: env('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000').replace(/\/$/, ''),
  contactEmail: env('NEXT_PUBLIC_CONTACT_EMAIL', 'hello@example.com'),
  calUrl: env('NEXT_PUBLIC_CAL_URL'),
  stripe: {
    diagnosis: env('NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS'),
    diagnosisIntro: env('NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS_INTRO'),
    sprintDeposit: env('NEXT_PUBLIC_STRIPE_LINK_SPRINT_DEPOSIT'),
  },
  /** Set NEXT_PUBLIC_INTRO_SPOTS_LEFT to 0 once the 3 intro diagnoses are sold. */
  introSpotsLeft: Number(env('NEXT_PUBLIC_INTRO_SPOTS_LEFT', '3')),
}

export const PRICES = {
  diagnosis: 399,
  diagnosisIntro: 199,
  sprint: [
    { name: 'Fix & Ship 5', price: 1500, items: ['Up to 5 issues from your diagnosis', 'Tests for every fixed path', 'One reviewed pull request per issue', 'Handover notes'] },
    { name: 'Fix & Ship 10', price: 2500, items: ['Up to 10 issues', 'Everything in Fix & Ship 5', 'Production deploy on Vercel or Netlify', 'Error monitoring set up'] },
    { name: 'Rebuild-grade', price: 4000, items: ['Payments, auth rebuild or multi-tenant work', 'Everything in Fix & Ship 10', 'Database policy migration with rollback', 'Load and abuse checks'] },
  ],
  retainer: [
    { name: 'Keep', price: 500, items: ['Up to 4 small requests a month', 'Dependency and security updates', 'Uptime and error monitoring'] },
    { name: 'Grow', price: 1000, items: ['Up to 10 requests a month', 'Monthly security pass', 'Everything in Keep'] },
    { name: 'Priority', price: 1500, items: ['48-hour turnaround', 'Everything in Grow'] },
  ],
  wireItUp: '1,000–3,000',
  changeOrderHourly: 150,
  agencyDiscount: '15–20%',
}

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`

/** Adds Stripe Payment Link prefill parameters when a link is configured. */
export function paymentLink(base: string, opts: { email?: string; ref?: string } = {}): string {
  if (!base) return ''
  const u = new URL(base)
  if (opts.email) u.searchParams.set('prefilled_email', opts.email)
  if (opts.ref) u.searchParams.set('client_reference_id', opts.ref.replace(/[^\w-]/g, '').slice(0, 200))
  return u.toString()
}
