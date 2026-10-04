# ShipReady: 30-day launch plan

Source of truth for offers, prices and gates: [`business/BRIEF.md`](business/BRIEF.md). Ops runbooks are in [`business/ops/`](business/ops/), contract templates in [`business/legal/`](business/legal/).

**The offer ladder:** Free Ship-Ready Scan ($0) -> Ship-Ready Diagnosis ($399; $199 intro for the first 3 clients in exchange for a testimonial; 48h) -> Fix & Ship Sprint ($1,500 / $2,500 / $4,000; 5-10 days) -> Maintain & Extend retainer ($500 / $1,000 / $1,500 per month). Agencies get 15-20% off list. Change orders $150/hr.

**The rule we never break:** we never promise "secure". We promise that issues found are documented and the agreed fixes are delivered and tested.

---

## Things only you can do

These need your identity, money or judgment. Nothing else in this plan works until the first five are done.

- [ ] **Create a Stripe account** (verify identity and bank) and **3-5 Payment Links**:
  - [ ] Ship-Ready Diagnosis: **$399** -> `NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS`
  - [ ] Ship-Ready Diagnosis intro: **$199** (if Stripe offers a payment-count limit on the link, set it to 3; otherwise deactivate it after the 3rd sale) -> `NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS_INTRO`
  - [ ] Fix & Ship Sprint deposit: **$750** (50% of the $1,500 tier) -> `NEXT_PUBLIC_STRIPE_LINK_SPRINT_DEPOSIT`. For other tiers and the diagnosis credit, create a per-quote link or invoice.
  - [ ] Optional: Maintain retainer **$500/month** subscription link.
  - [ ] Optional: Sprint 10 deposit **$1,250** link.
  - On each link: collect name and email, set the confirmation to redirect to your site, and add a line referencing the SOW and terms.
- [ ] **Buy a domain** (and set up email on it, e.g. `hello@[domain]`).
- [ ] **Connect this repo to Vercel**, add the domain, and **set the environment variables** below for Production (and Preview). Redeploy after changing any `NEXT_PUBLIC_` value, because they are baked in at build time.
- [ ] **Create Upwork and Fiverr profiles** (Claude Code / Supabase / Lovable rescue positioning; see Day 4).
- [ ] **Record the demo Loom**: a 5-8 minute walkthrough of a sample diagnosis on a demo app you own (never a real client's app).
- [ ] Optional: **set up Resend** (verify your domain, create an API key) so the site can email scan results and lead notifications.
- [ ] Optional: **Cal.com booking link** for 15-minute intake calls.
- [ ] Optional at start: **business entity (LLC) and business bank account**. A sole proprietorship is fine for the first clients; ask an accountant.
- [ ] **Get an E&O (professional liability) insurance quote.** Buy before the first sprint that touches production.
- [ ] **Have a lawyer in your state review** `business/legal/` (at least the MSA, sprint SOW, privacy policy and terms) and fill in every `[PLACEHOLDER]`, especially `[STATE]`, your legal name and contact email.

## Environment variables (website)

Set in Vercel > Project > Settings > Environment Variables. Values shown are examples.

| Variable | Required? | Example | What it does |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://shipready.example` | Canonical URL for links, metadata and emails. No trailing slash. |
| `NEXT_PUBLIC_BRAND_NAME` | Yes | `ShipReady` | Brand shown across the site (placeholder name; change here). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | `hello@shipready.example` | Public contact address on the site, privacy policy and terms. |
| `NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS` | Yes | `https://buy.stripe.com/...` | $399 diagnosis Payment Link. |
| `NEXT_PUBLIC_STRIPE_LINK_DIAGNOSIS_INTRO` | Recommended | `https://buy.stripe.com/...` | $199 intro diagnosis link (first 3 clients). Remove after 3 sales. |
| `NEXT_PUBLIC_STRIPE_LINK_SPRINT_DEPOSIT` | Recommended | `https://buy.stripe.com/...` | $750 sprint deposit link. |
| `NEXT_PUBLIC_CAL_URL` | Optional | `https://cal.com/yourname/intake` | Booking link for intake calls. |
| `RESEND_API_KEY` | Optional | `re_...` | Server-only. Enables emailing scan results and lead notifications. **Never prefix with `NEXT_PUBLIC_`.** |
| `LEADS_TO_EMAIL` | Optional (with Resend) | `you@yourmail.com` | Where new-lead emails are sent. |
| `LEADS_FROM_EMAIL` | Optional (with Resend) | `ShipReady <leads@shipready.example>` | Sender address; must be on a domain verified in Resend. |
| `LEADS_WEBHOOK_URL` | Optional | `https://hooks.slack.com/services/...` | Server-only. A Slack, Discord or Zapier webhook that receives each new lead, so you can reply within 15 minutes. |

Anything with `NEXT_PUBLIC_` is visible to every visitor. Only links, names and public addresses go there.

## Targets and kill gates (from the brief)

| When | Target |
|---|---|
| **Day 14** | First paid dollar (a $199-$399 diagnosis) |
| **Day 30** | $2k-$4k collected, 1 retainer, 2 agency conversations |
| Month 3 | $4k-$8k/month (estimate) |
| Month 6 | $8k-$15k/month (estimate) |
| After 3-5 case studies | Raise prices: diagnosis $499-$750, sprints $3k-$6k |

**Kill/pivot gates:**
- **No paid diagnosis by day 21**, or
- **Fewer than 2 of the first 5 diagnoses convert to $1.5k+ sprints**

-> pivot to **agency white-label** as the main channel, or to an hourly **"fractional engineer for vibe-coded startups"** offer. Track both in [`business/ops/metrics-tracker.md`](business/ops/metrics-tracker.md).

---

## Week 1: day by day

Assumes part-time, odd hours: about 2-3 focused hours per day.

### Day 1: Money and site live
- [ ] Stripe account + Diagnosis ($399), Intro ($199) and Sprint deposit ($750) Payment Links.
- [ ] Domain bought; email on the domain.
- [ ] Repo connected to Vercel; all required env vars set; deployed on the domain.
- [ ] `LEADS_WEBHOOK_URL` to Slack/Discord so leads ping your phone.
- [ ] Privacy policy and terms pages live with placeholders filled (lawyer review scheduled).
- [ ] Test the full path yourself: run the free scan on your own demo app, submit the form, receive the lead, open each Payment Link (Stripe test mode or a refunded $1 test).

### Day 2: Tooling and a demo app
- [ ] Build or reuse a **demo app** you own (Lovable/Bolt + Supabase) with deliberate mistakes: RLS off on one table, an `authenticated using (true)` policy, a public bucket, an unverified Stripe webhook.
- [ ] Run `node toolkit/bin/shipready-audit.mjs <demo-repo>` and the free scan against it; fix any toolkit rough edges.
- [ ] Do a full mock diagnosis using `business/ops/diagnosis-runbook.md` and time yourself (target under 3 hours).
- [ ] 1Password vaults set up; Claude Code plan and data settings checked.

### Day 3: Proof assets
- [ ] Write the demo diagnosis report from `business/ops/delivery-report-template.md` (redacted, demo app).
- [ ] **Record the demo Loom** (5-8 min) walking through it.
- [ ] Add the sample report and Loom to the site.
- [ ] Draft teardown post #1: "7 Supabase RLS mistakes in Lovable apps we audit" (use the demo app, not anyone else's).

### Day 4: Marketplaces
- [ ] Upwork profile: title like "Claude Code + Supabase specialist: make your AI-built app launch-ready". Portfolio: demo report + Loom.
- [ ] Fiverr gigs: Diagnosis (priced so the net after the 20% fee works) and Fix Sprint tiers.
- [ ] Saved searches on Upwork: Lovable, Bolt, Supabase, Base44, vibe coding, Claude Code, Cursor. Filters: $500+ budget or hourly, payment verified.
- [ ] Prepare 3 proposal templates + 60-second Loom template. Rule: reply within 15 minutes when awake; prefer hourly $100-$150/hr for first jobs.

### Day 5: Launch post (inbound)
- [ ] Publish teardown #1 on your site, then share in r/lovable, r/vibecoding, r/Supabase, r/SaaS (follow each subreddit's self-promotion rules), the Lovable and Supabase Discords, X and LinkedIn.
- [ ] Offer: "Reply with your URL and I'll run the free scan and tell you what it means" (owners only).
- [ ] Reply to every comment. Log leads in the metrics tracker.

### Day 6: Agency outreach
- [ ] List 30 AI-automation/AI agencies (Skool communities, LinkedIn) that sell app builds.
- [ ] Send 10 personal DMs: "I do the security/launch-readiness part of AI-built apps under your brand, 15-20% off list, 48h diagnosis." Attach the demo Loom.
- [ ] Prepare the white-label one-pager from `business/legal/sow-white-label.md` pricing.

### Day 7: Review and reset
- [ ] Fill week 1 in `business/ops/metrics-tracker.md`.
- [ ] Follow up on every open conversation.
- [ ] Get E&O quotes in progress; lawyer review booked.
- [ ] Plan week 2 content (teardown #2).

## Week 2 (days 8-14): first paid diagnosis

Goal: **first paid dollar by day 14.**
- [ ] Daily: 20 minutes on Upwork (3-5 proposals on qualified jobs), reply to scan leads within 15 minutes when possible.
- [ ] Offer the **$199 intro** aggressively to qualified leads (first 3 only, testimonial required).
- [ ] Publish teardown #2 (e.g. "Your Stripe webhook is accepting fake payments"); share in the same channels.
- [ ] 10 more agency DMs; follow up on week-1 DMs. Aim for the first agency call.
- [ ] Deliver any diagnosis within 48 hours using the runbook; send the fixed-price sprint quote and pre-filled SOW with it.
- [ ] Day 14 checkpoint: paid diagnosis? If not, review lead sources and message, and double the outreach volume for week 3.

## Week 3 (days 15-21): convert and stack

Goal: first sprint sold, and pass the **day-21 gate**.
- [ ] Follow up on every delivered diagnosis at 2 and 7 business days.
- [ ] Run the first sprint with `business/ops/sprint-runbook.md` (branch per issue, tests, previews, handover).
- [ ] Ask every intro client for their testimonial; add it to the site.
- [ ] Publish teardown #3; post one anonymized "what we found" thread (only with client permission).
- [ ] 10 more agency DMs; hold 1-2 agency calls.
- [ ] **Day 21 gate:** no paid diagnosis yet -> pivot decision (agency white-label focus, or hourly fractional engineer). Write it in the metrics tracker.

## Week 4 (days 22-30): retainer and agencies

Goal: **$2k-$4k collected, 1 retainer, 2 agency conversations by day 30.**
- [ ] At every sprint handover, pitch the retainer around re-prompt protection (Maintain $500, Maintain Plus $1,000, Priority $1,500). Set up the Stripe subscription.
- [ ] Close at least one agency Job Order (a white-label diagnosis is the easiest first yes).
- [ ] Remove the $199 intro link after 3 sales; diagnosis is $399 from now on.
- [ ] Publish teardown #4; reuse your best-performing channel from the tracker.
- [ ] Day 30 review: revenue vs target, sprint conversion on the diagnosis cohort, hours vs revenue (effective rate), what to stop and start in month 2.
- [ ] Plan the second kill-gate check: after diagnosis #5, did 2+ convert to $1.5k+ sprints?

## Weekly rhythm after day 30

| Day | Focus |
|---|---|
| Monday | Retainer weekly routine (`business/ops/retainer-runbook.md`), metrics review |
| Tuesday-Thursday | Delivery (diagnoses, sprints) |
| Friday | Teardown post + agency outreach |
| Daily, 20 min | Upwork/Fiverr proposals and lead replies |

Raise prices after 3-5 case studies (diagnosis $499-$750, sprints $3k-$6k). Update prices in `lib/config.ts`, the Payment Links and the SOW templates together.
