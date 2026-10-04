/**
 * Every brand name, price and link the site shows lives here.
 * Links come from environment variables so you can set them in Vercel without touching code.
 */
import { stripeLink } from './payment-link.ts'

const env = (k: string, fallback = '') => (process.env[k] || fallback).trim()

/** Normalises a site URL candidate ("shipready.dev" -> "https://shipready.dev"). Returns '' when invalid. */
export function normalizeSiteUrl(raw: string | undefined): string {
  const v = (raw || '').trim()
  if (!v) return ''
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
    if (u.protocol === 'http:' || u.protocol === 'https:') return u.origin
  } catch {
    /* invalid */
  }
  return ''
}

/** NEXT_PUBLIC_SITE_URL, else the Vercel production or deployment URL, else localhost. Always a valid origin. */
export function resolveSiteUrl(e: Record<string, string | undefined> = process.env): string {
  const candidates = [e.NEXT_PUBLIC_SITE_URL, e.VERCEL_ENV === 'production' ? e.VERCEL_PROJECT_PRODUCTION_URL : undefined, e.VERCEL_URL]
  for (const raw of candidates) {
    const v = normalizeSiteUrl(raw)
    if (v) return v
    if (raw && raw.trim()) console.warn(`[config] ignoring invalid site URL: ${raw.trim()}`)
  }
  return 'http://localhost:3000'
}

/** Intro spots: unset keeps the default of 3; empty, zero, negative or junk hides the offer; decimals round down. */
export function parseSpots(v: string | undefined): number {
  if (v === undefined) return 3
  const n = Math.floor(Number(v.trim()))
  return Number.isFinite(n) && n > 0 && v.trim() !== '' ? n : 0
}

/** Reads a Stripe Payment Link variable; invalid values are dropped (with a log) so pages fall back to "we'll send a link". */
function stripeEnv(k: string): string {
  const raw = env(k)
  const v = stripeLink(raw)
  if (raw && !v) console.error(`[config] invalid Stripe link in ${k}; expected https://buy.stripe.com/...`)
  return v
}

const introSpotsLeft = parseSpots(process.env.NEXT_PUBLIC_INTRO_SPOTS_LEFT)
const stripe = {
  diagnosis: stripeEnv('NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS'),
  diagnosisIntro: stripeEnv('NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS_INTRO'),
  sprintDeposit: stripeEnv('NEXT_PUBLIC_STRIPE_LINK_SPRINT_DEPOSIT'),
}

export const config = {
  brand: env('NEXT_PUBLIC_BRAND_NAME', 'ShipReady'),
  tagline: 'Your AI-built app, made safe to launch.',
  siteUrl: resolveSiteUrl(),
  /** Empty until you set it; the site then points people to the forms instead of showing an address. */
  contactEmail: env('NEXT_PUBLIC_CONTACT_EMAIL'),
  calUrl: env('NEXT_PUBLIC_CAL_URL'),
  /** Shown in the privacy policy and terms. Set these before you take real payments. */
  legal: {
    name: env('NEXT_PUBLIC_LEGAL_NAME'),
    address: env('NEXT_PUBLIC_LEGAL_ADDRESS'),
    location: env('NEXT_PUBLIC_LEGAL_LOCATION', 'the United States'),
    state: env('NEXT_PUBLIC_LEGAL_STATE'),
    county: env('NEXT_PUBLIC_LEGAL_COUNTY'),
  },
  stripe,
  /** Set NEXT_PUBLIC_INTRO_SPOTS_LEFT to 0 once the 3 intro diagnoses are sold. */
  introSpotsLeft,
  /** The $199 offer is shown only when spots remain AND a Payment Link exists to honour it. */
  introAvailable: introSpotsLeft > 0 && Boolean(stripe.diagnosisIntro),
}

export const PRICES = {
  diagnosis: 399,
  diagnosisIntro: 199,
  sprint: [
    { name: 'Fix & Ship 5', price: 1500, items: ['Up to 5 issues from your diagnosis', 'Tests for every fixed path', 'One reviewed pull request per issue', 'Preview deploys for review (you deploy to production)', 'Handover notes'] },
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

export { paymentLink } from './payment-link.ts'
