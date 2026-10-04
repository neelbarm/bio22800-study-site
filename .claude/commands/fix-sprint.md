---
description: Fix & Ship Sprint. Fix the agreed issues one branch and one PR at a time, test-first, with reversible migrations and handover notes.
argument-hint: "[issue numbers or 'all'] [path to diagnosis report]"
---

# Fix & Ship Sprint

You are delivering a ShipReady **Fix & Ship Sprint** in the client repository in the current working
directory. Scope comes from the accepted diagnosis report and quote. Only fix the agreed issues.

Owner input: **$ARGUMENTS**

`STUDIO` = `$SHIPREADY_HOME` or `~/bio22800-study-site` (toolkit, templates, business docs).

## Before the first commit

1. **Read the scope.** Open the accepted diagnosis report (path in the arguments, or
   `$STUDIO/../shipready-audits/<repo>-*/diagnosis-report.md`). List the in-scope issues with their
   numbers. Anything else you find goes on a "found during sprint" list for a change order
   ($150/hr or a fixed quote). **Don't fix it.**
2. **Guardrails.** Make sure the repo has our `CLAUDE.md` guardrails (copy
   `$STUDIO/toolkit/CLIENT-REPO-CLAUDE.md` if missing; it lands in its own small PR). Check env var
   **names** only:
   `env | cut -d= -f1 | grep -iE 'service_role|sk_live|stripe_secret'` and `cut -d= -f1 .env* 2>/dev/null`.
   **Never use production service-role keys or live Stripe keys.** Work against local Supabase
   (`supabase start`) or the client's staging project, and Stripe test mode. If a production secret is
   present, stop and tell the owner.
3. **Baseline.** On the default branch: install with the lockfile, run the build, tests, lint and
   type-check, and save the audit baseline:
   `node "$STUDIO/toolkit/bin/shipready-audit.mjs" . --out "$STUDIO/../shipready-audits/$(basename $PWD)-sprint-baseline"`.
4. **Key rotation first.** If keys were exposed, confirm the client has rotated them (they own the
   accounts; give them exact dashboard steps). Rewriting git history to purge secrets happens only
   with the client's written consent, after rotation, and as its own step.

## Per issue (repeat; one at a time)

1. **Branch** from the latest default branch: `git checkout -b fix/<nn>-<short-slug>`
   (e.g. `fix/02-orders-rls`, `fix/05-webhook-signature`).
2. **Test first.** Write a test that fails because of the issue and commit it on the branch:
   - RLS: a test (pgTAP via `supabase test db`, or a node/vitest script against local Supabase) where
     an anonymous user and a second user try to select / insert / update / delete another user's rows
     and must be denied, and the owner must still succeed.
   - Webhook: a request with a bad or missing signature returns 400; a valid test-mode event is
     fulfilled exactly once even when delivered twice.
   - Client secret exposure: a build-output check that greps `dist/` or `.next/static` for the key
     prefix or env var name and fails if found.
   - Auth: a server route or function returns 401/403 without a valid user JWT or without the admin role.
3. **Fix** with the smallest change that makes the test pass and keeps behavior the client relies on.
   Follow the fix text from the report. Move secrets to server-side env vars and calls into Edge
   Functions / route handlers.
4. **Migrations with rollback.** Every schema or policy change is a new file
   `supabase/migrations/<timestamp>_<slug>.sql` (never edit applied migrations), paired with
   `supabase/rollbacks/<timestamp>_<slug>.down.sql` that restores the previous state. Verify both
   locally: `supabase db reset` (up), apply the rollback and re-run the tests (down), then reset again.
   Use `drop policy if exists` / `create policy` so migrations are re-runnable. Never run
   `supabase db push` against production yourself.
5. **Verify.** Build, tests, lint and type-check pass. Re-run the audit and confirm the finding is
   gone and nothing new appeared. Click through the affected flow locally.
6. **PR:** one issue per PR, small diff. Title: `Fix #<nn>: <plain-English title>`. Body:
   - Problem (plain English) and evidence (`file:line`, masked values only)
   - What changed and why
   - Tests added (and that they failed before the fix)
   - Migration + rollback files and how to apply them
   - How to verify on the Vercel/Netlify **preview deployment** (exact steps)
   - Client actions needed (dashboard settings, env vars to add per environment, keys to rotate)
   - Builder note: whether a builder re-prompt could overwrite this fix, and what to watch for
   Push the branch, open the PR, and wait for the preview deploy to go green before moving on.
7. Back to the default branch, and on to the next issue. Don't stack unrelated changes.

## Sprint-wide items (when in scope)

- **Production deploy** ($2,500 tier and up): env vars set per environment (Production / Preview /
  Development) by the client, security headers, source maps off, Sentry wired with PII scrubbing,
  rate limits on auth, AI and email endpoints, Stripe live webhook endpoint configured by the client.
  Production migrations applied with the client on a call, rollback ready.
- **Payments / auth rebuild / multi-tenant** ($4,000 tier): design note first (a short markdown file
  in the PR), then the same branch → test → PR loop, split into reviewable PRs.

## Handover (last day)

Write `HANDOVER.md` in the repo (its own PR) or as a separate doc for the client, using
`$STUDIO/business/ops/delivery-report-template.md` if it has a handover section:

- Each issue: PR link, what changed, how it was tested, rollback location.
- Before/after audit summary (score and counts by severity) and the manual checks done.
- Environment variables (names and where they live; never values), Supabase and Stripe dashboard
  settings changed, secrets the client rotated.
- How to run the app and tests locally, and the tests that guard each fix.
- **Builder warning:** which files and fixes a builder re-prompt can overwrite and how to check (re-run
  the audit; the tests will fail). Re-fixes are covered by the Maintain & Extend retainer.
- Found-during-sprint list with suggested change-order prices, and a retainer offer.
- Access removal checklist: remove our collaborator access from GitHub, Supabase, Vercel/Netlify and
  Stripe, and delete local copies of any staging credentials.

Finish by reporting to the owner: PRs opened (links), tests added, migrations, before/after score,
anything blocked on the client, and the change-order list.
