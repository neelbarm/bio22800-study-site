# Cold email to founders with live AI-built apps

Target: buyer #1 in the brief. Founders and operators whose AI-built app is live, ideally with users, Stripe, a pilot, an investor demo or a customer security review coming.

Two rules above everything else in this file:

1. **Never claim, hint or imply that you scanned, tested or looked inside their app.** You haven't, and you mustn't. The free scan is only for apps the requester owns or is authorised to test, with their attestation. In cold email you personalise from what they said publicly, nothing else.
2. **Follow the law and the platform rules.** Compliance notes are in section 5. Read them before sending a single email.

---

## 1. How to find founders whose apps are live

Spend 30 minutes a day building a list of 10-20 good prospects (estimate). Quality beats volume.

### Sources

**Lovable showcase and "Edit with Lovable" badges**

- Browse Lovable's public showcase / launched-projects pages for apps that look like real products (pricing page, login, a company name), not demos.
- Lovable-published sites on lower plans often show a Lovable badge. Search the web for apps on `lovable.app` subdomains and for the badge text, and note the ones with a custom domain or pricing page.
- Do not inspect their code, bundle or Supabase project. Looking at the public homepage and pricing page like any visitor is fine.

**Product Hunt launches**

- Check daily launches. Look for "built with Lovable / Bolt / v0 / Cursor / Base44" in the description, maker comments or tags.
- Best timing: 1-14 days after launch, when real users are arriving.
- The maker's profile often links to X or LinkedIn, and the product site usually has a contact email.

**X (Twitter) launch posts**

Search queries (run weekly):

```text
"built with lovable" launched
"built with @lovable_dev"
"made with lovable"
"built with bolt" launched
"vibe coded" launched users
"first paying customer" lovable
"launched" supabase stripe solo
#buildinpublic lovable
```

- Look for posts mentioning users, revenue, waitlists, pilots, investors or B2B customers.
- Reply publicly with something useful first when it fits. Email later.

### Qualify before you add them to the list

Add a prospect only if at least two are true (owner rule of thumb):

- [ ] Has a pricing page, checkout or "book a demo" (signals money)
- [ ] Mentions users, customers, revenue or a waitlist number publicly
- [ ] Mentions a deadline: launch, fundraising, demo day, enterprise pilot, security review
- [ ] Custom domain (not only a builder subdomain)
- [ ] Based in the US, UK, Canada or Australia (see compliance notes for non-US rules)

Skip: hobby projects, "I built this in 2 hours" demos with no users, anyone whose site says they don't want unsolicited email.

### What to record per prospect

| Field | Example |
|---|---|
| First name | [FIRST_NAME] |
| Company / app | [APP_NAME] |
| Domain | [APP_DOMAIN] |
| Builder (as they stated publicly) | Lovable |
| Source + link | Product Hunt, [URL] |
| Public signal | "Posted that they just signed their first B2B customer" |
| Email + where found | Contact page |
| Country | US |
| Sequence | A / B / C |

Use only business emails the person has published or that appear on the company site. Don't buy lists. Don't scrape personal emails.

---

## 2. Sending setup

- Send from a separate sending domain, `[SENDING_DOMAIN]` (a close variant of your main domain), not your main one, so a deliverability problem doesn't hit your main inbox.
- Set up SPF, DKIM and DMARC on that domain. Warm it up for 2-3 weeks (estimate) before sending cold.
- Start at 10-20 emails a day per inbox and stay under about 30-50 (estimates). Plain text, no images, at most one link.
- Keep a suppression list. Anyone who opts out, bounces or replies "no" never gets emailed again from any domain.
- Stop the sequence the moment someone replies.

---

## 3. Three sequences (3 emails each)

Placeholders: `[FIRST_NAME]`, `[APP_NAME]`, `[APP_DOMAIN]`, `[BUILDER]`, `[PUBLIC_SIGNAL]` (what they said publicly, in their words), `[YOUR_NAME]`, `[SITE_URL]`, `[PHYSICAL_MAILING_ADDRESS]`, `[UNSUBSCRIBE_LINK]`.

Every email ends with the footer:

```text
[YOUR_NAME]
ShipReady, [SITE_URL]
[PHYSICAL_MAILING_ADDRESS]
If this isn't useful, reply "unsubscribe" or click [UNSUBSCRIBE_LINK] and I won't email you again.
```

### Sequence A: Just launched (Product Hunt or X launch post)

**Email A1 (day 0)**

Subject: `[APP_NAME] launch`

```text
Hi [FIRST_NAME],

Congrats on launching [APP_NAME]. I saw [PUBLIC_SIGNAL, e.g. "your Product Hunt launch last Tuesday"] and that it's built with [BUILDER].

I fix apps built with AI builders once real users arrive. The first week after launch is usually when a few predictable things show up: confirmation emails never reach real users, login redirects to the old preview URL, or one user can see another user's data.

If you'd like to check yours, I have a free scan you can run on your own app at [SITE_URL]/scan. It checks the live site for exposed keys and database tables readable without login, and never pulls your data.

Has anything broken since launch that surprised you?

[FOOTER]
```

**Email A2 (day 3)**

Subject: `Re: [APP_NAME] launch`

```text
Hi [FIRST_NAME],

One 60-second check worth doing this week, whether or not we ever talk: open your live site, open DevTools, search all files (Ctrl+Shift+F) for "sk_live" and "sk_test".

If either shows up, your Stripe secret key is in the code every visitor downloads. Roll it in the Stripe dashboard first, then move the Stripe calls to a server function.

This happens a lot with [BUILDER] apps because keys stored as VITE_ or NEXT_PUBLIC_ variables are public by design.

Want the full pre-launch checklist I use? Happy to send it.

[FOOTER]
```

**Email A3 (day 8)**

Subject: `Re: [APP_NAME] launch`

```text
Hi [FIRST_NAME],

Last note from me. If [APP_NAME] is getting real users or payments and you want a proper review, I do a 48-hour diagnosis: repo and Supabase reviewed by a human, a written report ranked by severity, a video walkthrough and a fixed price for any fixes. It's $399, credited toward the fixes if you go ahead, and refunded if I find nothing material.

If now's not the time, no problem. Good luck with the launch.

[FOOTER]
```

### Sequence B: Live with payments (pricing page or "first paying customer" post)

**Email B1 (day 0)**

Subject: `Payments on [APP_NAME]`

```text
Hi [FIRST_NAME],

Saw [PUBLIC_SIGNAL, e.g. "your post about your first 20 paying customers"]. Nice milestone.

I help founders with [BUILDER]-built apps get payments and data right once money is moving. The most common issue at your stage: access granted on the "payment successful" page instead of by Stripe's webhook, so customers who close the tab early pay and don't get access, and the webhook doesn't verify Stripe's signature.

Do you know offhand whether yours grants access from the webhook or the success page?

[FOOTER]
```

**Email B2 (day 3)**

Subject: `Re: Payments on [APP_NAME]`

```text
Hi [FIRST_NAME],

Quick way to check your Stripe setup yourself: Stripe dashboard > Developers > Webhooks > your endpoint > recent deliveries. Failed deliveries (400s or 500s) mean your app is missing events, usually because the signature check fails or the function crashes.

Also worth checking that live mode has its own webhook endpoint and signing secret. Test and live are separate, and it's easy to launch with only the test one.

If you want an outside check on the rest of the app, the free scan is here for apps you own: [SITE_URL]/scan

[FOOTER]
```

**Email B3 (day 8)**

Subject: `Re: Payments on [APP_NAME]`

```text
Hi [FIRST_NAME],

Closing the loop. If payments, auth or your Supabase permissions ever need a proper look, I do a 48-hour diagnosis ($399, credited toward fixes) and fixed-price fix sprints from $1,500, with every change delivered as a pull request you can test first.

Either way, I hope the next 20 customers come quickly.

[FOOTER]
```

### Sequence C: Milestone ahead (fundraising, investor demo, enterprise pilot, security review)

**Email C1 (day 0)**

Subject: `Before the [demo / pilot / review]`

```text
Hi [FIRST_NAME],

Saw [PUBLIC_SIGNAL, e.g. "you're onboarding your first enterprise pilot next month"]. Congrats.

When an AI-built app goes in front of investors' technical advisors or a customer's security team, the first questions are usually: who can read which data, where are the secret keys, and how do payments and logins work. With [BUILDER] + Supabase apps, those are exactly the areas that tend to need work.

I do a 48-hour review that answers those questions in writing, ranked by severity, with a fixed price to fix what matters before your date.

When is the [demo / pilot / review]?

[FOOTER]
```

**Email C2 (day 3)**

Subject: `Re: Before the [demo / pilot / review]`

```text
Hi [FIRST_NAME],

Two things a technical reviewer often checks first in a Supabase app, which you can check yourself today:

1. Supabase dashboard > Advisors > Security Advisor. Any "RLS disabled" warning means that table can be read with the public key in your app.
2. Log in as two different test users. Neither should be able to see the other's records.

If both are clean, you're in good shape. If not, I can help, and the free scan for apps you own is at [SITE_URL]/scan.

[FOOTER]
```

**Email C3 (day 7)**

Subject: `Re: Before the [demo / pilot / review]`

```text
Hi [FIRST_NAME],

Last one from me. If you'd like the written review before your date, I can start within [X] days and deliver in 48 hours. You'd get a report you can share with the reviewer, a walkthrough video and a fixed quote. $399, credited toward fixes, refunded if I find nothing material.

One thing I'll be upfront about: I won't tell you or your reviewer the app is "guaranteed secure". Nobody honest can. What you get is every issue found documented and every agreed fix delivered and tested.

Good luck with it.

[FOOTER]
```

---

## 4. Reply handling

**"How did you find me?"**

```text
From your [Product Hunt launch / post on X about X]. I look for founders who've just launched AI-built apps, because that's when the problems I fix show up. I haven't tested or scanned your app; the scan only runs when an owner chooses to run it.
```

**"Did you scan my app?" / "Are you saying my app is insecure?"**

```text
No. I haven't looked at your app beyond the public homepage, and I'd never test it without your permission. These are the most common patterns in [BUILDER] apps in general. If you want to know about yours, you can run the free scan on it yourself at [SITE_URL]/scan.
```

**"Not interested."**

```text
Understood, thanks for letting me know. I've removed you from my list.
```

(Then actually add them to the suppression list.)

**Positive reply** → send the free scan link or book a short call, then follow `pricing-and-scripts.md`.

---

## 5. Compliance notes

Not legal advice. Rules change; check the current rules for each country you email, and get advice if you plan to send at volume.

### United States: CAN-SPAM

Applies to all commercial email, including B2B.

- **Accurate headers.** "From", "Reply-To" and routing must identify you. No spoofing.
- **Honest subject lines.** No fake "Re:" on a first email. The follow-ups above use "Re:" only because they continue your own earlier thread.
- **Identify it as commercial.** These emails are clearly a business offer from you. Don't disguise them as personal notes from a friend or a "following up on our call" when there was no call.
- **Physical postal address** in every email: a street address, a USPS PO box, or a registered private mailbox. Replace `[PHYSICAL_MAILING_ADDRESS]` before sending anything.
- **Clear opt-out** in every email that works for at least 30 days after sending. Don't require anything beyond a reply or a single click.
- **Honor opt-outs within 10 business days**, and never sell or share the address.
- **You're responsible** even if a tool or assistant sends on your behalf.
- Violations carry large per-email penalties.

### Canada: CASL

Stricter. Consent-based. Implied consent can exist when the person has conspicuously published their business email, the message relates to their role, and they haven't said they don't want unsolicited email. Keep a record of where you found the address. Include your identity, mailing address and an unsubscribe in every email. If in doubt, skip Canadian prospects for cold email and use LinkedIn or community channels instead.

### United Kingdom: PECR and UK GDPR

B2B email to corporate addresses (e.g. a limited company's staff) is generally allowed with a clear opt-out and a legitimate interest. Sole traders and some partnerships are treated like individuals and need prior consent. Many solo founders are sole traders. When you can't tell, skip them.

### Australia: Spam Act

Requires consent. Inferred consent can apply when a business email is conspicuously published and the message relates to the person's role, unless they've said they don't want commercial messages. Include accurate sender identification and a working unsubscribe.

### EU

Not a target market in the brief. Don't cold email EU contacts without advice.

### Honesty rules specific to this business

- Never say or imply "I scanned your app", "I noticed your keys are exposed", "I found a vulnerability in your app" or anything similar. You didn't, and testing without permission is off-limits.
- Never attach a "report" about their app.
- Never use fear-based subject lines ("Your app is leaking data").
- Never promise "secure" or "guaranteed".
- Every number you use (prices, delivery times) must match the brief.
