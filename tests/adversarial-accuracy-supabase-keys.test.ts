import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanUrl } from '../lib/scanner/scan.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// New Supabase projects (created on/after 2025-11-01) only have sb_publishable_/sb_secret_ keys,
// which are opaque strings with no project ref inside them (unlike legacy anon JWTs).
// The scanner attaches such keys to "whichever Supabase URL it saw first", which breaks in
// common, realistic layouts. Keys are assembled at runtime.

const REF = 'abcdefghijklmnopqrst'
const OTHER_REF = 'zzzzzzzzzzyyyyyyyyyy'
const PUB = 'sb_' + 'publishable_' + 'Q7mZ2vLk9TnB4xWcR8pYsA_' + 'h3K9pQ2w'

type Spec = Partial<FetchResult> & { status?: number }
function fakeFetcher(routes: Record<string, Spec | ((o: { method?: string; headers?: Record<string, string> }) => Spec)>) {
  const calls: { url: string; method?: string; headers?: Record<string, string> }[] = []
  const fn = async (url: string, opts: { method?: 'GET' | 'HEAD'; headers?: Record<string, string> } = {}): Promise<FetchResult> => {
    calls.push({ url, method: opts.method, headers: opts.headers })
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('*') && url.startsWith(k.slice(0, -1))))
    const r = key ? routes[key] : undefined
    const spec: Spec = r ? (typeof r === 'function' ? r(opts) : r) : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers(), text, bytes: text.length, truncated: false }
  }
  return { fn, calls }
}

/** A Supabase project whose `profiles` table is readable by anyone holding PUB. */
function vulnerableProject(base: string) {
  return {
    [`${base}/auth/v1/settings`]: { text: JSON.stringify({ mailer_autoconfirm: false, disable_signup: false }) },
    [`${base}/rest/v1/`]: { status: 401, text: '{"message":"Access to schema is forbidden"}' },
    [`${base}/rest/v1/profiles*`]: (o: { headers?: Record<string, string> }) =>
      o.headers?.apikey === PUB ? { status: 206, headers: new Headers({ 'content-range': '0-0/4210' }) } : { status: 401, text: '{"message":"Invalid API key"}' },
  }
}

test('publishable key is not attached to an unrelated Supabase URL that appears earlier (storage image)', async () => {
  // Lovable templates and remixed projects routinely hot-link images from someone else's
  // public storage bucket. That URL is in the HTML, which is scanned before the JS bundle.
  const site = 'https://shop.example.com/'
  const real = `https://${REF}.supabase.co`
  const { fn, calls } = fakeFetcher({
    [site]: {
      text: `<!doctype html><img src="https://${OTHER_REF}.supabase.co/storage/v1/object/public/template/hero.png"><script type="module" src="/assets/index-a.js"></script>`,
    },
    'https://shop.example.com/assets/index-a.js': { text: `const sb=createClient("${real}","${PUB}");sb.from("profiles").select("*")` },
    ...vulnerableProject(real),
    [`https://${OTHER_REF}.supabase.co/*`]: { status: 401, text: '{"message":"Invalid API key"}' },
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  const ids = r.findings.map(f => f.id)
  const probedReal = calls.some(c => c.url.startsWith(`${real}/rest/v1/profiles`) && c.headers?.apikey === PUB)
  assert.ok(probedReal, `the real project was never probed with its key; calls: ${calls.map(c => c.url).join(' | ')}`)
  assert.ok(ids.includes('supabase-tables-public'), `missed a 4,210-row public profiles table. findings=${ids.join(',')} passed=${r.passed.join(' / ')}`)
})

test('publishable key found in an earlier chunk than the project URL is still used', async () => {
  // Vite manualChunks / Next.js split the env module from the client module. Bodies are
  // scanned in fetch order, so the key is seen first and parked on a URL-less entry.
  const site = 'https://split.example.com/'
  const real = `https://${REF}.supabase.co`
  const { fn } = fakeFetcher({
    [site]: { text: '<script type="module" src="/assets/env-1.js"></script><script type="module" src="/assets/index-2.js"></script>' },
    'https://split.example.com/assets/env-1.js': { text: `export const SUPABASE_PUBLISHABLE_KEY="${PUB}";` },
    'https://split.example.com/assets/index-2.js': {
      text: `import{SUPABASE_PUBLISHABLE_KEY as k}from"./env-1.js";const sb=createClient("${real}",k);sb.from("profiles").select("*")`,
    },
    ...vulnerableProject(real),
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  const ids = r.findings.map(f => f.id)
  assert.ok(ids.includes('supabase-tables-public'), `findings=${ids.join(',')} notes=${r.notes.join(' / ')}`)
})

test('Supabase behind a custom domain with a publishable key is probed', async () => {
  // Custom domains and vanity subdomains are documented Supabase features
  // (https://supabase.com/docs/guides/platform/custom-domains). With a legacy JWT the ref is
  // recoverable from the token; with sb_publishable_ nothing ties the key to *.supabase.co,
  // and the scanner silently drops it: no probe, no note, backend not even listed.
  const site = 'https://custom.example.com/'
  const api = 'https://db.custom.example.com'
  const { fn } = fakeFetcher({
    [site]: { text: '<script type="module" src="/assets/index-c.js"></script>' },
    'https://custom.example.com/assets/index-c.js': { text: `import{createClient as c}from"./vendor.js";const sb=c("${api}","${PUB}",{auth:{persistSession:true}});sb.from("profiles").select("*")` },
    ...vulnerableProject(api),
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  const ids = r.findings.map(f => f.id)
  assert.ok(ids.includes('supabase-tables-public'), `custom-domain Supabase project not probed. backend=${r.backend.join(',')} findings=${ids.join(',')} notes=${r.notes.join(' / ')}`)
  assert.ok(r.backend.includes('Supabase'), `backend=${r.backend.join(',')}`)
})
