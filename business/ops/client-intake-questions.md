# Client intake: qualifying questions, red flags, polite declines

Goal: in under 10 minutes (async form or short call), decide whether this is a buyer who can pay $1.5k-$5k (see BRIEF: "Who buys") or a hobbyist to decline kindly. Qualify on three things first: **live users? Stripe live? deadline?**

## 1. The questions

Use these on the website form, in a Fiverr/Upwork pre-contract message, or on a 15-minute call. Questions 1-3 decide fit; the rest decide scope and price.

### Fit (ask first)

1. **Live users:** Is the app live with real users today? Roughly how many active users or customers?
2. **Revenue:** Are you charging money yet? Is Stripe in **live** mode, or still test mode? Rough monthly revenue (or "pre-revenue")?
3. **Deadline:** What is driving this now? (Launch date, paying pilot, investor demo, customer security review, an incident, a bad review?) What is the date?

### Scope

4. **Builder:** What did you build it with? (Lovable, Bolt, Base44, Replit, v0, Cursor, other, or a developer?)
5. **Stack:** Front end (React/Vite, Next.js, other)? Backend (Supabase, Firebase, Replit DB, Base44 built-in, other)? Hosting (Vercel, Netlify, Lovable hosting, Replit, other)? Payments (Stripe, other)?
6. **Repo access:** Is the code in a GitHub repo you own? Can you add a collaborator or give access to a fork or branch?
7. **Supabase:** Do you have a Supabase project you own? Which plan? Is there a separate staging project, or only production?
8. **Data:** What kind of user data does the app store? (Emails only? Payments? Health, financial, children's, or ID data?)
9. **Known problems:** Anything you already know is broken or worries you? Did our free scan flag anything? (Ask them to share the scan result.)
10. **Who else touches the code:** Are you still re-prompting with the builder? Is anyone else (a developer, an agency) working on it?
11. **Decision and budget:** Are you the decision maker? Our fixes typically run $1,500-$4,000 after a $399 diagnosis. Does that fit your budget?
12. **Contact:** Best email, time zone, and preferred async channel.

### Agency-specific (white-label leads)

- How many client builds do you have live or in progress? Which builders and stacks?
- Do you want us under your brand or unbranded? Will we talk to your clients or only to you?
- Expected volume per month? (Drives the 15% vs 20% discount.)
- Do your client contracts allow subcontracting, and do they include a liability cap?

## 2. Scoring (quick)

| Signal | Points |
|---|---|
| Live users (any paying, or 50+ active) | +2 |
| Stripe live or paying pilot | +2 |
| Concrete deadline within 60 days | +2 |
| Supabase + React/Next + Vercel/Netlify (our standard stack) | +2 |
| Owns GitHub repo and Supabase project | +1 |
| Budget confirmed at $1.5k+ | +2 |
| Agency with 3+ client builds | +3 |

- **7+**: priority. Send the diagnosis Payment Link the same day.
- **4-6**: good. Offer the diagnosis; if they hesitate, offer the free scan first.
- **0-3**: likely not a fit now. Point them to the free scan and the teardown content; use a polite decline if they want paid work under $500.

## 3. Red flags

Stop or slow down if you see any of these:

- **No authority:** wants you to test an app they do not own, or "a competitor's app". Decline, always.
- **Budget mismatch:** expects a full rescue for under $500, or compares you to $30 Fiverr gigs.
- **No users, no deadline, no revenue** and wants a long free consultation.
- **Wants a guarantee:** "Just tell me it's secure" or "guarantee we pass the security review". We document issues found and deliver agreed fixes; we never promise "secure".
- **Off-platform pressure on Upwork/Fiverr:** asks to pay outside the marketplace before a contract exists. Do not do it; it breaks marketplace terms.
- **Credentials pasted in chat:** fine to help, but tell them to rotate those keys now; note that they may need more hand-holding.
- **Sensitive regulated data** (health records, children's data, government ID, card numbers stored in their own DB) without any compliance plan. Either scope very carefully or decline; never sign a HIPAA BAA without a lawyer.
- **Non-standard backend** (Base44-native, Replit DB, Firebase) presented as a quick fix. Quote as a migration or decline.
- **Scope creep in the first message:** "audit, plus a few new features, plus a redesign".
- **Unrealistic timeline:** full fix "by tomorrow" with production-only access and no backups.
- **Hostile to previous providers** across several stories. Expect the same treatment.
- **Unverified payment method** on Upwork, or a budget under $500.

## 4. How to decline politely

Always: thank them, give one useful next step, leave the door open. Keep it short.

### Not a fit right now (hobby project / tiny budget)

> Thanks for sharing [APP NAME], it looks like a fun project. Right now our paid work is aimed at apps with live users or a launch deadline, so I don't think a $399 diagnosis is the best use of your money yet. Two free things that will help: run our free scan at [SITE URL] and work through the checklist in our post "[TEARDOWN TITLE]". When you have users or a launch date, reply here and I'll take a look.

### Not authorized to test

> Thanks for reaching out. We can only review or scan apps that you own or have written permission to test, so I can't help with this one. If you're the owner of another app, happy to look at that.

### Outside our stack

> Thanks for the details. We specialize in React/Next.js + Supabase + Stripe on Vercel or Netlify, and [THEIR BACKEND] is outside what we can fix well on a fixed price. Options: (1) we quote a migration to Supabase as a separate project, or (2) I can suggest you look for a specialist in [THEIR STACK]. Which would you prefer?

### Wants a guarantee

> I understand the pressure of [the security review / the launch]. I can't honestly promise any app is "secure", and you should be wary of anyone who does. What I can promise is that every issue we find is documented in writing, and every fix we agree on is delivered and tested, with a handover document you can show [the reviewer / your investor]. If that works for you, here is the diagnosis link: [LINK].

### Timeline we cannot meet

> Thanks, and I'd like to help, but I can't do this well by [DATE]. The earliest I can deliver the diagnosis is [DATE]. If that doesn't work, I'd rather say no than rush a security review.

## 5. After intake

- Fit: send the diagnosis Payment Link (intro $199 only for the first 3 clients, in exchange for a testimonial), the onboarding checklist, and book the start.
- Log the lead and score in `metrics-tracker.md`.
- Upwork/Fiverr: keep all communication and payment on the platform until the contract allows otherwise.
