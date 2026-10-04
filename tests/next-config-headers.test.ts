import { test } from 'node:test'
import assert from 'node:assert/strict'
import nextConfig from '../next.config.ts'

// HSTS with includeSubDomains/preload on a domain whose subdomains are not all HTTPS yet breaks them, and a
// preload listing takes months to undo. Only max-age is sent until the domain is final.

test('Strict-Transport-Security has max-age only (no includeSubDomains, no preload)', async () => {
  const rules = await nextConfig.headers!()
  const all = rules.flatMap(r => r.headers)
  const hsts = all.find(h => h.key.toLowerCase() === 'strict-transport-security')
  assert.ok(hsts, 'HSTS header missing')
  assert.match(hsts!.value, /^max-age=\d{8,}$/)
  assert.doesNotMatch(hsts!.value, /includeSubDomains/i)
  assert.doesNotMatch(hsts!.value, /preload/i)
})
