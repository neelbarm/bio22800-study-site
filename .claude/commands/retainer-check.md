---
description: Weekly Maintain & Extend retainer check. Re-audit, catch regressions and builder overwrites, review deps, errors, payments and backups, and draft the client update.
argument-hint: "[client name] [tier: 500 | 1000 | 1500]"
---

# Weekly retainer check

You are running the weekly **Maintain & Extend** check for a ShipReady retainer client in the
repository in the current working directory.

Owner input: **$ARGUMENTS**

Tiers: **$500/mo** (4 small requests + monitoring), **$1,000/mo** (10 requests + a monthly security
pass), **$1,500/mo** (priority, 48h turnaround). Builder re-prompts can overwrite fixes; re-fixes are
covered by the retainer.

`STUDIO` = `$SHIPREADY_HOME` or `~/bio22800-study-site`. Audits live in
`$STUDIO/../shipready-audits/<repo>/`.

Guardrails as always: staging and local only, never production service-role keys or live Stripe keys,
env var names only (never values), no customer data in notes, small PRs with tests.

## 1. Update and re-audit (10 min)

```bash
git fetch --all --prune && git checkout <default-branch> && git pull
REPO=$(basename "$PWD"); WEEK=$(date +%G-W%V); BASE="$STUDIO/../shipready-audits/$REPO"
node "$STUDIO/toolkit/bin/shipready-audit.mjs" . --out "$BASE/$WEEK"
```

Compare with last week's JSON (new and resolved findings, score change):

```bash
PREV=$(ls -d "$BASE"/*-W* | sort | tail -2 | head -1)
node -e '
const [a,b]=process.argv.slice(1).map(p=>require(p+"/shipready-report.json"));
const k=f=>`${f.id} ${f.file}:${f.line ?? ""}`, A=new Set(a.findings.map(k)), B=new Set(b.findings.map(k));
console.log(`score ${a.score} -> ${b.score}`);
for (const f of b.findings) if(!A.has(k(f))) console.log("NEW     ", f.severity, k(f), "-", f.title);
for (const f of a.findings) if(!B.has(k(f))) console.log("RESOLVED", f.severity, k(f));
' "$PREV" "$BASE/$WEEK"
```

Any **new critical or high** finding is this week's top priority. Tell the owner right away.

## 2. Regressions and builder overwrites

- `git log --since="8 days ago" --stat` and look for commits from the AI builder (Lovable/Bolt bot
  authors, bulk changes to `src/integrations/supabase/`, regenerated components).
- Run the full test suite. The tests from the sprint guard each fix, so a failure usually means a
  re-prompt undid one. Check the handover doc's "builder warning" list file by file.
- Re-fixing an overwritten fix counts as a retainer request. Use one branch and one PR per fix, test
  first, same as the sprint.

## 3. Dependencies and security updates

```bash
npm outdated || true
npm audit --omit=dev || true
```

Patch and minor updates with security fixes go in one small PR per week (build + tests green, preview
checked). Major upgrades (Next, React, supabase-js, Stripe SDK) are proposed, not done silently. Note
them for the owner as a request or a quote.

## 4. Supabase

Ask the client for (or, with read-only staging/dashboard access, review) the Supabase **Security and
Performance Advisors**. Look for new tables without RLS, new policies, functions with a mutable
search_path, and public buckets. If migrations changed this week, re-check the new SQL. Check that
backups or PITR ran, and how close the database and storage are to plan limits.

## 5. Production health (read-only)

- Errors: new or rising issues in Sentry (or the host's logs) since last week. Group them, find the
  likely cause, and propose fixes.
- Uptime and performance: downtime incidents, slow routes, failed builds or deploys on Vercel/Netlify.
- Stripe: failed webhook deliveries, `invoice.payment_failed` spikes, disputes. Confirm the webhook
  endpoint is still enabled.
- Spend and abuse: AI / email provider usage spikes and rate-limit hits.

## 6. Monthly security pass ($1,000 and $1,500 tiers, first check of each month)

Do the full manual checklist from the audit report: RLS and policies vs the dashboard, storage
policies, auth settings, Stripe live/test configuration, env var scopes, a key-rotation review (any
key older than 12 months or shared with an ex-contractor), and collaborator access.

## 7. Requests

Update the request log for the month (`$BASE/requests.md`): request, date, status, PR link, and
count against the tier allowance (4 / 10 / priority). Flag anything that's really a project and
should be quoted separately.

## 8. Client update (draft only)

Write `$BASE/$WEEK/weekly-update.md` for the owner to send. Keep it short and in plain English:

- Status: green / yellow / red, with one sentence on why.
- What we did this week (PRs merged, updates applied).
- What we found (new findings by severity, regressions, errors) and what we recommend.
- Requests used this month vs the allowance.
- Anything the client needs to do (approve a PR, change a dashboard setting, rotate a key).

Never call the app "secure". Report what was checked and what was found.

Finish by telling the owner: status color, new critical/high items, PRs opened, requests used, and
anything that needs their attention before the update goes out.
