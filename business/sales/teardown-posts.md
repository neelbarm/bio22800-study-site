# Teardown posts

Four long-form articles, each with a blog version (800-1,200 words), an X thread cut and a LinkedIn cut. Publish one per week per the brief's weekly teardown cadence.

Before publishing:

- Replace `[SITE_URL]`.
- Every example below uses placeholder names. Never name or screenshot a real person's app without their written permission.
- Code is shown for apps you own. Tell readers to test only their own projects.
- Supabase and Stripe dashboards move menu items around. Check menu paths against the live dashboard before each post goes out.

---

## (a) 7 Supabase row-level security mistakes we find in Lovable apps

### Blog version

Every Lovable app that uses Supabase ships two things to every visitor's browser: your Supabase project URL and your anon key (newer projects call it the publishable key). That is by design. The anon key is meant to be public.

So what stops a stranger from using that key to read your users' data? One thing: row-level security, or RLS. RLS is a set of rules in Postgres that decides, row by row, who can read, insert, update and delete. If those rules are missing or too loose, your data is open to anyone who opens DevTools.

Here are the seven RLS mistakes we look for first when we review an AI-built app, and how to fix each one.

#### 1. RLS is off on a table

Postgres tables do not have RLS enabled unless someone turns it on. Supabase's Table Editor enables it for tables you create there, but tables created by SQL, by a migration, or by an AI builder running SQL for you may not have it. With RLS off, the anon key can read the table.

How to check: in the SQL editor, run:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public';
```

Any `false` in `rowsecurity` is a table to fix. Supabase's Security Advisor (under Advisors in the dashboard) also flags this.

Fix:

```sql
alter table public.orders enable row level security;
```

Enabling RLS with no policies blocks everything, so your app will look empty until you add the policies below. That is expected.

#### 2. The `using (true)` policy

When a builder hits a permissions error, a common "fix" is a policy like this:

```sql
create policy "Enable read access for all users"
  on public.orders for select
  using (true);
```

`using (true)` means "every row, for everyone". RLS is technically on, the dashboard shows a policy, and the table is still public. Search your policies for `true`:

```sql
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public';
```

#### 3. "Logged in" treated as "allowed"

The next most common pattern:

```sql
using (auth.uid() is not null)
-- or
using (auth.role() = 'authenticated')
```

This feels safe because anonymous visitors are blocked. But if anyone can sign up, anyone can become authenticated in ten seconds. Every user can then read every other user's rows.

Fix: compare the row's owner to the current user.

```sql
create policy "Users read own orders"
  on public.orders for select
  to authenticated
  using ((select auth.uid()) = user_id);
```

Wrapping `auth.uid()` in `(select ...)` lets Postgres evaluate it once per query instead of once per row, which matters once tables grow. Add an index on `user_id` too.

#### 4. Insert policies that do not check ownership

For inserts, only the `with check` clause applies. A policy like `with check (true)`, or one that only checks the user is logged in, lets a user create rows with someone else's `user_id`. In a multi-tenant app that means writing into another customer's workspace.

```sql
create policy "Users insert own orders"
  on public.orders for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
```

For updates, write both `using` (which rows you may touch) and `with check` (what the row must look like afterwards), so a user cannot hand their row to someone else.

#### 5. RLS is per row, not per column

A user who may update their own `profiles` row may update every column in it. If that row holds `role`, `is_admin`, `plan` or `credits`, a user can upgrade themselves with one API call from the browser console.

Fixes, in order of preference:

- Move privileged fields to a separate table (for example `user_roles` or `subscriptions`) with no update policy for users. Only your server code, using the service role, writes to it.
- Or limit which columns users may update. Revoking one column is not enough while the table-level grant exists, so revoke the table grant and re-grant only safe columns: `revoke update on public.profiles from authenticated;` then `grant update (display_name, avatar_url) on public.profiles to authenticated;`. Test it from the browser afterwards.

#### 6. Roles read from `user_metadata`

Policies sometimes check roles like this:

```sql
using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
```

`user_metadata` can be edited by the signed-in user through `supabase.auth.updateUser()`. Anyone can make themselves an admin. Store roles in `app_metadata` (which only the server can set) or in a roles table, and check that instead.

#### 7. Storage buckets left open

Storage has its own policies on `storage.objects`, separate from your tables. Two common problems: a bucket marked public that holds private files (invoices, IDs, user uploads), and policies that let any user list or read every file in a bucket.

Fix: make private buckets private, serve files through signed URLs, and scope policies to a folder per user:

```sql
create policy "Users read own files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
```

Upload files to paths like `documents/<user_id>/file.pdf` so the policy works.

#### Also check: views and database functions

Views in Postgres run with the permissions of their owner by default, which can skip RLS on the tables underneath. On Postgres 15+, create views with `with (security_invoker = true)`. Functions marked `security definer` and exposed through the API run as their owner too. Make sure each one checks who is calling it, or revoke execute from `anon` and `authenticated`.

#### How to test your own app

1. Open Advisors > Security Advisor in the Supabase dashboard and clear every RLS warning.
2. With your own project's anon key, request each table without logging in:

```bash
curl "https://YOUR-PROJECT.supabase.co/rest/v1/orders?select=*&limit=1" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

You want `[]` or an error for anything private.
3. Create two test users. Log in as user A and try to read, update and insert rows belonging to user B.
4. Put every policy in a migration file in Git, so the next AI re-prompt cannot quietly replace it.

Want a quick outside check first? Run the free Ship-Ready Scan on an app you own at [SITE_URL]/scan. It checks your live URL for tables readable without login and keys that should not be in your bundle, and it never returns your row data.

### X thread

```text
1/ Every Lovable + Supabase app ships its anon key to the browser. That's by design.

The only thing between that key and your users' data is row-level security.

Here are 7 RLS mistakes we look for first in AI-built apps

2/ RLS never turned on.
Tables created by SQL or by your AI builder may not have it. With RLS off, the public key can read the table.
Check: select tablename, rowsecurity from pg_tables where schemaname = 'public';

3/ The "using (true)" policy.
RLS is on, a policy exists, and it says "everyone, every row". It's public.

4/ "Logged in" = "allowed".
auth.uid() is not null blocks strangers, until they sign up. Then they see everything.
Compare the row's owner: (select auth.uid()) = user_id

5/ Inserts without an ownership check.
with check (true) lets users create rows owned by someone else. In multi-tenant apps, that's writing into another customer's workspace.

6/ RLS is per row, not per column.
If users can update their own profile and it holds role, plan or credits, they can upgrade themselves from the browser console.

7/ Roles stored in user_metadata.
Users can edit user_metadata themselves. Use app_metadata or a roles table.

8/ Storage buckets.
Separate policies, separate mistakes. Private files in a public bucket, or policies that let any user list every file.

9/ Fastest check: Supabase dashboard > Advisors > Security Advisor. Then test as two different users.

Free scan for apps you own: [SITE_URL]/scan
```

Note: the marker is the only emoji in the kit. Delete it if you prefer none.

### LinkedIn version

```text
If your product was built with Lovable, Bolt or another AI builder on Supabase, your database key is in every visitor's browser. That's normal. Supabase designed it that way.

What protects your customers' data is row-level security: rules that decide, row by row, who can see what.

The 7 mistakes we look for first:

1. RLS never turned on for some tables
2. Policies that say "using (true)", which means everyone
3. Policies that only check "is logged in", so any new signup sees everything
4. Insert rules that let users create records owned by other users
5. Users able to edit their own "plan" or "role" column
6. Admin roles stored in metadata users can edit
7. Storage buckets holding private files with open rules

If you're heading into a customer security review or an investor demo, these are the first things a technical reviewer will check.

A free scan for apps you own: [SITE_URL]/scan
```

---

## (b) Your Stripe secret key is in your JavaScript bundle: how to check in 60 seconds

### Blog version

Here is a pattern we see in AI-built apps. You ask the builder to "add Stripe checkout". It needs a key. You paste your Stripe secret key into a variable called something like `VITE_STRIPE_SECRET_KEY`. The checkout works. You launch.

That key is now in the JavaScript file every visitor downloads. Anyone who opens DevTools can copy it and call the Stripe API as you: read your customers, issue refunds, create charges.

#### Why it happens

Front-end build tools copy certain environment variables into the browser code at build time, on purpose:

- **Vite** (Lovable, Bolt and many others): any variable starting with `VITE_` is exposed through `import.meta.env` and inlined into the bundle.
- **Next.js** (v0 and many Cursor projects): any variable starting with `NEXT_PUBLIC_` is inlined into the client bundle.

These prefixes mean "this is public". They are the right place for your Stripe publishable key and your Supabase anon key. They are never the right place for a secret. A secret also ends up in the bundle if it is pasted directly into a front-end file, which AI builders sometimes do.

#### Which keys are fine and which are not

| Key | Starts with | In the browser? |
|---|---|---|
| Stripe publishable key | `pk_live_` / `pk_test_` | Fine |
| Stripe secret key | `sk_live_` / `sk_test_` | Never |
| Stripe restricted key | `rk_live_` / `rk_test_` | Never |
| Stripe webhook signing secret | `whsec_` | Never |
| Supabase anon / publishable key | JWT with `"role":"anon"`, or `sb_publishable_` | Fine (if RLS is right) |
| Supabase service_role / secret key | JWT with `"role":"service_role"`, or `sb_secret_` | Never. It bypasses RLS completely. |

#### The 60-second check

Do this on your own app.

1. Open your live site in Chrome.
2. Open DevTools (F12, or Cmd+Option+I on a Mac).
3. Open the search-all-files panel: Ctrl+Shift+F (Cmd+Option+F on a Mac). Reload the page so every script is loaded.
4. Search for each of these, one at a time:
   - `sk_live`
   - `sk_test`
   - `rk_live`
   - `whsec_`
   - `sb_secret_`
5. Then search for `eyJ`. That is how JWTs start, and older Supabase keys are JWTs. For each one you find, decode the middle part (between the two dots) on your own machine, not on a website:

```bash
echo 'PASTE_THE_MIDDLE_PART' | base64 -d
```

If you see `"role":"service_role"`, that key must come out today. Note that searching the bundle for the word `service_role` will not find it, because inside the key it is base64-encoded.

Any hit on steps 4 or 5 (other than `anon`) is a live problem.

You can also check from the code side:

```bash
grep -rnE "sk_(live|test)_|rk_live_|whsec_|sb_secret_" src/ .env* 2>/dev/null
grep -rnE "(VITE|NEXT_PUBLIC)_[A-Z_]*(SECRET|SERVICE)" src/ .env* 2>/dev/null
```

The second line finds secrets hiding behind a public prefix.

#### If you find one

In this order:

1. **Roll the key now.** In the Stripe dashboard, go to Developers > API keys and roll the secret key. The exposed key stops working. For Supabase, rotate the service role or secret key in the project's API key settings.
2. **Check for activity you don't recognise.** Look at your Stripe request logs and recent payments, refunds and customers.
3. **Move the Stripe calls to the server.** Create checkout sessions in a Supabase Edge Function, a Vercel or Netlify function, or a Next.js server route. Store the key as a server-side secret:

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
```

On Vercel or Netlify, add it as an environment variable without the `VITE_` or `NEXT_PUBLIC_` prefix.
4. **Consider a restricted key** with only the permissions your function needs.
5. **Redeploy**, then run the 60-second check again.

If your repo is public, also remove the key from Git history. Rolling it makes the old value useless, which is what matters most.

#### While you're in there: your webhook

Many apps that leak the key also have a webhook that accepts anything. If your webhook does not verify Stripe's signature, anyone can POST a fake `checkout.session.completed` event and unlock paid features.

Stripe signs every webhook with your `whsec_` secret. Verify it on the raw request body before doing anything else. In a Supabase Edge Function (Deno):

```ts
import Stripe from "npm:stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const cryptoProvider = Stripe.createSubtleCryptoProvider();

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text(); // raw body, before any JSON parsing

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      cryptoProvider,
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // Skip events you've already processed (store event.id), then fulfil.
  if (event.type === "checkout.session.completed") {
    // grant access here, using the service role on the server only
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
```

Stripe does not send a Supabase login token, so deploy this function with JWT verification off (`supabase functions deploy stripe-webhook --no-verify-jwt`). The signature check is what protects it. In Node or Next.js, use `stripe.webhooks.constructEvent(rawBody, signature, secret)` and make sure nothing has parsed the body first.

Two more rules: grant access from the webhook, not from the success page a customer lands on after paying, and store processed `event.id` values, because Stripe retries and can deliver the same event more than once.

Want an outside check? Run the free Ship-Ready Scan on an app you own at [SITE_URL]/scan. It looks for secret keys in your live JavaScript bundle and tables readable without login.

### X thread

```text
1/ Your Stripe secret key might be in your app's JavaScript right now.
If you built with Lovable, Bolt, v0 or Cursor, here's how to check in 60 seconds.

2/ Why it happens:
Vite copies every VITE_ variable into the browser bundle. Next.js does the same with NEXT_PUBLIC_.
Those prefixes mean "public". A key called VITE_STRIPE_SECRET_KEY is public.

3/ The check:
Open your site > DevTools > search all files (Ctrl+Shift+F / Cmd+Option+F) > reload.
Search: sk_live, sk_test, rk_live, whsec_, sb_secret_

4/ Then search "eyJ". Those are JWTs.
Decode the middle part locally. If it says "role":"service_role", your Supabase admin key is public and RLS means nothing.

5/ Found one?
Roll it in the Stripe dashboard first. Then check your logs. Then move Stripe calls to a server function and store the key without a public prefix.

6/ While you're there: does your webhook verify Stripe's signature?
If not, anyone can POST a fake "payment succeeded" event and unlock paid features.

7/ And grant access from the webhook, not the success page.

Free scan for apps you own: [SITE_URL]/scan
```

### LinkedIn version

```text
A 60-second check every founder with an AI-built app should do this week.

Tools like Lovable and Bolt build on Vite. Vite copies any setting that starts with VITE_ into the code every visitor downloads. Next.js does the same with NEXT_PUBLIC_.

So if your Stripe secret key is stored as VITE_STRIPE_SECRET_KEY, it's public. Anyone can use it to read your customers or issue refunds.

How to check:
1. Open your live site in Chrome
2. Open DevTools and search all files (Ctrl+Shift+F)
3. Search for sk_live, sk_test and whsec_

If you find one: roll the key in Stripe today, then move payments to a server function.

Free scan for apps you own: [SITE_URL]/scan
```

---

## (c) The pre-launch checklist for AI-built apps (auth, payments, data, deploy)

### Blog version

AI builders are very good at the happy path: one user, test data, your own browser. Launch is when everything else shows up. This is the checklist we run before an AI-built app takes real users or real money. It assumes the common stack: React/Vite or Next.js, Supabase, Stripe, and Vercel or Netlify.

Print it, tick it, and fix anything you can't tick before launch day.

#### Auth

- [ ] **Site URL and Redirect URLs** in Supabase (Authentication > URL Configuration) point at your production domain, not the builder preview. This is the top cause of "login works in preview, not on my domain".
- [ ] **OAuth providers** (Google, GitHub) have your production URLs in their own consoles, and the Supabase callback URL is authorised there.
- [ ] **Custom SMTP is set up.** Supabase's built-in email sender is heavily rate-limited and meant for testing. Without your own provider, confirmation and reset emails stop arriving once real signups start.
- [ ] **Password reset tested end to end** on the production domain: request, email arrives, link opens a "set new password" screen, new password works.
- [ ] **Protected pages are protected by data rules**, not only hidden in the UI. A route guard in React is a convenience. The real lock is RLS.
- [ ] **Admin roles live somewhere users can't edit**: `app_metadata` or a roles table, never `user_metadata`.
- [ ] **Bot protection on signup** (Supabase supports CAPTCHA providers) if signup is open to the public.

#### Payments

- [ ] **Only the publishable key (`pk_live_`) is in the frontend.** Secret and restricted keys live in server-side environment variables with no `VITE_` or `NEXT_PUBLIC_` prefix. Search your live bundle for `sk_live` to confirm.
- [ ] **A live-mode webhook endpoint exists**, with its own signing secret. Test-mode and live-mode webhooks and secrets are separate.
- [ ] **The webhook verifies Stripe's signature** on the raw request body before doing anything.
- [ ] **Access is granted from the webhook**, not from the success page.
- [ ] **Renewals, cancellations and failures are handled**: at minimum `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` and `invoice.payment_failed` for subscriptions.
- [ ] **Duplicate events are ignored.** Stripe retries. Store each processed `event.id`.
- [ ] **Customer portal configured** so people can update cards and cancel without emailing you.
- [ ] **One real live-mode purchase** with your own card, then a refund. Confirm access is granted and removed correctly.

#### Data

- [ ] **RLS is on for every table in the `public` schema**, and the Supabase Security Advisor shows no RLS warnings.
- [ ] **No policy uses `using (true)`** on private data, and no policy only checks "is logged in".
- [ ] **Tested as four people**: signed out, user A, user B and an admin. User A cannot read or change user B's rows.
- [ ] **Users can't edit their own `plan`, `role` or `credits` columns.**
- [ ] **Storage buckets** holding private files are private, with per-user folder policies and signed URLs.
- [ ] **The service_role or secret key is only on the server.** Never in the frontend, never in a public-prefixed variable, never pasted into an AI tool.
- [ ] **Indexes exist** on columns used in policies and filters (usually `user_id`, `org_id`, `created_at`).
- [ ] **Lists paginate.** The Supabase API caps rows per request (1,000 by default). A list that silently stops at 1,000 looks like missing data.
- [ ] **You know your backup situation.** Check what your Supabase plan includes, and whether you need point-in-time recovery before you hold customer data you can't recreate.

#### Deploy

- [ ] **Code lives in GitHub**, not only inside the builder. You can roll back any change.
- [ ] **Environment variables set on the host** for both production and preview environments. A blank white page right after deploy usually means one is missing.
- [ ] **SPA routing works**: refresh `/dashboard` on the live site. For a Vite app on Vercel, add a `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

On Netlify, add a `public/_redirects` file containing `/*  /index.html  200`.
- [ ] **Custom domain on HTTPS**, with `www` redirecting to one canonical domain.
- [ ] **No `.env` file or source maps served publicly.** Visit `yourdomain.com/.env` and check a `.js.map` URL. Both should 404. If you want source maps for debugging, upload them to your error tracker instead.
- [ ] **Security headers set** at the host: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, a frame policy (`frame-ancestors` or `X-Frame-Options`), and a Content-Security-Policy, ideally starting in report-only mode.
- [ ] **Error monitoring** (Sentry or similar) is live and you have received a test error.
- [ ] **An error boundary** shows a friendly message instead of a white screen.
- [ ] **Uptime monitoring** pings your site and alerts you.
- [ ] **Your Supabase project won't pause.** Free-plan projects are paused after a period of inactivity. Check the current policy and your plan before launch.
- [ ] **Rate limits** on endpoints that cost money or send email (AI calls, SMS, password reset).

#### The rule that covers everything else

Every fix above should land as code in Git, ideally one pull request per fix, with a preview deploy you click through before it merges. If the fix only exists because you re-prompted the builder, the next re-prompt can quietly undo it.

Not sure where you stand? Run the free Ship-Ready Scan on an app you own at [SITE_URL]/scan. It checks your live URL for exposed keys, tables readable without login, exposed `.env` files or source maps, and missing security headers.

### X thread

```text
1/ The pre-launch checklist for AI-built apps.
Lovable, Bolt, v0, Cursor: the builder handles the happy path. Launch brings everything else.
Auth, payments, data, deploy

2/ AUTH
- Supabase Site URL + Redirect URLs = production domain
- Custom SMTP (built-in email is rate-limited, testing only)
- Password reset tested on the real domain
- Admin roles in app_metadata, never user_metadata

3/ PAYMENTS
- Only pk_live_ in the frontend
- Separate live webhook + signing secret
- Verify the signature on the raw body
- Grant access from the webhook, not the success page
- Store event.id, Stripe retries

4/ DATA
- RLS on every public table, Security Advisor clean
- No "using (true)", no "is logged in" policies
- Test as signed out, user A, user B, admin
- Users can't edit their own plan/role column

5/ DEPLOY
- Env vars on the host for prod and preview
- SPA rewrite so refresh doesn't 404
- /.env and .js.map return 404
- Sentry + uptime monitor
- Error boundary, no white screens

6/ And the big one: every fix lives in Git as its own PR. If a fix only exists because you re-prompted the builder, the next re-prompt can undo it.

Free scan for apps you own: [SITE_URL]/scan
```

### LinkedIn version

```text
Launching an app built with Lovable, Bolt or another AI builder? Four areas to check before real users and real money arrive.

Auth: production URLs set in Supabase, a real email provider (the built-in one is rate-limited), password reset tested on your live domain.

Payments: only the publishable key in the browser, webhooks that verify Stripe's signature, access granted from the webhook rather than the "thank you" page.

Data: row-level security on every table, tested as two different users. Neither should see the other's records.

Deploy: environment variables set on the host, error monitoring live, no white screens.

The full checklist is in the comments. Free scan for apps you own: [SITE_URL]/scan
```

---

## (d) Why your Lovable app breaks when real users arrive

### Blog version

It worked in the preview. It worked when you showed your co-founder. It worked on launch morning. Then forty people signed up and things started going wrong.

This isn't bad luck, and it isn't that AI builders are bad. The preview tests a very specific situation: one user (you), a few rows of test data, your browser, your fast connection, and only the clicks you thought to make. Real users bring everything the preview never saw. Here is what usually breaks, roughly in the order it shows up.

#### 1. Signup emails stop arriving

The first ten signups get their confirmation email. Then they stop. Supabase's built-in email sender is heavily rate-limited and meant for testing. Real signups hit the limit fast, and new users sit on a "check your email" screen forever.

Fix: connect a transactional email provider through Supabase's custom SMTP settings before launch, and send a test from the production domain.

#### 2. Login sends people to the wrong place

You moved from the builder's preview URL to your own domain. Google login, magic links and password resets still redirect to the old URL, because Supabase's Site URL and Redirect URLs were set during the preview. You never noticed, because you were already logged in.

Fix: update both settings in Supabase, and the OAuth provider's own console, then test every auth flow logged out, in a private window.

#### 3. Users see each other's data, or nothing at all

With one user, there's no way to notice that your data rules don't separate users. With two, there is. If row-level security is off, or a policy only checks "is logged in", user B sees user A's records. That's the bad version.

The other version: someone turns RLS on late, without policies that match the app's queries, and everyone's dashboard is suddenly empty.

Fix: write policies that compare each row's owner to the current user, test them as at least two users plus a signed-out visitor, and ship them as migrations in Git.

#### 4. Pages that were fast get slow, then stop at 1,000 rows

Your test data had twenty rows. A real account has 5,000. Lists without pagination load everything. Queries filter on columns with no index. Policies that call `auth.uid()` for every row slow everything down. Then the Supabase API's default row cap (1,000 per request) kicks in, and lists quietly stop, which looks to users like lost data.

Fix: paginate lists, add indexes on the columns you filter and write policies on (usually `user_id` or `org_id`), and write `(select auth.uid())` in policies so it's evaluated once per query.

#### 5. Payments succeed but nothing unlocks

In testing you always clicked through to the success page. Real customers close the tab, lose signal or hit back. If your app grants access when the success page loads, those customers paid and got nothing. If the webhook exists but doesn't verify Stripe's signature, anyone can fake a payment. If it doesn't ignore duplicate events, Stripe's retries can grant things twice.

Fix: grant and remove access from verified webhooks only, handle cancellations and failed payments, and store each processed event ID.

#### 6. Refreshing a page gives a 404

Vite apps route inside the browser. On the builder's hosting this is handled for you. On your own Vercel or Netlify deploy, a user who refreshes `/dashboard` or opens a shared link gets a 404, because the host looks for a file that doesn't exist.

Fix: add a rewrite so every path serves `index.html` (`vercel.json` on Vercel, a `_redirects` file on Netlify).

#### 7. Errors you never hear about

When something fails for a real user, they don't file a bug report. They see a white screen and leave. Without error monitoring, your first signal is a quiet drop in signups.

Fix: add Sentry or a similar tool, wrap the app in an error boundary that shows a friendly message, and set an uptime monitor.

#### 8. The fix that broke something else

This is the one specific to AI builders. Something breaks, you prompt the builder to fix it, and it does, while also changing three other files. A login fix touches the profile page. A styling request rewrites a data query. Without tests or code review, you find out from users.

The same thing undoes security fixes: a developer tightens your RLS or moves a key server-side, and two weeks later a new prompt regenerates the file the old way.

Fix: get the code into GitHub, make changes as one pull request per fix with a preview deploy you click through, and keep a short list of files the builder shouldn't touch.

#### 9. The project goes to sleep

Free-plan Supabase projects are paused after a period of inactivity. Fine for a side project, not for a pilot customer who logs in after a week away and finds the app down.

Fix: check your plan and the current inactivity policy before you hand the app to a customer.

#### What to do this week

You don't need to rebuild. Most of this is configuration and a few hundred lines of careful code. In order:

1. Search your live JavaScript for `sk_live` and other secrets (see our 60-second check).
2. Open Supabase's Security Advisor and fix every RLS warning.
3. Test signup, login and password reset in a private window on your real domain.
4. Make one real purchase, then refund it.
5. Add error monitoring.
6. Get the code into Git and stop shipping changes nobody has looked at.

Want a quick outside read before you do? Run the free Ship-Ready Scan on an app you own at [SITE_URL]/scan. It checks your live site for exposed keys, open tables, exposed files and missing headers, and you'll have results in a minute.

### X thread

```text
1/ Why your Lovable app breaks when real users arrive.
The preview tests one user, 20 rows, your browser and your clicks. Launch tests everything else

2/ Signup emails stop. Supabase's built-in sender is rate-limited and meant for testing. Set up custom SMTP before launch.

3/ Login redirects to the preview URL. Site URL + Redirect URLs in Supabase still point at the old domain. Test logged out, in a private window.

4/ Users see each other's data, or nothing. RLS off or "is logged in" policies leak. RLS on without matching policies empties every dashboard.

5/ Pages slow down, then stop at 1,000 rows. No pagination, no indexes, and the API's default row cap. Looks like lost data.

6/ Payments succeed, nothing unlocks. Access granted on the success page. Customers who close the tab paid for nothing. Use verified webhooks.

7/ Refresh gives a 404. Vite routes in the browser. Your host needs a rewrite to index.html.

8/ The fix that broke something else. A re-prompt fixes one thing and rewrites three files. It can also undo security fixes. One PR per fix, in Git, with a preview.

9/ Free scan for apps you own: [SITE_URL]/scan
```

### LinkedIn version

```text
"It worked in the preview."

The preview in an AI builder tests one user, a few rows of data and the clicks you thought to make. Real users bring everything else.

What usually breaks first:
- Signup emails stop (the default email sender is rate-limited)
- Login redirects to the old preview URL
- Users see each other's data, or nothing at all
- Lists slow down and silently stop at 1,000 rows
- Customers pay but nothing unlocks
- Refreshing a page shows a 404
- Errors happen and nobody hears about them
- A prompt fixes one thing and quietly breaks another

None of this needs a rebuild. It needs a careful week before launch.

Free scan for apps you own: [SITE_URL]/scan
```
