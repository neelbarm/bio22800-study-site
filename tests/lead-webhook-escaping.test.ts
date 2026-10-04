import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { deliverLead } from '../lib/leads.ts'

// Public form text is forwarded verbatim to the owner's Slack/Discord webhook. Discord parses @everyone /
// @here unless allowed_mentions is set; Slack parses <!channel> and <url|label> links unless <, > and &
// are escaped. Any visitor can ping the whole channel or plant disguised links there.

const servers: http.Server[] = []
after(() => servers.forEach(s => s.close()))
function capture(): Promise<{ base: string; bodies: unknown[] }> {
  const bodies: unknown[] = []
  return new Promise(res => {
    const s = http
      .createServer((req, r) => {
        let d = ''
        req.on('data', c => (d += c))
        req.on('end', () => {
          bodies.push(JSON.parse(d))
          r.writeHead(204).end()
        })
      })
      .listen(0, '127.0.0.1', () => res({ base: `http://127.0.0.1:${(s.address() as AddressInfo).port}`, bodies }))
    servers.push(s)
  })
}

const lead = { kind: 'contact' as const, name: 'Mallory', email: 'm@example.com', fields: { message: '@everyone <!channel> see <https://evil.example|Stripe dashboard>' } }

test('Discord webhook payload disables mass mentions', async () => {
  const { base, bodies } = await capture()
  process.env.LEADS_WEBHOOK_URL = `${base}/discord.com/api/webhooks/1/abc`
  await deliverLead(lead)
  const b = bodies[0] as { content: string; allowed_mentions?: { parse?: string[] } }
  const safe = (b.allowed_mentions && Array.isArray(b.allowed_mentions.parse) && b.allowed_mentions.parse.length === 0) || !/@(everyone|here)/.test(b.content)
  assert.ok(safe, `Discord body would ping everyone: ${JSON.stringify(b)}`)
})

test('Slack webhook text escapes control sequences', async () => {
  const { base, bodies } = await capture()
  process.env.LEADS_WEBHOOK_URL = `${base}/hooks/slack`
  await deliverLead(lead)
  const b = bodies[0] as { text: string }
  assert.doesNotMatch(b.text, /<!channel>|<https?:\/\/[^>]*\|/, `Slack text carries raw control sequences: ${b.text}`)
})

test('Discord content escapes markdown so masked links cannot render', async () => {
  const { base, bodies } = await capture()
  process.env.LEADS_WEBHOOK_URL = `${base}/discord.com/api/webhooks/1/abc`
  await deliverLead({ kind: 'contact', name: 'M', email: 'm@example.com', fields: { message: 'click [Stripe dashboard](https://evil.example) now' } })
  const b = bodies[0] as { content: string; flags?: number }
  assert.ok(b.content.includes('\\[Stripe dashboard\\]\\(https://evil.example\\)'), b.content)
  assert.equal(b.flags, 4)
  assert.ok(b.content.length <= 2000)
})

test('Slack payload keeps the raw lead object for automation tools', async () => {
  const { base, bodies } = await capture()
  process.env.LEADS_WEBHOOK_URL = `${base}/hooks/zapier`
  await deliverLead(lead)
  const b = bodies[0] as { text: string; lead: typeof lead }
  assert.equal(b.lead.fields.message, lead.fields.message)
  assert.match(b.text, /&lt;!channel&gt;/)
  delete process.env.LEADS_WEBHOOK_URL
})
