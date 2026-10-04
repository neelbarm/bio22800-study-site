# CLAUDE.md: ShipReady engagement guardrails

<!--
Drop this file into the root of a client repo at the start of an engagement (or append it to their
existing CLAUDE.md). Fill in the bracketed fields. Remove it at handover unless the client wants to
keep it. It is written for Claude Code; humans should follow it too.
-->

This repository belongs to **[CLIENT NAME]**. ShipReady is working in it under a fixed-scope
engagement: **[Diagnosis | Fix & Ship Sprint | Retainer]**, scope **[link to the agreed issue list]**.
The client owns every account. We have collaborator access, and it is removed at handover.

## Environments: staging only

- Work against **local Supabase** (`supabase start`) or the **staging** project **[staging project ref]**.
  Never point the app, scripts, tests or the Supabase CLI at the production project
  **[production project ref]**.
- Never run `supabase db push`, `supabase db reset --linked`, `supabase migration repair` or any SQL
  against a remote project without the owner's explicit go-ahead for that specific command. Production
  migrations are applied by the client, or by us on a call with the client, after the PR is approved.
- Stripe: **test mode only** (`sk_test_` / `pk_test_` keys, Stripe CLI `stripe listen` for webhooks).
  Never create, refund or modify anything in live mode.
- Deploys go to **Vercel/Netlify preview deployments**. Production deploys happen only after merge and
  with the client's approval.

## Secrets: never in prompts, never in git

- **Never read, print or paste secret values.** Don't `cat .env*`, `printenv`, or echo variables. When
  you need to know what's configured, list names only (`cut -d= -f1 .env.local`,
  `env | cut -d= -f1`).
- **Production service-role keys must never be in this environment**: not in `.env`, the shell,
  MCP configs or prompts. If you see one, stop and tell the owner so the client can rotate it.
- Never hard-code keys. Server secrets go in server-side env vars (Supabase Edge Function secrets,
  Vercel/Netlify env settings, scoped per environment). Browser code gets only public values: the
  Supabase URL, the anon/publishable key and the Stripe publishable key.
- Never send customer data (rows, emails, uploads, logs with PII) to an AI tool or into a report. Use
  counts and schema, not contents.
- Reports and audit output (`shipready-audit/`) stay out of git. Keep them outside the repo or
  git-ignored.

## How we change code

- **One issue per branch, one PR per issue.** Branch names: `fix/<nn>-<short-slug>`
  (e.g. `fix/03-orders-rls`). Keep PRs small and focused. No drive-by refactors, formatting sweeps or
  dependency upgrades outside the agreed scope.
- **Test first.** Write a failing test that shows the problem (an RLS test that an anonymous or second
  user can't read a row, a webhook test that rejects a bad signature, and so on), then fix it, then
  watch the test pass. Every PR adds or updates tests.
- **Migrations come with a rollback.** Each `supabase/migrations/<timestamp>_<name>.sql` has a matching
  rollback script (`supabase/rollbacks/<timestamp>_<name>.down.sql`) or a rollback section in the PR,
  and has been checked with `supabase db reset` locally.
- Run the build, type-check, lint and tests before opening a PR. Paste the results (not secrets) into
  the PR description.
- PR description: problem, evidence (file:line, masked), fix, tests, rollback, how to verify on the
  preview deploy, and anything the client must do (e.g. rotate a key, change a dashboard setting).
- Respect builder-managed files (for example Lovable's `src/integrations/supabase/types.ts`, Bolt/v0
  scaffolding). Regenerate them with the builder's own tooling instead of hand-editing. Note in the
  PR which fixes a future builder re-prompt could overwrite.

## Scope

- If you find something outside the agreed scope, **write it down; don't fix it**. Add it to the
  findings list for the owner to quote as a change order ($150/hr or a fixed quote).
- Never describe the result as "secure" or "guaranteed". We document the issues we found and deliver
  and test the fixes we agreed.

## Useful commands

```bash
# audit (from the ShipReady studio repo; writes reports outside this repo)
node [path-to-studio]/toolkit/bin/shipready-audit.mjs . --out ../shipready-audits/[client]

supabase start                 # local stack
supabase db reset              # re-apply all migrations locally
supabase test db               # pgTAP tests, if present
stripe listen --forward-to localhost:3000/api/stripe/webhook   # test-mode webhooks
```
