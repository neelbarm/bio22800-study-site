# White-label for AI agencies

Buyer #2 in the brief: AI-automation and AI agencies (often Skool-community graduates) that sold builds they can't reliably deliver. Repeat buyers. They resell under their brand; we build and test. Channel #2: DMs to agency owners in Skool communities and on LinkedIn.

---

## 1. Positioning

One line:

```text
I'm the engineer behind your AI builds: you sell under your brand, I make the Lovable/Bolt/Supabase apps you deliver safe, working and ready for your clients' real users.
```

What the agency gets:

- **Delivery capacity** without hiring. They keep the client relationship and the margin.
- **A safety net** on builds that went sideways: broken auth, payments that don't unlock, open databases, failing deploys.
- **A credible answer** when their client asks "is this secure?" or faces a customer security review: a written, severity-ranked report under the agency's brand, and documented, tested fixes.
- **Fixed prices** they can mark up, 15-20% below our list.

What we are not: a lead-gen service, a sales team, or a replacement for the agency's client management. We never contact their clients directly unless they ask us to.

Who to target:

- Agency owners posting about delivering AI apps, Lovable/Bolt builds, "AI MVPs", or n8n automations for clients
- Skool community members who have graduated from build or agency programs and now post wins (or struggles) about client delivery
- Agencies with job posts for "Supabase developer", "Lovable expert" or "full-stack contractor"

Who to skip: agencies with no clients yet, or ones asking for free work "to test you".

---

## 2. One-page partner offer

Paste into a Google Doc or PDF under your own letterhead. Send after a positive reply, never as the first message.

```text
SHIPREADY PARTNER PROGRAM
Your AI-built client apps, made safe to launch. Under your brand.

WHAT WE DO FOR YOUR CLIENTS
We take apps built with Lovable, Bolt, Base44, Replit, v0 or Cursor and make them ready for real users: database security (Supabase row-level security and storage rules), exposed keys, auth flows, Stripe payments and webhooks, deploys, monitoring and integrations.
Stack: React/Vite or Next.js, Supabase, Stripe, Vercel/Netlify. Other backends are quoted as migrations.

HOW IT WORKS
1. You send us the project (repo + Supabase access, staging preferred).
2. Diagnosis in 48 hours: severity-ranked report and video walkthrough, branded as yours or neutral, plus a fixed-price fix quote.
3. You quote your client at your price.
4. Fix & Ship Sprint in 5-10 days: one pull request per issue, preview deploys, tests, handover doc.
5. Optional monthly support you can resell.

PARTNER PRICING (15-20% off our list price)
                              List      Partner (15%)   Partner (20%)
Ship-Ready Diagnosis          $399      $339            $319
Fix & Ship: up to 5 issues    $1,500    $1,275          $1,200
Fix & Ship: 10 + deploy       $2,500    $2,125          $2,000
Fix & Ship: payments/auth/MT  $4,000    $3,400          $3,200
Wire-It-Up integrations       $1,000-   $850-           $800-
                              $3,000    $2,550          $2,400
Maintain & Extend (monthly)   $500 /    $425 /          $400 /
                              $1,000 /  $850 /          $800 /
                              $1,500    $1,275          $1,200
Changes outside scope: $150/hr or fixed quote.

Partner rate starts at 15% off. It moves to 20% off from your fourth paid project.
Optional: prepay 3 diagnoses for $999 (credits valid 90 days).

WHAT YOU CAN COUNT ON
- Fixed scope and fixed price, agreed in writing before work starts
- Your client owns every account; we work as collaborators and are removed at handover
- Staging-first; we never put production secret keys into AI tools
- No contact with your client unless you ask us to join a call
- Confidentiality and non-solicitation: your clients stay yours

WHAT WE DON'T PROMISE
We don't promise any app is "secure" or "guaranteed". We promise that issues found are documented and the agreed fixes are delivered and tested. Please use the same wording with your clients.

NEXT STEP
Send one project you're worried about. We'll start with a Diagnosis at partner rate.
[YOUR_NAME] | [CONTACT_EMAIL] | [SITE_URL]/agencies
```

---

## 3. Pricing rules for partners

| Rule | Detail |
|---|---|
| Starting discount | 15% off list |
| Volume discount | 20% off list from the partner's 4th paid project (owner policy; adjust if you prefer a different trigger) |
| What's discounted | Diagnosis, sprints, Wire-It-Up, retainers |
| What's not discounted | Change orders ($150/hr), migrations from Replit-native or Base44-native backends (quote separately) |
| Prepaid diagnosis 3-pack (owner option) | $999 for 3 diagnoses (about 17% off list). Credits expire 90 days after purchase. Refundable within 14 days only if no credit has been used; non-refundable after the first use. Each credit is one diagnosis of one app, counts as one paid project, and is worth $333 toward that app's sprint. Terms in `../legal/sow-white-label.md`. |
| Intro offer | The $199 testimonial price does not apply to partners |
| Agency resale price | Agency sets its own. Suggest they charge at least our list price. |
| Payment terms (suggested) | Diagnosis prepaid. Sprints 50% to start, 50% on delivery. Retainers monthly in advance. |
| Who pays | The agency, always. We don't invoice the end client. |

---

## 4. DM sequences (3 touches each)

General rules:

- Read the community's rules on DMs first. Some Skool communities ban unsolicited DMs; in those, only reply to posts publicly or wait for people to engage with your content.
- Personalise the first line every time. Reference something specific they posted.
- Space touches 3-4 days apart. Stop after touch 3, or at the first "no".
- Never open with a link.

### Sequence A: Skool community member who posted about delivering AI builds

**Touch 1**

```text
Hey [FIRST_NAME], saw your post about [SPECIFIC: e.g. "delivering the Lovable CRM for the dental clinic"]. Nice work.

Quick question: when a client build hits the hard parts (Supabase permissions, Stripe webhooks, getting it deployed properly), who handles that for you?
```

**Touch 2** (if no reply, 3-4 days later)

```text
Following up with something useful either way: the issue I see most in client Lovable apps is Supabase tables with no row-level security, so any user (or anyone with the public key) can read every row. Takes 2 minutes to check in the Security Advisor.

I do the engineering side for a few agencies under their brand: audit, fixes, deploy. If that's ever useful, happy to share how it works.
```

**Touch 3** (3-4 days later)

```text
Last note from me. If you've got a client build you're not fully confident in, send it over and I'll do the 48-hour diagnosis at partner rate ($339 instead of $399), branded as yours. If not, no worries, and good luck with the next few builds.
```

### Sequence B: LinkedIn agency owner (connection request + 2 messages)

**Touch 1: connection request note (under 300 characters)**

```text
Hi [FIRST_NAME], I see [AGENCY_NAME] builds AI apps for clients. I'm the engineer a few agencies use to make Lovable/Bolt builds production-ready (Supabase security, Stripe, deploys). Would be good to connect.
```

**Touch 2: after they accept**

```text
Thanks for connecting, [FIRST_NAME].

Curious how you handle it when a client build needs to go from "works in the demo" to "safe for real users and payments". That gap is where I spend my time: Supabase permissions, exposed keys, Stripe webhooks, deploys, monitoring.

Agencies resell it under their own brand, at 15-20% below my list price. Is that something you run into?
```

**Touch 3: 4-5 days later, if no reply**

```text
One more thing that might be useful even if we never work together: I wrote a pre-launch checklist for AI-built apps (auth, payments, data, deploy). Happy to send it. Some agencies hand it to clients as part of their own delivery.
```

### Sequence C: Agency that posted about a struggling project or a hiring need

Use when an agency owner posts "looking for a Supabase dev", "client app is broken", "need help with Stripe on a Lovable build".

**Touch 1**

```text
Hi [FIRST_NAME], saw your post about [SPECIFIC PROBLEM]. That's usually [LIKELY CAUSE, e.g. "the Supabase redirect URLs still pointing at the preview domain" / "access granted on the success page instead of the webhook"].

I do exactly this kind of work for agencies, under their brand. Want me to take a look?
```

**Touch 2** (2-3 days later; shorter gap because the need is urgent)

```text
In case it helps you scope it with your client: I'd start with a 48-hour diagnosis (report + video, branded as yours), then a fixed price for the fixes, delivered as one pull request per issue with preview links. Partner rate on the diagnosis is $339.
```

**Touch 3** (3-4 days later)

```text
Closing the loop. If you've sorted it, great. If another project hits the same wall, I'm around. Here's how the partner setup works if you want it on file: [LINK_TO_ONE_PAGE_OFFER]
```

---

## 5. Email version

For agencies whose business email is public on their site. Same compliance rules as `cold-email.md` (physical address, unsubscribe, accurate subject, no claims about testing their or their clients' apps).

**Subject:** `Engineering partner for [AGENCY_NAME]'s AI builds`

```text
Hi [FIRST_NAME],

I saw that [AGENCY_NAME] builds [AI apps / Lovable MVPs / automations] for clients ([SPECIFIC EXAMPLE FROM THEIR SITE OR POSTS]).

I run ShipReady. Agencies use me as the engineer behind those builds, under their own brand: when a client app needs to be safe for real users and payments, I audit it in 48 hours, fix it on a fixed price, and hand it back with a deploy and docs. Supabase, Stripe, Vercel, n8n.

Partners pay 15-20% below my list price and keep the client relationship. I don't contact your clients.

Is there a project on your plate right now that you're not fully confident in?

[YOUR_NAME]
ShipReady
[SITE_URL]

[PHYSICAL_MAILING_ADDRESS]
Not relevant? Reply "no thanks" and I won't email again. [UNSUBSCRIBE_LINK]
```

**Follow-up 1** (4 days later). Subject: `Re: Engineering partner for [AGENCY_NAME]'s AI builds`

```text
Hi [FIRST_NAME], one practical thing for your client builds either way: open the Supabase Security Advisor on each project. Any "RLS disabled" warning means that table can be read with the public key that ships in the browser.

If you'd like a second pair of eyes on one, the first diagnosis is at partner rate ($339).

[YOUR_NAME]
[PHYSICAL_MAILING_ADDRESS] | [UNSUBSCRIBE_LINK]
```

**Follow-up 2** (7 days later)

```text
Hi [FIRST_NAME], last note. If white-label engineering ever becomes useful, the one-page partner offer is here: [LINK]. Good luck with the builds.

[YOUR_NAME]
[PHYSICAL_MAILING_ADDRESS] | [UNSUBSCRIBE_LINK]
```

---

## 6. Objection handling

**"We already have a developer."**

```text
Makes sense. Most partners do. I'm usually brought in for overflow, or as a second pair of eyes before launch: a 48-hour diagnosis your developer can work from. Happy to be the backup you call when there's too much on.
```

**"Our clients' apps are fine."**

```text
Could be. Quick way to know: open the Security Advisor in each Supabase project and search the live JS bundle for sk_live. If both are clean, you're ahead of most. If not, I can help.
```

**"15-20% isn't much margin."**

```text
It's the discount off my price, not your margin. You set your client price. Most agencies charge at least my list price, or bundle the work into their own build fee. The value for you is a fixed cost and delivery you don't have to manage.
```

**"What if you go direct to our client?"**

```text
I won't. The partner agreement has a non-solicitation clause both ways, and I don't contact your client unless you ask me to join a call.
```

**"Can you guarantee the app is secure? Our client wants that in writing."**

```text
No, and I'd recommend you don't promise that either. What I put in writing: every issue found is documented and ranked by severity, and every agreed fix is delivered and tested. That's what holds up in a customer security review. I can provide a DPA if your client needs one.
```

**"Can you do it cheaper for the first one, as a trial?"**

```text
The partner rate is already 15% off, and the diagnosis is the low-risk way to try: $339, 48 hours, and if I find nothing material it's refunded.
```

**"What if the client re-prompts Lovable and breaks your fixes?"**

```text
It happens. Re-prompts can overwrite fixes. The handover doc lists which files to protect, and re-fixes are covered by the monthly support plan, which you can resell to the client.
```

**"Do you work in our timezone / on Slack?"**

```text
I'm US-based and work async. Written updates at the end of every working session, Loom when something is easier to show. I can join a shared Slack channel per project.
```

---

## 7. Partner agreement outline

This is an outline for a lawyer to turn into a contract. It is not legal advice. Have it reviewed before first use, and consider E&O insurance as the brief notes.

1. **Parties and relationship.** Independent contractor. Non-exclusive both ways. No partnership or employment.
2. **Services.** By reference to the price list (Diagnosis, Fix & Ship Sprint tiers, Wire-It-Up, Maintain & Extend). Each project gets a written Statement of Work with a fixed issue count and deliverables.
3. **White-label and branding.** We deliver under the agency's brand or unbranded. We may not list the agency or its clients publicly without written consent.
4. **Client relationship.** Agency owns the end-client relationship and communication. We contact the end client only at the agency's request.
5. **Non-solicitation.** Neither party solicits the other's clients or staff for [12] months after the last project. (Term length is a placeholder.)
6. **Pricing and payment.** Partner discount (15%, rising to 20% from the 4th paid project). Diagnosis prepaid; sprints 50/50; retainers monthly in advance. Late payment terms. Agency pays regardless of whether its client pays the agency.
7. **Scope and change orders.** Work outside the SOW requires a written change order at $150/hr or a fixed quote, approved before work starts.
8. **Access and data.** End client owns all accounts. Collaborator access only, staging-first where possible, access removed at handover. No production secret keys in AI tools. DPA available on request. Confidentiality of all client data and code.
9. **Intellectual property.** Work product assigned to the end client (or the agency, per SOW) on full payment. We keep general know-how and reusable non-client-specific tooling.
10. **No security guarantee.** We do not warrant that any application is secure or free of vulnerabilities. We warrant that issues found are documented and agreed fixes are delivered and tested per the SOW. Agency agrees not to represent our work to its clients as a security guarantee.
11. **Builder re-prompts.** Fixes overwritten by later AI-builder changes, or by changes from others after handover, are outside warranty. Re-fixes are covered only by a Maintain & Extend retainer.
12. **Limitation of liability.** Total liability capped at fees paid for the relevant project. No liability for indirect or consequential damages.
13. **Confidentiality.** Mutual, survives termination.
14. **Term and termination.** Either party may end the partnership with [30] days' notice. Active SOWs finish or are paid pro rata. (Notice period is a placeholder.)
15. **Governing law.** [STATE], USA.
