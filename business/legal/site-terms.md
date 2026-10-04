# Terms of Use

<!-- Template, not legal advice. Have a lawyer in your state review before use. Replace every [PLACEHOLDER] before publishing. This comment is not shown on the website. -->

Last updated: October 2026

These terms govern your use of the ShipReady website at [SITE URL] (the "Site") and the free Ship-Ready Scan (the "Scan"). The Site is operated by [BUSINESS LEGAL NAME] ("ShipReady", "we", "us"). By using the Site or the Scan, you agree to these terms. If you do not agree, do not use them.

## 1. Who can use the Site

You must be at least 18 years old and able to enter into a contract. If you use the Site for a company, you confirm you have authority to accept these terms for it.

## 2. The free Scan

### What it does

The Scan is an automated, non-intrusive, read-only check of a live web address you submit. It fetches the public web page and the public JavaScript files it loads and looks for common problems such as exposed secrets and missing security headers. It also checks a few well-known paths (`/.env`, `/.git/config` and source map files) to see whether they are publicly downloadable. For apps backed by Supabase, it uses the public anon or publishable key found in the page to read the auth settings and the API's table list, then sends up to 15 HEAD requests per project asking only for row counts, to check whether tables can be read by anonymous visitors. It never downloads, stores or shows row data. Our [Privacy Policy](/privacy) explains what information the Scan collects.

### Authorization is required

**You may scan only apps that you own or that you are authorized, in writing if needed, to test.** Before each scan you must confirm this. By submitting a URL you represent that the confirmation is true. Scanning an app you do not own or are not authorized to test is prohibited and may be unlawful. We may block scans, keep records needed to prevent abuse, and cooperate with app owners or authorities in response to misuse.

### What the results mean

The Scan is a limited, automated first look. It is **not** a security audit, penetration test or certification. It checks only a small number of public signals at one point in time, can miss real problems, and can report issues that turn out not to matter. A clean result does not mean your app is secure. Do not rely on the Scan as your only security review.

If the Scan shows that a secret key appears to be exposed, treat it as compromised: rotate it with the provider that issued it and remove it from your front-end code.

## 3. Acceptable use

You agree not to:

- scan, or ask us to scan, any app you do not own or are not authorized to test;
- use the Site or Scan to harm, probe or gain unauthorized access to any system, account or data;
- submit URLs designed to make the Scan request internal, private or non-public addresses;
- overload the Site or Scan, use automated means to submit large numbers of scans, or try to get around rate limits;
- use the results to attack, extort or embarrass anyone, or publish another party's findings without their permission;
- copy, resell or build a competing service from the Site or Scan output;
- reverse engineer the Scan, except where the law allows it; or
- break any law or anyone else's rights.

We may suspend or block access, without notice, to anyone who breaks these rules.

## 4. Paid services

Paid services (for example the Ship-Ready Diagnosis, Fix & Ship Sprint and retainers) are governed by our separate [Master Services Agreement]([SITE URL]/legal/service-agreement) and the statement of work for the service (for the diagnosis, the [Ship-Ready Diagnosis terms]([SITE URL]/legal/diagnosis-terms)), which control if they conflict with these terms. Paying for a service means you accept them. Prices on the Site may change, and the price you pay is the one shown at checkout or in your statement of work.

Payments are processed by Stripe under Stripe's terms. Refunds follow the terms of the service you buy; for example, the Ship-Ready Diagnosis is refunded if we find nothing material, as described in its statement of work. For anything else, contact us at [CONTACT EMAIL].

## 5. Our content

The Site, its text, design, scanning logic and branding belong to us or our licensors. You may view and share pages from the Site for personal or internal business use. Your scan results are yours to use for your own app.

## 6. Your submissions

You keep ownership of what you submit. You give us permission to use it to run the Scan, respond to you and provide services, as described in our Privacy Policy. Do not submit passwords, API keys or other secrets through our forms.

## 7. Third-party services

The Site links to and relies on third-party services such as Stripe, Vercel and booking or email tools. We are not responsible for their content or practices.

## 8. Disclaimers

THE SITE AND SCAN ARE PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SCAN WILL FIND ALL ISSUES, THAT ITS RESULTS ARE ACCURATE OR COMPLETE, OR THAT YOUR APP IS OR WILL BE SECURE.

## 9. Limitation of liability

TO THE FULLEST EXTENT ALLOWED BY LAW, WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, DATA OR GOODWILL, ARISING FROM YOUR USE OF THE SITE OR SCAN. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE OR THE FREE SCAN IS LIMITED TO ONE HUNDRED US DOLLARS ($100). Some jurisdictions do not allow these limits, so they may not fully apply to you.

## 10. Indemnity

You will defend and indemnify ShipReady against claims, losses and costs (including reasonable legal fees) arising from your breach of these terms, including scanning an app you were not authorized to test.

## 11. Changes and termination

We may change or stop the Site or Scan at any time. We may update these terms; the "Last updated" date shows when. Continued use after changes means you accept them.

## 12. Governing law

These terms are governed by the laws of [GOVERNING LAW], without regard to conflict-of-laws rules. Disputes will be resolved in the state or federal courts located in [VENUE], and you consent to their jurisdiction.

## 13. General

If any part of these terms is unenforceable, the rest remains in effect. Our failure to enforce a term is not a waiver. These terms, together with our Privacy Policy, are the entire agreement between you and us about the Site and Scan.

## 14. Contact

[BUSINESS LEGAL NAME]
[MAILING ADDRESS]
[CONTACT EMAIL]

To report a scan of your app that you did not authorize, email [CONTACT EMAIL] with the subject "Unauthorized scan" and we will investigate.
