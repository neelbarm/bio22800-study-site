## Ship-Ready Diagnosis: TaskNest (example)

**Fictional client:** TaskNest, a team task app built with Lovable on Supabase and Stripe, 340 users, about to launch a paid plan.
**Reviewed:** GitHub repo `tasknest-app` (main branch), Supabase project (read-only), Stripe test mode, live site.
**Delivered:** within 48 hours of access.

### Summary

TaskNest works well for a single user, but **any visitor can read every team's tasks and every user's email address**, and **the paid plan can be unlocked without paying**. Both are quick to fix. We recommend fixing the 2 critical and 3 high issues before launching the paid plan.

| Severity | Count |
|---|---|
| Critical | 2 |
| High | 3 |
| Medium | 3 |
| Low | 2 |

**Ship-ready score: 31/100.** Target after the fix sprint: 90+.

### Critical findings

#### C1. `tasks` and `profiles` tables are readable by anyone

- **Evidence:** RLS is disabled on `tasks`. On `profiles`, the policy `Enable read access for all users` uses `using (true)`. With only the public anon key, an anonymous request returns all 4,812 tasks and 340 profiles, including email addresses.
- **Impact:** every customer's data is public. This is a reportable data exposure in many jurisdictions.
- **Fix:** enable RLS on all 9 public tables. Replace the open policies with `auth.uid() = user_id` for profiles and team-membership checks for tasks. Add a migration with a rollback script and tests that confirm a second user can't read the first user's data.
- **Effort:** S (half a day including tests)

#### C2. Paid plan is activated on the Stripe success page

- **Evidence:** `src/pages/Success.tsx` sets `profiles.plan = 'pro'` when the page loads. Anyone can open `/success` without paying.
- **Impact:** free access to the paid plan. Revenue loss and unreliable plan data.
- **Fix:** move plan changes to a Supabase Edge Function that handles `checkout.session.completed` and `customer.subscription.*` webhooks, verifies the Stripe signature, and is idempotent on event ID. The success page only shows status.
- **Effort:** M (1 day)

### High findings

#### H1. Admin dashboard is protected only in the UI

`/admin` is hidden from the menu, but the queries behind it run with the user's own session and the policies allow them. Any signed-in user can call them directly. **Fix:** an `is_admin()` check enforced in policies and Edge Functions. **Effort:** S

#### H2. OpenAI key exposed through a `VITE_` environment variable

`VITE_OPENAI_API_KEY` is compiled into the public JavaScript bundle. **Fix:** rotate the key, set a spend limit, and proxy AI calls through an Edge Function with per-user rate limits. **Effort:** S

#### H3. Avatar storage bucket is public and writable by any signed-in user

Any user can overwrite another user's avatar file. **Fix:** storage policies scoped to the `user_id/` folder prefix. **Effort:** S

### Medium and low findings

- **M1.** Source maps are published in production (`build.sourcemap: true`). **Fix:** turn them off or upload privately to Sentry.
- **M2.** No rate limit on the invite-teammate endpoint, so the app can be used to send spam. **Fix:** per-user limits.
- **M3.** Email confirmation is off, so people can sign up with addresses they don't own. **Fix:** turn on confirmation and update the onboarding copy.
- **L1.** Security headers missing (CSP, frame-ancestors, Referrer-Policy). **Fix:** add `vercel.json` headers.
- **L2.** No error monitoring. **Fix:** Sentry on front end and Edge Functions.

### Fix plan and fixed quote

| Option | Covers | Price | Time |
|---|---|---|---|
| **Fix & Ship 10 (recommended)** | C1, C2, H1, H2, H3, M1, M2, M3, L1, L2 + production deploy + tests | **$2,500** ($399 diagnosis credited: **$2,101** due) | 7 days |
| Fix & Ship 5 | C1, C2, H1, H2, H3 | $1,500 ($1,101 after credit) | 5 days |

### Manual checks completed

- [x] RLS and policies on all 9 public tables
- [x] Storage bucket policies
- [x] Auth settings: email confirmation, redirect URLs, session length
- [x] Stripe: checkout, webhook signature verification, test vs live keys
- [x] Environment variables in Vercel (production vs preview scopes)
- [x] Backups enabled (Supabase daily backups on the Pro plan)

*Example report for a fictional app. Real reports reflect only what we find in your project.*
