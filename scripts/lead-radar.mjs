#!/usr/bin/env node
// Lead radar: finds fresh public posts from people stuck with AI-built apps and writes a daily digest.
// Sources: Reddit (public JSON) and Hacker News (Algolia API). No accounts or keys needed.
//
//   node scripts/lead-radar.mjs                 # last 48 hours, writes leads/YYYY-MM-DD.md
//   node scripts/lead-radar.mjs --hours 24 --min-score 3 --stdout
//
// Rules of the road: reply only where you can genuinely help, follow each community's self-promotion rules
// (see business/sales/reddit-and-community.md), and never claim you scanned someone's app.
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const SUBREDDITS = ['lovable', 'vibecoding', 'Supabase', 'boltnewbuilders', 'nocode', 'SaaS', 'SideProject', 'cursor', 'replit', 'webdev']

// Weighted signals. A post needs both a "tool" signal and a "pain" signal to count.
export const TOOL_TERMS = [
  ['lovable', 3], ['bolt.new', 3], ['bolt', 1], ['base44', 3], ['v0', 1], ['replit', 2], ['cursor', 1], ['vibe cod', 3], ['vibecod', 3],
  ['supabase', 2], ['ai built', 2], ['ai-built', 2], ['built with ai', 2], ['no-code', 1], ['nocode', 1],
]
export const PAIN_TERMS = [
  ['rls', 3], ['row level security', 3], ['row-level security', 3], ['security', 2], ['exposed', 2], ['leak', 2], ['api key', 2], ['service_role', 3], ['service role', 3],
  ['auth', 1], ['login', 1], ['broken', 2], ["doesn't work", 2], ['not working', 2], ['stuck', 2], ['help', 1], ['bug', 1], ['error', 1],
  ['stripe', 2], ['webhook', 2], ['payment', 1], ['deploy', 1], ['production', 2], ['launch', 1], ['hire', 3], ['looking for a dev', 4], ['need a developer', 4],
  ['need help', 2], ['paid', 1], ['budget', 3], ['freelancer', 2], ['investor', 2], ['customers', 1], ['users can see', 4], ['other users', 3], ['data', 1],
]

/** Scores a post. Returns 0 unless it mentions at least one tool and one pain signal. */
export function scorePost(text) {
  const t = ` ${String(text || '').toLowerCase()} `
  const hit = list => list.filter(([k]) => t.includes(k))
  const tools = hit(TOOL_TERMS)
  const pains = hit(PAIN_TERMS)
  if (!tools.length || !pains.length) return { score: 0, matched: [] }
  const score = [...tools, ...pains].reduce((s, [, w]) => s + w, 0)
  return { score, matched: [...tools, ...pains].map(([k]) => k) }
}

/** A short, honest opener to adapt by hand. Deliberately generic: personalize before posting. */
export function suggestOpener(matched) {
  const m = new Set(matched)
  if (['rls', 'row level security', 'row-level security', 'users can see', 'other users', 'exposed'].some(k => m.has(k)))
    return 'This usually means row-level security is off or a policy uses `using (true)`. Quick check: in Supabase, Table Editor shows "RLS disabled" on the table. Policies should compare auth.uid() to the row owner column. Happy to look if you share the policy (not your keys).'
  if (['service_role', 'service role', 'api key', 'leak'].some(k => m.has(k)))
    return 'If a secret or service-role key ever shipped to the browser, rotate it first, then move the call into an Edge Function. Anything with a VITE_ or NEXT_PUBLIC_ prefix ends up in the public bundle.'
  if (['stripe', 'webhook', 'payment'].some(k => m.has(k)))
    return "Common cause: the app marks orders paid on the success page instead of in a webhook, or the webhook doesn't verify the Stripe signature (needs the raw request body). Worth checking both."
  if (['hire', 'looking for a dev', 'need a developer', 'freelancer', 'budget'].some(k => m.has(k)))
    return 'I fix and harden Lovable/Bolt + Supabase apps (auth, RLS, Stripe, deploy). Happy to take a quick look at what is broken and tell you honestly whether it is a small fix.'
  return 'Happy to take a look. What does the error say, and is the backend Supabase?'
}

async function getJson(url) {
  const r = await fetch(url, { headers: { 'user-agent': 'lead-radar/1.0 (personal use)' }, signal: AbortSignal.timeout(15000) })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r.json()
}

async function fromReddit(hours) {
  const since = Date.now() / 1000 - hours * 3600
  const out = []
  for (const sub of SUBREDDITS) {
    try {
      const j = await getJson(`https://www.reddit.com/r/${sub}/new.json?limit=100`)
      for (const c of j?.data?.children || []) {
        const d = c.data
        if (!d || d.created_utc < since || d.stickied) continue
        out.push({ source: `r/${sub}`, title: d.title, body: (d.selftext || '').slice(0, 2000), url: `https://www.reddit.com${d.permalink}`, created: d.created_utc * 1000, comments: d.num_comments })
      }
    } catch (e) {
      console.error(`reddit r/${sub}: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 1200)) // be polite to the public API
  }
  return out
}

async function fromHackerNews(hours) {
  const since = Math.floor(Date.now() / 1000 - hours * 3600)
  const out = []
  for (const q of ['lovable', 'supabase rls', 'vibe coded', 'bolt.new', 'base44']) {
    try {
      const j = await getJson(`https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(q)}&tags=(story,comment)&numericFilters=created_at_i>${since}&hitsPerPage=50`)
      for (const h of j.hits || []) {
        out.push({ source: 'Hacker News', title: h.title || h.story_title || '(comment)', body: (h.comment_text || h.story_text || '').replace(/<[^>]+>/g, ' ').slice(0, 2000), url: `https://news.ycombinator.com/item?id=${h.objectID}`, created: h.created_at_i * 1000, comments: h.num_comments || 0 })
      }
    } catch (e) {
      console.error(`hn ${q}: ${e.message}`)
    }
  }
  return out
}

export function rank(posts, minScore) {
  const seen = new Set()
  return posts
    .map(p => ({ ...p, ...scorePost(`${p.title} ${p.body}`) }))
    .filter(p => p.score >= minScore && !seen.has(p.url) && seen.add(p.url))
    .sort((a, b) => b.score - a.score || b.created - a.created)
}

export function toMarkdown(leads, hours) {
  const day = new Date().toISOString().slice(0, 10)
  const lines = [`# Lead radar ${day}`, '', `${leads.length} posts from the last ${hours} hours. Reply where you can genuinely help; follow each community's rules.`, '']
  for (const l of leads) {
    lines.push(`## [${l.title.replace(/[\[\]]/g, '')}](${l.url})`, '', `${l.source} · score ${l.score} · ${new Date(l.created).toISOString().slice(0, 16).replace('T', ' ')} UTC · ${l.comments} comments · matched: ${l.matched.join(', ')}`, '')
    if (l.body) lines.push(`> ${l.body.slice(0, 400).replace(/\s+/g, ' ')}${l.body.length > 400 ? '…' : ''}`, '')
    lines.push(`Suggested opener (personalize first): ${suggestOpener(l.matched)}`, '')
  }
  return lines.join('\n')
}

async function main() {
  const args = process.argv.slice(2)
  const opt = (name, d) => (args.includes(name) ? args[args.indexOf(name) + 1] : d)
  const hours = Number(opt('--hours', 48))
  const minScore = Number(opt('--min-score', 4))
  const [reddit, hn] = await Promise.all([fromReddit(hours), fromHackerNews(hours)])
  const leads = rank([...reddit, ...hn], minScore)
  const md = toMarkdown(leads, hours)
  if (args.includes('--stdout')) return console.log(md)
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'leads')
  await mkdir(dir, { recursive: true })
  const file = path.join(dir, `${new Date().toISOString().slice(0, 10)}.md`)
  await writeFile(file, md)
  console.log(`${leads.length} leads -> ${file}`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main().catch(e => { console.error(e); process.exit(1) })
