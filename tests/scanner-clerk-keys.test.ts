import { test } from 'node:test'
import assert from 'node:assert/strict'
import { detectPlatform, isClerkPublishableKey } from '../lib/scanner/analyze.ts'
import { scanUrl } from '../lib/scanner/scan.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// Clerk secret keys share Stripe's sk_live_/sk_test_ prefix. Clerk publishable keys are pk_<mode>_ plus the
// base64 of the instance's frontend API host and a "$": "<slug>.clerk.accounts.dev$" for development and
// "clerk.<your-domain>$" for production. A production Clerk key used to be counted as Stripe, so its secret key
// was reported as a Stripe key with Stripe rotation advice. Keys are assembled at runtime.

const pk = (mode: 'live' | 'test', host: string) => `pk_${mode}_` + Buffer.from(`${host}$`).toString('base64')
const sk = (mode: 'live' | 'test') => `sk_${mode}_` + 'Hq3Lm9Zt2Vw8Rk4Pn7Xc5Bd1Gf6Jy0Ts'
const STRIPE_PK = 'pk_' + 'live_' + '51HqLmZt2Vw8Rk4Pn7Xc5Bd1Gf6Jy0TsQa9Ue3Wi'

function site(js: string, html = '') {
  const routes: Record<string, string> = {
    'https://app.example.com/': `<!doctype html>${html}<script type="module" src="/assets/index-1.js"></script>`,
    'https://app.example.com/assets/index-1.js': js,
  }
  return async (url: string): Promise<FetchResult> => {
    const text = routes[url] ?? 'not found'
    return { status: routes[url] ? 200 : 404, url, headers: new Headers(), text, bytes: text.length, truncated: false }
  }
}

test('production and development Clerk publishable keys are recognised; Stripe keys are not', () => {
  assert.equal(isClerkPublishableKey(pk('live', 'clerk.myshop.com')), true)
  assert.equal(isClerkPublishableKey(pk('live', 'clerk.my-shop.co.uk')), true)
  assert.equal(isClerkPublishableKey(pk('test', 'brave-owl-12.clerk.accounts.dev')), true)
  assert.equal(isClerkPublishableKey(STRIPE_PK), false)
  assert.equal(isClerkPublishableKey(pk('live', 'myshop.com')), false)
  const d = detectPlatform(`const k="${pk('live', 'clerk.myshop.com')}"`, [], new Headers())
  assert.deepEqual(d.backend, ['Clerk'])
})

test('a production Clerk key plus sk_live_ is reported as a Clerk secret key', async () => {
  const r = await scanUrl('https://app.example.com/', { fetcher: site(`const p="${pk('live', 'clerk.myshop.com')}";const s="${sk('live')}"`) as never })
  const f = r.findings.find(x => x.id.startsWith('secret-'))
  assert.equal(f?.id, 'secret-clerk-secret-live', r.findings.map(x => x.id).join(','))
  assert.match(f!.title, /^Clerk live secret key/)
  assert.match(f!.fix, /Clerk Dashboard/)
  assert.ok(r.backend.includes('Clerk') && !r.backend.includes('Stripe'), r.backend.join(','))
})

test('a Clerk development key plus sk_test_ is reported as a Clerk test secret key', async () => {
  const r = await scanUrl('https://app.example.com/', { fetcher: site(`const p="${pk('test', 'brave-owl-12.clerk.accounts.dev')}";const s="${sk('test')}"`) as never })
  assert.ok(r.findings.some(x => x.id === 'secret-clerk-secret-test'), r.findings.map(x => x.id).join(','))
})

test('Clerk plus Stripe.js gets a neutral title that names both', async () => {
  const r = await scanUrl('https://app.example.com/', {
    fetcher: site(`const p="${pk('live', 'clerk.myshop.com')}";const s="${sk('live')}"`, '<script src="https://js.stripe.com/v3/"></script>') as never,
  })
  const f = r.findings.find(x => x.id === 'secret-stripe-secret-live')
  assert.ok(f, r.findings.map(x => x.id).join(','))
  assert.match(f!.title, /used by Stripe and Clerk/)
  assert.ok(r.backend.includes('Clerk') && r.backend.includes('Stripe'))
})

test('without Clerk, sk_live_ stays a Stripe live secret key', async () => {
  const r = await scanUrl('https://app.example.com/', { fetcher: site(`const p="${STRIPE_PK}";const s="${sk('live')}"`) as never })
  const f = r.findings.find(x => x.id === 'secret-stripe-secret-live')
  assert.ok(f)
  assert.match(f!.title, /^Stripe live secret key/)
})
