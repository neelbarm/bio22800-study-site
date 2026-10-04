import { test } from 'node:test'
import assert from 'node:assert/strict'
// @ts-expect-error plain JS module without types
import { scorePost, rank, suggestOpener, toMarkdown } from '../scripts/lead-radar.mjs'

test('scorePost needs a tool and a pain signal', () => {
  assert.equal(scorePost('My Lovable app: other users can see my data, RLS?').score > 4, true)
  assert.equal(scorePost('I love supabase').score, 0)
  assert.equal(scorePost('My login is broken').score, 0)
})

test('rank dedupes, filters and sorts', () => {
  const posts = [
    { title: 'Bolt app stripe webhook not working', body: '', url: 'u1', created: 1, comments: 0, source: 'r/x' },
    { title: 'Bolt app stripe webhook not working', body: '', url: 'u1', created: 1, comments: 0, source: 'r/x' },
    { title: 'Nice weather', body: '', url: 'u2', created: 2, comments: 0, source: 'r/x' },
    { title: 'Lovable + Supabase RLS: users can see other users data, need help, budget $500', body: '', url: 'u3', created: 3, comments: 2, source: 'r/y' },
  ]
  const r = rank(posts, 3)
  assert.deepEqual(r.map((p: { url: string }) => p.url), ['u3', 'u1'])
  assert.match(suggestOpener(r[0].matched), /row-level security/)
  assert.match(toMarkdown(r, 48), /## \[Lovable/)
})
