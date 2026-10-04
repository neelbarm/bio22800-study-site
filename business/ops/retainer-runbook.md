# Maintain & Extend retainer runbook

**Plans (from the brief):** Maintain $500/mo (4 small requests + monitoring), Maintain Plus $1,000/mo (10 requests + monthly security pass), Priority $1,500/mo (priority, 48h turnaround). A small request is up to 2 hours. Unused requests don't roll over. Re-fixes after builder re-prompts are covered only by the retainer.

## Setup (once per client)

- [ ] Retainer SOW accepted; Stripe subscription (monthly in advance) active.
- [ ] Collaborator access kept from the sprint (or granted fresh), staging preferred.
- [ ] Uptime monitor on the live URL and one key API route (e.g. UptimeRobot or Better Stack free tier), alerting you; optional status page for the client.
- [ ] Sentry alerts routed to you and the client.
- [ ] Dependabot or Renovate enabled on the repo (weekly, grouped minor/patch).
- [ ] Request channel agreed (email address, shared board, or Slack Connect channel) and a request log in `clients/[slug]/retainer-log.md` with columns: date, request, size (1 request per 2h), status, PR, hours.
- [ ] Baseline snapshot saved: table list with RLS status, policies, storage buckets, env var names, web scan result. Used to detect changes and re-prompt overwrites.

## Weekly routine (30-45 min per client; same day each week, e.g. Monday)

1. **Triage requests (10 min)**
   - Read new requests; confirm each is clear. Ask one round of questions if not.
   - Size each: 1 request = up to 2 hours. Larger work: tell the client how many requests it uses, or offer a fixed quote.
   - Prioritize: outages and security first, then client order. Priority plan: first deliverable within 48 business hours.
   - Update the request log and remaining allowance; tell the client the count ("3 of 10 used").
2. **Dependency updates (10 min)**
   - Review Dependabot/Renovate PRs. Merge patch/minor after CI and a preview check.
   - `npm audit --omit=dev`: act on high/critical advisories now.
   - Flag major upgrades (Next.js, Supabase JS, Stripe SDK) with a recommendation; they are requests, not freebies.
3. **Supabase advisor (5 min)**
   - Check Advisors > Security and Performance. New warnings: fix if under ~15 minutes, otherwise log as a recommendation.
   - Quick RLS check: any new table without RLS (query from `diagnosis-runbook.md` section 3.1). A new table without RLS is treated as urgent.
4. **Uptime and errors (5 min)**
   - Review uptime for the week and any incidents.
   - Sentry: new issues, regressions, error-rate spikes. Fix or log.
5. **Re-prompt watch (5 min)**
   - Check recent commits for builder-generated changes touching the "don't re-prompt over these" list from the handover doc (migrations, webhook handler, env handling, auth).
   - If a fix was overwritten: tell the client, log it as a re-fix request, fix it.
6. **Work the queue** during the rest of the week. One PR per request with a preview link.

## Monthly security pass (Maintain Plus and Priority; about 60-90 min)

Run in the first week of each month:

1. `node toolkit/bin/shipready-audit.mjs <repo>`: compare with last month's output; investigate new hits.
2. Free web scan on the live URL; compare with baseline.
3. Supabase: RLS on every table, `pg_policies` diff vs baseline, new views/`SECURITY DEFINER` functions, storage buckets and policies, auth settings (redirect URLs, email confirmation), advisors.
4. Stripe (if used): webhook endpoints, signing verification still in code, test vs live keys still separated, failed webhook deliveries in the dashboard.
5. Hosting: env var names diff (no new secrets with `NEXT_PUBLIC_`/`VITE_` prefix), preview protection, production branch.
6. Access review: who has access to GitHub, Supabase, Vercel, Stripe; flag stale collaborators to the client.
7. Backups: confirm backups are running (and, quarterly, that a restore to staging works).
8. Rate each new finding with the severity rubric; fix Low/Medium items that fit the allowance with the client's OK; quote anything larger.
9. Update the baseline snapshot.

Maintain plan ($500): no monthly pass included; run the free web scan and the RLS query monthly as part of monitoring, and offer the full pass as an upgrade.

## Incidents

- Full outage or active data exposure: respond as soon as reasonably possible, any plan. Restore first (rollback deploy, disable feature, tighten policy), explain second.
- Exposed key: follow secret rotation in `sprint-runbook.md` section 5.
- Write a short incident note (what, when, impact, fix, prevention) in the monthly report.

## Monthly reporting template

Send on the [1st business day] of each month, before or with the invoice.

```markdown
# [APP NAME]: monthly maintenance report, [MONTH YEAR]

**Plan:** [Maintain / Maintain Plus / Priority]   **Requests used:** [X] of [Y]   **Uptime:** [99.xx]%

## Summary
[2-3 sentences: overall health, the most important thing done, anything that needs a decision.]

## Requests completed
| # | Request | Requests used | PR | Status |
|---|---|---|---|---|
| 1 | [Request] | 1 | [link] | Shipped [date] |

## Maintenance
- Dependency updates: [N merged; notable: ...]
- Supabase advisor: [N warnings resolved; N open]
- Errors (Sentry): [N new issues; top issue and status]
- Uptime incidents: [none / date, duration, cause]

## Security pass (Maintain Plus / Priority)
| Finding | Severity | Status |
|---|---|---|
| [e.g. New table `invites` had RLS off after builder re-prompt] | High | Fixed (PR link) |

## Re-prompt watch
[Any delivered fixes overwritten by builder changes and re-fixed; reminder of sensitive areas.]

## Recommendations
1. [Recommendation, effort, price or request count]

## Next month
[Planned work, major upgrades to schedule, renewal date.]
```

## Renewal and churn

- Track per-client hours monthly in `metrics-tracker.md`. If a $500 client consistently uses more than 8 hours, propose the $1,000 plan.
- If a client stops sending requests for 2 months, send a value summary (updates applied, issues caught) and ask if the plan still fits; downgrade rather than lose them.
- On cancellation: final report, remove access, delete credentials and local data within 7 days, confirm in writing.
