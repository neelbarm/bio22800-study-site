# ShipReady: business brief (source of truth)

Working brand: **ShipReady** (placeholder; every user-facing name, price and link lives in `lib/config.ts` and can be changed in one place). Tagline: "Your AI-built app, made safe to launch."

## What we sell
A solo, Claude-Code-powered studio that makes apps built with AI app builders (Lovable, Bolt, Base44, Replit, v0, Cursor) safe and ready for real users. We standardize on one stack: **React/Vite or Next.js front end + Supabase + Stripe + Vercel/Netlify**. Replit-native or Base44-native backends are quoted as migrations.

| SKU | Price | Delivery | What's in it |
|---|---|---|---|
| Free Ship-Ready Scan | $0 | instant, automated | Owner-opted-in scan of a live URL: exposed secrets in JS bundles, Supabase service-role key in the client, tables readable by anonymous users (RLS off or too open), exposed .env / source maps, missing security headers. Lead magnet. |
| Ship-Ready Diagnosis | $399 (intro $199 for first 3 clients in exchange for a testimonial) | 48 hours | Human-reviewed audit of repo + Supabase: RLS policies, storage rules, auth flows, exposed keys, Stripe checkout/webhooks, error handling, deploy, performance. Written report ranked by severity + Loom walkthrough + fixed-price fix quote. Fee credited toward the sprint. Refund if nothing material found. |
| Fix & Ship Sprint | $1,500 (up to 5 issues) / $2,500 (up to 10 + production deploy) / $4,000 (adds payments, auth rebuild or multi-tenant) | 5-10 days | Fixes from the plan on branches with tests, one PR per issue, Vercel preview deploys, RLS migrations, secrets moved to env vars, Sentry, rate limits, handover doc. |
| Wire-It-Up add-on | $1,000-$3,000 fixed | 3-7 days | Integrations: CRM, Google Workspace, Stripe, Slack, email, n8n workflows, inbound AI receptionist (inbound only, never outbound calling). |
| Maintain & Extend retainer | $500/mo (4 small requests + monitoring) / $1,000/mo (10 requests + monthly security pass) / $1,500/mo (priority, 48h turnaround) | monthly | Dependency and security updates, Supabase advisor checks, uptime, small features. Note: builder re-prompts can overwrite fixes; re-fixes are covered only by the retainer. |
| White-label for AI agencies | 15-20% off list | same | Agency resells under its brand; we build and test. |

Change orders: $150/hr or fixed quotes. Never promise "secure" or "guaranteed": we promise "issues found are documented and the agreed fixes are delivered and tested".

## Who buys (in order)
1. **Founders/operators with an AI-built app that has real users, revenue, a paying pilot, an investor demo or a customer security review coming.** They pay $1.5k-$5k without blinking. Qualify on intake: live users? Stripe live? deadline?
2. **AI-automation / AI agencies** (often Skool-community graduates) that sold builds they can't reliably deliver. Repeat buyers. White-label.
3. SMB operators posting integration jobs with $1k+ budgets.
Avoid: hobbyists with no users and $30 budgets.

## Channels (in order of priority)
1. Free scan tool (inbound): share teardown posts, offer scans in r/lovable, r/vibecoding, r/Supabase, r/SaaS, Lovable/Supabase Discords, X, LinkedIn.
2. White-label agency partnerships (DMs to agency owners in Skool communities and LinkedIn).
3. Upwork + Fiverr: review-builder for the first 5-10 jobs. On Upwork prefer hourly contracts at $100-$150/hr for first jobs; only $500+ budgets with verified payment; respond within 15 minutes with a 60-second Loom.
4. Weekly teardown content ("7 Supabase RLS mistakes to check in your Lovable app"). Don't claim audit experience you don't have yet.

## Market evidence (cite when useful)
- Fiverr Business Trends Index, June 9 2026: Claude Code specialists +938% (fastest-growing), n8n +125%, Base44 +95%, vibe coding +61%. https://www.globenewswire.com/news-release/2026/06/09/3308866/0/en/Businesses-Race-to-Hire-Claude-Code-Specialists-As-Demand-Surges-938.html
- Upwork In-Demand Skills 2026: AI integration +178% YoY. https://investors.upwork.com/news-releases/news-release-details/upworks-demand-skills-2026-demand-top-ai-skills-more-doubles-ai
- Lovable: 60M+ projects, ~80% non-technical builders, ~$600M run-rate (Sept 2026). https://techcrunch.com/2026/03/11/lovable-says-it-added-100m-in-revenue-last-month-alone-with-just-146-employees/
- Competitor prices: vibecoderescue.dev $299 48h diagnosis; Seedinov $1,500 audit / $6k+ sprint; Relux $3k audit / $10k+ sprint; Teyrex from $1,400; VibeRescue from £999; Fiverr rescue gigs from $30.
- Upwork AI-automation fixed budgets median $150 (May 2026) -> filter hard for $500+ clients.

## Targets and kill gates
- Day 14: first paid dollar (a $199-$399 diagnosis).
- Day 30: $2k-$4k collected, 1 retainer, 2 agency conversations.
- Month 3: $4k-$8k/mo. Month 6: $8k-$15k/mo (estimates).
- Kill/pivot gate: no paid diagnosis by day 21, or fewer than 2 of the first 5 diagnoses convert to $1.5k+ sprints -> pivot to agency white-label or hourly "fractional engineer for vibe-coded startups".
- Raise prices after 3-5 case studies: diagnosis $499-$750, sprints $3k-$6k.

## Guardrails
- Staging-only access where possible; never put service-role keys in an AI agent's environment; client owns all accounts; we get collaborator access, removed at handover.
- Clear scope, fixed issue counts, limitation of liability, no "secure" guarantees, DPA available. Consider E&O insurance.
- Free scan only on apps the requester owns or is authorized to test (checkbox attestation), read-only and minimal; never returns actual row data.
- Marketplace rules: don't take Upwork/Fiverr clients off-platform in violation of their terms.

## Owner
Technical builder, ships fast with Claude Code, GitHub, Vercel. Works part-time, odd hours, mostly async. US-based.
