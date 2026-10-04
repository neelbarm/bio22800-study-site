> **Template, not legal advice. Have a lawyer in your state review before use.**

# Statement of Work: Fix & Ship Sprint

**SOW number:** [SOW-YYYY-NNN]
**Date:** [DATE]
**Client:** [CLIENT LEGAL NAME]
**Provider:** [YOUR LEGAL NAME OR BUSINESS ENTITY], d/b/a ShipReady
**Governing agreement:** Master Services Agreement dated [MSA DATE] (the "MSA").
**Based on:** Diagnosis report [REPORT ID] dated [REPORT DATE]

## 1. Tier

Select one:

| Tier | Price | Included | Delivery |
|---|---|---|---|
| [ ] **Fix & Ship 5** | $1,500 | Up to **5** issues from the fix plan | 5-7 business days |
| [ ] **Fix & Ship 10** | $2,500 | Up to **10** issues from the fix plan **plus production deploy** | 7-10 business days |
| [ ] **Rebuild-grade** | $4,000 | Up to 10 issues plus production deploy, **plus one** of: payments (Stripe) build or rebuild, auth rebuild, or multi-tenant data isolation | 10 business days |
| [ ] **Launch Readiness Package** | $2,900 total, including the diagnosis under SOW [NUMBER] (no diagnosis credit applies) | Fix & Ship 10 scope **plus priority start** | Diagnosis within 48 hours of complete access; sprint starts the next business day after the report and is delivered within 7 business days |

Optional lines (owner options; add to Section 4 if selected):

- **Priority start** (+$400, Fix & Ship 10 only): sprint starts the next business day after the deposit and access are received, and is delivered within 7 business days. Already included in the Launch Readiness Package.
- **Rush** (+50%, Fix & Ship 5 only, $2,250): delivered within 72 hours of the start date, if Provider confirms capacity in writing before the deposit.

A "Wire-It-Up" integration add-on ($1,000-$3,000 fixed, 3-7 days) may be added as a separate line in Section 4 with its own scope description.

Migrations off Replit-native or Base44-native backends are quoted separately and are not included in any tier.

## 2. Issues in scope

The following issues, numbered as in the diagnosis report, are in scope. Each has its own acceptance criterion.

| # | Report ID | Issue | Severity | Acceptance criterion |
|---|---|---|---|---|
| 1 | [F-01] | [e.g. RLS disabled on `profiles` table] | Critical | [Anonymous request to `profiles` returns no rows; authenticated user can read/update only their own row; Playwright and SQL tests pass] |
| 2 | [F-02] | [e.g. Stripe webhook does not verify signatures] | High | [Unsigned or wrongly signed webhook request returns 400; valid test-mode event is processed once even if delivered twice] |
| 3 | [F-03] | [ISSUE] | [SEVERITY] | [CRITERION] |
| 4 | [F-04] | [ISSUE] | [SEVERITY] | [CRITERION] |
| 5 | [F-05] | [ISSUE] | [SEVERITY] | [CRITERION] |
| ... | | | | |

Issues not listed here, and issues discovered during the sprint, are out of scope unless added by change order. Provider may, with Client's written approval, swap a listed issue for a newly discovered issue of similar size at no extra charge.

## 3. How the work is done

For each in-scope issue Provider will:

1. Work on a separate branch in Client's repository (or a fork Client owns) and open **one pull request per issue**.
2. Add or update tests: Playwright smoke tests for the critical user flows touched, and unit or SQL tests where practical.
3. Use a Vercel (or Netlify) preview deploy for each pull request so Client can try the change.
4. For database changes, provide Supabase migration files with a written rollback script, applied to staging first.
5. Move any hard-coded secrets to environment variables and provide step-by-step rotation instructions for exposed keys.

Also included in every tier, where applicable to the app:

- **Sentry** error monitoring set up on a Sentry account Client owns.
- **Rate limits** on auth and other abuse-prone endpoints identified in the report.
- **Handover document** covering what changed, how to run tests, how to roll back, open risks and recommended next steps.

**Production deploy** (Fix & Ship 10, Rebuild-grade and the Launch Readiness Package): Provider will merge approved pull requests, apply migrations to production after Client's written go-ahead, deploy, run smoke tests against production and confirm rollback steps. In Fix & Ship 5, Provider delivers merged-ready pull requests and Client (or Provider, as a change order) deploys to production.

## 4. Fees and payment

| Item | Amount |
|---|---|
| Sprint tier: [TIER] | $[1,500 / 2,500 / 4,000 / 2,900 package] |
| [OPTIONAL] Priority start (Fix & Ship 10) or Rush (Fix & Ship 5, +50%) | $[400 / 750] |
| [OPTIONAL] Wire-It-Up add-on: [INTEGRATION SCOPE] | $[1,000-3,000] |
| [OPTIONAL] White-label discount ([15-20]%) | -$[AMOUNT] |
| Less: diagnosis fee credit (SOW [NUMBER]; not for the Launch Readiness Package) | -$[199 / 399] |
| **Total** | **$[TOTAL]** |

- **50%** deposit ($[AMOUNT]) is due before work starts. The start date is booked when the deposit is paid. For the Launch Readiness Package, the $1,450 deposit is due before the diagnosis starts.
- **50%** balance ($[AMOUNT]) is due on acceptance (Section 6).
- The deposit is non-refundable once work has started, except as provided in the MSA.

## 5. Timeline

- **Start date:** [START DATE], or the first business day after the deposit and all access are received, whichever is later.
- **Target delivery:** [DELIVERY DATE] ([5-10] business days per the tier, 7 business days with priority start, 72 hours with rush).
- Delivery dates move by any delay in Client access, answers or approvals.

## 6. Acceptance

1. Provider will notify Client when all pull requests are ready, with a summary mapping each issue to its pull request, preview link and test results.
2. Client has **5 business days** to review each issue against its acceptance criterion in Section 2.
3. If an issue does not meet its acceptance criterion, Client will describe the gap in writing. Provider will fix it at no extra charge and resubmit; the 5-day review restarts for that issue only.
4. An issue is accepted when Client approves it in writing, merges its pull request, deploys it to production, or does not report a gap within the review period.
5. The sprint is accepted when all in-scope issues are accepted.

Requests beyond the acceptance criteria (new features, design changes, extra issues) are change orders, not acceptance defects.

## 7. After acceptance

- Provider will fix defects in the delivered changes reported within **14 days** of acceptance at no charge, provided the code has not been modified since (including by AI builder re-prompts).
- **Builder re-prompts:** regenerating or re-prompting code with an AI app builder can overwrite delivered fixes. Re-fixing overwritten work is not covered by this SOW. It is covered only under a Maintain & Extend retainer, or otherwise billed as a change order.
- At handover, Provider's access will be removed and credentials deleted, per the MSA and the handover checklist.

## 8. Client responsibilities

- Keep backups of the database and storage before production migrations.
- Provide staging access where possible, test accounts, and timely approvals.
- Rotate exposed secrets when Provider provides the rotation steps (Provider can do this with Client on a call).
- Confirm Client owns or is authorized to change all systems in scope.

## 9. Change orders

Out-of-scope work is billed at **$150 per hour** or a fixed price agreed in writing before work starts.

## 10. Important limits

Provider does not guarantee that the app is secure. Provider's commitment is that the issues in Section 2 are fixed and tested against their acceptance criteria. Liability is capped at the fees paid under this SOW, as stated in the MSA.

## Acceptance

| | Provider | Client |
|---|---|---|
| Name | [PROVIDER NAME] | [CLIENT SIGNER NAME] |
| Signature | ____________________ | ____________________ |
| Date | [DATE] | [DATE] |
