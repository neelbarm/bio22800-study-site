# Diagnosis runbook (48-hour Ship-Ready Diagnosis)

**Promise:** human-reviewed audit of repo + Supabase, written report ranked by severity, Loom walkthrough, fixed-price fix quote, delivered within 48 hours of payment + access.
**Owner time budget:** under 3 hours (target 2h45m). The 48h window is for calendar slack, not for work.
**Rule:** review only. Do not change the client's code, data or settings during a diagnosis.

## Time budget

| Step | Target time |
|---|---|
| 0. Prep and access check | 10 min |
| 1. Automated repo audit | 15 min |
| 2. Free web scan on the live URL | 5 min |
| 3. Supabase manual checks | 45 min |
| 4. Stripe manual checks | 20 min |
| 5. Hosting env vars and deploy | 10 min |
| 6. Auth flow and cross-user test | 15 min |
| 7. Severity triage | 10 min |
| 8. Write report | 30 min |
| 9. Quote | 5 min |
| 10. Loom | 15 min |
| **Total** | **~2h55m** |

If you are past 3 hours, stop adding findings and ship what you have. Note "not reviewed" areas in the report.

## 0. Prep (10 min)

1. Confirm payment, SOW accepted, owner/authorization confirmed, backup confirmed (see `onboarding-checklist.md`).
2. Confirm access works: GitHub clone, Supabase dashboard, hosting dashboard, test accounts.
3. Record the commit SHA and the time you start in `clients/[slug]/notes.md`.
4. Copy `delivery-report-template.md` to `clients/[slug]/report/report.md`.

## 1. Automated repo audit (15 min)

From the root of this repository (where `toolkit/` lives):

```bash
node toolkit/bin/shipready-audit.mjs ../clients/[slug]/repo | tee ../clients/[slug]/findings/repo-audit.txt
```

Check the toolkit's README or `--help` for output-format options (for example JSON or Markdown) and use them if available.

Then review the output by hand:

- **Confirm every hit.** Open each flagged file. Mark false positives (e.g. a Stripe publishable key, a Supabase anon key or a Supabase `sb_publishable_` key is expected in the client; a test fixture is not a leak).
- **Check git history for secrets** the current tree no longer contains:
  ```bash
  # Key values: any JWT (Supabase legacy keys), Supabase secret keys, Stripe live secret and restricted keys, Stripe webhook secrets
  git -C ../clients/[slug]/repo log -p --all -G 'eyJ[A-Za-z0-9_-]{10,}\.|sb_secret_|sk_live_|rk_live_|whsec_' | head -200
  # Variable names, any case (SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SECRET_KEY, STRIPE_SECRET_KEY)
  git -C ../clients/[slug]/repo log -p --all -i -G 'service_role|supabase_secret_key|stripe_secret' | head -100
  ```
  Searching for the word `service_role` alone does not find the key itself, because inside a JWT the role is base64-encoded. Decode the middle part of every `eyJ...` hit locally, never on a website: `node -e "console.log(Buffer.from(process.argv[1],'base64url').toString())" '<middle part>'`. `"role":"anon"` is expected; `"role":"service_role"` is Critical. Any real secret ever committed counts as exposed: it needs rotation even if deleted later.
- Note the dependency audit result (`npm audit --omit=dev` or the toolkit's equivalent) for high/critical advisories only.

## 2. Free web scan on the live URL (5 min)

Run the ShipReady free scan from the website ([SITE URL]) against the client's live URL (client already attested ownership in the SOW). Save a screenshot of the browser result to `findings/web-scan`. It covers: secrets in JS bundles, Supabase service-role key in the client, tables readable by anonymous users, exposed `.env` / source maps, missing security headers.

Cross-check its results against the repo audit. Anything the scan flags on the live site is stronger evidence than the repo alone, because it is what attackers see.

## 3. Supabase manual checks (45 min)

Use the dashboard and the SQL editor. **Read-only queries only.** If you don't have dashboard access, send these queries for the client to run and paste the results.

### 3.1 RLS on every table

```sql
-- Tables in exposed schemas and whether RLS is on
select n.nspname as schema, c.relname as table, c.relrowsecurity as rls_enabled, c.relforcerowsecurity as rls_forced
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where c.relkind = 'r' and n.nspname in ('public')  -- add any other schemas exposed in API settings
order by rls_enabled, c.relname;
```

- Any table with `rls_enabled = false` in an exposed schema is readable and writable through the API with the anon key: **Critical** if it holds user data, **High** otherwise.
- RLS enabled with **no policies** means nobody can access through the API (safe, but may be why "the app is broken").

### 3.2 Policies

```sql
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
order by tablename, cmd;
```

Look for:
- `qual = 'true'` (or no condition) for `anon` or `public` roles on tables with user data: anyone can read. **Critical/High.**
- Policies granted to `authenticated` with `true`: any logged-in user can read every row (classic AI-builder bug). **High** if personal or tenant data.
- Owner checks that use `auth.uid()` correctly, e.g. `user_id = auth.uid()` or `(select auth.uid()) = user_id`. Missing owner checks on SELECT/UPDATE/DELETE: **High**.
- INSERT/UPDATE policies without `with_check`: users can write rows owned by someone else, or change `user_id` / `role` / `is_admin` columns. **High.**
- Role or admin checks based on `auth.jwt() -> 'user_metadata'` (user-editable): **High**. Should use `app_metadata` or a roles table.
- Multi-tenant apps: every tenant table filters by an org membership check, not just "logged in".

### 3.3 Views, functions and the API surface

```sql
-- Views in public (views bypass RLS unless security_invoker is set, on Postgres 15+)
select table_name from information_schema.views where table_schema = 'public';

-- SECURITY DEFINER functions callable through the API
select p.proname, p.prosecdef as security_definer
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.prosecdef;
```

- Views exposing user tables without `security_invoker = true`: **High**.
- `SECURITY DEFINER` functions in `public` that read/write user data without checking `auth.uid()`: **High**.

### 3.4 Storage buckets and policies

```sql
select id, name, public from storage.buckets;
select policyname, roles, cmd, qual, with_check from pg_policies where schemaname = 'storage' and tablename = 'objects';
```

- Public bucket containing private files (IDs, invoices, user uploads): **Critical/High**.
- Upload policies that let any authenticated user write anywhere (no folder = `auth.uid()` check): **Medium/High**.

### 3.5 Auth settings (Dashboard > Authentication)

- **Email confirmation** enabled for email sign-ups (if off, anyone can sign up as any email): Medium, High if email implies access (e.g. company domain gating).
- **Site URL and redirect URLs**: no wildcards to domains the client doesn't own; no leftover `localhost` in production unless intended. Open redirect allowlist: Medium.
- Auth rate limits at sensible values; CAPTCHA on sign-up if the app has been spammed.
- Leaked password protection and minimum password length (plan-dependent).
- OAuth providers configured only for ones in use.
- Edge Functions: JWT verification on for functions that should require login.

### 3.6 Supabase advisors

Open **Advisors > Security Advisor** and **Performance Advisor**. Copy every error/warning into findings with your severity (advisor levels are a starting point, not the final rating).

## 4. Stripe manual checks (20 min)

In the repo and Stripe dashboard (view-only or screenshots):

- **Webhook signature verification:** the handler uses `stripe.webhooks.constructEvent` (or equivalent) with the **raw** request body and the endpoint's signing secret. No verification: **Critical** (anyone can fake "payment succeeded").
- **Idempotency:** the handler records processed `event.id`s (or uses an upsert keyed on the Stripe object ID), so duplicate deliveries don't double-grant credits or orders. Server-side create calls that can be retried use idempotency keys. Missing: **High** if it grants value, else Medium.
- **Fulfilment from webhook, not redirect:** access is granted on `checkout.session.completed` / `invoice.paid`, not on landing on `/success`. Redirect-based fulfilment: **High**.
- **Server-side prices:** amount/price ID is chosen on the server, not trusted from the client. Client-set price: **Critical**.
- **Test vs live mode:** production uses live keys and a live webhook endpoint; preview/staging use test keys. Live secret key in a preview environment or the repo: **Critical**. `sk_` key anywhere in the front end: **Critical**.
- Subscription state (cancelled, past_due) actually removes access.
- Customer portal configured if subscriptions exist (Low/Medium if missing).

## 5. Hosting env vars and deploy (10 min)

Vercel (Project > Settings > Environment Variables) or Netlify (Site configuration > Environment variables):

- Secrets must not be prefixed with `NEXT_PUBLIC_` or `VITE_` (those are bundled into the browser). Service-role key or `sk_live_` with a public prefix: **Critical**.
- Production and Preview have separate values where it matters (live vs test Stripe keys, production vs staging Supabase).
- Preview deployments protected (Vercel Deployment Protection) if they point at production data: Medium.
- Production source maps not publicly served (or intentionally uploaded to Sentry only): Low/Medium.
- Build is green, production branch is correct, no manual "hotfix" deploys out of sync with git.
- Security headers present (from the web scan): missing CSP is usually Low/Medium; missing HSTS on a custom domain Low.
- Error monitoring (Sentry or similar) present? Missing: Medium for apps with paying users.

## 6. Auth flow and cross-user test (15 min)

With test User A and User B on staging (or live, with the client's permission, read-only actions only):

1. Log in as A, note the IDs of A's records (network tab).
2. Log in as B, try to fetch A's records by ID through the app and directly through the Supabase REST endpoint using B's session. Any success: **Critical**.
3. Try a role escalation the UI hides (e.g. updating your own `role` column). Success: **Critical**.
4. Check password reset, magic link and OAuth redirect go only to the client's domains.
5. Check that logged-out users can't reach protected pages' data (not just the page shell).

Stop at proof. One request that shows the issue is enough evidence; never pull bulk data.

## 7. Severity rubric

| Severity | Definition | Examples | Fix timing |
|---|---|---|---|
| **Critical** | Exploitable now by anyone on the internet with no special access, leading to exposure of user data, money, or full account/admin takeover. | RLS off on `profiles`; service-role key in the JS bundle; unverified Stripe webhook; client-set prices; User B can read User A's data. | Before more users or traffic. Rotate exposed keys today. |
| **High** | Exploitable by a logged-in user or with modest effort, or exposure of sensitive data under realistic conditions. | `authenticated` can read all rows; missing `with_check`; admin check on `user_metadata`; public bucket with uploads; fulfilment on success redirect; live secret in a preview env. | Within the fix sprint (first PRs). |
| **Medium** | Weakens defenses or reliability; needs another failure to cause harm, or harm is limited. | No email confirmation; no rate limits on auth or AI endpoints; no idempotency where value is low; no error monitoring; open redirect allowlist; preview deploys unprotected. | In the sprint if capacity allows; otherwise retainer. |
| **Low** | Best practice and hygiene; low likelihood or low impact. | Missing CSP/HSTS; public source maps; outdated non-vulnerable dependencies; noisy console errors; minor performance issues. | Backlog or retainer. |

Rate on **likelihood x impact for this app**, not generic scary-ness. Note your confidence when a finding is unconfirmed ("likely, needs confirmation on staging").

"Material" for the refund promise: at least one Critical or High (same definition as the SOW, the FAQ, the Upwork listing and the Loom script). If nothing material is found, say so plainly and refund the fee within 7 days of delivery, per the SOW, without waiting to be asked.

## 8. Write the report (30 min)

Fill `clients/[slug]/report/report.md` from `delivery-report-template.md`:

- Executive summary in plain English for a non-technical founder (5 lines max).
- Readiness score (formula in the template).
- Findings table sorted by severity, then each finding with evidence (redacted: never paste full secrets or real user data), impact, fix, effort (S = under 1h, M = 1-3h, L = 3-8h, XL = more than a day).
- "Not reviewed" section listing anything out of scope or not accessible.
- Export to PDF; keep the Markdown.

## 9. Write the fixed-price quote (5 min)

Map findings to sprint tiers. Count each finding the client should fix as one "issue"; group trivially related ones (e.g. RLS on 4 similar tables = 1 issue if it's one migration pattern; 3 if they need different policies).

| Situation | Recommend | Price |
|---|---|---|
| Up to 5 issues (all Criticals + Highs fit) | **Fix & Ship 5** | $1,500 |
| 6-10 issues, or the client needs us to do the production deploy | **Fix & Ship 10** | $2,500 |
| Any of: Stripe checkout/webhooks need building or rebuilding, auth needs rebuilding, or multi-tenant isolation is missing | **Rebuild-grade** | $4,000 |
| More than 10 issues, or a non-Supabase backend (Replit-native, Base44-native) | Phase it (Fix & Ship 10 now for Criticals/Highs, retainer for the rest) or quote a migration separately | custom |
| Integrations requested (CRM, Slack, email, n8n) | Add Wire-It-Up | $1,000-$3,000 |

Always:
- Put every Critical and High in the recommended tier. If they don't fit, recommend the next tier up.
- Subtract the diagnosis fee credit ($199 or $399) and state the net price.
- Offer the retainer as the follow-on for Mediums/Lows and for re-prompt protection.
- Pre-fill `../legal/sow-fix-sprint.md` with the issue list and acceptance criteria so the client can say yes in one reply.

## 10. Loom walkthrough (15 min, video 8-12 min)

Script:
1. (30s) Hi, who you are, what you reviewed, the score.
2. (1 min) The one-sentence verdict: "You can / can't safely take more users today, because...".
3. (5-7 min) Walk through each Critical and High: show the evidence (redacted), explain the real-world impact in plain words, say how it gets fixed.
4. (1 min) Quick mention of Mediums/Lows.
5. (1 min) The fix plan and price, what the client needs to do today (e.g. rotate a key), and the next step.

Do not show unredacted secrets, real user data, or other clients' screens. Set the Loom to "anyone with the link" only if the client agrees; otherwise restrict to their email.

## 11. Deliver

1. Email (or platform message) with: report PDF, Loom link, quote with Payment Link for the sprint deposit, pre-filled SOW.
2. If any Critical involves an exposed key: put "Rotate [KEY] today" at the top of the email with the rotation steps.
3. Log delivery time and actual hours in `metrics-tracker.md`.
4. Follow up in 2 business days if no reply, then at 7 days. Then stop.
5. If they don't buy the sprint within 7 days: remove your access and confirm in writing.
