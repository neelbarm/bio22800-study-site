> **Template, not legal advice. Have a lawyer in your state review before use.**

# Statement of Work: Maintain & Extend Retainer

**SOW number:** [SOW-YYYY-NNN]
**Date:** [DATE]
**Client:** [CLIENT LEGAL NAME]
**Provider:** [YOUR LEGAL NAME OR BUSINESS ENTITY], d/b/a ShipReady
**Governing agreement:** Master Services Agreement dated [MSA DATE] (the "MSA").

## 1. Application covered

| Item | Details |
|---|---|
| App | [APP NAME], [https://APP-URL] |
| Repository | [GITHUB OWNER/REPO] |
| Supabase project | [PROJECT REF] |
| Hosting | [Vercel / Netlify] project [NAME] |

One app per retainer. Additional apps need their own retainer or a change order.

## 2. Plan

Select one:

| Plan | Monthly fee | Small requests per month | Monitoring | Monthly security pass | Turnaround target |
|---|---|---|---|---|---|
| [ ] **Maintain** | $500 | 4 | Yes | No | 5 business days |
| [ ] **Maintain Plus** | $1,000 | 10 | Yes | Yes | 3 business days |
| [ ] **Priority** | $1,500 | 10 | Yes | Yes | **48 hours** (business days), priority queue |

## 3. What is included every month

1. **Dependency and security updates:** review and apply patch and minor updates; flag major updates with a recommendation.
2. **Supabase advisor checks:** review the Security and Performance Advisors and fix low-effort warnings (fixes larger than a small request are proposed separately).
3. **Uptime monitoring:** uptime checks on the live URL and key endpoints, with alerts to Provider; Provider notifies Client of outages it detects.
4. **Small requests** up to the plan's monthly count (Section 4).
5. **Monthly security pass** (Maintain Plus and Priority): re-run Provider's repo audit and web scan, review new tables, policies, storage buckets and environment variables added since the last pass.
6. **Monthly report** summarizing work done, updates applied, findings and recommendations.

## 4. Small requests

- A **small request** is a self-contained change that takes Provider up to **2 hours**, including testing and deploy (for example a copy change, a bug fix, a new RLS policy for a new table, a small UI tweak, adding an environment variable, a minor integration fix).
- A change that needs more than 2 hours counts as multiple requests (one per 2 hours, rounded up), or is quoted as a fixed-price change order if Client prefers. Provider will tell Client before starting which option applies.
- Requests are submitted through [REQUEST CHANNEL: email to ADDRESS / shared board / Slack channel].
- Unused requests **do not roll over** to the next month.
- Turnaround targets in Section 2 measure time to a first deliverable (pull request with preview link, or a written answer), counted from when the request is complete and clear. They are targets, not guarantees.
- Monitoring alerts for a full outage are handled as soon as reasonably possible and do not count against the request allowance when the cause is Provider's prior work.

## 5. AI builder re-prompts and overwritten fixes

AI app builders (for example Lovable, Bolt, Base44, Replit, v0 or Cursor) can regenerate files and **overwrite fixes Provider delivered**, including RLS policies, environment variable handling and webhook verification. Client agrees that:

1. Client will tell Provider before re-prompting or regenerating code in areas listed in the handover document as sensitive, where practical.
2. **Re-fixing work overwritten by a re-prompt is covered only under this retainer.** Each re-fix counts as one or more small requests under Section 4.
3. Provider's monthly security pass (on plans that include it) is the main way overwritten fixes are detected. On the Maintain plan, Client may use a small request to have Provider check a re-prompted area.
4. Provider is not responsible for issues introduced by re-prompts, other developers or AI tools Provider did not operate.

## 6. Fees and term

- **Fee:** $[500 / 1,000 / 1,500] per month, billed **monthly in advance** by Stripe subscription or invoice on the [DAY] of each month. Work for a month starts when that month is paid.
- **[OPTIONAL] White-label discount:** [15-20]% off list.
- **Term:** month to month, starting [START DATE].
- **Cancellation:** either Party may cancel by written notice before the next billing date; the retainer ends at the end of the paid month. No partial-month refunds.
- **Plan changes:** Client may upgrade at any time (pro-rated) or downgrade from the next billing date.
- **Price changes:** Provider will give at least [30] days' notice of any price change.

## 7. Out of scope

New features larger than the request allowance, redesigns, migrations to another backend, Wire-It-Up integrations, incident response beyond restoring service, and work on systems not listed in Section 1. These are quoted as change orders at **$150 per hour** or a fixed price.

## 8. Access and data

Provider keeps collaborator access for the term of the retainer only, prefers staging and read-only access, and follows the data protection terms of the MSA. Within [7] days after the retainer ends, Provider will remove its access, delete credentials and send the access-removal checklist.

## 9. Important limits

Monitoring and monthly passes reduce risk but do not guarantee that the app is secure or always available. Provider's commitment is that issues found are documented and agreed requests are delivered and tested. Liability is capped as stated in the MSA (fees paid in the [3] months before the claim).

## Acceptance

| | Provider | Client |
|---|---|---|
| Name | [PROVIDER NAME] | [CLIENT SIGNER NAME] |
| Signature | ____________________ | ____________________ |
| Date | [DATE] | [DATE] |
