# Loom scripts

Three scripts:

1. Demo video: break a Lovable app on purpose, then diagnose and fix it (portfolio, profiles, Reddit, landing page).
2. Diagnosis walkthrough delivered to clients with the $399 report.
3. Free-scan follow-up video sent to people who ran the scan.

Plus a short note on the 60-second proposal Looms, which live in `proposal-templates.md`.

## Recording rules (all videos)

- Only show apps, databases and accounts you own, or that the client has given you access to for this work.
- Use Stripe **test mode** keys only on screen. Before recording, roll any key that has ever appeared on screen.
- Never show real user rows, emails or payment details. Use seeded fake data ("Test User 1").
- Hide browser bookmarks, other tabs and notifications. 1080p, browser zoom 125%, cursor highlight on.
- Talk to one person. Say "you", not "you guys".
- No hype words. Say what you see and what it means.

---

## 1. Demo video: "I broke a Lovable app on purpose. Here's how I found it."

**Length:** 3-4 minutes. Also cut a 60-second version (sections B, C and E only) for the Fiverr gig and the Upwork profile.

### Setup before recording (one-time, about 1-2 hours, estimate)

1. In Lovable, build a small app you own, e.g. "TinyCRM": login, a `contacts` table (name, email, company, `user_id`), and a "Upgrade to Pro" button.
2. Connect Supabase. Seed two fake users, each with 5 fake contacts.
3. Plant three problems:
   - Run `alter table public.contacts disable row level security;` (RLS off).
   - Create `profiles` with RLS on but a policy `using (true)` for `select`.
   - Add a Stripe **test** secret key as `VITE_STRIPE_SECRET_KEY` and reference it in a frontend file, so Vite inlines it into the bundle.
4. Publish the app on its default domain. Keep a second Supabase migration ready with the fixes.

### Script

**A. Hook (0:00-0:15)**

```text
This app took about an hour to build in Lovable. It has login, a database and a Stripe button. It also has three problems that would let a stranger read every customer record and use my Stripe account. I'll find them in under three minutes, then fix them.
```

**B. The secret key in the bundle (0:15-1:00)**

On screen: the live app, then DevTools.

```text
First, the JavaScript your visitors download. Open DevTools, then the Sources tab, and search all files. In Chrome that's Ctrl+Shift+F, or Cmd+Option+F on a Mac.

I'll search for "sk_test". There it is, a Stripe secret key, sitting in the bundle. On a real app this would be sk_live.

Why it's there: in a Vite app, any variable that starts with VITE_ gets copied into the browser code at build time. Same with NEXT_PUBLIC_ in Next.js. That prefix means "public". It's not a place for secrets.

Anyone who finds this key can call the Stripe API as you: issue refunds, read customer data, create charges.
```

**C. The open table (1:00-2:00)**

On screen: DevTools Network tab, then a terminal.

```text
Second, the database. Every Supabase app ships its project URL and its anon key to the browser. That's normal. The anon key is designed to be public. What protects your data is row-level security, RLS for short.

Here's the request the app makes. I'll copy the URL and the anon key into a terminal and ask for the contacts table without logging in.
```

Terminal (your own project only):

```bash
curl "https://YOUR-PROJECT.supabase.co/rest/v1/contacts?select=*" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

```text
Ten rows. Both users' contacts. I'm not logged in. That's what "RLS off" means: anyone with the public key can read the table.

Now profiles. RLS is on here, so it looks safe in the dashboard, but the policy says "using true", which means "allow everyone". Same result.

Supabase actually warns about the first one. Here's the Security Advisor in the dashboard: "RLS disabled in public". Most people never open this page.
```

**D. The fix (2:00-3:15)**

On screen: code editor with the migration, then Supabase SQL editor or CLI.

```text
Fixing it properly takes three things.

One: roll the Stripe key in the Stripe dashboard so the leaked one stops working, then move Stripe calls to a server function. The new key lives in a server-side secret, never in a VITE_ variable.

Two: turn RLS on and write policies that compare the row's owner to the logged-in user.
```

Show this migration:

```sql
alter table public.contacts enable row level security;

create policy "Users read own contacts"
  on public.contacts for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users insert own contacts"
  on public.contacts for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users update own contacts"
  on public.contacts for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users delete own contacts"
  on public.contacts for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Public profiles" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);
```

```text
Three: it goes in a migration file in Git, not a dashboard click, so the next person, or the next AI re-prompt, can see it.
```

**E. Proof (3:15-3:45)**

```text
Same curl as before. Empty array. Logged in as user one, I see my five contacts. User two sees theirs. The bundle search for "sk_" finds nothing. The Security Advisor is clean.
```

**F. Close (3:45-4:00)**

```text
If you built your app with Lovable, Bolt or another AI builder and want to know if yours has the same problems, run the free scan at [SITE_URL]/scan. It checks your live URL for exposed keys and open tables, on apps you own. If it finds something, I can walk you through the fix.
```

60-second cut ending:

```text
Free scan for apps you own: [SITE_URL]/scan.
```

---

## 2. Diagnosis walkthrough (delivered with the $399 report)

**Length:** 8-12 minutes. Recorded after the written report is finished. The video follows the report, it does not replace it.

**Goal:** the client understands their top risks, trusts the ranking, and has a clear yes/no decision on the fixed-price sprint.

### Structure and script

**A. Opening (0:00-0:45)**

```text
Hi [CLIENT_NAME]. This is the walkthrough for your Ship-Ready Diagnosis of [APP_NAME]. The written report is in [REPORT_LINK]. I'll cover the [N] Critical and High issues in detail, run through the Medium and Low ones quickly, and finish with the fix plan and price.

Short version: [ONE SENTENCE, e.g. "two issues need fixing before you take more paying users; the rest can wait until after launch"].
```

**B. Severity scale (0:45-1:15)**

```text
Quick note on how I rank things.
Critical: someone outside your team can read or change data, or use your accounts, today.
High: likely to cause a data leak, lost payments or broken access once you have more users.
Medium: real problems that are not urgent: reliability, missing monitoring, slow pages.
Low: tidy-ups and good habits.
```

**C. Each Critical/High finding (about 1-2 minutes each)**

Repeat this pattern for each. Show only what's needed; blur or skip any real user data.

```text
Issue [#]: [TITLE, e.g. "The orders table can be read by anyone who signs up"]. Rated [Critical/High].

What I found: [WHAT, e.g. "The policy on orders checks that someone is logged in, but not that the order belongs to them."]

How I confirmed it: [HOW, e.g. "On your staging project, I created a fresh test account and could list every order."]

Why it matters for you: [BUSINESS IMPACT, e.g. "Your B2B customers' order history is visible to any other customer. That's the first thing a customer security review would catch."]

The fix: [FIX, e.g. "Replace the policy with one that compares the order's customer ID to the logged-in user, as a migration, then test every screen that shows orders."]

Effort: [included in the 5-issue sprint / part of the payments rebuild].
```

**D. Medium and Low (1-2 minutes total)**

```text
The Medium and Low items are in sections [X] and [Y] of the report. Quickly: [ONE LINE EACH]. None of these block launch. A few of them, like [EXAMPLE], are worth doing in the same sprint because they're cheap once I'm already in the code.
```

**E. What's good (30 seconds)**

Always include something true and specific.

```text
A few things are already in good shape: [e.g. "your auth settings, your Stripe checkout uses server-side sessions, your tables have sensible structure"]. That's why the fix list is [N] items, not thirty.
```

**F. The fix plan and price (1-2 minutes)**

```text
Here's what I recommend.

[OPTION A, e.g. "Fix & Ship Sprint, up to 5 issues: $1,500. That covers issues 1 to 5: the two Critical and three High items."]
[OPTION B if relevant, e.g. "Or up to 10 issues plus production deploy: $2,500. That adds the Medium items and moves you onto a clean Vercel deploy."]

Your $399 diagnosis fee is credited, so Option A is $1,101 from here [and Option B is $2,101].

Delivery is [5-10] working days from when I have access. Each fix is its own pull request with a preview link, so you test every change before it goes live.

One thing to know before you decide: if you keep re-prompting [BUILDER] on the same files after the fixes, it can overwrite them. The handover doc lists which files to protect, and the monthly plan covers re-fixes if it happens.
```

**G. Close (20 seconds)**

```text
To go ahead, reply with "Option A" or "Option B" and I'll send the agreement and invoice. If you'd rather fix things yourself, the report has enough detail for any developer to do it. Any questions, reply in writing or leave a comment on this video.
```

If nothing material was found (refund case):

```text
Good news: I didn't find anything I'd rate High or Critical. [SUMMARY OF WHAT WAS CHECKED.] As promised, I'm refunding your $399. The Medium and Low items in the report are still worth doing when you have time.
```

---

## 3. Free-scan follow-up video

**When:** someone ran the free scan at `[SITE_URL]/scan` on an app they attested they own, left an email, and the scan found something. Send within 24 hours.

**Length:** 90 seconds. Recorded per lead. Show only the scan report the owner already received. Do not run any extra tests on their app beyond what the scan does, and do not show or request their data.

### Script: scan found something

```text
[0-10s]
Hi [FIRST_NAME], thanks for running the Ship-Ready Scan on [APP_DOMAIN]. I'm [YOUR_NAME], I run ShipReady. I looked at your results and wanted to explain them in plain words.

[10-45s] (Their scan report on screen.)
The scan flagged [N] things. The one that matters most is [TOP_FINDING].
[Pick the matching line:]
- Secret key in bundle: "A [Stripe secret / Supabase service_role] key is in the JavaScript your visitors download. Anyone can copy it from their browser. First step today: roll that key in the [Stripe / Supabase] dashboard so the exposed one stops working."
- Table readable anonymously: "Your [TABLE_NAME] table answers requests from someone who isn't logged in. The scan only checks whether it answers, it doesn't download your rows, but anyone else could. That's row-level security that's off or too open."
- Exposed .env or source maps: "Your site serves [a .env file / source maps], which can reveal keys or your full source code. That's a hosting setting."
- Missing security headers: "Missing security headers. Not urgent on its own, but easy to fix when other things are being fixed."

[45-70s]
What the scan can't see: your database policies in detail, storage rules, your Stripe webhooks or your auth flows. Those need a look at the code and the Supabase project, which is what the Diagnosis covers: 48 hours, a written report ranked by severity, a walkthrough like this one, and a fixed price to fix everything. It's $399, credited toward the fixes if you go ahead.

[70-90s]
If you want to fix [TOP_FINDING] yourself, the link under this video has the steps. If you'd like me to look properly, reply to this email. Either way, please do roll that key today.
```

### Script: scan came back clean

Send as a shorter 45-second video, or plain email if volume is high.

```text
Hi [FIRST_NAME], your scan of [APP_DOMAIN] came back clean on everything it checks: no exposed keys in the bundle, no tables readable without login, no exposed .env or source maps. Nice work.

What a scan can't check: whether logged-in users can see each other's data, storage rules, Stripe webhooks and auth edge cases. If you've got real users or payments coming, the Diagnosis covers those. If not, you're in a good place for now. The pre-launch checklist is linked below if you want to run through it yourself.
```

### Email to send the video

Subject: `Your Ship-Ready Scan results for [APP_DOMAIN]`

```text
Hi [FIRST_NAME],

Thanks for running the scan on [APP_DOMAIN]. I recorded a 90-second video explaining what it found: [LOOM_URL]

The most important item: [TOP_FINDING]. If you do one thing today, [ONE ACTION, e.g. "roll your Stripe secret key in the Stripe dashboard"].

If you'd like a full review of the code and Supabase project, reply here. The Diagnosis is $399, takes 48 hours and the fee is credited toward any fixes.

[YOUR_NAME]
ShipReady
[PHYSICAL_MAILING_ADDRESS]
Don't want follow-ups? Reply "stop" or use this link: [UNSUBSCRIBE_LINK]
```

---

## 4. Proposal Looms (60 seconds)

Scripts for each Upwork proposal type are inside `proposal-templates.md`. General shape:

```text
[0-10s] Name their problem in their words.
[10-30s] Show where this kind of problem lives (on your demo app or on their job post, never on their live app without permission).
[30-50s] Say how you'd find the root cause and how they'll test the fix.
[50-60s] Point to the question in the proposal text.
```
