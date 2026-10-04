# Metrics tracker

Update every week on the same day (e.g. Sunday evening, 15 minutes). Copy the table to a Google Sheet if easier; keep the definitions the same. Day 1 = the day the site and first Payment Link go live: **[LAUNCH DATE]**.

## Definitions

| Metric | Definition |
|---|---|
| Leads | New people or agencies who contacted you, booked a call, or left an email (site form, DM, Upwork invite, Fiverr message). One per person. |
| Qualified leads | Leads scoring 4+ on the intake scorecard (`client-intake-questions.md`). |
| Scans | Free scans run on the site (from logs or lead notifications). |
| Proposals sent | Upwork proposals + Fiverr offers + quotes sent. |
| Diagnoses sold | Paid diagnoses ($199 or $399), counted on payment. |
| Sprint conversions | Diagnoses that turned into a paid sprint deposit ($1.5k+). Track against the diagnosis cohort. |
| Packages sold | Owner options from `pricing-and-scripts.md` section 1b: Launch Readiness Packages (on deposit) and agency 3-packs (on payment). Don't also count them under Diagnoses or Sprints. |
| Retainers active | Retainer subscriptions paid for the current month. |
| Agency conversations | Real calls or threaded conversations with agency owners about white-label (not just a sent DM). |
| Revenue collected | Cash actually received this week (after refunds, before fees). A sprint counts net of the diagnosis credit, so a diagnosis fee is never counted twice. |
| Hours | All owner hours on the business: delivery + sales + content + admin. |
| Delivery hours | Hours on client work only. Effective rate = delivery revenue / delivery hours. |

## Weekly scoreboard

| Week | Dates | Leads | Qualified | Scans | Proposals | Diagnoses sold | Sprints sold | Packages sold | Retainers active | Agency convos | Revenue (week) | Revenue (cumulative) | Hours (total) | Hours (delivery) | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [DATES] | | | | | | | | | | $ | $ | | | |
| 2 | | | | | | | | | | | $ | $ | | | |
| 3 | | | | | | | | | | | $ | $ | | | |
| 4 | | | | | | | | | | | $ | $ | | | |
| 5 | | | | | | | | | | | $ | $ | | | |
| 6 | | | | | | | | | | | $ | $ | | | |
| 7 | | | | | | | | | | | $ | $ | | | |
| 8 | | | | | | | | | | | $ | $ | | | |
| 9 | | | | | | | | | | | $ | $ | | | |
| 10 | | | | | | | | | | | $ | $ | | | |
| 11 | | | | | | | | | | | $ | $ | | | |
| 12 | | | | | | | | | | | $ | $ | | | |
| 13 | | | | | | | | | | | $ | $ | | | |

## Diagnosis cohort (drives the kill gate)

| # | Client | Paid date | Price | Diagnosis hours | Findings (C/H/M/L) | Sprint quoted | Sprint bought? ($) | Days to decision | Retainer? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | $ | | / / / | $ | | | |
| 2 | | | $ | | / / / | $ | | | |
| 3 | | | $ | | / / / | $ | | | |
| 4 | | | $ | | / / / | $ | | | |
| 5 | | | $ | | / / / | $ | | | |

**Sprint conversion (first 5):** [__] of 5. Gate needs **2 or more** at $1.5k+.

## Lead sources (monthly)

| Source | Leads | Diagnoses | Revenue |
|---|---|---|---|
| Free scan (site) | | | $ |
| Reddit / Discord posts | | | $ |
| X / LinkedIn | | | $ |
| Agency DMs / white-label | | | $ |
| Upwork (also log Connects spent and $ per hire) | | | $ |
| Fiverr | | | $ |
| Referral | | | $ |

Double down on the top source each month; cut the bottom one.

## Monthly housekeeping (privacy policy promises)

On the first Sunday of each month, delete what the privacy policy says we no longer keep:

- [ ] Vercel > Storage > your Blob store: delete `leads/` entries for scans older than 90 days and form submissions older than 24 months (unless the person became a client).
- [ ] The same leads in your inbox (Resend notifications) and in the Slack, Discord or other webhook channel.
- [ ] Any spreadsheet or CRM copies of those leads.

## Targets (from the brief)

| When | Target | Status |
|---|---|---|
| Day 14 | First paid dollar (a $199-$399 diagnosis) | [ ] |
| Day 30 | $2k-$4k collected, 1 retainer, 2 agency conversations | [ ] |
| Month 3 | $4k-$8k/month (estimate) | [ ] |
| Month 6 | $8k-$15k/month (estimate) | [ ] |
| After 3-5 case studies | Raise prices: diagnosis $499-$750, sprints $3k-$6k | [ ] |

## Kill gates (from the brief)

Check these honestly on day 21 and after the 5th diagnosis. Write the decision here with the date.

| Gate | Trigger | Check date | Result | Decision |
|---|---|---|---|---|
| **No paid diagnosis by day 21** | Zero diagnoses paid by day 21 | [LAUNCH DATE + 21] | | |
| **Weak sprint conversion** | Fewer than 2 of the first 5 diagnoses convert to $1.5k+ sprints | After diagnosis #5 is delivered + 14 days | | |

**If a gate trips, pivot to one of:**
1. **Agency white-label** as the main channel: stop direct-to-founder marketing, put all outreach into agency owners (Skool communities, LinkedIn), lead with the 15-20% wholesale offer.
2. **Hourly "fractional engineer for vibe-coded startups"**: sell blocks of hours at $100-$150/hr (Upwork hourly contracts and direct), keep the diagnosis as an entry product.

## Weekly review questions (5 minutes)

1. What brought the most qualified leads this week?
2. Where did a lead drop off (no reply to scan, no reply to quote, price objection)?
3. Did any diagnosis take more than 3 hours? Why?
4. Effective delivery rate this week ($ / delivery hour)? Below $100/hr: tighten scope or raise prices.
5. One thing to stop, one thing to try next week.
