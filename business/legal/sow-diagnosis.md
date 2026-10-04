> **Template, not legal advice. Have a lawyer in your state review before use.**

# Statement of Work: Ship-Ready Diagnosis

**SOW number:** [SOW-YYYY-NNN]
**Date:** [DATE]
**Client:** [CLIENT LEGAL NAME]
**Provider:** [YOUR LEGAL NAME OR BUSINESS ENTITY], d/b/a ShipReady
**Governing agreement:** Master Services Agreement dated [MSA DATE] (the "MSA"). Capitalized terms not defined here have the meaning in the MSA. If no MSA has been signed, the MSA template attached to this SOW applies by reference when Client accepts this SOW.

**Standard version for self-serve purchases:** when this SOW is published on the website and linked from the Payment Link's terms, the SOW number is the Stripe payment reference, the Client is the person or business named at checkout, the MSA is the version published alongside it, and Section 1 is completed from the intake form and the access Client shares.

## 1. Application in scope

| Item | Details |
|---|---|
| App name | [APP NAME] |
| Live URL | [https://APP-URL] |
| Repository | [GITHUB OWNER/REPO], branch [BRANCH], commit [COMMIT SHA at start] |
| Backend | Supabase project [PROJECT REF] ([staging / production]) |
| Payments | Stripe ([test / live] mode) [or: none] |
| Hosting | [Vercel / Netlify / other] |
| Builder used | [Lovable / Bolt / Base44 / Replit / v0 / Cursor / other] |

Anything not listed above (other apps, mobile apps, third-party services, infrastructure Client does not control) is out of scope.

## 2. Services

Provider will perform a human-reviewed, point-in-time review of the app in Section 1, covering:

1. **Automated checks:** Provider's repository audit tool and web scan against the repository and live URL.
2. **Supabase:** Row Level Security (RLS) enabled on every exposed table; policies (including use of `auth.uid()`); storage bucket visibility and policies; auth settings (email confirmation, redirect URLs, rate limits); database functions and views exposed through the API; Supabase advisor warnings.
3. **Keys and secrets:** secrets or service-role keys in client bundles, the repository or its history, and environment variable configuration.
4. **Stripe (if used):** checkout flow, webhook signature verification, idempotency, test vs live mode separation, server-side pricing.
5. **Auth flows:** sign-up, login, password reset, session handling, access to other users' data.
6. **Error handling, deploy and performance:** error monitoring, build and deploy configuration, obvious performance problems.

Provider reviews only. Provider will not change code, data or configuration during the diagnosis, will not perform load testing, social engineering or denial-of-service testing, and will test only with accounts Client provides or that Provider creates on staging.

## 3. Deliverables

1. **Written report** (PDF or shared document) with an executive summary, a readiness score, and findings ranked by severity (critical, high, medium, low), each with evidence, impact, recommended fix and effort estimate.
2. **Loom walkthrough** video, about 10-15 minutes, explaining the most important findings.
3. **Fixed-price fix quote** mapping the findings to a Fix & Ship Sprint tier.

## 4. Timeline

Delivery within **48 hours** (or **24 hours** if the rush option in Section 5 is selected) after the later of (a) payment and (b) Provider receiving all access listed in the onboarding checklist. Weekends and US federal holidays [are / are not] counted. If access is incomplete, Provider will notify Client within [12] hours and the clock starts when access is complete.

## 5. Fees

| Item | Amount |
|---|---|
| Ship-Ready Diagnosis (list) | $399 |
| [OPTIONAL] Intro price for one of the first 3 clients, in exchange for an honest written testimonial | $199 |
| [OPTIONAL] Rush: delivery within 24 hours instead of 48 (+50% of list) | $599 |
| [OPTIONAL] Included in a Launch Readiness Package (fee is part of the package price in the Fix & Ship Sprint SOW) | $0 here |
| **Fee for this SOW** | **$[399 / 199 / 599 / 0]** |

- **Payment:** 100% in advance via Stripe Payment Link or invoice. Work starts after payment.
- **Credit toward sprint:** the base diagnosis fee ($399 or $199; any rush fee is not credited) is credited in full against a Fix & Ship Sprint SOW signed within [30] days of report delivery. No credit applies under a Launch Readiness Package, which already includes the diagnosis.
- **Refund if nothing material found:** "material" means at least one finding rated critical or high. If the report contains none, Provider refunds the fee in full (including any rush fee) within [7] days of delivery, without Client having to ask. Under a Launch Readiness Package, Provider instead refunds the full package deposit and the sprint is cancelled.
- **Testimonial (intro price only):** Client will provide an honest short written testimonial, positive or not, within [14] days of delivery. Client approves the final wording and may choose to be anonymous (for example "Founder, B2B SaaS"). Wherever Provider publishes it, Provider will note that Client received a discounted diagnosis in exchange for feedback.

## 6. Acceptance

The diagnosis is complete and accepted when the report, Loom and quote are delivered. Client may ask clarifying questions for [7] days after delivery at no charge, including one 20-minute call on request. Re-auditing after Client makes changes is a new SOW or part of a sprint.

## 7. Client responsibilities

- Provide repository access (read access if the repo belongs to a GitHub organization; on a personal account GitHub only offers write access, which Provider will use read-only and never push to; or a zip export), Supabase access (Read-only role on Team or Enterprise plans; on Free or Pro, a staging project in a separate organization, or Client runs the review queries Provider sends), and hosting dashboard access, as listed in the onboarding checklist.
- Share credentials only through a secure share link, never in chat or email.
- Confirm Client owns, or is authorized to allow testing of, the app and all services in Section 1.
- Do not share a Supabase service-role key or Stripe live secret key with Provider unless Provider specifically asks for it in writing and explains why.

## 8. Change orders

Work outside this SOW, such as reviewing additional apps or re-auditing after changes, is billed at **$150 per hour** or a fixed price agreed in writing.

## 9. Important limits

This diagnosis is a time-boxed review of the code version and configuration as of the start date. It does not certify that the app is secure or compliant. Provider's commitment is that issues found are documented and explained. Liability is capped at the fees paid under this SOW, as stated in the MSA.

## Acceptance

Client accepts this SOW by signing below, by confirming by email, by paying the Payment Link that references this SOW number, or by accepting the terms at checkout on a Payment Link that links to the published standard version of this SOW.

| | Provider | Client |
|---|---|---|
| Name | [PROVIDER NAME] | [CLIENT SIGNER NAME] |
| Signature | ____________________ | ____________________ |
| Date | [DATE] | [DATE] |
