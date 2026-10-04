# Fiverr gigs

Two gigs. Paste the `text` blocks as written. Replace `[PLACEHOLDERS]`.

## Pricing math (Fiverr's 20% fee)

Fiverr keeps 20% of each order, so you net 80% of the list price. To net the brief's price, list at `net / 0.8`.

| Brief price (what you keep) | Fiverr list price | You net |
|---|---|---|
| $399 Diagnosis | $499 | $399.20 |
| $1,500 Sprint (5 issues) | $1,875 | $1,500 |
| $2,500 Sprint (10 + deploy) | $3,125 | $2,500 |
| $4,000 Sprint (payments/auth/multi-tenant) | $5,000 | $4,000 |
| $1,000 Wire-It-Up | $1,250 | $1,000 |
| $2,000 Wire-It-Up (mid-range) | $2,500 | $2,000 |
| $3,000 Wire-It-Up | $3,750 | $3,000 |
| $150/hr change order | $190/hr (custom offer) | $152 |

Buyers also pay Fiverr a separate service fee on top of the list price. You do not control it, and it does not change your net.

Rules for Fiverr:

- Fiverr does not allow trading a discount for a review. Do not offer the brief's $199-for-a-testimonial deal on Fiverr. That intro offer is for direct clients only (see `pricing-and-scripts.md`).
- No email, phone, external links or "let's talk on WhatsApp" in gig text or messages. Keep communication and payment on Fiverr.
- Video walkthroughs: attach the recording as a file in Fiverr's delivery or message if Loom links get flagged.
- Package price ceilings depend on your seller level and change. If Fiverr will not let you set a package as high as listed, publish the highest allowed price and send the full price as a Custom Offer after the buyer messages you.
- Fiverr is a review-builder per the brief. After 5-10 completed orders, evaluate whether it is still worth the 20%.

---

## Gig 1: Lovable / Bolt / Base44 app rescue (security + deploy)

**Title** (Fiverr titles start with "I will", max 80 characters). Avoid the verb "secure" in the title: it reads as a promise the brief rules out.

```text
I will fix security, auth and deploy issues in your Lovable or Bolt app
```

**Category:** Programming & Tech > Website Development or Bug Fixes (pick the closest current category; Fiverr also has AI development subcategories worth checking)

**Search tags** (Fiverr allows 5)

```text
lovable, supabase, vibe coding, bolt new, app security
```

Swap one tag every few weeks with `base44` or `stripe integration` and keep whichever brings more impressions.

**Packages**

| | Basic: Diagnosis | Standard: Fix 5 | Premium: Fix 10 + Deploy |
|---|---|---|---|
| Price | $499 | $1,875 | $3,125 |
| Delivery | 2 days | 7 days | 10 days |
| Revisions | 1 (report clarifications) | 1 per fix | 1 per fix |
| Repo + Supabase review | Yes | Yes | Yes |
| Severity-ranked written report | Yes | Yes | Yes |
| Video walkthrough | Yes | Yes | Yes |
| Fixed-price quote for fixes | Yes | Included | Included |
| Issues fixed | 0 | Up to 5 | Up to 10 |
| One pull request per fix | No | Yes | Yes |
| RLS migrations, secrets to env vars | No | Yes | Yes |
| Sentry error monitoring | No | Yes | Yes |
| Production deploy (Vercel/Netlify) | No | No | Yes |
| Handover doc | No | Yes | Yes |

Package names and descriptions to paste (descriptions kept under 100 characters, Fiverr's usual limit):

```text
Basic: Ship-Ready Diagnosis
Human audit of repo + Supabase. Ranked report, video and a fixed-price quote.
```

```text
Standard: Fix & Ship (5 issues)
Up to 5 agreed fixes, one PR each with preview links, plus Sentry and a handover doc.
```

```text
Premium: Fix & Ship (10 issues + deploy)
Up to 10 agreed fixes plus a clean production deploy on Vercel or Netlify.
```

**Description** (Fiverr max 1,200 characters; this is about 1,150, check in the editor)

```text
Your app works in the builder preview. Then real users arrive and something breaks: logins fail, Stripe takes money but nothing unlocks, the deploy fails, or worse, one user can see another user's data.

I make apps built with Lovable, Bolt, Base44, Replit, v0 or Cursor safe and ready for real users.

What I check and fix:
- Supabase row-level security on every table and storage bucket
- Secret keys exposed in your JavaScript bundle (Stripe secret key, Supabase service_role key, keys in VITE_ or NEXT_PUBLIC_ variables)
- Signup, login, password reset and OAuth redirects
- Stripe checkout and webhooks with signature verification
- Vercel or Netlify deploys, env vars, 404s on refresh
- Error monitoring, rate limits, slow queries

How I work:
- You own every account. I join as a collaborator.
- Staging first where possible.
- One pull request per fix, each with a preview link.

Stack: React/Vite or Next.js, Supabase, Stripe, Vercel/Netlify.

I will not promise "100% secure". I promise every issue I find is documented and every fix we agree on is delivered and tested.

Message me with your app's builder and what is breaking before ordering.
```

**FAQ**

```text
Q: Which builders do you support?
A: Lovable, Bolt, Base44, Replit, v0 and Cursor projects. My fixes target React/Vite or Next.js with Supabase, Stripe and Vercel or Netlify. If your backend lives inside Replit or Base44, I will quote moving it to that stack.

Q: Do I need the Basic package first?
A: It is the best start if you are not sure what is wrong. If you already know your issues, message me the list and I will confirm which package fits.

Q: Will you change my live app?
A: Not without your approval. Fixes go on separate branches with preview links. You test each one before it is merged.

Q: Can I keep editing in Lovable or Bolt afterwards?
A: Yes, but re-prompting the builder on the same files can overwrite fixes. The handover doc lists which files to leave alone.

Q: Can you guarantee my app is secure?
A: No one can honestly guarantee that. I document every issue I find, rank it by severity, and deliver and test every fix we agree on.

Q: Do you sign NDAs?
A: Yes. Send it before sharing access.
```

**Requirements** (shown to the buyer after ordering)

```text
1. Your app URL and which builder you used
2. GitHub repo link, and an invite for [YOUR_GITHUB_USERNAME] (read access for Basic, write for Standard and Premium)
3. Supabase project invite (a staging project if you have one). Do not paste keys in chat; invite me to the project instead.
4. Does the app have live users? Is Stripe in live mode?
5. Any deadline (launch, investor demo, customer security review)?
6. The top 3 things you are worried about
```

**Gallery**

- Image 1: before/after split. Left: "RLS off: anyone can read `profiles`". Right: "RLS on, scoped to `auth.uid()`". Use your demo app.
- Image 2: sample report page with the severity table (demo data).
- Video: 60-second cut of the demo video in `loom-scripts.md`.

---

## Gig 2: Claude Code specialist build

Positioning: the brief cites the Fiverr Business Trends Index (June 9, 2026) showing Claude Code specialists as the fastest-growing skill at +938%, with n8n +125%. This gig catches that search demand and sells features and integrations on the standard stack.

**Title**

```text
I will build features and integrations in your app with Claude Code
```

**Search tags**

```text
claude code, n8n, supabase, stripe integration, api integration
```

**Packages**

| | Basic: One Integration | Standard: Workflow | Premium: Multi-system build |
|---|---|---|---|
| Price | $1,250 | $2,500 | $3,750 |
| Delivery | 3 days | 5 days | 7 days |
| Revisions | 1 | 2 | 2 |
| Systems connected | 1 | Up to 3 | Up to 5, or inbound AI receptionist |
| Error alerts and retries | Yes | Yes | Yes |
| Keys stored server-side | Yes | Yes | Yes |
| Pull request with tests | Yes | Yes | Yes |
| Video handover | Yes | Yes | Yes |
| Written runbook | No | Yes | Yes |

The split of systems per tier is a suggested mapping of the brief's $1,000-$3,000 Wire-It-Up range.

Package names and descriptions to paste:

```text
Basic: One integration
Connect your app to one service (Stripe, HubSpot, Slack, Google). Alerts and retries.
```

```text
Standard: Automation workflow
n8n workflow or integration across up to 3 systems, with alerts and a runbook.
```

```text
Premium: Multi-system build
Up to 5 systems, or an inbound AI receptionist. Runbook and video handover.
```

**Description**

```text
I am a developer who builds with Claude Code every day, and I review and test every line it writes before it reaches your app.

Use this gig to add features and integrations to an existing React/Vite or Next.js app with Supabase, or to connect your tools with n8n.

Examples:
- Signups create contacts in HubSpot or Pipedrive and alert Slack
- Stripe payments and subscriptions update your database correctly via verified webhooks
- Google Sheets, Calendar and Gmail automations
- Replace fragile Zapier chains with an n8n workflow you own
- Inbound AI receptionist for calls or chat that captures details and books meetings (inbound only, no outbound calling)

What you get:
- Code in your GitHub repo as a pull request with tests
- API keys stored server-side, never in the browser
- Alerts when something fails, and automatic retries
- A video handover so you know how it works

You own every account. I work as a collaborator.

Not sure which package fits? Message me what should happen, step by step, and I will tell you.
```

**FAQ**

```text
Q: What does "Claude Code specialist" mean for me?
A: I use Anthropic's Claude Code to write code faster, then review, test and own the result like any senior developer. You get speed without unreviewed AI output in your app.

Q: Can you finish my MVP?
A: Yes, if it is on React/Vite or Next.js with Supabase. Message me the feature list and I will send a custom offer with a fixed scope.

Q: n8n Cloud or self-hosted?
A: Either. n8n Cloud is easier to own if you have no preference.

Q: Do you build outbound calling bots?
A: No. Inbound only.

Q: What happens after delivery?
A: Monthly support is available for updates, monitoring and small changes. Ask about it in messages.
```

**Requirements**

```text
1. What should happen, step by step, in plain words
2. Which tools are involved, and an admin or developer invite to each
3. GitHub repo invite for [YOUR_GITHUB_USERNAME] if code changes are needed
4. Test data to use (not real customer records)
5. Who should be alerted when something fails
```

---

## Message templates for Fiverr inquiries

Buyer asks "can you fix my app?" with no details:

```text
Thanks for reaching out. To point you to the right package, can you tell me:
1. Which builder (Lovable, Bolt, Base44, other)?
2. What is breaking, in one or two sentences?
3. Does it have live users or live Stripe payments yet?
If you are not sure what is wrong, the Basic Diagnosis is the right start: you get a ranked report, a walkthrough video and a fixed price for the fixes.
```

Buyer asks for a $30 fix:

```text
Thanks. For a quick one-off change, a lower-priced gig will probably suit you better. I focus on apps that are about to take real users or payments, where the work includes testing and a proper handover. If that changes, I am happy to help.
```
