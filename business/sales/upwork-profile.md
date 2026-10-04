# Upwork profile and Project Catalog

Everything in a `text` block is paste-ready. Replace `[PLACEHOLDERS]` before publishing. Prices come from `../BRIEF.md`. Any other number in this file is marked as an estimate.

Upwork rule reminder: no email, phone, Calendly or personal website links in the profile, proposals or messages before a contract starts. Loom links are fine. Never move a client found on Upwork off-platform in violation of Upwork's terms.

---

## 1. Profile title (max 70 characters)

Primary (69 chars):

```text
Lovable & Bolt App Rescue | Supabase RLS, Stripe, Auth, Vercel Deploy
```

Alternates to A/B test every 2 weeks:

```text
Fix AI-Built Apps for Launch | Lovable, Supabase, Stripe, Vercel
```

```text
Claude Code Developer | Lovable/Bolt App Fixes, Supabase, Stripe
```

---

## 2. Overview (under 5,000 characters)

The first two lines show in search results. They name the buyer's tools and the outcome. Keep them as written.

```text
Built your app with Lovable, Bolt, Base44, Replit, v0 or Cursor, and now login, payments or deploys break when real users show up? I make AI-built apps safe and ready to launch.

I find what is broken or exposed, fix it on proper branches with tests, and hand you a working production app you fully own.

WHO I WORK WITH
Founders and operators whose AI-built app has real users, a live Stripe account, a paying pilot, an investor demo or a customer security review coming up. Also AI and automation agencies that need a reliable engineer behind their builds.

WHAT I FIX
- Supabase row-level security (RLS): tables readable or writable by the wrong users, missing policies, storage buckets open to anyone
- Exposed secrets: Stripe secret keys or the Supabase service_role key shipped in the JavaScript bundle, keys stored under VITE_ or NEXT_PUBLIC_ variables
- Auth: broken signup, password reset and OAuth redirects, email confirmation, sessions that drop
- Stripe: checkout, webhooks with signature verification, subscriptions that do not unlock access, failed-payment handling
- Deploys: failing Vercel or Netlify builds, environment variables, 404s on page refresh, custom domains
- Reliability: error monitoring (Sentry), rate limits, slow queries, missing indexes, blank screens on errors
- Integrations: CRM, Google Workspace, Slack, email, n8n workflows, inbound AI receptionist

MY STACK
React/Vite or Next.js, Supabase (Postgres, Auth, Storage, Edge Functions), Stripe, Vercel or Netlify, GitHub. I use Claude Code to work fast, and I review and test every change myself. Replit-native or Base44-native backends are quoted as a migration to this stack.

HOW A PROJECT RUNS
1. Diagnosis (48 hours): I review your repo and Supabase project and send a written report ranked by severity, a Loom walkthrough, and a fixed-price quote for the fixes.
2. Fix sprint (5-10 days): one pull request per issue, Vercel preview deploys so you can test each fix, RLS changes as versioned migrations, secrets moved to environment variables, and a handover doc.
3. Optional monthly support: dependency and security updates, monitoring and small features.

HOW I HANDLE YOUR ACCESS AND DATA
- You own every account. I work as a collaborator and you remove my access at handover.
- I work on staging or a branch wherever possible, not on live data.
- I never put your Supabase service_role key into an AI tool's environment.
- Happy to sign your NDA.

WHAT I WILL NOT DO
I will not promise your app is "100% secure". Nobody honest can. What I promise: every issue I find is documented and ranked, and every fix we agree on is delivered and tested.

WORKING STYLE
Async-first and written. You get a short update at the end of each working session and a Loom when something is easier to show than to explain.

If your post describes a specific bug, I will reply with a short video on what I would check first in your app.
```

Character count check: paste into a counter before publishing. As written it sits around 3,100 characters (estimate), which leaves room for a line about your background.

Optional line to add near the end, written by you:

```text
About me: [ONE SENTENCE ON YOUR BACKGROUND, e.g. "US-based full-stack developer, X years shipping React and Postgres apps."]
```

---

## 3. Skills tags (15)

Upwork allows up to 15. Add them in this order (most specific first):

1. Supabase
2. Lovable
3. Bolt.new
4. Vibe Coding
5. Claude Code
6. Stripe
7. React
8. Next.js
9. Vite
10. PostgreSQL
11. Vercel
12. Web Application Security
13. API Integration
14. n8n
15. Bug Fix

If Upwork's skill picker does not list a tag exactly as written (for example "Lovable", "Bolt.new" or "Claude Code"), pick the closest available option and move on. The picker changes often.

---

## 4. Hourly rate guidance

From the brief: prefer hourly contracts at $100-$150/hr for the first jobs.

| Stage | Profile rate | What to do |
|---|---|---|
| Jobs 1-3 (no reviews yet) | $100/hr | Bid hourly with a weekly cap. Win on the Loom and the specific diagnosis, not on price. |
| Jobs 4-6 (first 5-star reviews) | $125/hr | Start offering the fixed-price Catalog projects to repeat clients. |
| After 3-5 case studies | $150/hr | Matches the change-order rate in the brief. Push buyers toward fixed-price Catalog projects. |

Rules:

- Do not go below $100/hr. The brief targets buyers who pay $1.5k-$5k; low rates attract the $30-budget hobbyists the brief tells you to avoid.
- Put a weekly hour cap on every hourly contract (for example 10 hours for a first job). It protects the client and makes "yes" easier.
- Upwork's service fee comes out of your side. Check the current rate under Settings before quoting; do not quote numbers to clients net of fees.
- Once a client has a diagnosis report, quote the sprint as a fixed-price project (or Catalog purchase) at the brief's prices.

---

## 5. Portfolio item ideas

Only show work you actually did. Until you have client work, build on demo apps you own.

1. **"Broken on purpose" demo teardown.** Build a small Lovable app you own (for example a mini CRM). Leave RLS off on one table and put a Stripe test secret key in a `VITE_` variable. Portfolio item: before/after screenshots, the Loom from `loom-scripts.md`, and the SQL migration that fixed it. Title: "Supabase RLS + exposed key fix on a Lovable app (demo)".
2. **Sample Diagnosis report.** A redacted PDF report built from the demo app: severity table, findings, fixed-price quote. Title: "Sample Ship-Ready Diagnosis report (demo app)".
3. **Stripe webhook done right.** Short repo or gist: Supabase Edge Function that verifies the Stripe signature, dedupes on event ID, and updates a `subscriptions` table. Screenshot of the Stripe dashboard showing successful deliveries in test mode.
4. **Deploy fix.** Vite SPA on Vercel with the rewrite that stops 404s on refresh, environment variables split by environment, Sentry wired. Screenshot of the passing build and the preview URL.
5. **n8n workflow.** A lead-intake workflow (form to CRM to Slack alert) with a screenshot of the canvas and a 60-second Loom.
6. **Pre-launch checklist.** A one-page PDF version of teardown post (c). Useful as a portfolio item and as something to attach in messages.

After real projects: replace demo items with client case studies (with written permission), each with the problem, what you fixed, number of PRs, and the outcome in the client's words.

---

## 6. Project Catalog listings

Three listings mirroring the brief's SKUs. Upwork shows three tiers per project. Delivery days follow the brief.

### Listing 1: Ship-Ready Diagnosis

**Title**

```text
You will get a security and launch audit of your Lovable, Bolt or AI-built app
```

**Category:** Web Development > Web & App Security (or the closest available)

**Tiers**

| | Starter: Diagnosis | Standard: Diagnosis + Fix 5 | Advanced: Diagnosis + Fix 10 + Deploy |
|---|---|---|---|
| Price | $399 | $1,500 | $2,500 |
| Delivery | 2 days | 7 days | 10 days |
| Repo + Supabase review | Yes | Yes | Yes |
| Written report ranked by severity | Yes | Yes | Yes |
| Loom walkthrough | Yes | Yes | Yes |
| Fixed-price fix quote | Yes | Yes | Yes |
| Fixes delivered | No | Up to 5 issues | Up to 10 issues |
| One PR per issue, preview deploys | No | Yes | Yes |
| Production deploy | No | No | Yes |
| Handover doc | No | Yes | Yes |

The Standard and Advanced tiers price the diagnosis fee as credited toward the sprint, exactly as the brief states ($399 credited into the $1,500 and $2,500 sprints).

**Starter description**

```text
A human-reviewed audit of your repo and Supabase project, delivered in 48 hours.

I check:
- Row-level security on every table, and storage bucket policies
- Exposed keys: Stripe secret key or Supabase service_role key in the browser bundle, secrets in VITE_ or NEXT_PUBLIC_ variables
- Auth flows: signup, login, password reset, OAuth redirects, email confirmation
- Stripe checkout and webhooks, including signature verification
- Error handling, deploy setup and obvious performance problems

You get:
- A written report with each issue ranked Critical, High, Medium or Low, with the evidence and the fix
- A Loom walkthrough of the findings
- A fixed-price quote to fix them. The $399 is credited toward that fix sprint if you go ahead.

If I find nothing material, you get a refund.
```

**FAQ**

```text
Q: What do you need access to?
A: Read access to your GitHub repo and a collaborator invite to your Supabase project (staging if you have one). You keep ownership of every account and can remove me at any time.

Q: Will you change anything in my app?
A: Not during the diagnosis. It is review only. Changes happen in the sprint, on branches, through pull requests you can test first.

Q: My app is on Replit or Base44's own backend. Can you still help?
A: Yes, I can review it, but my fixes target React/Vite or Next.js + Supabase + Stripe + Vercel/Netlify. If your backend lives inside Replit or Base44, I will quote moving it to that stack.

Q: Can you guarantee my app is secure after this?
A: No, and be wary of anyone who does. I guarantee that what I find is documented and ranked, and that the fixes we agree on are delivered and tested.

Q: What counts as "nothing material" for the refund?
A: No issue rated High or Critical in the report.
```

Owner note: the "High or Critical" definition of material is a suggested policy. Change it here and in `objections-and-faq.md` together if you define it differently.

**Requirements from buyer**

```text
1. App URL (live or staging) and which builder you used (Lovable, Bolt, Base44, Replit, v0, Cursor, other)
2. GitHub repo link with read access for [YOUR_GITHUB_USERNAME]
3. Supabase project invite for [YOUR_EMAIL_ON_UPWORK_MESSAGES_ONLY] as Developer (staging project preferred)
4. Does the app have live users today? Roughly how many?
5. Is Stripe in live mode?
6. Any deadline: launch date, investor demo, customer security review?
7. The top 3 things you are worried about, in your words
```

Note on item 3: share your email for the Supabase invite only after the contract has started, through Upwork messages.

---

### Listing 2: Fix & Ship Sprint

**Title**

```text
You will get your AI-built app fixed and deployed: Supabase, Stripe, auth, Vercel
```

**Tiers**

| | Starter: Fix 5 | Standard: Fix 10 + Deploy | Advanced: Payments, Auth or Multi-tenant |
|---|---|---|---|
| Price | $1,500 | $2,500 | $4,000 |
| Delivery | 5 days | 7 days | 10 days |
| Issues fixed | Up to 5 | Up to 10 | Up to 10, plus one of: payments build, auth rebuild, multi-tenant |
| One PR per issue with tests | Yes | Yes | Yes |
| Vercel preview deploys | Yes | Yes | Yes |
| RLS migrations | Yes | Yes | Yes |
| Secrets moved to env vars | Yes | Yes | Yes |
| Sentry error monitoring | Yes | Yes | Yes |
| Rate limits | Yes | Yes | Yes |
| Production deploy | No | Yes | Yes |
| Handover doc | Yes | Yes | Yes |

Delivery days are set inside the brief's 5-10 day window. The split of 5/7/10 across tiers is a suggested default.

**Starter description**

```text
I fix the issues in your AI-built app and leave you with clean, reviewable changes.

How it works:
- We agree the issue list up front (from my Diagnosis or your own list, confirmed on a short call or in writing)
- Each fix goes on its own branch with tests and its own pull request
- Every PR gets a Vercel preview deploy so you can click through the fix before it merges
- Database security changes ship as versioned RLS migrations, not dashboard clicks
- Secrets move out of the frontend into server-side environment variables
- Sentry is set up so you see errors before your users report them
- You get a handover doc: what changed, where, and how to keep it that way

Stack: React/Vite or Next.js, Supabase, Stripe, Vercel or Netlify.

Important: if you later re-prompt Lovable, Bolt or another builder on the same files, it can overwrite these fixes. The handover doc shows which files to protect.
```

**FAQ**

```text
Q: Do I need the Diagnosis first?
A: Recommended, not required. Without it, I will review your issue list and confirm scope in writing before starting. If you did buy the Diagnosis, its $399 fee is credited toward this sprint.

Q: What counts as one issue?
A: One problem with one root cause, for example "orders table readable by any logged-in user" or "Stripe webhook does not verify signatures". The agreed list is written down before work starts.

Q: What if you find more problems while fixing?
A: I flag them in writing. You choose: add them as a change order ($150/hr or a fixed quote) or leave them for later.

Q: What if a fix breaks something?
A: Every fix is a separate PR with a preview deploy, so you test it before it goes live, and any single change can be reverted on its own.

Q: Can I keep using Lovable or Bolt after?
A: Yes, but re-prompts can overwrite fixes. Re-fixes after handover are covered by the monthly support plan.
```

**Requirements from buyer**

```text
1. Diagnosis report, or your list of issues in priority order
2. GitHub repo access (write access to open branches and PRs) for [YOUR_GITHUB_USERNAME]
3. Supabase project invite (staging preferred) and Vercel or Netlify team invite
4. Stripe: test-mode access, or a restricted key created for this project (never send your live secret key in chat)
5. Who approves and merges PRs on your side
6. Launch or deadline date
```

---

### Listing 3: Wire-It-Up (integrations and automations)

**Title**

```text
You will get your app wired to your CRM, Stripe, Slack, Google or n8n workflows
```

**Tiers** (brief range: $1,000-$3,000 fixed, 3-7 days; the split below is a suggested mapping)

| | Starter: One Integration | Standard: Workflow | Advanced: Multi-system or AI Receptionist |
|---|---|---|---|
| Price | $1,000 | $2,000 | $3,000 |
| Delivery | 3 days | 5 days | 7 days |
| Systems connected | 1 (e.g. app to HubSpot) | Up to 3 in one n8n workflow | Up to 5, or inbound AI receptionist |
| Error alerts and retries | Yes | Yes | Yes |
| Secrets stored server-side | Yes | Yes | Yes |
| Loom handover | Yes | Yes | Yes |
| Written runbook | No | Yes | Yes |

**Starter description**

```text
I connect your app to the tools your business already runs on.

Examples:
- New signup in Supabase creates a contact in HubSpot or Pipedrive and posts to Slack
- Stripe payment events update your database and send a receipt email
- Google Sheets, Calendar or Gmail automations
- n8n workflows that replace a fragile chain of Zaps
- Inbound AI receptionist that answers calls or chats, captures details and books into your calendar (inbound only, I do not build outbound calling)

Every integration gets error alerts, retries on failure, and API keys stored server-side, never in the browser.
```

**FAQ**

```text
Q: Do you self-host n8n or use n8n Cloud?
A: Either. If you do not have a preference, n8n Cloud is simpler to own and maintain. You own the account.

Q: Will you build outbound AI calling?
A: No. Inbound only.

Q: What if the other system's API changes later?
A: The monthly support plan covers small fixes like this. Otherwise it is billed as a change order.
```

**Requirements from buyer**

```text
1. What should happen, step by step, in plain words ("when X happens, do Y, then tell Z")
2. Admin or API access to each system involved (invite me as a user where possible)
3. Example records to test with (test data, not real customer data)
4. Who gets alerted when something fails
```
