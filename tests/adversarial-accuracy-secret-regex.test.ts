import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findSecrets, findSupabase } from '../lib/scanner/analyze.ts'

// False positives from the shared secret regexes on code that real apps ship.
// Every secret-shaped value below is assembled at runtime; none appears literally in this file.

test('base64-embedded TTF font is not reported as an AWS access key (critical)', () => {
  // Bytes of a TrueType `name` table record (platform 3, encoding 1, language 0x0409),
  // copied from KaTeX_Main-BoldItalic.ttf offset 31410. Every Windows-compatible TTF has
  // records like this. Base64 of these bytes contains "AKIA" + 16 uppercase/digits.
  // Empirically 9 of the ~20 KaTeX fonts, pdf.js openjpeg.wasm and tesseract wasm all
  // trip the aws-access-key regex once base64-encoded.
  const record = Buffer.from('00a200000003000104090001001400a20003', 'hex')
  const font = Buffer.concat([Buffer.from('000100000012010000040020474445460000', 'hex'), Buffer.alloc(3 * 64), record, Buffer.alloc(3 * 64)])
  // jsPDF custom-font module, as produced by the jsPDF font converter and bundled by Vite.
  const js = `var font="${font.toString('base64')}";var callAddFont=function(){this.addFileToVFS("Inter-Regular.ttf",font);this.addFont("Inter-Regular.ttf","Inter","normal")};`
  const hits = findSecrets(js, 'https://app.example.com/assets/Inter-Regular-abc.js')
  assert.deepEqual(
    hits.map(h => `${h.patternId}:${h.severity}`),
    [],
    'a base64 font blob produced a secret finding; anchor the AWS regex so it cannot start or end inside a base64 run',
  )
})

test('jose importPKCS8 header check is not reported as a leaked private key (critical)', () => {
  // Verbatim shape of node_modules/jose/dist/webapi/key/import.js (jose v6), which ships in
  // browser bundles that verify or sign JWTs client-side. Also the MDN SubtleCrypto.importKey
  // example that AI builders copy: const pemHeader = "-----BEGIN PRIVATE KEY-----".
  const header = '-----BEGIN ' + 'PRIVATE KEY-----'
  const js = `async function importPKCS8(pkcs8,alg,options){if(typeof pkcs8!="string"||pkcs8.indexOf("${header}")!==0){throw new TypeError('"pkcs8" must be PKCS#8 formatted string')}return fromPKCS8(pkcs8,alg,options)}`
  const hits = findSecrets(js, 'https://app.example.com/assets/index-1.js')
  assert.ok(
    !hits.some(h => h.patternId === 'private-key'),
    'a PEM header string with no key material after it was flagged as a leaked private key (critical)',
  )
})

test('snake_case identifiers are not reported as Resend API keys (high)', () => {
  // Real identifier from @posthog/core dist (posthog-core-stateless.mjs) and from Next.js
  // app-page runtime ("...re_incrementalCache_prerenderManifest"). The resend regex has no
  // left boundary, so "...core_stateless_QuotaLimitedFeature" matches as re_<8+>_<16+>.
  const js = 'export{posthog_core_stateless_QuotaLimitedFeature as QuotaLimitedFeature};var x={store_incrementalCache_prerenderManifest:1}'
  const hits = findSecrets(js, 'https://app.example.com/assets/vendor-1.js')
  assert.ok(!hits.some(h => h.patternId === 'resend-key'), `resend-key false positive: ${hits.map(h => h.masked).join(', ')}`)
})

test('findSupabase applies the same placeholder filter as findSecrets', () => {
  // A settings screen that tells the owner where to paste their key. findSecrets skips
  // "your_"/"xxxxxx"/"example" values, but findSupabase reports these as a leaked
  // service-role-equivalent secret key, which the scan turns into a CRITICAL finding.
  const secretPlaceholder = 'sb_' + 'secret_' + 'your_secret_key_goes_here'
  const xPlaceholder = 'sb_' + 'secret_' + 'x'.repeat(30)
  const js = `const help={placeholder:"${secretPlaceholder}",example:"${xPlaceholder}"}`
  const refs = findSupabase(js, 'https://app.example.com/assets/Settings-1.js')
  const secrets = refs.flatMap(r => r.keys).filter(k => k.kind === 'secret')
  assert.equal(secrets.length, 0, `placeholder treated as a real sb_secret_ key: ${secrets.map(k => k.value.slice(0, 18)).join(', ')}`)
})
