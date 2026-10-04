# Objections and FAQ

Short answers for chat, DMs and calls, plus a longer version where it helps. Use the same wording on the website FAQ, Upwork, Fiverr and in proposals so the promise is consistent everywhere.

The one sentence that governs every answer here (from the brief):

```text
We don't promise "secure" or "guaranteed". We promise that issues found are documented and the agreed fixes are delivered and tested.
```

---

## "Why not just ask Lovable's AI to fix it?"

Short:

```text
You can, and for small UI changes you should. For security, payments and data rules, the builder fixes what you describe, and it can't see what you don't know to ask about. It also changes other files while it fixes, and there's no review step. I find the problems you haven't noticed yet, fix them as reviewed code in Git, and test them, so the fix is still there next week.
```

Longer, for a call:

```text
Three reasons.

First, you have to know what to ask for. Most of what I find, like a table any signed-up user can read, or a role stored where users can edit it, isn't visible in the app. Nothing looks broken, so nobody prompts for it.

Second, builders fix by regenerating code. A prompt about login can rewrite a data query on another page. Without tests or review, you find out from users.

Third, fixes made by prompting can be undone by the next prompt. I ship every fix as its own pull request in Git with a preview deploy, and the handover doc lists which files to keep the builder away from.

Keep using the builder for what it's good at. Use me for the parts that cost you money or trust if they go wrong.
```

---

## "Is my data safe with you?"

```text
Here's exactly how I handle access:
- You own every account: GitHub, Supabase, Stripe, Vercel. I'm added as a collaborator, and you remove me at handover.
- I work on a staging project or a branch wherever possible, not on live data.
- I never put your Supabase service_role key or your live Stripe secret key into an AI tool's environment.
- I never ask you to paste secret keys into chat. You invite me to the project instead.
- I don't copy your users' data to my machine. If I need data to test, I use seeded test records.
- I'm happy to sign your NDA, and a DPA is available if you need one.
```

If they ask about AI tools specifically:

```text
I use Claude Code to work faster on your code. It works on a copy of the repo and on staging. It never gets production secrets or your users' data, and I review every change it proposes before it goes into a pull request.
```

---

## "What if you break something?"

```text
Every fix ships as its own pull request with its own Vercel preview link. You click through the change before it goes live, and any single fix can be rolled back on its own without touching the others. Database changes go in as migration files, tested on staging first.

If something I changed breaks within the sprint's scope, I fix it at no charge. That's part of "delivered and tested".
```

Owner note: the "fix it at no charge" commitment covers your own changes within the agreed scope. It does not cover later builder re-prompts or changes by others, which are covered by the retainer. Keep that boundary.

---

## "Why $399?"

```text
It's a human review of your repo and Supabase project, delivered in 48 hours, not just an automated tool: every table's permissions, storage rules, auth flows, keys, Stripe checkout and webhooks, deploy and error handling. You get a written report ranked by severity, a video walkthrough and a fixed price to fix it all.

The $399 is credited toward the fixes if you go ahead, and if I find nothing material you get it back.

For context, comparable audits on the market range from about $299 for a 48-hour diagnosis up to $1,500-$3,000 at agencies.
```

(Competitor range from the brief: vibecoderescue.dev $299, Seedinov $1,500 audit, Relux $3k audit.)

If they push on price:

```text
If budget is tight, run the free scan first at [SITE_URL]/scan. It covers the most urgent exposures for $0, and you can decide on the diagnosis after.
```

During the first 3 clients only (intro offer from the brief, direct clients only, never on Upwork or Fiverr):

```text
I'm taking on 3 clients at $199 in exchange for an honest written testimonial after delivery, positive or not. I'll note the discount wherever I publish it. Interested?
```

---

## "Do you sign NDAs?"

```text
Yes. Send it over before you share access. I also keep everything confidential by default, NDA or not, and I never mention clients publicly without written permission.
```

Owner note: read every NDA. Push back on non-competes, unlimited liability or IP clauses that would claim your general know-how or tooling.

---

## "Can you guarantee it's secure?"

Short:

```text
No, and I'd be wary of anyone who does. What I guarantee: everything I find is documented and ranked by severity, and every fix we agree on is delivered and tested.
```

Longer:

```text
No one can honestly guarantee an app is secure. New issues come from new code, new dependencies and new attack techniques, and a review can only cover what's in scope on the day.

What I can promise, in writing: I'll review the areas we agree on, document every issue I find with its severity and evidence, and deliver and test every fix we agree on. You'll know exactly what was checked, what was found and what was fixed. That's also what a customer's security reviewer or an investor's technical advisor will actually ask to see.
```

Phrases to use:

- "Issues found are documented and the agreed fixes are delivered and tested."
- "Reviewed against [the scope list]."
- "No High or Critical issues remaining from the agreed list."
- "Launch-ready for the scope we agreed."

Phrases to never use (in proposals, gigs, reports, posts or chat):

- "Secure", "fully secure", "100% secure", "bulletproof", "hack-proof", "unhackable"
- "Guaranteed", "we guarantee your data is safe"
- "Certified", "compliant" (SOC 2, HIPAA, GDPR) unless you actually hold or deliver that certification

---

## Refunds

```text
Diagnosis: if I don't find anything material, I refund you in full within 7 days of delivery, without you having to ask. "Material" means at least one issue rated High or Critical in the report.

Fix & Ship Sprint: you're paying for the agreed fixes, delivered and tested. If I can't deliver an agreed fix, you get a refund for that part. Work already delivered and accepted isn't refunded.

Retainer: cancel any time before the next billing date. The current month isn't refunded.

Wire-It-Up: same as sprints, refundable for any agreed part I can't deliver.
```

Owner notes:

- The "High or Critical" definition of material is a suggested policy; it is used the same way in `upwork-profile.md`, `loom-scripts.md`, `../legal/sow-diagnosis.md` and `../ops/diagnosis-runbook.md`. Change all of them together.
- On Upwork and Fiverr, the marketplace's own refund and dispute process applies. Don't promise anything that conflicts with it.

---

## More FAQ

**"What do you need from me to start?"**

```text
A GitHub repo invite, a Supabase project invite (staging if you have one), and answers to three questions: do you have live users, is Stripe in live mode, and is there a deadline?
```

**"My app is on Replit / Base44's own backend."**

```text
I can review it, but my fixes target React/Vite or Next.js with Supabase, Stripe and Vercel or Netlify. If your backend lives inside Replit or Base44, I'll quote moving it to that stack as a separate migration.
```

**"Can I keep building in Lovable after you fix it?"**

```text
Yes. Just know that re-prompting the builder on the same files can overwrite fixes. The handover doc lists which files to leave alone. Re-fixes after handover are covered by the monthly plan.
```

**"How long does it take?"**

```text
Diagnosis: 48 hours from access. Fix sprint: 5-10 working days. Integrations: 3-7 days.
```

**"Can we do a call?"**

```text
Sure, 20 minutes is usually enough. I work async most of the time, so most updates come in writing or as short videos.
```

**"Do you do outbound AI calling / cold-call bots?"**

```text
No. I build inbound AI receptionists only: answering, capturing details and booking.
```

**"Do you work with agencies?"**

```text
Yes, under your brand at partner rates. See the partner offer: [SITE_URL]/agencies
```

**"Can you just look at it for free?"**

```text
The free scan is the free version: [SITE_URL]/scan, for apps you own. A human review of your code and database is the $399 diagnosis, credited toward fixes.
```
