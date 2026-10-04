# Upwork proposal templates

Six templates, a keyword list for job alerts, and a filter checklist.

Brief rules these templates follow:

- Respond within 15 minutes of the post going up, with a 60-second Loom.
- Prefer hourly contracts at $100-$150/hr for first jobs.
- Only bid on $500+ budgets with verified payment.
- No contact details or off-platform links before a contract. Loom links are fine.

## How to use a template in under 15 minutes

1. (2 min) Read the post twice. Copy their exact words for the symptom into `[THEIR_SYMPTOM]`.
2. (3 min) Pick the likely cause from the template's "diagnosis hook" table.
3. (3 min) Record the Loom. Do not touch their app. Talk over the job post on screen, or over your own demo app showing where that kind of bug lives. One take. 60-75 seconds is fine.
4. (5 min) Fill the placeholders, paste, check the first two lines read well on their own, send.

The first two lines are what the client sees in the proposal list. They must (a) restate their problem in their words and (b) show you know the likely cause. Never open with "Hi, I am a developer with X years".

Placeholders used throughout:

- `[CLIENT_NAME]` (use only if it is in the post; otherwise skip the greeting)
- `[THEIR_SYMPTOM]` their words
- `[BUILDER]` Lovable, Bolt, Base44, Replit, v0, Cursor
- `[LOOM_URL]`
- `[RATE]` $100-$150 per the hourly guidance in `upwork-profile.md`
- `[CAP]` weekly hour cap, e.g. 10

---

## 1. Rescue: broken auth

**Use when** the post mentions: login not working, users can't sign up, magic link, password reset, Google login, "redirects to localhost", session expires, email confirmation never arrives.

**First 2 lines (preview)**

```text
"[THEIR_SYMPTOM]" in a [BUILDER] + Supabase app is usually one of three settings, not a code rewrite: redirect URLs, the Site URL, or email delivery.
I recorded a 60-second video on what I would check first in yours: [LOOM_URL]
```

**Diagnosis hook** (pick the matching row and paste the sentence)

| Their symptom | Likely cause | Sentence to paste |
|---|---|---|
| Google/OAuth login sends users to localhost or a preview URL | Supabase Auth "Site URL" and "Redirect URLs" still point at the builder preview | "Your redirect is almost certainly still pointing at the preview domain in Supabase Auth's URL settings, so the login works in the builder but not on your real domain." |
| Signup works but confirmation or reset emails never arrive | No custom SMTP: Supabase's built-in sender only emails the project team's own addresses | "Without custom SMTP, Supabase only sends auth emails to your own team's addresses, a few per hour, so real users never get them. Moving to a proper SMTP provider fixes it." |
| Password reset link opens the app but nothing happens | No route handles the recovery token, or redirect URL not allow-listed | "The reset link lands on a page that does not handle the recovery session, so the user never sees a 'set new password' form." |
| Users get logged out randomly / on refresh | Session not restored on load, or multiple Supabase clients created | "That usually means the app creates more than one Supabase client or does not wait for the session to load before deciding the user is logged out." |
| Works for some users, not others | Email confirmation required for new users only, or RLS blocking the profile row | "When it fails only for new users, the profile row is often blocked by a database policy right after signup, so the app thinks login failed." |

**60-second Loom script**

```text
[0-10s] Hi [CLIENT_NAME], this is about your post: "[THEIR_SYMPTOM]". I'll show you where I'd look first.
[10-30s] (Your demo Supabase project, Authentication > URL Configuration on screen.) In most [BUILDER] apps this is the culprit: the Site URL and redirect URLs still point at the preview. When you move to your own domain, login sends people back to the wrong place.
[30-45s] The other two suspects are email delivery, since Supabase's built-in sender only emails your own team's addresses, and how the app restores the session on page load.
[45-60s] I'd confirm which one it is in the first hour, fix it on a branch and give you a preview link to test before anything goes live. Quick question for you in the proposal text.
```

**Offer**

```text
How I would run it:
- Hourly at [RATE]/hr, capped at [CAP] hours this week.
- First 1-2 hours: find the root cause and confirm it with you in writing.
- Then fix it on a branch, with a preview deploy you can test on your phone before it goes live.
- You keep ownership of every account. I need a GitHub invite and a Supabase collaborator invite, ideally to a staging project in its own Supabase organization, since on Free and Pro plans an invite reaches every project in the organization.

If it turns out the app has more going on than auth, I'll tell you and quote a fixed-price fix plan instead of letting hours run.
```

**Closing question**

```text
Does it fail for every user, or only for new signups since you moved to your own domain?
```

---

## 2. Supabase data exposure

**Use when** the post mentions: users can see other users' data, RLS, "Supabase security warning", Security Advisor, "table is public", "someone told me my database is exposed", data leak, multi-user, B2B customers asking about security.

**First 2 lines (preview)**

```text
If one user can see another user's [records/orders/messages], the database is answering requests it should refuse. In [BUILDER] + Supabase apps that is almost always row-level security that is off or too open on a few tables.
Here's a 60-second video on how I'd find which tables and lock them down without breaking your app: [LOOM_URL]
```

**Diagnosis hook**

| Their symptom | Likely cause | Sentence to paste |
|---|---|---|
| Supabase Security Advisor warning "RLS disabled" | Tables created by SQL or migrations without RLS enabled | "The Advisor warning means at least one table in the public schema accepts queries from anyone holding your public anon key, which ships in every visitor's browser." |
| Logged-in users see everyone's data | Policies like `using (true)` or `auth.uid() is not null` | "A policy that only checks 'is logged in' lets any user who signs up read every row. Policies need to compare the row's owner to the logged-in user." |
| Fixed RLS and now the app shows empty lists | Policies added without matching the app's queries | "Turning RLS on without the right policies makes the app look empty. The fix is writing policies that match how the app actually queries." |
| Files/images accessible by URL to anyone | Public storage bucket or loose `storage.objects` policies | "Storage has its own policies, separate from tables. A public bucket means anyone with a file URL can open it." |
| Admin features work for normal users | Role checked in the frontend or in user-editable metadata | "If the admin check lives in the frontend or in user_metadata, a user can change it. Roles need to live where users can't edit them." |

**60-second Loom script**

```text
[0-10s] Hi [CLIENT_NAME], about your post: "[THEIR_SYMPTOM]". Here's how this happens and how I'd fix it.
[10-30s] (Demo Supabase project on screen, Table Editor showing a table with RLS off.) Your app's anon key is public by design. It ships in the browser. The only thing between that key and your data is row-level security. If it's off, or the policy says "any logged-in user", the data is open.
[30-45s] (Advisors > Security Advisor on screen.) I start here, then go table by table: who should read, who should write, and I write those as policies in a migration file so they're tracked in Git.
[45-60s] Every change gets tested against the real screens of your app so nothing goes blank. Question for you below.
```

**Offer**

```text
How I would run it:
- Hourly at [RATE]/hr, capped at [CAP] hours this week, or a fixed-price Ship-Ready Diagnosis ($399, 48 hours) if you want the whole app reviewed first.
- I review every table and storage bucket, write policies as versioned SQL migrations, and test each user role (signed out, normal user, admin) against the real app screens.
- I work on a staging project or branch first. I never put your service_role key into any AI tool.
- You get a short written summary of every table: who can read, who can write, and why.
```

**Closing question**

```text
Roughly how many tables does the app have, and do you have a staging Supabase project or only production?
```

---

## 3. Stripe / payments broken

**Use when** the post mentions: Stripe, checkout, subscriptions, "payment goes through but user doesn't get access", webhooks, customer portal, payment links, "test mode works, live doesn't".

**First 2 lines (preview)**

```text
"[THEIR_SYMPTOM]" is the classic sign the app trusts the redirect after checkout instead of Stripe's webhook, or the webhook is failing silently.
60-second video on where I'd look first: [LOOM_URL]
```

**Diagnosis hook**

| Their symptom | Likely cause | Sentence to paste |
|---|---|---|
| Customer pays, access not granted | Fulfilment tied to the success page, not `checkout.session.completed` webhook | "If access is granted on the success page, anyone who closes the tab early never gets it, and anyone who visits that URL directly might." |
| Works in test mode, fails in live | Live webhook endpoint or live signing secret not set; test keys still in env vars | "Live and test mode have separate keys and separate webhook signing secrets. One of them is usually still the test value." |
| Webhook shows 400/500 errors in Stripe | Signature verification failing (body parsed before verification) or function crashing | "Stripe signs every webhook. If the body is parsed as JSON before verifying, the signature check fails and every event errors." |
| Cancelled subscriptions keep access | Only the first payment event is handled | "The app handles the first payment but not cancellations or failed renewals, so access never gets removed." |
| Secret key in frontend code / env var named VITE_ or NEXT_PUBLIC_ | Stripe calls made from the browser | "Anything in a VITE_ or NEXT_PUBLIC_ variable ends up in the browser. A Stripe secret key there needs rolling today and moving to a server function." |

**60-second Loom script**

```text
[0-10s] Hi [CLIENT_NAME], about "[THEIR_SYMPTOM]". Here's what's usually going on.
[10-30s] (Stripe dashboard test mode, Developers > Webhooks > an endpoint's event deliveries.) First thing I'd check is this page. Failed deliveries tell you straight away whether your server is rejecting Stripe's events.
[30-45s] (Code editor, your demo webhook function.) The fix pattern: verify Stripe's signature on the raw request body, grant or remove access from the webhook, and ignore duplicate events. The success page just says "thanks".
[45-60s] I'd test the full flow in test mode, including cancellations and failed cards, before touching live. Question for you below.
```

**Offer**

```text
How I would run it:
- Hourly at [RATE]/hr, capped at [CAP] hours this week.
- I check your Stripe webhook logs and code first and tell you the root cause in writing.
- Then: webhook with signature verification, access granted and removed from webhook events (paid, renewed, cancelled, payment failed), Stripe keys only on the server.
- Full test-mode run of every case before anything changes in live mode.
- I never need your live secret key in chat. You can invite me to the Stripe account with a developer role or create a restricted key.
```

**Closing question**

```text
Are you seeing failed webhook deliveries in your Stripe dashboard, or does Stripe show them as succeeded while the app still doesn't update?
```

---

## 4. Deploy failing

**Use when** the post mentions: Vercel or Netlify build failing, "works locally/in Lovable but not deployed", 404 on refresh, blank white page after deploy, environment variables, custom domain, exporting from Lovable/Bolt to GitHub.

**First 2 lines (preview)**

```text
"[THEIR_SYMPTOM]" after moving off [BUILDER] usually comes down to three things: missing environment variables, the build settings, or SPA routing on the host.
60-second video on how I'd check each one: [LOOM_URL]
```

**Diagnosis hook**

| Their symptom | Likely cause | Sentence to paste |
|---|---|---|
| Blank white page in production | Env vars not set on the host, so the Supabase client fails on load | "A blank page right after deploy is usually the app crashing on load because the host does not have the environment variables the builder had." |
| 404 when refreshing any page except home | Vite single-page app with no rewrite to `index.html` | "Your app routes in the browser, but the host looks for a real file at that path. One rewrite rule fixes it." |
| Build fails with TypeScript or module errors | Builder preview is more forgiving than a clean production build; lockfile or Node version mismatch | "The builder preview tolerates errors a clean production build does not. I'd read the build log and fix the errors properly rather than switching checks off." |
| Login works locally, not on the deployed domain | Supabase Auth redirect URLs not updated for the new domain | "Supabase needs your production domain in its redirect allow-list, or login sends people back to the preview." |
| Custom domain not working / SSL errors | DNS records or domain not verified on the host | "That's DNS. Usually one record pointed at the old host." |

**60-second Loom script**

```text
[0-10s] Hi [CLIENT_NAME], about "[THEIR_SYMPTOM]". Here's the short list I'd go through.
[10-25s] (Vercel project settings > Environment Variables on a demo project.) One: environment variables. The builder had them. The host needs them too, set for production and preview.
[25-40s] (A vercel.json or Netlify _redirects file.) Two: routing. Vite apps need a rewrite so refreshing /dashboard doesn't 404.
[40-55s] (A failed build log.) Three: the build log itself. I fix the real errors instead of turning type checks off, so the next deploy doesn't surprise you.
[55-60s] Question for you below.
```

**Offer**

```text
How I would run it:
- Hourly at [RATE]/hr, capped at [CAP] hours. Most deploy problems are found in the first hour.
- You get: a passing production build, environment variables set per environment, routing fixed, the custom domain connected, and Supabase Auth URLs updated.
- I'll add Sentry if you want to see production errors before your users report them.
- You own the Vercel or Netlify account. I join as a team member and you remove me at the end.
```

**Closing question**

```text
Can you paste the last 20 lines of the failed build log here? I can usually tell you the cause from that alone.
```

---

## 5. "Finish my MVP"

**Use when** the post mentions: finish my app, MVP 80% done, Lovable/Bolt got stuck, "AI keeps breaking things", need a developer to take over, launch in X weeks.

Qualify hard. The brief's buyer is a founder with real users, live Stripe, a pilot, a demo or a deadline. If none of these exist and the budget is under $500, skip the post.

**First 2 lines (preview)**

```text
When [BUILDER] starts breaking one thing every time it fixes another, the app usually needs a short human pass on the foundations (auth, data rules, payments) before more features go on top.
I recorded a 60-second video on how I'd get you from "80% done" to launched: [LOOM_URL]
```

**Diagnosis hook**

```text
From your post, the parts left are [LIST FROM THEIR POST]. The one I'd look at first is [THE RISKIEST ONE: payments / multi-user data / auth], because [ONE-LINE REASON, e.g. "it's the one that costs you money or trust if it goes wrong at launch"]. The rest is feature work I can quote at a fixed price once I've seen the repo.
```

**60-second Loom script**

```text
[0-10s] Hi [CLIENT_NAME], you're [X]% of the way there with [BUILDER] and it's started fighting you. That's very normal at this stage.
[10-30s] (Their job post on screen, highlight the remaining items.) Here's how I'd split what's left: things that must be right before launch, which are [AUTH/DATA/PAYMENTS], and features that can follow.
[30-50s] How I'd run it: two or three hours to review the repo and Supabase, then a fixed-price plan. Every change goes in its own pull request with a preview link, so you can see exactly what changed.
[50-60s] One question for you below so I can be specific.
```

**Offer**

```text
Two ways to start:
1. Hourly at [RATE]/hr capped at [CAP] hours: I review the repo and Supabase, then send you a written plan with a fixed price for the rest.
2. Fixed-price Ship-Ready Diagnosis ($399, 48 hours): a full severity-ranked report, a video walkthrough and a fixed quote. The $399 is credited toward the fix sprint.

Either way, you keep full ownership of the code and every account, and each change ships as its own pull request with a preview deploy.
```

**Closing question**

```text
What's the date you need to be live by, and is anyone already using or paying for the app?
```

---

## 6. Automation / n8n / integration

**Use when** the post mentions: n8n, Zapier, Make, CRM integration (HubSpot, Pipedrive, GoHighLevel), Google Sheets/Workspace, Slack alerts, webhooks, AI receptionist, lead routing. Budget $1k+ (brief buyer #3).

Do not bid on outbound calling or cold-calling bots. Inbound only.

**First 2 lines (preview)**

```text
For "[THEIR_SYMPTOM / GOAL]", I'd build it as one n8n workflow with error alerts and retries, so it doesn't fail silently the way chained Zaps often do.
60-second video showing how I'd structure it: [LOOM_URL]
```

**Diagnosis hook**

```text
The tricky part in what you described is [THE HARD STEP, e.g. "matching existing contacts so HubSpot doesn't get duplicates" / "handling the webhook when Stripe retries" / "Google API rate limits on bulk updates"]. I'd handle that with [ONE-LINE APPROACH, e.g. "a lookup by email before create, and an idempotency check on the event ID"].
```

**60-second Loom script**

```text
[0-10s] Hi [CLIENT_NAME], here's how I'd build "[THEIR GOAL]".
[10-35s] (A demo n8n canvas or a quick diagram.) Trigger here: [THEIR TRIGGER]. Then [STEP], [STEP], [STEP]. The step most people get wrong is [HARD STEP], and here's how I handle it.
[35-50s] Every workflow gets an error branch: if anything fails, you get a Slack or email alert with the record that failed, and it retries.
[50-60s] You own the n8n account and every API key. Question for you below.
```

**Offer**

```text
Fixed price or hourly, your choice:
- Fixed: $1,000 for one integration, up to $3,000 for multi-system workflows, delivered in 3-7 days, with a video handover.
- Or hourly at [RATE]/hr capped at [CAP] hours if you'd rather start small.

Every build includes error alerts, retries, and API keys stored server-side, never in the browser.
```

**Closing question**

```text
Which system is the source of truth for your customer records today, and roughly how many new records come in per day?
```

---

## Job alert keyword list

Set up Upwork saved searches with notifications for each line. Combine with the filters below.

Builders and platforms:

```text
Lovable
lovable.dev
Bolt.new
Bolt
Base44
Replit Agent
v0
Cursor
vibe coding
vibe coded
AI-built app
AI generated app
no-code app developer
```

Problems (high intent):

```text
Supabase RLS
row level security
Supabase security
Supabase auth
Supabase storage
Stripe webhook
Stripe subscription
Stripe integration
Vercel deploy
Netlify deploy
build failing
fix my app
app not working
finish my MVP
security audit web app
code review React Supabase
```

Integrations:

```text
n8n
n8n workflow
Zapier to n8n
HubSpot integration
Google Workspace API
Slack integration
AI receptionist
Claude Code
Claude API
```

Stack:

```text
Next.js Supabase
React Vite Supabase
Supabase Edge Functions
PostgreSQL policies
```

## Filter checklist (run before every proposal)

Hard rules (from the brief). Skip the post if any fails:

- [ ] Payment method verified
- [ ] Budget $500+ fixed, or an hourly job (bid $100-$150/hr)
- [ ] Client located in US, UK, Canada or Australia
- [ ] Posted within the last hour (aim to reply within 15 minutes)

Quality signals. The thresholds below are owner rules of thumb (estimates), adjust after 20-30 proposals:

- [ ] Hire rate 50% or higher (new clients with 0 hires: OK only if payment verified and the post is specific)
- [ ] Total spent $1,000+ or a clear, detailed post
- [ ] Average rating given to freelancers 4.5+ where shown
- [ ] Fewer than 20 proposals so far
- [ ] The post names a specific problem, builder or stack

Red flags. Skip:

- "Quick fix", "should take 1 hour", "simple" plus a $50-$200 budget
- Unpaid test tasks
- Asks to move to WhatsApp, Telegram or email before hiring
- Wants you to log in with their personal credentials, or offers to paste their service_role key or live Stripe secret key in chat
- Wants outbound cold-calling bots, scraping personal data, or "testing" an app they don't own
- Hobby project with no users, no deadline and no budget

Tracking: log every proposal (date, template used, budget, reply yes/no, hired yes/no) in a simple sheet. After 20 proposals, double down on the template with the best reply rate.
