import './helpers/register-next.ts'
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { scanRequest, tinySite } from './helpers/fake-site.ts'

// Anonymous scans must not reach the owner's alert channel (anyone could flood it), a scan with an email
// reaches it exactly once with escaped text, and the visitor's response never waits for that delivery.

const { handleScanRequest } = await import('../lib/scan-handler.ts')

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))
function webhook(delayMs = 0): Promise<{ base: string; bodies: { text: string }[] }> {
  const bodies: { text: string }[] = []
  return new Promise(res => {
    const s = http
      .createServer((req, r) => {
        let d = ''
        req.on('data', c => (d += c))
        req.on('end', () => {
          setTimeout(() => {
            bodies.push(JSON.parse(d))
            r.writeHead(204).end()
          }, delayMs)
        })
      })
      .listen(0, '127.0.0.1', () => res({ base: `http://127.0.0.1:${(s.address() as AddressInfo).port}`, bodies }))
    servers.push(s)
  })
}
const settle = (ms: number) => new Promise(r => setTimeout(r, ms))
async function until(cond: () => boolean, ms = 3000) {
  const end = Date.now() + ms
  while (!cond() && Date.now() < end) await settle(20)
}

test('a scan without an email is not sent to the webhook', async () => {
  const hook = await webhook()
  process.env.LEADS_WEBHOOK_URL = `${hook.base}/hooks/slack`
  const r = await handleScanRequest(scanRequest({ url: 'https://quiet.example/', consent: true }), { fetcher: tinySite().fn as never })
  assert.equal(r.status, 200)
  await settle(300)
  assert.equal(hook.bodies.length, 0, JSON.stringify(hook.bodies))
})

test('a scan with an email sends exactly one escaped message', async () => {
  const hook = await webhook()
  process.env.LEADS_WEBHOOK_URL = `${hook.base}/hooks/slack`
  const page = '<!doctype html><title>x</title>'
  const fetcher = async (url: string) => ({ status: 200, url, headers: new Headers(), text: page, bytes: page.length, truncated: false })
  const r = await handleScanRequest(scanRequest({ url: 'https://loud.example/<!channel>', consent: true, email: 'owner@loud.example' }), { fetcher: fetcher as never })
  assert.equal(r.status, 200)
  await until(() => hook.bodies.length > 0)
  await settle(200)
  assert.equal(hook.bodies.length, 1)
  assert.match(hook.bodies[0].text, /owner@loud\.example/)
  assert.doesNotMatch(hook.bodies[0].text, /<!channel>|<https?:/)
})

test('the response does not wait for a slow webhook', async () => {
  const hook = await webhook(2500)
  process.env.LEADS_WEBHOOK_URL = `${hook.base}/hooks/slack`
  const t = Date.now()
  const r = await handleScanRequest(scanRequest({ url: 'https://slowhook.example/', consent: true, email: 'owner@slowhook.example' }), { fetcher: tinySite().fn as never })
  const ms = Date.now() - t
  assert.equal(r.status, 200)
  assert.ok(ms < 1500, `response took ${ms} ms while the webhook was still sleeping`)
  assert.equal(hook.bodies.length, 0, 'webhook finished before the response, so the test proved nothing')
  await until(() => hook.bodies.length > 0, 5000)
  assert.equal(hook.bodies.length, 1, 'lead was never delivered after the response')
  delete process.env.LEADS_WEBHOOK_URL
})
