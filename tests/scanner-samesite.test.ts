import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sameSite } from '../lib/scanner/analyze.ts'

// sameSite() compares only the last two labels. On shared hosting suffixes and multi-part TLDs that makes
// unrelated tenants "same site", so the scanner fetches (and attributes findings from) other people's JS.

test('different tenants on a shared hosting domain are not the same site', () => {
  assert.equal(sameSite('alice.lovable.app', 'bob.lovable.app'), false)
})

test('different registrable domains under a multi-part TLD are not the same site', () => {
  assert.equal(sameSite('shop.example.co.uk', 'other.co.uk'), false)
})

test('IP-literal hosts are only the same site as themselves', () => {
  assert.equal(sameSite('203.0.114.4', '198.51.114.4'), false)
})

test('trailing dots do not merge tenants, and real same-site pairs still match', () => {
  assert.equal(sameSite('a.vercel.app.', 'evil.vercel.app.'), false)
  assert.equal(sameSite('x.foo.app.', 'y.bar.app.'), false)
  assert.equal(sameSite('shop.example.co.uk', 'cdn.example.co.uk'), true)
  assert.equal(sameSite('app.example.com', 'cdn.example.com'), true)
  assert.equal(sameSite('app.example.com.', 'example.com'), true)
  assert.equal(sameSite('[::1]', '[::1]'), true)
  assert.equal(sameSite('my-app.lovableproject.com', 'other.lovableproject.com'), false)
})
