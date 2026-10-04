import './helpers/register-next.ts'
import { test } from 'node:test'
import assert from 'node:assert/strict'

// Valid JSON that is not an object (null, an array, a number) used to crash both routes with a 500
// ("Cannot read properties of null"). They must answer 400 with a JSON error instead.

const scan = await import('../app/api/scan/route.ts')
const lead = await import('../app/api/lead/route.ts')

let n = 0
const req = (path: string, body: string) =>
  new Request(`http://localhost${path}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `192.0.2.${++n}` }, body })

for (const body of ['null', '[]', '5', '"text"', '{not json']) {
  test(`POST /api/scan with body ${body} returns 400`, async () => {
    const r = await scan.POST(req('/api/scan', body))
    assert.equal(r.status, 400)
    assert.equal(typeof (await r.json()).error, 'string')
  })
  test(`POST /api/lead with body ${body} returns 400`, async () => {
    const r = await lead.POST(req('/api/lead', body))
    assert.equal(r.status, 400)
    assert.equal(typeof (await r.json()).error, 'string')
  })
}
