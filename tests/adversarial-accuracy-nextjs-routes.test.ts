import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scanUrl } from '../lib/scanner/scan.ts'
import type { FetchResult } from '../lib/scanner/net.ts'

// False negative on Next.js App Router apps (v0, Cursor, Bolt Next templates).
//
// Verified by building a Next 16.3.8 (Turbopack) App Router app with routes /, /admin,
// /(dash)/settings and /blog/[slug], each a client component: the chunk for /admin
// (static/chunks/1nap5106fd7x_.js) is referenced ONLY from server/app/admin.html, admin.rsc and
// the admin client-reference manifest. No file the homepage loads mentions it, and
// _buildManifest.js lists only /_app and /_error. So code that lives only on /login, /dashboard
// or /admin (where createBrowserClient and stray admin keys usually live) is invisible when the
// owner enters their homepage URL, yet the report says "No high-risk secret keys found".
// Fix direction: follow a few same-origin <a href> links (and common paths like /login,
// /dashboard, /app, /admin) and pull their <script src> chunks, or fetch `?_rsc` flight data.

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const REF = 'abcdefghijklmnopqrst'
const SERVICE = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ iss: 'supabase', ref: REF, role: 'service_role' })}.${'t'.repeat(43)}`

type Spec = Partial<FetchResult> & { status?: number }
function fakeFetcher(routes: Record<string, Spec>) {
  return async (url: string): Promise<FetchResult> => {
    const key = Object.keys(routes).find(k => url === k || (k.endsWith('*') && url.startsWith(k.slice(0, -1))))
    const spec: Spec = key ? routes[key] : { status: 404, text: 'not found' }
    const text = spec.text ?? ''
    return { status: spec.status ?? 200, url, headers: spec.headers ?? new Headers({ 'x-vercel-id': 'iad1::x' }), text, bytes: text.length, truncated: false }
  }
}

// Shapes copied from the real `next build` output (chunk names shortened, flight data trimmed).
const shell = (pageChunk: string, body: string) =>
  `<!DOCTYPE html><html><head><meta charSet="utf-8"/><link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/310vm2bl3xxpt.js"/>` +
  `<script src="/_next/static/chunks/19mx3mg6lkumu.js" async=""></script><script src="/_next/static/chunks/turbopack-1vijxpa2bdysr.js" async=""></script>` +
  `<script src="/_next/static/chunks/3fntmmi971322.js" async=""></script><script src="/_next/static/chunks/${pageChunk}" async=""></script></head>` +
  `<body>${body}<script>(self.__next_f=self.__next_f||[]).push([0])</script>` +
  `<script>self.__next_f.push([1,"2:I[39756,[\\"/_next/static/chunks/3fntmmi971322.js\\"],\\"default\\"]\\n"])</script></body></html>`

test('client code that only ships on another App Router route is scanned', async () => {
  const site = 'https://saas.example.com/'
  const fn = fakeFetcher({
    [site]: { text: shell('22i43cg4l4-dq.js', '<div><a href="/login">Log in</a><a href="/dashboard">Dashboard</a><a href="/pricing">Pricing</a></div>') },
    'https://saas.example.com/_next/static/chunks/310vm2bl3xxpt.js': { text: '(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["static/chunks/310vm2bl3xxpt.js",{}]);' },
    'https://saas.example.com/_next/static/chunks/19mx3mg6lkumu.js': { text: 'console.log(1)' },
    'https://saas.example.com/_next/static/chunks/turbopack-1vijxpa2bdysr.js': { text: 'console.log(2)' },
    'https://saas.example.com/_next/static/chunks/3fntmmi971322.js': { text: 'console.log(3)' },
    'https://saas.example.com/_next/static/chunks/22i43cg4l4-dq.js': { text: 'console.log("marketing page")' },
    'https://saas.example.com/dashboard': { text: shell('1nap5106fd7x_.js', '<div>Loading…</div>') },
    'https://saas.example.com/_next/static/chunks/1nap5106fd7x_.js': {
      text: `(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["static/chunks/1nap5106fd7x_.js",61802,e=>{"use strict";let t=(0,e.i(4321).createBrowserClient)("https://${REF}.supabase.co","${SERVICE}")}]);`,
    },
  })
  const r = await scanUrl(site, { fetcher: fn as never })
  const ids = r.findings.map(f => f.id)
  assert.ok(
    ids.includes('supabase-service-key-exposed'),
    `missed a service_role key shipped on /dashboard. findings=${ids.join(',')} passed=${r.passed.join(' / ')}`,
  )
})
