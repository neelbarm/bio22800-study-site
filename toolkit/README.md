# shipready-audit

A dependency-free Node.js (>= 20, ESM) command-line audit for apps built with AI app builders
(Lovable, Bolt, Base44, v0, Cursor) on the ShipReady stack: **React/Vite or Next.js + Supabase +
Stripe + Vercel/Netlify**. It is the first pass of a Ship-Ready Diagnosis: it finds the usual
mistakes fast and drafts the report, and the human review finishes the job (see
`.claude/commands/diagnose.md`).

## Usage

```bash
node toolkit/bin/shipready-audit.mjs <path-to-repo> [--out <dir>] [--json] [--fail-on critical|high|medium|low]

# examples
node toolkit/bin/shipready-audit.mjs ../client-app
node toolkit/bin/shipready-audit.mjs ../client-app --out ./audits/client-app --fail-on high
node toolkit/bin/shipready-audit.mjs . --json > audit.json
```

| Option | Meaning |
|---|---|
| `--out <dir>` | Where to write the reports. Default: `<repo>/shipready-audit/` (add it to the client's `.gitignore` or use `--out` outside the repo). |
| `--json` | Print the full JSON report to stdout instead of the summary table. |
| `--fail-on <level>` | Exit with code 1 when any finding is at or above that severity (for CI). |

Exit codes: `0` ok, `1` the `--fail-on` threshold was met, `2` usage or runtime error.

Outputs (always all three):

- `shipready-report.md`: paste into the client report or a PR.
- `shipready-report.html`: self-contained, no scripts or external assets; light and dark (follows `prefers-color-scheme`); prints cleanly to PDF.
- `shipready-report.json`: everything, for tooling.

## What it checks

Each finding has: `id`, `severity` (critical / high / medium / low, plus `info` notes), `title`,
`file`, `line`, `evidence` (masked), `why` (plain English), `fix`, and `effort` (S under 2h, M half
a day to a day, L more than a day).

| # | Area | Checks |
|---|---|---|
| 1 | Secrets | Every regex in `shared/secret-patterns.json` (Stripe, OpenAI, Anthropic, AWS, GitHub, Resend, SendGrid, Slack, private keys, ...), one level more severe when the file ships to the browser. Generic high-entropy values assigned to names like SECRET / TOKEN / PRIVATE_KEY / PASSWORD (medium). |
| 2 | Env vars | `VITE_*`, `NEXT_PUBLIC_*`, `REACT_APP_*`, `EXPO_PUBLIC_*` whose names suggest secrets (SERVICE_ROLE, STRIPE_SECRET, OPENAI, ANTHROPIC, PRIVATE_KEY, paid API keys, ...): high or critical. `.env*` files in the repo (critical when they hold real-looking values; Supabase anon keys don't count), example env files with real values, and whether `.gitignore` excludes `.env` (Vite's default `*.local` does not). Reads `.git/index` directly (no git commands) to tell committed files from local ones. |
| 3 | Supabase | `service_role` referenced in client code (critical). Decodes every `eyJ...` JWT and flags payload `role = service_role` anywhere (critical). Parses all `.sql` files: public tables without `enable row level security` or with RLS disabled (high); policies with `using (true)` / `with check (true)` for writes, or for reads on private-looking tables such as users, profiles, orders, payments, messages, documents (high); write policies `to anon` (high); `security definer` functions without `set search_path` (medium); public storage buckets in SQL or `createBucket(..., { public: true })` (medium). No `supabase/migrations`: an info note plus read-only export SQL in the report appendix. |
| 4 | Stripe | Secret key, `STRIPE_SECRET*`, or the server `stripe` SDK in client code (critical). Webhook handlers without `constructEvent` / `constructEventAsync` (high); JSON body parsed before verification, or Next.js `pages/api` without `bodyParser: false` (medium); paid/plan/credits flags written from the client success page (high); no event-id idempotency (low). |
| 5 | Auth | Route handlers / Edge Functions that use the service role without `auth.getUser` / JWT verification (high). `auth.signUp` with no sign of email confirmation, or `enable_confirmations = false` (low). Hard-coded admin emails (high in client code, medium on the server) and `isAdmin` checks that exist only in the browser (high). |
| 6 | Dangerous code | `dangerouslySetInnerHTML` with non-literal, unsanitized content (medium; shadcn chart CSS and JSON-LD are skipped); `eval(` / `new Function(` (medium); CORS `*` on endpoints that use credentials or the service role, including shared Edge Function CORS headers (medium); `console.log` of tokens / sessions / passwords (low). |
| 7 | Deploy and hygiene | No security headers in vercel.json / next.config / netlify.toml / `_headers` / middleware (low); production source maps (`productionBrowserSourceMaps: true`, `build.sourcemap: true`, CRA default) (medium); no error monitoring dependency (low); no tests (low); package.json without a lockfile (low); `next` < 15, `react` < 18, `@supabase/supabase-js` < 2 by declared range (low). |

### Score

The ship-ready score starts at 100 and subtracts 25 per critical, 10 per high, 4 per medium and 1 per
low finding, with a floor of 0. Info notes don't count.

### Fix plan

Findings are grouped into sprint issues (all exposed credentials together as one issue, all low items
as one hygiene bundle, the rest by finding type) and mapped to the sprint tiers in
`business/BRIEF.md`:

- up to 5 issues -> **$1,500**
- up to 10 issues, or deploy configuration work -> **$2,500** (includes production deploy)
- payments rework (client-side fulfillment, Stripe secret in the client), server-side auth/roles
  rebuild (client-only admin checks), or more than 10 issues -> **$4,000**

The tier is a suggestion. The auditor confirms scope after the manual review. Multi-tenant apps can't
be detected and should be quoted at the $4,000 tier.

### Manual checks the tool cannot do

Every report ends with a checklist: Supabase dashboard RLS and policy review, anon / second-user
testing, Supabase advisors, storage policies, auth settings, Stripe webhook configuration and live vs
test mode, backups, rate limits and spend caps, Vercel/Netlify env var scopes, git history, and
running the app.

## Sample output

```text
$ node toolkit/bin/shipready-audit.mjs ../acme-app --fail-on critical
ShipReady audit: acme-app (2026-10-04)
Stack: Vite, React, Supabase, Stripe | files scanned: 16 | score: 0/100

Severity   Count
---------- -----
Critical       6
High           8
Medium         7
Low            7
Info           0

Findings:
  CRITICAL Supabase service_role key hard-coded in client-side code
           src/integrations/supabase/client.ts:5  [supabase.service-role-jwt, effort M]
  CRITICAL Stripe live secret key in client-side code
           src/lib/stripe.ts:4  [secret.stripe-secret-live, effort S]
  HIGH     Table public.orders has no Row Level Security
           supabase/migrations/20240101000000_init.sql:16  [supabase.rls-missing, effort S]
  HIGH     Stripe webhook handler does not verify the signature
           supabase/functions/stripe-webhook/index.ts:7  [stripe.webhook-no-signature, effort S]
  ...

Fix plan: Fix & Ship Sprint: adds payments, auth rebuild or multi-tenant ($4,000), 19 issue(s)

Reports:
  ../acme-app/shipready-audit/shipready-report.md
  ../acme-app/shipready-audit/shipready-report.html
  ../acme-app/shipready-audit/shipready-report.json

Failing: findings at or above "critical" severity.
```

Evidence is always masked. A Stripe key appears as `sk_liv********FAKE` (first 6 and last 4
characters, fixed-width middle so the length isn't revealed), and JWTs appear as `eyJhbG********xxxx`.

## Tests

```bash
node --test toolkit/test/          # from the repo root (uses toolkit/test/index.js on Node 22+)
node --test "toolkit/test/*.test.mjs"
```

Fixtures live in `toolkit/test/fixtures/` (a vulnerable Vite + Supabase app and a clean Next.js app).
They contain **no key-shaped strings**, only `{{FAKE_*}}` placeholders. `test/helpers.mjs` copies a
fixture into `os.tmpdir()` at test time and fills in obviously fake keys built by string
concatenation, so GitHub push protection and other secret scanners never see a key-shaped literal.
See `toolkit/test/fixtures/README.md`.

## Layout

```
toolkit/
  bin/shipready-audit.mjs   CLI entry
  lib/audit.mjs             walk + checks + score + fix plan + manual checklist
  lib/walk.mjs              repo walker (skips node_modules, .git, dist, build, .next, coverage, lockfiles, binaries, >1 MB)
  lib/patterns.mjs          loads ../../shared/secret-patterns.json; mask / redact / entropy / JWT decode
  lib/catalog.mjs           every finding type: severity, title, why, fix, effort
  lib/sql.mjs               small SQL splitter and statement matcher for migrations
  lib/checks/*.mjs          secrets, env, supabase, stripe, auth, code, deploy
  lib/report.mjs            Markdown, HTML, JSON and console renderers
  test/                     node:test suites, helpers and fixtures
  CLIENT-REPO-CLAUDE.md     CLAUDE.md to drop into client repos during engagements
```

## Limitations

- **Heuristic, not a substitute for manual review.** It matches patterns and file locations. It does
  no data-flow analysis, runs nothing, and can't see the live database, storage policies, auth
  settings, Stripe dashboard or hosting env vars. A clean result doesn't mean the app is secure, and
  some findings will turn out to be fine in context.
- Client vs server is decided by path and directives (`'use client'`, `src/` in Vite apps,
  `supabase/functions/`, `app/**/route.ts`, `pages/api/`, `*.config.*`, `server-only`). Unusual
  layouts can be misclassified.
- RLS analysis only sees SQL in the repo. Dashboard edits made after the last migration are
  invisible, so always run the export queries from the report appendix.
- It scans the working tree only, not git history. A secret deleted last week is still in history.
- Files over 1 MB, binaries, lockfiles, minified files and build output are skipped.
- Outdated-version checks read declared ranges in the root `package.json` only.
- Never promise a client that the app is "secure". The promise is: issues found are documented, and
  the agreed fixes are delivered and tested.
