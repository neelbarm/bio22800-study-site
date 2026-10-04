import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findSecrets } from '../lib/scanner/analyze.ts'

// The AWS, Google, Twilio and Mailgun patterns are anchored so they cannot start or end inside a longer
// base64/identifier run (fonts and wasm embedded as base64 contain such runs by chance). The anchors must
// not cost real detections: a quoted key in ordinary code is still found. Values are assembled at runtime.

const ids = (js: string) => findSecrets(js, 'https://app.example.com/assets/index-1.js').map(h => h.patternId)
const AWS = 'AK' + 'IA' + 'Q3EGRZ4TNKW7XJ5M'
const GOOGLE = 'AI' + 'za' + 'SyD4kP9vQ2wL7mN3xR8tB6cH1jF5gZ0aE2u'
const TWILIO = 'S' + 'K' + '3f9a1c7e5b2d4f6a8c0e1b3d5f7a9c2e'
const MAILGUN = 'ke' + 'y-' + '0f2a4c6e8b1d3f5a7c9e2b4d6f8a1c3e'

test('quoted real-shaped keys are still detected', () => {
  assert.deepEqual(ids(`const c={accessKeyId:"${AWS}"}`), ['aws-access-key'])
  assert.deepEqual(ids(`firebase.initializeApp({apiKey:'${GOOGLE}'})`), ['google-ai-key'])
  assert.deepEqual(ids(`const sid=\`${TWILIO}\``), ['twilio-key'])
  assert.deepEqual(ids(`mg.init("${MAILGUN}")`), ['mailgun-key'])
})

test('a Google key shape inside a base64 run (embedded wasm or font) is not reported', () => {
  const blob = 'AAAA' + 'AI' + 'za' + 'A'.repeat(35) + 'AAAA'
  assert.deepEqual(ids(`var wasm="${blob}";`), [])
  assert.deepEqual(ids(`var wasm="QmFzZTY0/${'AI' + 'za' + 'B'.repeat(35)}+cGFk==";`), [])
})

test('an AWS key shape inside a base64 run is not reported, but one at a run boundary in quotes is', () => {
  assert.deepEqual(ids(`var f="AAAA${AWS}AAAA";`), [])
  assert.deepEqual(ids(`var f="AAAA/${AWS}+AAAA";`), [])
  assert.deepEqual(ids(`var f="${AWS}";`), ['aws-access-key'])
})

test('the AWS pattern only accepts the base32 alphabet (A-Z, 2-7)', () => {
  assert.deepEqual(ids(`k="${'AK' + 'IA' + 'Q3EGRZ4TNKW7XJ01'}"`), [])
})

test('twilio and mailgun shapes inside longer identifiers or hex runs are not reported', () => {
  assert.deepEqual(ids(`var h="ab${TWILIO}cd";`), [])
  assert.deepEqual(ids(`var h="x_${TWILIO}";`), [])
  assert.deepEqual(ids(`var id="monkey-${MAILGUN.slice(4)}";`), [])
  assert.deepEqual(ids(`var h="${MAILGUN}ff";`), [])
})
