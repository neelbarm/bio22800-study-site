---
description: Ship-Ready Diagnosis. Run the audit CLI on this repo, do the manual review, and draft the client report with a fixed-price quote.
argument-hint: "[client name] [notes: deadline, live users, Stripe live?]"
---

# Ship-Ready Diagnosis

You are doing a ShipReady **Ship-Ready Diagnosis** ($399, 48 hours) of the repository in the current
working directory: an app built with an AI app builder (Lovable, Bolt, Base44, v0, Cursor) on
React/Vite or Next.js + Supabase + Stripe + Vercel/Netlify.

Client and context from the owner: **$ARGUMENTS**

The deliverable is a written report ranked by severity, a Loom walkthrough outline, and a fixed-price
fix quote. The fee is credited toward the sprint, and it's refunded if nothing material is found. Never
promise "secure" or "guaranteed". The promise is: issues found are documented, and the agreed fixes
are delivered and tested.

**Paths.** The ShipReady studio repo (toolkit + business docs) is at `$SHIPREADY_HOME` if set,
otherwise `~/bio22800-study-site`. Call it `STUDIO` below. Install these commands user-wide with
`cp $STUDIO/.claude/commands/*.md ~/.claude/commands/` so they work inside client repos.

## 0. Guardrails (do these first; stop if any fails)

1. Confirm with the owner that this is a staging copy or that the client has authorized the review,
   and that you have repo access only (no production database credentials).
2. Check the environment for production secrets **by name only**. Never print values:
   `env | cut -d= -f1 | grep -iE 'service_role|stripe_secret|sk_live|database_url|openai|anthropic'`
   and `ls -a | grep -E '^\.env'`. If a production service-role key is present in the shell or an env
   file you'd load, stop and tell the owner.
3. If the repo has no `CLAUDE.md` from us, suggest adding `$STUDIO/toolkit/CLIENT-REPO-CLAUDE.md`.
   Don't commit anything to the client repo during a diagnosis.
4. Never put secret values, customer rows, emails or uploads into notes, prompts or the report.
   Evidence is `file:line` plus masked values only.

## 1. Run the automated audit

```bash
REPO_NAME=$(basename "$PWD"); OUT="$STUDIO/../shipready-audits/$REPO_NAME-$(date +%F)"
node "$STUDIO/toolkit/bin/shipready-audit.mjs" . --out "$OUT"
```

Read `$OUT/shipready-report.json`. Treat every finding as a **lead to verify**, not a conclusion:
open the file, confirm or dismiss it, and record false positives with a one-line reason.

## 2. Map the app (15-30 min)

Write a short internal map (keep it in `$OUT/notes.md`, not in the client repo):

- Builder of origin and how it's still used (Lovable `src/integrations/supabase/`, `lovable-tagger`;
  Bolt `.bolt/`; v0 `components/ui` + Next.js; Base44 `@base44/sdk`). Ask whether the client still
  re-prompts the builder, since re-prompts can overwrite fixes.
- Framework, routing, and the list of pages/routes. Which ones need a logged-in user, which need admin.
- Every place a Supabase client is created and with which key (anon vs service role).
- Server code: Supabase Edge Functions, Next.js route handlers / server actions, Vercel/Netlify
  functions. For each one: who calls it, what it touches, how it authenticates the caller.
- Data model: tables, ownership column (`user_id`, `owner_id`, `org_id`), which tables are private.
  Note any multi-tenant model (orgs/teams/workspaces).
- Env var **names** used (client vs server), third-party APIs (AI, email, SMS), and hosting config.

## 3. Auth flows

Trace sign-up, login, logout, password reset, magic link / OAuth callbacks, and session refresh.

- Is email confirmation on? Are redirect URLs restricted (no open redirects, no wildcard allow-list)?
- On the server, is identity taken from `auth.getUser()` / verified JWT (good), or from
  `getSession()`, request bodies or query params (bad)?
- Are protected pages enforced on the server / by RLS, or only hidden in React? Same for admin:
  where do roles live, and who can write them (a user must never be able to update their own role or
  plan)?
- Rate limiting on auth, AI and email endpoints.

## 4. Supabase RLS reasoning

1. Get the real policies. If `supabase/migrations` is missing or may have drifted, ask the client to
   run the read-only "Supabase export queries" from the report appendix in their SQL editor and send
   the results (or give you read-only dashboard access to staging).
2. For **each table** write one line: who should read, insert, update and delete, and what the
   policies actually allow. Flag tables with RLS off, `using (true)` on private data, write policies
   for `anon` / `public`, `update` policies without `with check`, policies that trust user-editable
   columns (`role`, `is_admin`, `plan`), and views without `security_invoker`.
3. RPC / functions: `security definer` without `set search_path`, functions executable by `anon`
   that bypass RLS.
4. Storage: public buckets, and `storage.objects` policies (path scoped to `auth.uid()`?
   list/overwrite/delete rules?).
5. If authorized and on **staging only**: verify with the anon key (e.g.
   `curl "$URL/rest/v1/<table>?select=id&limit=1" -H "apikey: $ANON"`) and record **only whether
   rows came back and a count**, never the row contents. Repeat as a second ordinary test user.

## 5. Stripe flow tracing

Follow the money from the pricing page to fulfillment:

- Checkout / PaymentIntent created on the server? Price and amount taken from server-side config,
  not from the request body (no amount tampering)?
- Success page: does it only read status, or does it write `paid` / `plan` / `credits` (bad)?
- Webhook: signature verified with the raw body (`constructEvent` / `constructEventAsync`), events
  handled, idempotency on `event.id`, fulfillment and subscription sync (created/updated/deleted,
  `invoice.payment_failed`), error responses so Stripe retries.
- Customer portal, refunds and cancellations reflected in the DB. Test vs live keys per environment.
  Ask the client to confirm the webhook endpoint URL and events in the Stripe dashboard.

## 6. Run the app and the build

```bash
npm ci || npm install        # note if there's no lockfile
npm run build                # record errors and warnings
npm test --if-present; npm run lint --if-present; npx tsc --noEmit 2>/dev/null | tail -20
npm run dev                  # click through sign-up, login, main flow, checkout (Stripe test mode)
```

After the build, check the bundle for leaked secrets, **printing file names only**:
`grep -rlE 'sk_live_|sk_test_|service_role|whsec_|sk-proj-|sk-ant-' dist .next/static 2>/dev/null`.
Note console errors, broken flows, missing error handling, and obvious performance problems (huge
bundles, N+1 queries, missing indexes on foreign keys).

## 7. Triage

Build the final findings list:

- Automated findings you confirmed, plus manual findings from steps 2-6.
- For each: **severity** (critical / high / medium / low), **title** in plain English, **evidence**
  (`file:line`, masked values, or "anon REST request returned rows: yes, count N"), **why it matters**
  (business impact, no jargon), **fix**, and **effort** (S under 2h / M half a day to a day / L more
  than a day).
- Merge duplicates into issues. Count the issues for the quote.

## 8. Draft the client report

Use the template at **`$STUDIO/business/ops/delivery-report-template.md`**. If it doesn't exist
yet, use the structure of `$OUT/shipready-report.md`. Write it to `$OUT/diagnosis-report.md`:

1. Summary: what the app is, overall readiness, the top 3 risks in one sentence each, and the
   ship-ready score (explain that it's a heuristic).
2. Findings ranked by severity, each with severity, evidence, why it matters, fix and effort.
3. What we checked and what we couldn't check (dashboard items the client must confirm).
4. **Fixed-price quote** using the sprint tiers:
   - up to 5 issues: **$1,500**
   - up to 10 issues + production deploy: **$2,500**
   - adds payments rework, auth rebuild or multi-tenant: **$4,000**

   List exactly which issues are in scope, delivery in 5-10 days, the diagnosis fee credited, change
   orders at $150/hr or a fixed quote, and a note that builder re-prompts can overwrite fixes (re-fixes
   are covered by the retainer). If nothing material was found, say so and apply the refund policy.
5. Next steps: accept the quote, grant staging access, and the client rotates any exposed keys
   **now** (give them exact steps; rotation is never deferred to the sprint).

Also write `$OUT/loom-outline.md`: 5-8 bullet talking points for a 5-minute walkthrough
(show, don't read).

## 9. Hand back to the owner

Reply with: the paths of the report, notes and Loom outline; the count by severity; the recommended
tier and price with a one-line rationale; false positives dismissed; and anything the client must
confirm in a dashboard. Don't send anything to the client yourself.
