# Tools and costs

All prices are **estimates as of October 2026, labeled (est.)**. Vendors change pricing often: check each pricing page before you buy. Fixed numbers from the brief are labeled (brief).

Client-side tools (Supabase, Sentry, Upstash, the client's Vercel/Netlify and Stripe) are paid by the client on accounts they own. This list is only what **you** pay to run ShipReady.

## Core stack

| Tool | What for | Plan to start | Monthly cost | Notes |
|---|---|---|---|---|
| Claude (Claude Code) | Doing the work: audits, fixes, tests | Max plan | $100-$200 (est.) | Main production tool. Use a plan/settings where your data is not used for training, and check commercial terms (MSA section 10). Pro (~$20, est.) is enough for week 1. |
| GitHub | Your repos, toolkit, client collaboration | Free | $0 (est.) | Enable MFA. |
| Vercel | Hosts the ShipReady site and free scan | Pro | $20 (est.) | Hobby is for non-commercial use, so a business site should be on Pro. Hobby is fine while building privately. |
| Domain | `[yourdomain].com` | Annual | ~$1-2 ($10-$20/yr, est.) | Buy from any registrar or Vercel Domains. |
| Stripe | Payment Links for diagnosis, sprint deposit, retainers | Standard | $0 fixed; ~2.9% + 30c per US card payment (est.) | A $399 diagnosis nets ~$387. No monthly fee. |
| Loom | Diagnosis walkthroughs, 60-second Upwork replies | Paid tier | ~$15-$20 (est.) | Free tier has short video limits that don't fit a 10-minute walkthrough (check current limits). |
| 1Password | Client credential vaults and share links | Individual or Teams Starter | $3-$20 (est.) | Share links let clients send secrets without an account. Bitwarden is a cheaper alternative. |
| Email on your domain | `hello@[domain]` | Google Workspace or Zoho | $1-$8 (est.) | Needed for trust and for Resend's sending domain. |

## Optional at start

| Tool | What for | Monthly cost | When |
|---|---|---|---|
| Resend | Emailing scan results and lead notifications from the site (`RESEND_API_KEY`) | $0 on free tier (est. ~3,000 emails/month); ~$20 paid (est.) | When the scan "email me results" feature goes live. |
| Cal.com | Booking link (`NEXT_PUBLIC_CAL_URL`) | $0 (est., free individual plan) | When you start taking calls. |
| Slack / Discord / Zapier webhook | Lead alerts (`LEADS_WEBHOOK_URL`) | $0 (est.) | Day 1 if you want instant lead pings on your phone. |
| UptimeRobot / Better Stack | Uptime checks for your site and retainer clients | $0 free tier; ~$7-$30 paid (est.) | First retainer. |
| Sentry (your own site) | Errors on the ShipReady site | $0 developer tier (est.) | Week 2. |
| Notion / Google Sheets | CRM and `metrics-tracker.md` scoreboard | $0 (est.) | Day 1 (a sheet is fine). |

## Marketplaces

| Platform | Cost | Notes |
|---|---|---|
| Upwork | Variable freelancer service fee, roughly 0-15% of earnings (est.), plus Connects to bid (~$0.15 each, est.; budget ~$20-$40/month) | Prefer hourly $100-$150/hr for first jobs, $500+ budgets, verified payment only (brief). |
| Fiverr | 20% of each order (est.) | Price gigs so the net still works: a $399 gig nets ~$319. |

Keep marketplace clients on the platform per its terms (brief).

## Business and risk

| Item | Cost | Notes |
|---|---|---|
| E&O / professional liability (often bundled with cyber) | ~$40-$150/month (est.; get 2-3 quotes) | Brief: consider E&O. Get a quote in week 1; buy before the first sprint that touches production. |
| LLC formation | $50-$500 one-time + annual fee, varies by state (est.) | Optional at start; sole proprietor + DBA is fine for the first clients. Ask an accountant. |
| Business bank account | $0-$15 (est.) | Keeps Stripe payouts separate. |
| Lawyer review of `business/legal/` templates | $500-$2,000 one-time (est.) | Worth doing before the first sprint contract. |
| Bookkeeping | $0-$30 (est.) | Spreadsheet or a simple app; set aside ~25-30% for taxes (est.; ask an accountant). |

## Monthly total (estimates)

| Scenario | Monthly |
|---|---|
| **Lean start (weeks 1-2):** Claude Pro, Vercel Hobby while private, domain, free tiers | ~$25-$40 (est.) |
| **Launched (from first paid client):** Claude Max, Vercel Pro, Loom, 1Password, Workspace email, Upwork Connects | ~$170-$300 (est.) |
| **Plus insurance** | ~$210-$450 (est.) |

Break-even: one $399 diagnosis covers a typical month of tools.

## What to set up first (in order)

1. **Stripe account** and 3-5 Payment Links: Diagnosis $399, Diagnosis intro $199, Sprint deposit (50% of $1,500 = $750; add $1,250 and $2,000 deposit links later or create per-quote links), retainer subscriptions ($500 / $1,000 / $1,500) when needed.
2. **Domain** and email on the domain.
3. **Vercel**: connect the repo, set env vars (see `LAUNCH.md`), deploy. Move to Pro before you start selling.
4. **Claude Code** plan in place, with data-training settings checked.
5. **1Password** vault structure: `shipready-ops`, `client-[slug]` per client.
6. **Loom** paid tier, and record the demo walkthrough.
7. **Upwork and Fiverr** profiles.
8. **Lead alerts**: `LEADS_WEBHOOK_URL` to Slack/Discord so you can reply within 15 minutes.
9. **Resend** and **Cal.com** (optional).
10. **E&O quote**, then LLC and bank account when revenue starts.
