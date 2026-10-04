# Ship-Ready Diagnosis: [APP NAME]

| | |
|---|---|
| Client | [CLIENT NAME] |
| Prepared by | [YOUR NAME], ShipReady |
| Report ID | [REPORT-YYYY-NNN] |
| SOW | [SOW-YYYY-NNN] |
| Review window | [START DATE/TIME] to [END DATE/TIME] |
| Code version reviewed | [REPO] @ [COMMIT SHA] |
| Environments reviewed | Live URL [URL]; Supabase [staging / production] project [REF]; [Vercel / Netlify]; Stripe [test / live] |
| Delivered | [DATE] |
| Walkthrough video | [LOOM LINK] |

> **Confidential.** This report describes security weaknesses in your app. Share it only with people who need it. Secrets and user data in this report are redacted.

---

## 1. Executive summary

[3-5 short sentences for a non-technical reader. Example: "Your app works, but today any visitor can read your customers' names and emails because database protections are switched off on two tables. Your payment webhook also accepts fake 'payment succeeded' messages. Both can be fixed within a week. Until then, we recommend not sending new traffic to the app. Everything else we found is routine hardening."]

**Verdict:** [Ready to launch / Ready after fixes / Not ready: fix Criticals first / Stop: take action today]

**Do today:** [e.g. "Rotate the Stripe secret key (steps in finding F-02)." or "Nothing urgent."]

## 2. Ship-Ready score

**Score: [NN] / 100** ([BAND])

| Severity | Count | Points deducted each | Total |
|---|---|---|---|
| Critical | [n] | 25 | [-x] |
| High | [n] | 10 | [-x] |
| Medium | [n] | 4 | [-x] |
| Low | [n] | 1 | [-x] |

Score = 100 minus deductions, minimum 0.
Bands: **85-100** Ready to launch. **60-84** Ready after fixes. **30-59** Not ready: fix Criticals and Highs first. **0-29** Stop: act today.

The score summarizes what we found in this review. It is not a certification that the app is secure.

## 3. Findings summary

| ID | Severity | Area | Finding | Effort | In fix plan? |
|---|---|---|---|---|---|
| F-01 | Critical | Supabase RLS | [e.g. `profiles` table readable by anyone] | S | Yes |
| F-02 | Critical | Stripe | [e.g. Webhook does not verify signatures] | M | Yes |
| F-03 | High | Auth | [FINDING] | [S/M/L/XL] | Yes |
| F-04 | Medium | Monitoring | [FINDING] | S | [Yes / Retainer] |
| F-05 | Low | Headers | [FINDING] | S | [Retainer / Backlog] |

Effort: **S** under 1 hour, **M** 1-3 hours, **L** 3-8 hours, **XL** more than a day.

Severity: **Critical** exploitable now by anyone, exposes data/money or allows takeover. **High** exploitable by a logged-in user or with modest effort. **Medium** weakens defenses; needs another failure to cause harm. **Low** best practice and hygiene.

## 4. Findings in detail

### F-01: [Short title] (Critical)

**Area:** [Supabase RLS / Storage / Auth / Secrets / Stripe / Deploy / Error handling / Performance]
**Where:** [table, file path and line, URL, setting]

**Evidence**
[What we observed, step by step, with redacted screenshots or output. Example: "An anonymous request to `/rest/v1/profiles?select=id&limit=1` using the public anon key returned HTTP 200 with a row (contents not retained). Query `select relrowsecurity from pg_class where relname='profiles'` returned `false`."]

**Impact**
[What could happen to the business and users, in plain words. Example: "Anyone can download every user's name, email and phone number. This is likely a reportable data breach in many states."]

**Fix**
[What we would change. Example: "Enable RLS on `profiles` and add policies so each user can read and update only their own row. Delivered as a Supabase migration with a rollback script and a test that proves anonymous access returns nothing."]

**Effort:** [S/M/L/XL]   **Acceptance criterion:** [testable statement used in the sprint SOW]

---

### F-02: [Short title] ([Severity])

**Area:**
**Where:**

**Evidence**

**Impact**

**Fix**

**Effort:**   **Acceptance criterion:**

---

[Repeat for each finding.]

## 5. What looked good

- [e.g. "Stripe secret key is only used server-side."]
- [e.g. "Storage buckets for avatars are correctly public; private documents bucket is private with owner-only policies."]

## 6. Not reviewed

[List anything out of scope or not accessible, so nobody assumes it was checked. Example: "Mobile app; production database (staging reviewed instead); load testing; third-party integrations (Zapier)."]

## 7. Fix plan and fixed price

**Recommended: [Fix & Ship 5 / Fix & Ship 10 / Rebuild-grade]**

| Tier | Includes | Price |
|---|---|---|
| Fix & Ship 5 | Up to 5 issues | $1,500 |
| Fix & Ship 10 | Up to 10 issues + production deploy | $2,500 |
| Rebuild-grade | Up to 10 issues + production deploy + payments, auth rebuild or multi-tenant | $4,000 |

**Issues included in the recommended tier:** F-01, F-02, F-03, [...]

| | Amount |
|---|---|
| [TIER] | $[PRICE] |
| Diagnosis fee credit | -$[199 / 399] |
| **Your price** | **$[NET]** |
| Deposit to start (50%) | $[AMOUNT] |
| On acceptance (50%) | $[AMOUNT] |

**Timeline:** [5-10] business days from deposit and access.
**Every fix includes:** its own branch and pull request, tests (Playwright smoke + unit/SQL), a preview deploy you can click through, database migrations with rollback scripts, secrets moved to environment variables, Sentry error monitoring, rate limits where needed, and a handover document.

**Not in this plan:** [F-04, F-05 (Medium/Low): recommended for the Maintain & Extend retainer, from $500/month, which also covers re-fixing anything a builder re-prompt overwrites.]

Our commitment: the issues above are fixed and tested against written acceptance criteria. No one can honestly guarantee an app is "secure"; we document what we find and deliver what we agree.

## 8. Next steps

1. [If any] **Today:** [rotate key X / disable feature Y] (steps in [F-ID]).
2. Reply "yes" to book the sprint, or pay the deposit here: [STRIPE PAYMENT LINK]. The pre-filled statement of work is attached.
3. We start within [N] business days of the deposit. Please keep [auth / database / payments] untouched in [BUILDER] until handover.
4. Questions about this report are free for 7 days: reply to this email or book 20 minutes: [CAL LINK].

*Prepared by [YOUR NAME], ShipReady. This report reflects a time-boxed review of the code version and configuration listed above. It is not a certification or guarantee of security.*
