# Reddit and community playbook

Channel #1 in the brief is the free scan, fed by teardown posts and scan offers in r/lovable, r/vibecoding, r/Supabase, r/SaaS, r/nocode, the Lovable and Supabase Discords, X and LinkedIn. This file covers the communities. X and LinkedIn cuts of each teardown are in `teardown-posts.md`.

The goal in communities is to be the person who gives the clearest, most specific answer about broken AI-built apps. Clients come from that reputation, not from pitching.

---

## 1. Ground rules (read before every post)

Community rules change and differ per subreddit and server. Before posting anywhere:

1. Read the sidebar or pinned rules, and the rules channel in Discord. Look for: self-promotion limits, required flairs, link rules, weekly promo threads, "no AI-generated content" rules.
2. If a sub has a weekly self-promotion or "share your project" thread, the scan offer goes there and nowhere else in that sub.
3. If you're unsure whether a post is allowed, message the mods first with the draft. Short and polite:

```text
Hi, I help people fix security and deploy issues in Lovable/Bolt apps. I'd like to post a free, practical guide to Supabase RLS mistakes (full text in the post, no link required). Is that OK under your rules, and is there a flair you'd like me to use? Happy to adjust.
```

4. Use your real account, with a profile that says what you do. Example Reddit bio: `I fix AI-built apps (Lovable, Bolt, Supabase, Stripe). Free scan for apps you own: [SITE_URL]/scan`.
5. Keep your contribution ratio heavily on the helpful side. A common moderator rule of thumb is no more than about 1 in 10 of your posts and comments being about your own business. Treat it as a ceiling.

### Per-community notes

| Community | Best content | Notes |
|---|---|---|
| r/lovable | Lovable-specific fixes, answering "my app is broken" posts, teardown (a) and (d) | Your core audience. Most value from comments on help posts. |
| r/vibecoding | Teardowns (b) and (d), the free-scan post (if allowed) | Broad builder audience across Lovable, Bolt, Cursor, Replit, v0. |
| r/Supabase | Teardown (a), technical answers on RLS, storage policies, auth redirects | Most technical audience. Be precise, include SQL. No marketing language at all. Links to your site may be poorly received; give the full answer in the post. |
| r/SaaS | Teardown (c) checklist, founder-angle posts | Founders with revenue: the brief's #1 buyer. Promotional posts usually belong in the sub's promo thread if one exists. |
| r/nocode | Teardown (c) and (d), plain-language versions | Less technical. Explain terms (RLS = "rules that decide who sees which rows"). |
| Lovable Discord | Answering questions in help channels | Do not post offers in help channels. Only use showcase or promo channels if they exist and allow services. Never DM people who didn't ask. |
| Supabase Discord | Answering RLS, auth and storage questions | Pure help. Treat it as reputation-building, not a sales channel. |

---

## 2. Five ready posts

Each post gives the full value in the post body. The link to the scan is optional and goes at the end, only where the sub's rules allow it.

### Post 1: RLS teardown (r/Supabase, r/lovable)

**Title**

```text
7 Supabase RLS mistakes to check in your Lovable app (with the SQL to fix each)
```

**Body**

```text
These are the most common row-level security mistakes in Lovable + Supabase apps, drawn from Supabase's own advisor rules and the apps I've built. Sharing the list in case it saves someone a bad week.

Context: your Supabase anon key is in the browser by design. RLS is the only thing deciding who reads what.

1. RLS never enabled. Tables created by SQL or by the builder may not have it. Check:
   select tablename, rowsecurity from pg_tables where schemaname = 'public';

2. "using (true)" policies. RLS is on, a policy exists, and it allows everyone.

3. "Logged in" treated as "allowed". auth.uid() is not null blocks strangers until they sign up. Compare the owner instead:
   using ((select auth.uid()) = user_id)

4. Insert policies without an ownership check. with check (true) lets users create rows owned by other users.

5. RLS is per row, not per column. If users can update their own profile and it holds role/plan/credits, they can upgrade themselves. Move those to a separate table only the server writes to.

6. Roles in user_metadata. Users can edit it with auth.updateUser(). Use app_metadata or a roles table.

7. Storage buckets. Separate policies. Private files in public buckets, or policies that let any user list everything. Scope by folder:
   (storage.foldername(name))[1] = (select auth.uid())::text

Bonus: views run as their owner by default and can skip RLS. On PG15+ use with (security_invoker = true).

Fastest first step: Dashboard > Advisors > Security Advisor. Then log in as two test users and try to read each other's rows.

Happy to answer questions on any of these in the comments.
```

Optional last line where allowed:

```text
I also built a free scan that checks a live URL you own for open tables and exposed keys: [SITE_URL]/scan
```

### Post 2: Stripe key check (r/vibecoding, r/SaaS)

**Title**

```text
PSA: if your Stripe key is in a VITE_ or NEXT_PUBLIC_ variable, it's public. 60-second check inside.
```

**Body**

```text
Seen this enough times that it's worth a post.

Vite (Lovable, Bolt, many others) copies every env var that starts with VITE_ into the JavaScript your visitors download. Next.js does the same with NEXT_PUBLIC_. That's intended: those prefixes mean "public".

So VITE_STRIPE_SECRET_KEY = your Stripe secret key, readable by anyone.

60-second check on your own site:
1. Open it in Chrome > DevTools
2. Ctrl+Shift+F (Cmd+Option+F on Mac) to search all files, then reload
3. Search: sk_live, sk_test, rk_live, whsec_, sb_secret_
4. Search "eyJ" (JWTs). Decode the middle part locally. If it says "role":"service_role", your Supabase admin key is public and bypasses all your RLS.

pk_live_ and the Supabase anon key are fine to be public.

If you find one:
- Roll it in the Stripe dashboard first (Developers > API keys)
- Check your Stripe logs for activity you don't recognise
- Move Stripe calls to a server function (Supabase Edge Function, Vercel function) and store the key without the public prefix

While you're there: if your webhook doesn't verify Stripe's signature, anyone can send a fake "payment succeeded" event. And grant access from the webhook, not the success page.

Questions welcome.
```

### Post 3: Free scans for 5 apps this week

Only post this where self-promotion is allowed, or in the weekly promo thread. If unsure, ask mods first.

**Title**

```text
Free security + launch check for 5 AI-built apps this week (Lovable, Bolt, Base44, v0)
```

**Body**

```text
I fix apps built with AI builders before they take real users. I want more real-world examples for a write-up, so I'm doing 5 free checks this week.

What you get:
- An automated scan of your live URL: secret keys in your JavaScript bundle, Supabase service_role key in the client, tables readable without login, exposed .env or source maps, missing security headers
- A short video from me explaining the results in plain English and what to fix first

Rules:
- Only for apps you own or are authorised to test. The scan asks you to confirm that.
- The scan is read-only: it checks your page, a few well-known paths and whether tables answer anonymous requests (row counts only). It never pulls your actual data.
- I won't post anything about your app publicly without your written permission.
- First 5 who comment "scan" and then run it at [SITE_URL]/scan. I'll reply when the 5 are taken.

Good fit: your app has users, Stripe, a demo coming up or a launch date. If it's an early prototype, the checklist in my profile will be more useful than a scan.

No catch beyond this: if the scan finds something serious and you want help fixing it, I do paid reviews and fixes. Totally fine to just take the results and fix it yourself.
```

Comment reply once someone says "scan":

```text
Thanks. Run it here on your app: [SITE_URL]/scan. Use an email you check, and I'll send the video within 24 hours. If you'd rather keep it private, don't post the URL here, just run the scan.
```

Close-out edit when full:

```text
Edit: all 5 slots taken, thanks everyone. I'll post a write-up of the common issues (no app names) next week.
```

### Post 4: Pre-launch checklist (r/SaaS, r/nocode)

**Title**

```text
The pre-launch checklist I run on AI-built apps (auth, payments, data, deploy)
```

**Body**

Paste the four checklist sections from teardown (c) in `teardown-posts.md`, without the code blocks if posting to r/nocode, then add:

```text
If you can tick every box, you've covered the mistakes that most often sink a launch. If you want the version with code snippets (SPA rewrite, webhook verification, RLS policies), say so and I'll drop it in the comments.
```

### Post 5: What breaks when real users arrive (r/vibecoding, r/lovable)

**Title**

```text
"It worked in the preview." What actually breaks when an AI-built app gets its first 50 users
```

**Body**

```text
The builder preview tests one user, 20 rows and your own clicks. Here's what tends to break once real people show up, roughly in order:

1. Signup emails never arrive. Without custom SMTP, Supabase only sends auth emails to your own team's addresses (and only a few per hour), so real users get no confirmation or reset emails. Set up custom SMTP before launch.
2. Login redirects to the preview URL. Update Site URL and Redirect URLs in Supabase Auth, and in Google's console if you use Google login.
3. Users see each other's data (RLS off or too open), or see nothing (RLS turned on without matching policies).
4. Lists get slow, then stop at 1,000 rows. That's the API's default row cap plus no pagination or indexes.
5. Customers pay and nothing unlocks, because access is granted on the success page and they closed the tab. Use verified webhooks.
6. Refreshing a page gives a 404 after moving to Vercel/Netlify. Add a rewrite to index.html.
7. Errors nobody reports. Users don't file bugs, they leave. Add Sentry and an error boundary.
8. A prompt fixes one thing and breaks three others, or undoes a security fix someone made by hand. Get the code into Git and review changes as PRs.

None of this needs a rebuild. Which one bit you? Curious what I've missed.
```

---

## 3. Comment reply templates

Answer the question fully first. Mention the scan or your service only if it's genuinely the best next step, and never in a sub or channel that forbids it. Adjust wording every time. Copy-paste replies get spotted and reported.

**"My users can see each other's data" / "Supabase says RLS is disabled"**

```text
That's row-level security. Your anon key is public by design, so RLS is the only thing deciding who reads which rows.

Quick check in the SQL editor:
select tablename, rowsecurity from pg_tables where schemaname = 'public';

For each table with false: enable RLS, then add policies that compare the row's owner to the logged-in user, e.g.
using ((select auth.uid()) = user_id)

Heads up: enabling RLS without policies makes the app look empty until the policies are in. Then log in as two test users and confirm neither sees the other's rows.
```

**"Login works in preview but not on my domain" / "Google login redirects to localhost"**

```text
Almost always the URL settings. In Supabase go to Authentication > URL Configuration: set Site URL to your production domain and add it (plus any preview domains) under Redirect URLs. If you use Google login, check the authorised redirect URIs in Google Cloud Console too. Then test in a private window while logged out.
```

**"Confirmation emails aren't arriving"**

```text
Without custom SMTP, Supabase only sends auth emails to your own team's addresses (and only a few per hour), so real users never get confirmation or reset emails. Set up custom SMTP (Authentication settings) with a transactional email provider and send a test to an address outside your team.
```

**"Stripe payment works but the user doesn't get access"**

```text
Two usual causes:
1. Access is granted on the success page, so anyone who closes the tab early never gets it. Move it to a webhook handling checkout.session.completed.
2. The webhook exists but fails. Check Stripe > Developers > Webhooks > your endpoint > event deliveries. If they're 400s, signature verification is probably failing because the body was parsed as JSON before verifying. Verify on the raw body.

Also check that live mode has its own webhook endpoint and signing secret. Test and live are separate.
```

**"Deploy works in Lovable but blank page / 404 on Vercel"**

```text
Blank page: usually missing environment variables on Vercel. Add the same VITE_ variables the builder had, for both Production and Preview, then redeploy.

404 on refresh: Vite apps route in the browser. Add a vercel.json with
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
On Netlify it's a _redirects file with: /*  /index.html  200
```

**"Is my app secure enough to launch?"**

```text
Nobody can honestly tell you it's 100% secure, but you can check the things that cause most real problems in AI-built apps:
- Search your live JS bundle for sk_live, sk_test and whsec_
- Supabase Security Advisor with zero RLS warnings
- Log in as two users and confirm they can't see each other's data
- Stripe webhook verifies signatures and grants access, not the success page

If you want an outside check, I built a free scan for apps you own: [SITE_URL]/scan. Happy to look at the results with you.
```

(Drop the last paragraph in r/Supabase, the Supabase Discord, and anywhere promotion isn't allowed.)

**"I'm about to launch, anything I should check?"**

```text
Congrats. The four areas that bite most often: auth URLs and email delivery, payments via verified webhooks, RLS tested as two different users, and env vars plus SPA routing on your host. I wrote up a full checklist here: [LINK_TO_CHECKLIST_POST_OR_COMMENT]. Which stack are you on?
```

**When someone asks you directly for help**

```text
Happy to. Easiest first step: run the free scan on your app at [SITE_URL]/scan (apps you own only) and I'll send you a short video on the results. If it needs proper fixing, I'll tell you what and how much before anything starts.
```

---

## 4. What NOT to do

- **Don't post links in subs or channels that forbid them.** Give the full answer in text. If people want more, they'll check your profile.
- **Don't drop the same post in five subs on the same day.** Space them out by days and rewrite for each audience. Cross-posting identical text reads as spam and gets filtered.
- **Don't scan, probe or "check" anyone's app without their opt-in.** Not even to make a helpful point. If someone posts their URL, you still don't test it. Point them to run the scan themselves, which includes their attestation that they own it.
- **Don't name or shame apps.** Never post "I found X's keys". If you see an exposed secret in a screenshot someone posts, tell them privately and briefly to roll it, with no sales pitch.
- **Don't DM people who didn't ask**, especially in Discord. Cold DMs in community servers are a fast way to get banned.
- **Don't use sock puppets** or ask friends to upvote or comment. Reddit treats this as vote manipulation.
- **Don't claim results you haven't had.** No "we've secured 200 apps" before it's true. No made-up percentages.
- **Don't promise "secure" or "guaranteed".** Same rule as everywhere in this kit.
- **Don't argue with mods.** If a post is removed, ask what would be acceptable, and follow it.
- **Don't post AI-sounding filler.** Short, specific, with real SQL or settings paths. If a sentence could appear in any post on any topic, delete it.

---

## 5. Weekly rhythm (part-time, about 3-4 hours a week, estimate)

| Day | Task | Time (estimate) |
|---|---|---|
| Mon | Publish the week's teardown on the blog, X and LinkedIn | 45 min |
| Tue | Post the community version in one subreddit | 20 min |
| Daily | Answer 3-5 help posts in r/lovable, r/vibecoding, r/Supabase and Discord help channels | 15-20 min |
| Thu | Post the community version in a second subreddit (rewritten) | 20 min |
| Fri | Send scan follow-up videos (see `loom-scripts.md`), log leads | 30-45 min |

Finding posts to answer: browse /new in each subreddit by hand. `npm run leads` reads Reddit's public JSON without OAuth, which Reddit now mostly blocks (403) and which its Data API terms don't allow for commercial use without an approved, registered app. Use the radar for Hacker News only unless you get approved API access.

Track: posts made, comments made, scans run from each source (use `?ref=reddit-lovable` style tags on `[SITE_URL]/scan` links where links are allowed), diagnoses sold.
