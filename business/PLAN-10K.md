# October sprint: the plan to $10,000 by October 31

Today is Sunday, October 4, 2026. That leaves 27 days.

**Honest framing first.** The research put a normal first month for this business at $2,000-$4,000 (an estimate). $10,000 in the first month is possible, but only if three things are true:
1. You put in **25-35 hours a week** for four weeks, not 10-15.
2. You sell bigger tickets (sprints and packages), not just $399 diagnoses.
3. You start selling on **day 1**, before everything feels ready.

Everything below is built to make those three things happen. The conversion rates are estimates; your scoreboard (section 6) replaces them with real numbers after week 1.

---

## 1. The math: three ways to $10,000

| Path | What has to happen by Oct 31 | Total |
|---|---|---|
| **A. Sprint-led (most likely)** | 6 diagnoses at $399 ($2,394) + 2 Fix & Ship 10 at $2,500 ($5,000) + 1 Fix & Ship 5 at $1,500, less the $399 diagnosis credit on each of those 3 sprints (-$1,197) + 1 Keep retainer at $500 + 1 Wire-It-Up at $2,000 (a workflow across up to 3 systems) | **$10,197** |
| **B. Package-led** | 3 Launch Readiness Packages at $2,900 ($8,700, sold to new buyers) + 4 diagnoses at $399 ($1,596) that don't convert this month | **$10,296** |
| **C. Agency-led** | 2 agency partners × 2 projects each at partner price (~$2,100 avg, 15% off $2,500) ($8,400) + 4 direct diagnoses ($1,596) | **$9,996** |

You don't need to choose a path. Run all three channels and count the money from whichever converts.

**Funnel math for Path A (estimates; replace with your numbers after week 1):**
- 6 paid diagnoses at a 25% close rate on qualified calls or chats = 24 qualified conversations.
- 24 qualified conversations at a 10-15% rate from targeted outreach = roughly **200-250 targeted touches**. That means proposals, DMs, helpful replies and cold emails to people with live apps.
- Over 27 days that is **8-10 targeted touches a day**, plus the free scan doing inbound work.
- Each of those 3 sprints is billed net of the $399 credit ($2,101 or $1,101 due), and the Path A total already subtracts it. Don't count a diagnosis fee twice.
- 3 sprints from 6 diagnoses is a 50% conversion. That is ambitious: the kill gate in BRIEF.md is 2 of 5. Make the diagnosis report do the selling: every finding gets a price, and the quote goes out with the report.

## 2. Add two offers that shorten the path to $10k

Both use pricing already in the kit, packaged for speed. They are owner options, written up with their rules in `business/sales/pricing-and-scripts.md` (section 1b) and the SOW templates. Use them if you agree.

1. **Launch Readiness Package: $2,900 flat.** It combines the diagnosis and Fix & Ship 10 into one purchase, with a priority start, for founders with a launch, demo or security-review deadline. Bought separately, the two cost $2,500 after the diagnosis credit, so the package costs $400 more. Say so, and sell that $400 as the priority-start fee: the sprint starts the business day after the report, and the delivery date is fixed in writing (diagnosis within 48 hours of complete access, then the sprint within 7 business days, about 10 business days end to end). One sale instead of two cuts a full step out of the funnel. Take 50% upfront ($1,450). A client who already bought a diagnosis can add priority start to Fix & Ship 10 for the same $400 ($2,101 + $400).
2. **Rush fee: +50% for a 24-hour diagnosis ($599) or a 72-hour Fix & Ship 5 ($2,250).** Deadline buyers pay for speed. Only the base price counts toward the diagnosis credit. Only offer it when you actually have the hours.

For agencies, sell a **prepaid 3-pack of diagnoses for $999** (about 17% off list, credits expire 90 days after purchase). That is cash in hand that they resell under their own brand. The pack terms are in `business/legal/sow-white-label.md`.

## 3. Cash timing (so "made" means money you can actually use)

- **Stripe:** new accounts usually get their first payout about 7-14 days after the first charge, and after that on a rolling schedule. Check your Stripe dashboard for your exact schedule. Revenue booked by about Oct 24 is likely in your bank by Oct 31.
- **Upwork:** hourly earnings go through a security period, roughly 10 days after the billing week ends. Fixed-price milestones release when the client approves, or automatically after the review window. Check Upwork's current terms. **Upwork money earned after about Oct 20 may not be withdrawable until November.**
- **Direct clients:** charge diagnoses and package deposits upfront through Stripe Payment Links. That is the fastest cash.

## 4. Day-by-day: week 1 (Oct 5-11) is about getting live and selling

**Mon Oct 5: go live (3-4 hours)**
- [ ] Import the repo to Vercel and set the environment variables (LAUNCH.md has the exact list). Connect a private Blob store so leads are saved. Set `ADMIN_PASSWORD`.
- [ ] Stripe: create Payment Links for the diagnosis ($399), intro ($199, limit 3), Launch Readiness deposit ($1,450), and Fix & Ship deposits ($750 and $1,250). Set each one's redirect to `/thanks`.
- [ ] Buy the domain and point it at Vercel. Set up `hello@` email.
- [ ] Set `LEADS_WEBHOOK_URL` to a Discord or Slack webhook on your phone. **Reply to every lead within 15 minutes when you're awake.**
- [ ] Run the free scan on your own site. Confirm a lead shows up in `/admin/leads` and in your webhook.

**Tue Oct 6: build your proof (4 hours)**
- [ ] Build a deliberately vulnerable demo app in Lovable: Supabase with RLS off, a Stripe **test-mode** secret key in a `VITE_` variable (as in `loom-scripts.md`), payments faked on the success page, and only fake data. Never put a live or billable key (OpenAI, Stripe live) in it: bots scrape public bundles within hours. Deploy it.
- [ ] Run `npm run audit:repo -- <demo-repo>` and the free scan against it.
- [ ] Record the 90-second demo Loom: "I broke this app the way Lovable apps usually break, then found it in 60 seconds." Scripts are in `business/sales/loom-scripts.md`.
- [ ] Publish teardown post #1 (`business/sales/teardown-posts.md`). Its blog version is already live at `[SITE_URL]/guides` once you deploy, so share that link with the LinkedIn and X cuts.

**Wed Oct 7: open the marketplaces (4 hours)**
- [ ] Upwork: set up the profile and 3 Project Catalog items (`upwork-profile.md`). Set the hourly rate to $100. Apply to **10 jobs** with Looms (`proposal-templates.md`).
- [ ] Fiverr: publish both gigs (`fiverr-gigs.md`).
- [ ] Start the daily lead radar: `npm run leads`. Its Reddit source uses Reddit's public JSON without OAuth. Reddit now blocks most of those requests (expect 403s in the terminal), and its Data API terms require an approved, registered app for commercial use. Treat the radar as a Hacker News source and browse /new in each subreddit by hand. Reply helpfully to the 5 best posts, following each community's rules.

**Thu Oct 8: personal network and agencies (4 hours)**
- [ ] Message 20 people you know who build things: "I'm doing security and launch fixes for Lovable/Bolt apps this month. Know anyone with an app that's live or about to launch?" A warm intro converts roughly 10 times better than a cold one.
- [ ] DM 20 AI-automation agency owners using sequence 1 in `agency-white-label.md`.

**Fri Oct 9: community launch (3 hours)**
- [ ] Post the "free scans for 5 apps this week" post in r/lovable or r/vibecoding, if their rules allow (`reddit-and-community.md`).
- [ ] Apply to 10 more Upwork jobs.

**Sat-Sun Oct 10-11: catch up and deliver**
- [ ] Deliver any diagnoses sold. Follow up with everyone who scanned and left an email.
- [ ] Buy 2 secondary domains for cold email and start inbox warm-up now. Cold email from a brand-new domain lands in spam, so warm-up takes about 2 weeks.

**End of week 1 target:** 1-2 paid diagnoses, 30+ scans, 2 agency conversations.

## 5. Weeks 2-4: the daily quota

Every weekday until Oct 30:

| Activity | Daily quota | Where the template is |
|---|---|---|
| Upwork proposals with a Loom (only $500+ budgets or hourly, verified payment) | 8 | `proposal-templates.md` |
| Helpful community replies from the lead radar | 5 | `reddit-and-community.md` |
| Agency DMs or follow-ups | 10 | `agency-white-label.md` |
| Cold emails, from week 3 once domains are warm (about 20 per inbox, ramping up) | 20-40 | `cold-email.md` |
| Follow-ups with every scan lead and open quote | all | `pricing-and-scripts.md` |
| Delivery (diagnoses, sprints) | as sold | `business/ops/*-runbook.md` |

**Weekly targets:**
- **Week 2 (Oct 12-18):** 3 diagnoses, 1 sprint or package sold. About $3,500 booked.
- **Week 3 (Oct 19-25):** 2 diagnoses, 1-2 sprints or packages, first agency project. About $7,000 booked in total.
- **Week 4 (Oct 26-31):** close open quotes, upsell retainers on every handoff, push agency prepaid packs. **$10,000+ booked.**

## 6. Scoreboard and decision rules

Update `business/ops/metrics-tracker.md` every Sunday night. Then apply these rules:

- **Fewer than 30 scans by Oct 11:** distribution is the problem. Double the community and DM volume and post teardown #2. Don't change the product.
- **Scans are coming in but no diagnosis is sold by Oct 14:** the offer or the follow-up is the problem. Switch to the intro price ($199) and follow up on every critical finding personally, within the hour.
- **2 or more diagnoses sold but no sprint by Oct 21:** the report isn't selling the fix. Lead the report with the fixed price and a 7-day deadline, and offer Fix & Ship 10 with priority start ($2,101 after credit + $400) on a call.
- **An agency sends a project:** give it priority. Agencies send repeat work.
- **Upwork reply rate under 10% after 40 proposals:** drop to 4-5 proposals a day and move the time to agency DMs. Log Connects spent per hire in the metrics tracker; at $500+ budgets a proposal can cost 10-16 Connects ($1.50-$2.40).
- **Behind the $10k pace on Oct 24:** stop prospecting new channels. Spend every hour closing open quotes and offering prepaid agency packs and retainers to anyone you have already delivered for.

## 7. What not to do this month

- Don't build new features for the site. It is done. Selling is the work now.
- Don't discount below $1,500 for a sprint. Cut scope instead of price.
- Don't take Upwork clients off-platform. Don't trade a discount for a review on Fiverr or Upwork. Don't claim you scanned someone's app unless they ran the scan themselves.
- Don't promise "secure." Promise "found, documented, fixed and tested."
