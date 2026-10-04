import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fillAgreement, LEGAL_LINKS } from '../lib/legal.ts'
import { renderMarkdownString } from '../lib/markdown.ts'

// The MSA and the standard Diagnosis SOW are published so buyers accept them at checkout. They are templates
// full of [PLACEHOLDER]s; none may reach the public page.

const read = (f: string) => readFileSync(new URL(`../business/legal/${f}`, import.meta.url), 'utf8')
const visibleText = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')

for (const f of ['master-services-agreement.md', 'sow-diagnosis.md']) {
  test(`${f} renders with no bracketed placeholders and no signature blanks`, () => {
    const text = visibleText(renderMarkdownString(fillAgreement(read(f))))
    assert.deepEqual(text.match(/\[[^\]\n]{1,80}\]/g), null)
    assert.doesNotMatch(text, /_{6,}/)
    assert.doesNotMatch(text, /Template, not legal advice/)
  })
}

test('the published MSA names the provider and says how it is accepted', () => {
  const md = fillAgreement(read('master-services-agreement.md'))
  assert.match(md, /\*\*Provider:\*\* \S/)
  assert.match(md, /## Acceptance\n\nClient accepts this Agreement by signing it, by confirming by email, or by paying/)
  assert.match(md, /Invoices are due within 7 days/)
})

test('the published Diagnosis SOW points at the published MSA and is completed from checkout', () => {
  const md = fillAgreement(read('sow-diagnosis.md'))
  assert.ok(md.includes(`(http://localhost:3000${LEGAL_LINKS.serviceAgreement})`) || md.includes(LEGAL_LINKS.serviceAgreement))
  assert.match(md, /\*\*SOW number:\*\* the Stripe payment reference/)
  assert.match(md, /\| App name \| As named in the intake form \|/)
  assert.match(md, /Weekends and US federal holidays are counted/)
  assert.match(md, /honest short written testimonial, positive or not/)
})

test('the site terms link to the published agreement and diagnosis terms', () => {
  const terms = read('site-terms.md')
  assert.ok(terms.includes(`[SITE URL]${LEGAL_LINKS.serviceAgreement}`))
  assert.ok(terms.includes(`[SITE URL]${LEGAL_LINKS.diagnosisTerms}`))
  const html = renderMarkdownString(terms)
  assert.match(html, new RegExp(`<a href="http://localhost:3000${LEGAL_LINKS.serviceAgreement}">Master Services Agreement</a>`))
})

test('the legal pages are traced into the deployment and linked in the footer', async () => {
  const cfg = (await import('../next.config.ts')).default
  const inc = cfg.outputFileTracingIncludes as Record<string, string[]>
  assert.deepEqual(inc[LEGAL_LINKS.serviceAgreement], ['./business/legal/master-services-agreement.md'])
  assert.deepEqual(inc[LEGAL_LINKS.diagnosisTerms], ['./business/legal/sow-diagnosis.md'])
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  assert.match(layout, /href=\{LEGAL_LINKS\.serviceAgreement\}/)
  assert.match(layout, /href=\{LEGAL_LINKS\.diagnosisTerms\}/)
})
