# Privacy Policy

<!-- Template, not legal advice. Have a lawyer in your state review before use. Replace every [PLACEHOLDER] before publishing. This comment is not shown on the website. -->

Last updated: October 2026

This policy explains what information ShipReady ("we", "us") collects through our website at [SITE URL] (the "Site") and our free Ship-Ready Scan (the "Scan"), how we use it, and the choices you have. ShipReady is operated by [BUSINESS LEGAL NAME], based in [CITY, STATE]. If you have questions, email us at [CONTACT EMAIL].

This policy covers the Site and the Scan. Paid engagements are also covered by the confidentiality and data protection terms of our client agreements.

## Information we collect

### Information you give us

When you fill in a form on the Site (for example to request a scan report by email, book a diagnosis, or contact us), we collect:

- your name;
- your email address;
- the URL of your app; and
- project details you choose to share (for example the builder you used, your stack, whether you have live users, and your deadline).

Please do not put passwords, API keys or other secrets in our forms. If you do, we will delete them and ask you to rotate them.

### Information the free Scan collects

When you submit a URL to the Scan, you must first confirm that you own the app or are authorized to test it. The Scan then:

1. **Fetches the public web page** at the URL you submit and the **public JavaScript files** it loads, and checks them for exposed secrets and missing security headers. It also **checks a few well-known paths** that a normal visit does not load (`/.env`, `/.git/config` and source map files) to see whether they are publicly downloadable.
2. **For apps backed by Supabase,** uses the public anon or publishable key that is already present in the page to read the project's auth settings and the API's list of tables, then sends **up to 15 read-only requests per project** (HEAD requests asking only for a row count) to check whether tables can be read by anonymous visitors. **The Scan never downloads, stores or shows any row data from your database.** It records which tables appeared readable and how many rows each reported, not what is in them.
3. **Shows the results to you** in your browser. Where the Scan detects a key or secret, it shows only a shortened, masked excerpt so you can identify it.
4. **We email you the results personally, only if you ask** by entering your email address.

The Scan is non-intrusive, read-only and minimal. It does not log in, submit forms, write, change or delete anything, or attempt to bypass any security control.

### Information collected automatically

Like most websites, our hosting provider records basic technical information when you visit, such as IP address, browser type, pages requested and timestamps. We use this to run the Site, keep it secure, and prevent abuse of the Scan (for example rate limiting). We do not use analytics, tracking or advertising cookies, and we do not sell data to advertisers.

### Payments

If you buy a service, payment is processed by **Stripe**. You enter your card details on Stripe's pages, not ours. We receive your name, email, billing details Stripe shares with merchants, and payment status, but not your full card number. Stripe's privacy policy is at https://stripe.com/privacy.

## How we use information

We use the information above to:

- run the Scan and show or email you the results;
- respond to your enquiries and deliver services you buy;
- send you messages you ask for (for example your scan report or booking details);
- keep the Site and Scan secure and prevent misuse, including scans of apps the requester is not authorized to test;
- keep business and tax records; and
- improve the Site and Scan, using aggregated, non-identifying statistics (for example "how many scanned apps had missing security headers").

We will send you follow-up emails about our services only if you contacted us or asked for a report, and every marketing email includes a way to unsubscribe. We never publish your app's name or specific scan findings without your permission.

## Service providers we use

We share information only with providers that help us run the Site, under their own terms and privacy policies:

| Provider | What it does for us |
|---|---|
| Vercel | Hosts the Site and the Scan; processes server logs |
| Stripe | Processes payments |
| Resend (if configured) | Notifies us by email of form submissions and scans. We may email you your results personally. |
| Vercel Blob | Stores form submissions and scan summaries privately so we can follow up |
| Slack, Discord, Zapier, Make or n8n (if configured) | Notifies us when you submit a form or run a scan |

We may also disclose information if required by law, to protect our rights or the safety of others, or as part of a sale or reorganization of the business (in which case this policy will continue to apply to your information). **We do not sell your personal information** and do not share it for cross-context behavioral advertising.

## How long we keep information

- Form submissions and enquiries: up to 24 months after our last contact, unless you become a client.
- Scan records (the URL scanned, the time, the score and the titles of issues found, plus your email if you entered one; never row data or full secrets): up to 90 days, to follow up if you asked us to and to prevent abuse.
- We delete expired records once a month, from our storage, our email notifications and our notification channels.
- Server logs: kept by our hosting provider according to its retention settings.
- Client and payment records: as long as needed for tax and legal purposes (usually up to 7 years).

## Security

We use reasonable measures to protect information, including encryption in transit (HTTPS), access controls and limiting what we store. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.

## Your choices and rights

You can ask us to access, correct or delete the personal information we hold about you, or to stop sending you emails, by writing to [CONTACT EMAIL]. We will respond within 30 days. Depending on where you live (for example California or other US states with privacy laws, or the EEA/UK), you may have additional rights, including the right to know what we collect, to opt out of sale or sharing (we do neither), and not to be discriminated against for using your rights. We will verify your request using the email address you used with us.

If you are in the EEA or UK, we process your information to respond to your requests and provide services you ask for (contract), for our legitimate interests in running and securing the Site, and with your consent where required. You may complain to your local data protection authority. Our servers and providers are in the United States.

## Children

The Site is not intended for children under 16, and we do not knowingly collect their information.

## Changes

We may update this policy. We will change the "Last updated" date above and, for significant changes, post a notice on the Site.

## Contact

[BUSINESS LEGAL NAME]
[MAILING ADDRESS]
[CONTACT EMAIL]
