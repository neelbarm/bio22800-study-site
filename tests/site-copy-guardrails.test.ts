import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

// Copy promises that the business cannot keep (instant replies, guaranteed outcomes, "every sprint ships to
// production") were removed after review. These checks stop them from creeping back in.

const root = new URL('../', import.meta.url).pathname
function files(dir: string): string[] {
  return readdirSync(path.join(root, dir)).flatMap(f => {
    const rel = path.join(dir, f)
    return statSync(path.join(root, rel)).isDirectory() ? files(rel) : /\.(tsx?|md)$/.test(f) ? [rel] : []
  })
}
const siteFiles = [...files('app'), ...files('components'), 'lib/thanks.ts', 'lib/config.ts']
const read = (rel: string) => readFileSync(path.join(root, rel), 'utf8')

const BANNED: [RegExp, string][] = [
  [/right away/i, 'replies are not instant'],
  [/within a few hours/i, 'the site promises one business day'],
  [/much sooner/i, 'no speed promises beyond one business day'],
  [/guarantee the work/i, 'we commit to documented, tested fixes, not guarantees'],
  [/almost every/i, 'no unsupported frequency claims'],
  [/our engineers/i, 'one engineer, not a team'],
  [/fix everything/i, 'sprints fix the agreed issues'],
  [/stay fixed/i, 're-prompts can undo fixes'],
  [/most often/i, 'no unsupported frequency claims'],
  [/if you're happy/i, 'the intro testimonial is honest, positive or not'],
]

test('site copy has none of the removed overclaims', () => {
  const hits: string[] = []
  for (const f of siteFiles) {
    const text = read(f)
    for (const [re, why] of BANNED) if (re.test(text)) hits.push(`${f}: ${re} (${why})`)
  }
  assert.deepEqual(hits, [])
})

test('the home page does not promise a production deploy on the smallest sprint', () => {
  const home = read('app/page.tsx')
  assert.match(home, /production deploy is included from \$\{PRICES\.sprint\[1\]\.name\}/)
  assert.doesNotMatch(home, /every sprint (?:includes|ships) (?:a )?production/i)
  assert.match(read('lib/config.ts'), /'Preview deploys for review \(you deploy to production\)'/)
})

test('the diagnosis page states the testimonial terms and links the contract next to the payment buttons', () => {
  const page = read('app/diagnosis/page.tsx')
  assert.match(page, /an honest testimonial, positive or not/)
  assert.match(page, /paymentTerms=\{[\s\S]*LEGAL_LINKS\.serviceAgreement[\s\S]*LEGAL_LINKS\.diagnosisTerms[\s\S]*\}/)
  // No automatic email is sent to buyers, so the copy must not promise one.
  assert.doesNotMatch(page, /(?:you'll|you will) (?:get|receive) an (?:automatic|confirmation) email/i)
  assert.match(page, /The page after payment explains how to share access/)
})

test('LAUNCH.md gives the Stripe text and redirects the site actually supports', () => {
  const launch = read('LAUNCH.md')
  assert.match(launch, /We confirm by email within one business day \(usually the same day\)\./)
  for (const p of ['diagnosis', 'sprint', 'retainer']) assert.ok(launch.includes(`/thanks?p=${p}`), p)
  const calLines = launch.split('\n').filter(l => /Cal\.com|CAL_URL/.test(l))
  assert.ok(calLines.length >= 2)
  for (const l of calLines) assert.doesNotMatch(l, /not shown on the site|doesn't show it/i, l)
})

test('.env.example matches the code: 12+ character admin password, Cal link shown on /thanks', () => {
  const env = read('.env.example')
  assert.match(env, /at least 12 characters/)
  assert.doesNotMatch(env, /CAL_URL[^\n]*\n?[^\n]*shown in emails/i)
  assert.doesNotMatch(env, /\(Cal\.com or Calendly\) shown in emails/)
})
