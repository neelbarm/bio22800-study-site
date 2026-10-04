# Fix & Ship Sprint runbook

**Promise:** fixes from the diagnosis plan on branches with tests, one PR per issue, preview deploys, RLS migrations, secrets moved to env vars, Sentry, rate limits, handover doc. Delivery in 5-10 business days.
**Rule:** staging first, client approval before anything touches production, no service-role keys in an AI agent's environment.

## 0. Before day 1

- [ ] 50% deposit paid; sprint SOW accepted with the issue list and acceptance criteria.
- [ ] Access per `onboarding-checklist.md`: GitHub Write on a fork/branch, Supabase staging (and production plan for deploy tiers), hosting, Stripe test mode, Sentry org owned by the client.
- [ ] Client confirmed a fresh production backup (Dashboard > Database > Backups, or a `pg_dump` they hold).
- [ ] Ask the client to pause builder re-prompts on the affected areas until handover.
- [ ] Rotate exposed keys first if the diagnosis found any Critical key leak (Section 5). Do not wait for the PRs.

## 1. Branch per issue

- Base branch: `shipready/sprint` off the client's `main` (or their chosen base).
- One branch per issue, named after the report ID: `fix/F-01-rls-profiles`, `fix/F-02-stripe-webhook-sig`.
- One PR per issue into `shipready/sprint` (or straight to `main` if the client prefers), titled `[F-01] Enable RLS and owner policies on profiles`.
- PR description template:

```markdown
## Issue
F-01 (Critical): RLS disabled on `profiles` (see report section 4.1)

## Change
- Migration `2026xxxx_enable_rls_profiles.sql` enables RLS and adds owner-only policies
- Rollback script `supabase/rollback/2026xxxx_enable_rls_profiles.down.sql`

## Acceptance criterion (from SOW)
Anonymous request returns no rows; user can read/update only their own row.

## How to verify
1. Open the preview: [LINK]
2. Run `npm run test:e2e -- profiles` (or see CI)
3. SQL test output: [paste]

## Risk and rollback
[What could break; how to roll back]
```

- Keep PRs small and readable. A non-technical founder should understand the "Issue" and "How to verify" sections.

## 2. Claude Code workflow

1. **Repo setup.** Add a `CLAUDE.md` in your working branch (remove before handover, or keep if the client wants it) with: stack summary, how to run dev/tests, "never read or print `.env*` files", "never run commands against production", "migrations go in `supabase/migrations` with a matching rollback", "one issue per branch".
2. **Environment.** The agent's environment has only: the repo, local Supabase (`supabase start`) or staging **anon** key, Stripe **test** keys. No service-role key, no live keys, no production database URL. Use the Supabase CLI logged in as you for migration pushes, run by you, not the agent.
3. **Per issue, one session:**
   - Start in plan mode: paste the finding (evidence, impact, recommended fix) and acceptance criterion; ask for a plan and the tests that prove it.
   - Review the plan. Push back on anything that changes unrelated files or weakens other checks.
   - Have it write the failing test first, then the fix.
   - Read every line of the diff yourself before committing. You are accountable for it, not the agent.
4. **Common prompts**
   - "List every table in `supabase/migrations` and the generated types, and for each say whether RLS is enabled and which policies exist."
   - "Write a migration that enables RLS on `X` with owner-only select/insert/update/delete using `(select auth.uid()) = user_id`, with `with check` on insert and update, plus a rollback script."
   - "Find every place a secret is read in client-side code and move it behind a server route or edge function."
5. **Never** let the agent force-push, rewrite history, change CI secrets, or deploy to production.

## 3. Tests

### Playwright smoke tests (required for every sprint)
Minimal suite in `tests/e2e/`, run locally and against each preview URL:
- Home page loads with no console errors.
- Sign up / log in / log out (test users on staging).
- The core user flow (create, view, edit the main object).
- **Cross-user isolation:** User B cannot see User A's record via the UI or a direct API call.
- Checkout in Stripe **test mode** reaches success and the webhook grants access exactly once (if payments in scope).

```bash
npx playwright test                                      # local
BASE_URL=https://[preview-url] npx playwright test       # against preview
```

### Unit and SQL tests
- Unit tests (Vitest or Jest, whichever the repo uses) for server logic touched: webhook handler (bad signature returns 400, duplicate event is a no-op), price selection, rate limiter.
- RLS tests: SQL scripts or pgTAP via `supabase test db` that assert anon gets 0 rows and users see only their rows. At minimum, a scripted check using the anon key and two user sessions.
- Add a CI workflow (GitHub Actions) running lint, unit and Playwright on PRs if none exists.

## 4. Supabase migrations for RLS (with rollback)

1. Pull the current schema from staging: `supabase db pull` (or `supabase db diff` if migrations already exist).
2. Create the migration: `supabase migration new enable_rls_profiles`.
3. Write the forward migration:
   ```sql
   alter table public.profiles enable row level security;

   create policy "profiles_select_own" on public.profiles
     for select to authenticated using ((select auth.uid()) = id);
   create policy "profiles_update_own" on public.profiles
     for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
   ```
4. Write the rollback in `supabase/rollback/<same-timestamp>_enable_rls_profiles.down.sql` (the Supabase CLI has no built-in down migrations):
   ```sql
   drop policy if exists "profiles_update_own" on public.profiles;
   drop policy if exists "profiles_select_own" on public.profiles;
   alter table public.profiles disable row level security;
   ```
   Note in the PR that rolling back re-opens the hole; it is for emergencies only.
5. Test locally (`supabase db reset` then tests), then apply to **staging** (`supabase link --project-ref [staging]` then `supabase db push`), then run Playwright against a preview pointing at staging.
6. **Check the app still works**: enabling RLS often breaks features that relied on open access. Fix the queries (or add a narrowly scoped policy), don't loosen the policy.
7. Production: only after client approval and a fresh backup. Apply in a quiet window, run smoke tests immediately, keep the rollback ready.
8. Storage: same pattern for `storage.objects` policies; make buckets private and use signed URLs where files are user-private.

## 5. Secret rotation

For each exposed secret (found in bundle, repo or history). Rotate with the client on a call or give them exact steps; they own the accounts.

1. **Inventory**: which key, where exposed, since when, what it can do.
2. **Create the new key** at the provider:
   - Supabase: Project Settings > API Keys. With the newer publishable/secret keys, create a new secret key and revoke the old one. With legacy JWT-based keys, rotating the JWT secret invalidates the anon and service-role keys and logs all users out; schedule it and warn the client.
   - Stripe: Developers > API keys > roll the secret key (choose an expiry for the old key, e.g. 1 hour); roll webhook signing secrets in Developers > Webhooks.
   - Other APIs (OpenAI, Resend, etc.): create new, revoke old.
3. **Update env vars** in Vercel/Netlify for Production and Preview (server-only names, no `NEXT_PUBLIC_`/`VITE_` prefix) and in Supabase Edge Function secrets if used.
4. **Move the code** so the secret is only read server-side (API route, server action, edge function).
5. **Redeploy**, verify the app works with the new key.
6. **Revoke the old key.** Check provider logs for use of the old key since exposure; tell the client if anything suspicious appears.
7. **Git history**: rotation is mandatory; history rewriting is optional and the client's decision (it disrupts other clones). Document either way.
8. Record each rotation (key name, date, who did it; never the value) in the handover doc.

## 6. Sentry

1. The client creates a Sentry org and project (free tier is fine) and invites you.
2. Install with the wizard: `npx @sentry/wizard@latest -i nextjs` (Next.js) or follow the React/Vite guide (`@sentry/react` + Vite plugin for source maps).
3. Put the DSN in env vars; the auth token for source-map upload is a server/build-only env var.
4. Upload source maps to Sentry; do not serve them publicly.
5. Scrub PII: leave `sendDefaultPii` off; add `beforeSend` filtering if the app handles sensitive data.
6. Trigger a test error on the preview; confirm it arrives. Set an alert rule to email the client (and you during a retainer).

## 7. Rate limiting

Targets: login/sign-up/password reset (Supabase Auth has built-in limits; review them), any API route that sends email/SMS, calls an AI model, or creates paid resources, and public form endpoints.

- Next.js on Vercel: Vercel Firewall rate-limit rules for simple path-based limits, or `@upstash/ratelimit` with Upstash Redis (client-owned account) in middleware/route handlers keyed by user ID or IP.
- Supabase Edge Functions: Upstash rate limiter keyed by user ID, or a simple Postgres counter table with RLS.
- Return 429 with a friendly message; add a unit test for the limiter.
- Document the limits chosen in the handover doc.

## 8. Deploy

1. Each PR gets a Vercel/Netlify preview; post the link in the PR. Preview env uses staging Supabase and Stripe test keys.
2. Client reviews previews against acceptance criteria (5 business days per the SOW).
3. **Sprint 5:** deliver merge-ready PRs; client merges and deploys (or buy production deploy as a change order).
4. **Sprint 10 / Sprint Plus:** after written go-ahead:
   - Confirm a fresh production backup.
   - Merge PRs in dependency order (migrations before code that relies on them).
   - Apply production migrations (`supabase link` to prod, `supabase db push`), run by you, from your machine, not by an agent.
   - Production deploy via merge to the production branch.
   - Run the Playwright smoke suite against production (read-only flows plus a test-mode checkout if a test path exists), check Sentry for new errors, run the free web scan again on the live URL.
   - If something breaks: Vercel Instant Rollback (or Netlify publish previous deploy) for code; rollback SQL for migrations only if necessary.
5. Post a deploy note to the client: what shipped, what was verified, what to watch.

## 9. Handover

Fill `handover-template.md` and send it with:
- PR list and status, test commands, env var names (never values), migration and rollback list, rotations done.
- "Don't re-prompt over these" list: files and areas a builder re-prompt can overwrite (RLS migrations, webhook handler, env handling).
- Access-removal checklist; remove your access the day the client confirms (or 7 days after acceptance).
- Retainer offer (Maintain $500 / Maintain Plus $1,000 / Priority $1,500), framed around re-prompt protection.

## 10. Acceptance

- Send the acceptance summary: each issue, its PR, preview/production link, test result, criterion met.
- Client has 5 business days per issue; silence, merge or production deploy counts as acceptance (per SOW).
- Fix any gap against the written criterion at no charge; anything new is a change order at $150/hr.
- On acceptance: send the final 50% invoice/Payment Link, log hours and revenue in `metrics-tracker.md`, ask for a testimonial and permission to write an anonymized case study.
- 14-day defect window starts at acceptance.

## Daily rhythm during a sprint

- One async update per working day: done, next, blocked-on-client.
- Target 1-2 issues per working session. Track actual hours per issue so pricing improves.
