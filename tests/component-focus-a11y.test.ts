import './helpers/register-tsx.ts'
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

// Keyboard and screen-reader users: after a successful lead form the focused submit button disappears, so
// focus must move to the success heading; a scan submitted without consent must mark the checkbox invalid,
// point it at the error and focus it.

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/diagnosis', pretendToBeVisual: true })
const g = globalThis as Record<string, unknown>
g.self = dom.window
for (const k of ['window', 'document', 'navigator', 'HTMLElement', 'Node', 'Event', 'FormData', 'MutationObserver', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
  Object.defineProperty(g, k, { value: (dom.window as unknown as Record<string, unknown>)[k], configurable: true, writable: true })
}
g.IS_REACT_ACT_ENVIRONMENT = true

let React: typeof import('react')
let createRoot: typeof import('react-dom/client').createRoot
before(async () => {
  React = await import('react')
  createRoot = (await import('react-dom/client')).createRoot
})

async function mount(el: React.ReactElement) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  await React.act(async () => root.render(el))
  return { host, unmount: () => React.act(async () => root.unmount()) }
}
const submit = (form: Element) => React.act(async () => void form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })))

test('LeadForm moves focus to the success heading and shows the contract line under the payment buttons', async () => {
  const { default: LeadForm } = await import('../components/LeadForm.tsx')
  const realFetch = globalThis.fetch
  globalThis.fetch = (async () => new Response(JSON.stringify({ ok: true, ref: 'diagnosis-abc' }), { status: 200, headers: { 'content-type': 'application/json' } })) as typeof fetch
  try {
    const { host, unmount } = await mount(
      React.createElement(LeadForm, {
        kind: 'diagnosis',
        contactEmail: '',
        submitLabel: 'Continue to payment',
        successTitle: 'Thanks. One last step.',
        successText: 'Pay below.',
        payments: [{ label: 'Pay $399', href: 'https://buy.stripe.com/test_abc', primary: true }],
        paymentTerms: 'Paying means you accept our service agreement and the diagnosis terms.',
        fields: [{ name: 'email', label: 'Email', type: 'email', required: true }],
      }),
    )
    ;(host.querySelector('#f-email') as HTMLInputElement).value = 'a@b.co'
    host.querySelector<HTMLButtonElement>('button[type=submit]')!.focus()
    await submit(host.querySelector('form')!)
    const heading = host.querySelector('h2')!
    assert.equal(heading.textContent, 'Thanks. One last step.')
    assert.equal(document.activeElement, heading, `focus is on ${document.activeElement?.outerHTML.slice(0, 80)}`)
    assert.equal(heading.getAttribute('tabindex'), '-1')
    const pay = host.querySelector('a.btn') as HTMLAnchorElement
    assert.match(pay.href, /^https:\/\/buy\.stripe\.com\/test_abc\?prefilled_email=a%40b\.co&client_reference_id=diagnosis-abc$/)
    assert.equal(pay.parentElement!.parentElement!.querySelector('p.note')?.textContent, 'Paying means you accept our service agreement and the diagnosis terms.')
    await unmount()
  } finally {
    globalThis.fetch = realFetch
  }
})

test('ScanClient without consent marks the checkbox invalid, links it to the error and focuses it', async () => {
  const { default: ScanClient } = await import('../components/ScanClient.tsx')
  let called = 0
  const realFetch = globalThis.fetch
  globalThis.fetch = (async () => (called++, new Response('{}'))) as typeof fetch
  try {
    const { host, unmount } = await mount(React.createElement(ScanClient, { brand: 'ShipReady' }))
    // The always-mounted live region exists before anything happens.
    assert.equal(host.querySelector('[role=status][aria-live=polite]')?.textContent, '')
    await submit(host.querySelector('form')!)
    const box = host.querySelector('#scan-consent') as HTMLInputElement
    assert.equal(box.getAttribute('aria-invalid'), 'true')
    assert.equal(box.getAttribute('aria-describedby'), 'scan-error')
    assert.match(host.querySelector('#scan-error')!.textContent!, /confirm you own this app/)
    assert.equal(document.activeElement, box)
    assert.equal(called, 0, 'scan request sent without consent')
    await unmount()
  } finally {
    globalThis.fetch = realFetch
  }
})
