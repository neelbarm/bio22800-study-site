import { test } from 'node:test'
import assert from 'node:assert/strict'
import { introOffer, normalizeSiteUrl, parseSpots, resolveSiteUrl } from '../lib/config.ts'
import { paymentLink, stripeLink } from '../lib/payment-link.ts'
import { thanksKind, THANKS_STEPS } from '../lib/thanks.ts'
import { pageMeta } from '../lib/seo.ts'
import { scanFailure, scanOutcome, TOO_SLOW } from '../lib/scan-response.ts'

// Configuration comes from environment variables the owner types by hand in Vercel. A typo must degrade to
// a safe default (no offer, no button, localhost URL), never crash a page or point buyers somewhere wrong.

test('stripeLink accepts only https Stripe Payment Links, fixing a missing scheme and quotes', () => {
  assert.equal(stripeLink('buy.stripe.com/test_abc'), 'https://buy.stripe.com/test_abc')
  assert.equal(stripeLink('  "https://buy.stripe.com/abc"  '), 'https://buy.stripe.com/abc')
  assert.equal(stripeLink("'https://checkout.stripe.com/c/pay/x'"), 'https://checkout.stripe.com/c/pay/x')
  assert.equal(stripeLink('https://evil.example/buy.stripe.com'), '')
  assert.equal(stripeLink('https://buy.stripe.com.evil.example/x'), '')
  assert.equal(stripeLink('http://buy.stripe.com/abc'), '')
  assert.equal(stripeLink('javascript:alert(1)'), '')
  assert.equal(stripeLink('not a url at all'), '')
  assert.equal(stripeLink(undefined), '')
  assert.equal(stripeLink(''), '')
})

test('paymentLink never throws and sanitises the prefill parameters', () => {
  assert.equal(paymentLink('not a url'), '')
  assert.equal(paymentLink(''), '')
  const u = new URL(paymentLink('https://buy.stripe.com/abc', { email: 'a@b.co', ref: 'diagnosis-x1"><script>' }))
  assert.equal(u.searchParams.get('prefilled_email'), 'a@b.co')
  assert.equal(u.searchParams.get('client_reference_id'), 'diagnosis-x1script')
  assert.equal(new URL(paymentLink('https://buy.stripe.com/abc', { ref: 'x'.repeat(500) })).searchParams.get('client_reference_id')!.length, 200)
})

test('parseSpots: unset keeps 3; empty, zero, negative or junk hides the offer; decimals round down', () => {
  assert.equal(parseSpots(undefined), 3)
  assert.equal(parseSpots(''), 0)
  assert.equal(parseSpots('  '), 0)
  assert.equal(parseSpots('0'), 0)
  assert.equal(parseSpots('-1'), 0)
  assert.equal(parseSpots('abc'), 0)
  assert.equal(parseSpots('2.5'), 2)
  assert.equal(parseSpots(' 2 '), 2)
})

test('the intro offer shows only with spots left and a Payment Link to honour it', () => {
  assert.equal(introOffer(3, 'https://buy.stripe.com/x'), true)
  assert.equal(introOffer(0, 'https://buy.stripe.com/x'), false)
  assert.equal(introOffer(3, ''), false)
})

test('normalizeSiteUrl and resolveSiteUrl always give a valid origin', () => {
  assert.equal(normalizeSiteUrl('shipready.dev'), 'https://shipready.dev')
  assert.equal(normalizeSiteUrl('https://shipready.dev/'), 'https://shipready.dev')
  assert.equal(normalizeSiteUrl('ht!tp://bad url'), '')
  assert.equal(normalizeSiteUrl('not a url'), '')
  assert.equal(normalizeSiteUrl('shipready'), '')
  assert.equal(normalizeSiteUrl('http://localhost:3000'), 'http://localhost:3000')
  assert.equal(normalizeSiteUrl(''), '')
  assert.equal(normalizeSiteUrl(undefined), '')
  assert.equal(resolveSiteUrl({ VERCEL_URL: 'my-app-abc123.vercel.app' }), 'https://my-app-abc123.vercel.app')
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'shipready.dev', VERCEL_URL: 'x.vercel.app' }), 'https://shipready.dev')
  assert.equal(resolveSiteUrl({ VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'shipready.dev', VERCEL_URL: 'x.vercel.app' }), 'https://shipready.dev')
  assert.equal(resolveSiteUrl({ VERCEL_ENV: 'preview', VERCEL_PROJECT_PRODUCTION_URL: 'shipready.dev', VERCEL_URL: 'x.vercel.app' }), 'https://x.vercel.app')
  assert.equal(resolveSiteUrl({}), 'http://localhost:3000')
})

test('pages set their own canonical URL and og:url', () => {
  const m = pageMeta('/scan')
  assert.deepEqual(m.alternates, { canonical: '/scan' })
  assert.equal((m.openGraph as { url?: string }).url, '/scan')
})

test('thanksKind picks the product from ?p=, defaulting to the diagnosis', () => {
  assert.equal(thanksKind('sprint'), 'sprint')
  assert.equal(thanksKind('retainer'), 'retainer')
  assert.equal(thanksKind('diagnosis'), 'diagnosis')
  assert.equal(thanksKind(undefined), 'diagnosis')
  assert.equal(thanksKind(['sprint', 'retainer']), 'diagnosis')
  assert.equal(thanksKind('SPRINT'), 'diagnosis')
})

test('/thanks access steps match what GitHub and Supabase actually offer', () => {
  const text = THANKS_STEPS.diagnosis.steps.map(([, b]) => b).join(' ')
  // GitHub personal repos can only add collaborators with write access.
  assert.match(text, /personal account GitHub can only add collaborators with write access/)
  assert.match(text, /organization/)
  // Supabase's Read-only role is a Team/Enterprise feature.
  assert.match(text, /Read-only role exists only on Team and Enterprise plans/)
  assert.match(text, /Developer role on a staging project/)
  assert.doesNotMatch(text, /read access is enough/i)
})

test('scan responses map to a result, the server error, or "took too long"', () => {
  assert.deepEqual(scanOutcome(504, { error: 'x' }), { kind: 'error', message: TOO_SLOW, slow: true })
  assert.deepEqual(scanOutcome(500, null), { kind: 'error', message: TOO_SLOW, slow: true })
  assert.deepEqual(scanOutcome(200, null), { kind: 'error', message: TOO_SLOW, slow: true })
  assert.deepEqual(scanOutcome(429, { error: 'Too many scans' }), { kind: 'error', message: 'Too many scans', slow: false })
  assert.deepEqual(scanOutcome(502, {}), { kind: 'error', message: 'The scan failed. Please try again.', slow: false })
  assert.deepEqual(scanOutcome(200, { score: 90 }), { kind: 'result', result: { score: 90 } })
  const timeout = Object.assign(new Error('t'), { name: 'TimeoutError' })
  assert.deepEqual(scanFailure(timeout), { message: TOO_SLOW, slow: true })
  assert.equal(scanFailure(new TypeError('fetch failed')).slow, false)
})
