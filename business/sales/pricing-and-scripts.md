# Pricing and scripts

The price ladder, discount rules, upsell scripts at each handoff, how to quote a sprint from diagnosis findings, and change-order language. All prices are from `../BRIEF.md`. Anything else is marked as an owner policy or an estimate.

---

## 1. The price ladder

| Step | Offer | Price | Delivery | Purpose |
|---|---|---|---|---|
| 0 | Free Ship-Ready Scan | $0 | Instant, automated | Lead magnet. Owner-opted-in scan of a live URL. |
| 1 | Ship-Ready Diagnosis | $399 (intro $199 for first 3 clients, for a testimonial) | 48 hours | Paid entry point. Fee credited toward the sprint. Refund if nothing material found. |
| 2 | Fix & Ship Sprint | $1,500 (up to 5 issues) / $2,500 (up to 10 + production deploy) / $4,000 (adds payments, auth rebuild or multi-tenant) | 5-10 days | Core revenue. |
| 2b | Wire-It-Up add-on | $1,000-$3,000 fixed | 3-7 days | Integrations, n8n, inbound AI receptionist. |
| 3 | Maintain & Extend retainer | $500/mo (4 small requests + monitoring) / $1,000/mo (10 requests + monthly security pass) / $1,500/mo (priority, 48h turnaround) | Monthly | Recurring revenue. Only plan that covers re-fixes after builder re-prompts. |
| Any | Change orders | $150/hr or fixed quote | As agreed | Anything outside agreed scope. |
| Partner | White-label for agencies | 15-20% off list | Same | See `agency-white-label.md`. |

Upwork first jobs: hourly at $100-$150/hr (see `upwork-profile.md`). Fiverr: list prices grossed up for the 20% fee (see `fiverr-gigs.md`).

Planned increase (brief): after 3-5 case studies, diagnosis moves to $499-$750 and sprints to $3,000-$6,000.

### Wire-It-Up quick mapping (owner policy, within the brief's $1,000-$3,000 range)

| Scope | Price |
|---|---|
| One integration, one direction (e.g. signup → HubSpot contact) | $1,000 |
| Workflow across up to 3 systems, or two-way sync with one system | $2,000 |
| Up to 5 systems, or an inbound AI receptionist | $3,000 |
| Bigger than that | Split into two add-ons, or quote as a sprint |

---

## 2. Discount rules

1. **Intro diagnosis at $199**: first 3 direct clients only, in exchange for a written testimonial after delivery if they're satisfied. Never on Upwork or Fiverr: both prohibit trading discounts for reviews.
2. **Diagnosis credit**: the $399 (or $199) is credited toward a sprint. Owner policy: credit valid for 30 days from report delivery. Say so in the report.
3. **Agency partners**: 15% off list, 20% from their 4th paid project (owner policy). See `agency-white-label.md`.
4. **No other discounts.** If a client can't afford a tier, reduce scope, not price: fewer issues, drop the production deploy, or phase it into two sprints.
5. **No discount on change orders.** $150/hr or a fixed quote.
6. **No free work** beyond the scan, the proposal Loom and reasonable pre-sale questions.
7. **No discounts for "future work" or "exposure".**
8. **Raise prices on schedule**: after 3-5 case studies, per the brief. Existing retainer clients keep their rate for 3 months after an increase (owner policy).

How to say no to a discount:

```text
I keep prices the same for everyone, so I'd rather adjust scope than price. If $1,500 is too much right now, we could fix the 3 Critical and High issues first, then do the rest later. Want me to send that version?
```

---

## 3. Intake qualification (before any paid offer)

Ask in writing, from the brief:

```text
Three quick questions so I can point you to the right option:
1. Does the app have live users today? Roughly how many?
2. Is Stripe in live mode, taking real payments?
3. Is there a date coming up: launch, investor demo, pilot customer, security review?
```

| Answers | Route |
|---|---|
| Users or Stripe live, plus a deadline | Diagnosis now, sprint pitched in the walkthrough |
| Users or Stripe live, no deadline | Diagnosis |
| No users, no payments, no deadline, budget under $500 | Free scan + checklist. Do not sell. (Brief: avoid hobbyists with $30 budgets.) |
| Knows exactly what's broken, one issue | Upwork: hourly. Direct: 5-issue sprint, or a change-order-style fixed quote |
| Agency asking | Partner offer |

---

## 4. Upsell scripts at each handoff

### Scan → Diagnosis

Sent with the scan follow-up video (`loom-scripts.md`, script 3).

```text
The scan checks what's visible from outside. It can't see your database policies, storage rules, auth flows or Stripe webhooks, which is where most serious issues in AI-built apps live. The Diagnosis covers all of that: 48 hours, a written report ranked by severity, a walkthrough video and a fixed price to fix it. $399, credited toward the fixes, refunded if I find nothing material.

Want me to send the link?
```

### Diagnosis → Sprint

**In the walkthrough video** (see `loom-scripts.md`, script 2, section F).

**Email with the report (day 0)**

Subject: `Your Ship-Ready Diagnosis: [APP_NAME]`

```text
Hi [FIRST_NAME],

Your report is here: [REPORT_LINK]
Walkthrough video: [LOOM_URL]

Summary: [N] Critical, [N] High, [N] Medium, [N] Low.

My recommendation: [OPTION A, e.g. "Fix & Ship, up to 5 issues: $1,500, covering every Critical and High item"].
[OPTION B if relevant, e.g. "Or up to 10 issues plus a production deploy: $2,500, which adds the Medium items and a clean Vercel setup."]

Your $[399] diagnosis fee is credited, so that's $[1,101 / 2,101] from here, if you start within 30 days.

I can start on [DATE] and deliver within [5-10] working days. Reply "A" or "B" and I'll send the agreement and invoice.

[YOUR_NAME]
```

**Follow-up (day 2), if no reply**

```text
Hi [FIRST_NAME], any questions on the report? Happy to answer in writing or on a 15-minute call. The one I'd fix this week no matter who does it is issue #[N], [ONE-LINE DESCRIPTION].
```

**Follow-up (day 7)**

```text
Hi [FIRST_NAME], last nudge from me. If you've decided to fix things in-house, the report has the detail your developer needs, and I'm happy to answer their questions. If you'd like me to do it, the diagnosis credit stays valid until [DATE].
```

### Sprint → Retainer

At handover, in the handover doc and the final video.

```text
Everything on the list is fixed, tested and merged. Before you go, one thing to know: if you or anyone re-prompts [BUILDER] on the files listed in the handover doc, it can quietly undo these fixes. That's the most common way fixed apps break again.

The monthly plan covers that: dependency and security updates, Supabase advisor checks, uptime monitoring, small features, and re-fixes if a re-prompt overwrites something.
- $500/mo: 4 small requests + monitoring
- $1,000/mo: 10 requests + a monthly security pass
- $1,500/mo: priority, 48-hour turnaround

Given [THEIR SITUATION, e.g. "you're still building features in Lovable every week"], I'd suggest the [$X] plan. Cancel any time before the next billing date. Want me to set it up?
```

If they decline:

```text
No problem. If anything breaks, re-fixes are billed as change orders at $150/hr, and you can start the monthly plan any time.
```

### Sprint → Wire-It-Up

When the client mentions manual work during the sprint ("I copy new signups into HubSpot by hand").

```text
You mentioned [MANUAL TASK]. That's a good fit for a Wire-It-Up add-on: I'd connect [SYSTEM A] to [SYSTEM B] with alerts if anything fails. Fixed at $[1,000-3,000], 3-7 days. I can quote it once this sprint is merged, so the two don't overlap.
```

### Retainer → higher tier

When they use all requests two months in a row:

```text
You've used all [4/10] requests in each of the last two months. The [$1,000 / $1,500] plan would cover that volume [and add a monthly security pass / priority 48-hour turnaround]. Want to switch from next month?
```

---

## 5. How to quote a sprint from diagnosis findings

### Definition of one issue

One problem with one root cause and one fix, which can ship as one pull request. Examples:

- "RLS off on `orders`" = 1 issue
- "RLS off on 6 tables, all owned by `user_id`, same policy pattern" = 1 issue (one migration, one PR)
- "RLS on 6 tables with different ownership rules (user, org, admin)" = 2-3 issues, grouped by rule pattern
- "Stripe secret key in a VITE_ variable" = 1 issue (roll, move to server function, redeploy)
- "Stripe webhook unverified and grants access on success page" = 1 issue if the webhook exists; payments work if it doesn't (see tier rule below)

### Tier rules

| If the findings include... | Quote |
|---|---|
| Up to 5 issues, no production deploy needed | $1,500 |
| 6-10 issues, or any count plus a production deploy (moving off builder hosting, env setup, domain) | $2,500 |
| A payments build or rebuild (no working webhook flow, subscriptions from scratch), an auth rebuild (new provider, roles system, SSO), or multi-tenant (orgs/teams with per-org data isolation) | $4,000 |
| More than 10 issues | Two sprints: Critical and High first, then the rest. Or $4,000 if one of the $4,000 triggers applies and the total stays in that scope. |
| Backend is Replit-native or Base44-native | Separate migration quote first (change-order rate or fixed quote), then the sprint |

### Process (30 minutes, estimate)

1. List every finding from the report with its severity.
2. Group findings that share a root cause and a fix into single issues.
3. Rank: Critical, then High, then Medium. Low items go in only if they're nearly free while you're in the code.
4. Check each issue against the $4,000 triggers.
5. Sanity check effort (owner rule of thumb, estimate): a $1,500 sprint at 5 issues leaves roughly 2 hours per issue at the $150/hr change-order rate. Any single issue you expect to take more than about 4 hours counts as 2 issues.
6. Pick the tier. Offer one recommendation and at most one alternative.
7. Write the issue list into the agreement. That list is the scope.

### Worked example (illustrative only)

Findings:

1. Critical: RLS off on `invoices` and `clients`, both owned by `user_id`
2. Critical: Supabase service_role key used in a frontend file
3. High: `profiles.plan` editable by users
4. High: Stripe webhook doesn't verify signatures
5. High: Access granted on success page
6. Medium: No pagination on invoice list
7. Medium: No error monitoring
8. Low: Missing security headers

Grouping: 1 = one issue (same pattern). 4 + 5 = one issue (one webhook rewrite). 6, 7, 8 = three issues.

Result: 7 issues. Webhook exists, so no payments rebuild.

Quote:

```text
Option A (recommended): Fix & Ship up to 10 issues + production deploy, $2,500
Covers all 7 issues, plus moving you from the builder's hosting to Vercel with environment variables set correctly.

Option B: Fix & Ship up to 5 issues, $1,500
Covers issues 1-5 (all Critical and High). Medium and Low items can follow later.

Diagnosis credit: -$399
```

### Agreement scope paragraph

```text
Scope: ShipReady will fix the following issues, each delivered as a separate pull request with tests where applicable and a preview deploy: [NUMBERED LIST]. [Production deploy to Vercel/Netlify is included.] A handover doc will be delivered at the end. Anything not on this list is out of scope and handled as a change order. ShipReady does not warrant that the application is secure; issues found are documented and the agreed fixes are delivered and tested.
```

---

## 6. Change-order language

### When you find something new mid-sprint

```text
Hi [FIRST_NAME], while fixing [ISSUE #N] I found something that isn't on our list: [ONE-LINE DESCRIPTION + WHY IT MATTERS].

It's outside the agreed scope, so you have three options:
1. Add it now as a change order: [fixed $X / about N hours at $150/hr].
2. Swap it in for [LOWER-PRIORITY ISSUE #M] at no extra cost.
3. Leave it. I'll note it in the handover doc so it's not forgotten.

I'll keep going on the agreed list in the meantime. Which would you like?
```

### When the client asks for something new

```text
Happy to do that. It's not on the sprint list, so it'd be a change order: [fixed $X / estimated N hours at $150/hr, capped at N]. I can do it [after the sprint / alongside it, which moves delivery to DATE]. Reply "approved" and I'll add it.
```

### Change order confirmation (send before starting)

```text
Change order #[N] for [APP_NAME]
Work: [DESCRIPTION]
Price: [$X fixed / $150/hr, capped at N hours]
Effect on delivery date: [none / moves to DATE]
Approved by: [CLIENT_NAME], [DATE]
Everything else in the original agreement stays the same.
```

### Saying no to scope creep without sounding difficult

```text
I want to keep your sprint on time, so I'd rather not mix new work into it. Let's finish the agreed list first, then I'll quote this separately. It's usually quicker that way.
```

### When the builder overwrote a fix after handover (no retainer)

```text
It looks like a recent [BUILDER] change regenerated [FILE], which removed the fix from [ISSUE #N]. That's outside the sprint warranty, since the change came after handover. I can restore it as a change order: [fixed $X]. Or, if you'd like this covered going forward, the $500/mo plan includes re-fixes like this.
```

### Upwork and Fiverr

- **Upwork**: add a new milestone (fixed-price) or adjust the weekly cap (hourly) for every change order. Never take payment outside Upwork.
- **Fiverr**: send a Custom Offer, priced at the change-order amount divided by 0.8 so you net the brief's rate (e.g. about $190/hr equivalent).

---

## 7. Price-change script (after 3-5 case studies)

For new prospects, just publish the new prices. For open quotes and existing clients:

```text
Heads up: from [DATE], the Diagnosis moves to $[499-750] and sprints to $[3,000-6,000] for new work. Anything you book before then stays at current prices, and your monthly plan stays at $[X] until [DATE + 3 months].
```
