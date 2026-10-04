// Catalog of finding types: default severity, title, plain-English "why", "how to fix", effort.
// Checks can override any field per finding (e.g. a title that names the table).
//
// effort: S = under 2 hours, M = half a day to a day, L = more than a day.
// tier4: the fix usually means rebuilding payments, auth or tenancy (maps to the $4,000 sprint).

export const SEVERITIES = ['critical', 'high', 'medium', 'low', 'info'];
export const SEVERITY_RANK = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
export const SCORE_PENALTY = { critical: 25, high: 10, medium: 4, low: 1, info: 0 };

export const CATALOG = {
  // 1. Secrets -----------------------------------------------------------
  'secret.pattern': {
    category: 'secrets', severity: 'high', effort: 'S',
    title: 'Credential found in source',
    why: 'Anyone who can read this repository (or the shipped JavaScript, if this file reaches the browser) can use this credential as you: spend money, read data or send messages in your name. Keys pushed to git stay in the history even after the line is deleted.',
    fix: 'Rotate the credential, remove it from the code, read it from a server-side environment variable, and purge it from git history if the repo was ever shared.',
  },
  'secret.generic-high-entropy': {
    category: 'secrets', severity: 'medium', effort: 'S',
    title: 'Hard-coded credential-like value',
    why: 'A long random-looking value assigned to a name like SECRET, TOKEN or PASSWORD is usually a real credential. Hard-coded credentials leak through git history, screenshots, AI chats and shared zips.',
    fix: 'Confirm what it is. If it is real, rotate it, load it from an environment variable on the server, and keep it out of client code.',
  },

  // 2. Environment variables ----------------------------------------------
  'env.client-exposed-secret': {
    category: 'env', severity: 'high', effort: 'M',
    title: 'Secret-looking env var exposed to the browser',
    why: 'Variables that start with VITE_, NEXT_PUBLIC_, REACT_APP_ or EXPO_PUBLIC_ are copied into the JavaScript bundle at build time. Anyone can open the browser dev tools and read them. A paid API key or secret here lets strangers run up your bill or reach your data.',
    fix: 'Rename the variable without the public prefix, move the code that uses it into a server function (Supabase Edge Function, Next.js route handler, Vercel/Netlify function), and rotate the current key because it has already shipped to browsers.',
  },
  'env.dotenv-committed': {
    category: 'env', severity: 'critical', effort: 'S',
    title: '.env file in the repo with real-looking secrets',
    why: 'Environment files hold the keys to your database, payments and AI accounts. If the file is in git, everyone with repo access (and anyone the repo is ever shared with, including AI builders and contractors) has those keys, and they stay in the history.',
    fix: 'Rotate every key in the file, untrack it (`git rm --cached <file>`), add `.env*` and `!.env.example` to .gitignore, keep a `.env.example` with placeholders, and set the real values in Vercel/Netlify/Supabase environment settings.',
  },
  'env.dotenv-no-secrets': {
    category: 'env', severity: 'low', effort: 'S',
    title: '.env file in the repo (no real-looking secrets found)',
    why: 'Committed env files are where secrets end up next. Even without secrets today, the next person to paste a key in will commit it.',
    fix: 'Untrack the file (`git rm --cached <file>`), add `.env*` and `!.env.example` to .gitignore, and keep only a `.env.example` with placeholders.',
  },
  'env.dotenv-local-only': {
    category: 'env', severity: 'info', effort: 'S',
    title: '.env file present locally but not tracked by git',
    why: 'This file is in your working copy but not in the git index, so it was probably created locally. It was still scanned for secrets.',
    fix: 'Nothing to do if it was never committed. Confirm with `git log --all -- <file>` that it is not in history.',
  },
  'env.example-real-values': {
    category: 'env', severity: 'high', effort: 'S',
    title: 'Example env file contains real-looking values',
    why: 'Example env files are meant to be committed and shared, so anything real in them is effectively public.',
    fix: 'Replace the values with placeholders, rotate the real keys, and keep real values only in the hosting provider settings.',
  },
  'env.gitignore-missing-env': {
    category: 'env', severity: 'medium', effort: 'S',
    title: '.gitignore does not exclude .env files',
    why: 'Without this rule the next `git add .` (or an AI builder sync) commits your secrets to the repository.',
    fix: 'Add `.env`, `.env.*` and `!.env.example` to .gitignore.',
  },

  // 3. Supabase ----------------------------------------------------------
  'supabase.service-role-in-client': {
    category: 'supabase', severity: 'critical', effort: 'M',
    title: 'Supabase service_role key referenced in client-side code',
    why: 'The service_role key bypasses every Row Level Security policy. If it ships to the browser, any visitor can read, change or delete every row in your database and every file in storage.',
    fix: 'Remove it from client code and from public env vars. Use the anon key in the browser and move privileged operations into a Supabase Edge Function or server route that verifies the user first. Rotate the service_role key (Supabase dashboard > Project Settings > API) since it has been exposed.',
  },
  'supabase.service-role-jwt': {
    category: 'supabase', severity: 'critical', effort: 'M',
    title: 'Supabase service_role key hard-coded',
    why: 'This JWT decodes to role "service_role", which bypasses all Row Level Security. Anyone holding it has full read/write access to your database and storage.',
    fix: 'Rotate the key now (Supabase dashboard > Project Settings > API: roll the JWT secret or switch to new API keys), remove it from the code, and keep it only in server-side environment variables used by Edge Functions or server routes.',
  },
  'supabase.rls-missing': {
    category: 'supabase', severity: 'high', effort: 'S',
    title: 'Table without Row Level Security',
    why: 'Supabase exposes every table in the public schema through its REST API using the anon key that ships in your app. Without RLS, anyone can read, and often write, the whole table with a single HTTP request.',
    fix: 'Add a migration that runs `alter table public.<table> enable row level security;` and create explicit policies per operation (for example `using (auth.uid() = user_id)`). Test as an anonymous user and as a second user.',
  },
  'supabase.rls-disabled': {
    category: 'supabase', severity: 'high', effort: 'S',
    title: 'Row Level Security explicitly disabled',
    why: 'With RLS disabled, the table is fully readable and writable by anyone holding the public anon key.',
    fix: 'Re-enable RLS in a new migration and add explicit, owner-scoped policies.',
  },
  'supabase.policy-always-true': {
    category: 'supabase', severity: 'high', effort: 'S',
    title: 'RLS policy that matches every row (true)',
    why: '`using (true)` / `with check (true)` makes the policy match every row for every caller it applies to. For writes, any user (often anyone) can change or delete other people\'s data; for private tables, anyone can read all of it.',
    fix: 'Replace `true` with an ownership check such as `auth.uid() = user_id`, restrict the role with `to authenticated`, and use separate policies for reads and writes.',
  },
  'supabase.policy-unrestricted': {
    category: 'supabase', severity: 'high', effort: 'S',
    title: 'RLS policy only checks that the caller is logged in',
    why: 'A policy such as `using (auth.uid() is not null)` or `auth.role() = \'authenticated\'` does not tie rows to their owner. Anyone can sign up, so any user can change or delete every row (for writes) or read all of it (for private tables).',
    fix: 'Compare the row to the caller, for example `using ((select auth.uid()) = user_id)` and the same `with check`, or check a role in a roles table for admin-only access. Test as a second ordinary user.',
  },
  'supabase.storage-policy-open': {
    category: 'supabase', severity: 'high', effort: 'S',
    title: 'Storage policy with no owner check',
    why: 'A storage.objects policy that only tests `bucket_id` (or only that the caller is logged in) applies to every file in the bucket. Without `to authenticated` it also covers logged-out visitors. A private bucket only means there is no public URL; the Storage API still follows these policies.',
    fix: 'Add `to authenticated` and an owner check, for example `bucket_id = \'documents\' and (storage.foldername(name))[1] = (select auth.uid())::text`, and upload files under a folder named after the user id.',
  },
  'supabase.view-bypasses-rls': {
    category: 'supabase', severity: 'medium', effort: 'S',
    title: 'View in the public schema bypasses RLS',
    why: 'On Postgres 15 (Supabase), a view runs with its owner\'s rights unless it is created with `security_invoker = true`. The REST API exposes views in public, so the view returns rows that RLS would hide on the underlying tables. The Supabase security advisor reports this as an error (security_definer_view).',
    fix: 'Recreate the view with `create view ... with (security_invoker = true) as ...` or run `alter view public.<view> set (security_invoker = true)`. If it must stay a definer view, move it out of the public schema or `revoke select on public.<view> from anon, authenticated`.',
  },
  'supabase.demo-service-role-key': {
    category: 'supabase', severity: 'info', effort: 'S',
    title: 'Supabase CLI demo service_role key (local development only)',
    why: 'This is the published service_role key of the Supabase CLI local stack (issuer "supabase-demo"). It only works against a local Supabase, so it is not a leak. It is a problem only on a self-hosted Supabase that still uses the default JWT secret.',
    fix: 'Nothing to do for local development. If the app talks to a self-hosted Supabase, confirm it uses its own JWT secret and keys.',
  },
  'supabase.policy-anon-write': {
    category: 'supabase', severity: 'high', effort: 'S',
    title: 'RLS policy lets anonymous users write',
    why: 'Policies granted `to anon` apply to people who are not logged in. Anonymous writes invite spam, data tampering and storage abuse.',
    fix: 'Use `to authenticated` with an ownership check. If anonymous submissions are truly needed (a contact form), route them through an Edge Function with validation and rate limiting instead.',
  },
  'supabase.security-definer-search-path': {
    category: 'supabase', severity: 'medium', effort: 'S',
    title: 'security definer function without a fixed search_path',
    why: 'Security definer functions run with the owner\'s privileges (usually postgres). Without a fixed search_path a caller can shadow tables or functions and make it run attacker-chosen code. The Supabase security advisor flags this.',
    fix: 'Add `set search_path = \'\'` and fully qualify names (public.table), or `set search_path = public, pg_temp`. Revoke execute from anon if the function is not meant for logged-out users.',
  },
  'supabase.public-bucket': {
    category: 'supabase', severity: 'medium', effort: 'S',
    title: 'Public storage bucket',
    why: 'Files in a public bucket can be downloaded by anyone who has or guesses the URL, with no policy check. Fine for logos and marketing images, not for user uploads, invoices or IDs.',
    fix: 'Make the bucket private (`public = false`), add storage.objects policies scoped to the owner\'s folder, and serve files through signed URLs.',
  },
  'supabase.no-migrations': {
    category: 'supabase', severity: 'info', effort: 'S',
    title: 'No Supabase migrations in the repo: export policies from the dashboard',
    why: 'RLS settings and policies live in the database, not in this repo, so this tool cannot see them. Most Supabase data leaks come from missing or overly broad policies.',
    fix: 'Run the read-only queries in the "Supabase export queries" appendix in the Supabase SQL editor and review every table and policy, or run `supabase db pull` and commit the schema as migrations.',
  },

  // 4. Stripe ------------------------------------------------------------
  'stripe.secret-in-client': {
    category: 'stripe', severity: 'critical', effort: 'M', tier4: 'payments',
    title: 'Stripe secret key or server SDK used in client-side code',
    why: 'The Stripe secret key can create charges, issue refunds, read customer data and change account settings. Anything in client code ships to every visitor\'s browser.',
    fix: 'Create Checkout Sessions / PaymentIntents in a server function and use only the publishable key (pk_...) with @stripe/stripe-js in the browser. Roll the secret key in the Stripe dashboard.',
  },
  'stripe.webhook-no-signature': {
    category: 'stripe', severity: 'high', effort: 'S',
    title: 'Stripe webhook handler does not verify the signature',
    why: 'Without `stripe.webhooks.constructEvent`, anyone can POST a fake `checkout.session.completed` event to this URL and get paid features, credits or orders for free.',
    fix: 'Read the raw request body, call `stripe.webhooks.constructEvent(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET)` (use `constructEventAsync` in Deno / Edge runtimes), and return 400 when it throws.',
  },
  'stripe.webhook-optional-verification': {
    category: 'stripe', severity: 'high', effort: 'S',
    title: 'Stripe webhook skips signature verification in some cases',
    why: 'The handler only verifies the signature when the signature header or secret is present, or falls back to parsing the body when verification fails. An attacker leaves out the stripe-signature header and posts a fake `checkout.session.completed` event to get paid features for free.',
    fix: 'Always call `stripe.webhooks.constructEvent(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET)`. Return 400 when the header or secret is missing or verification throws, and remove the JSON.parse / req.json() fallback.',
  },
  'stripe.webhook-parsed-body': {
    category: 'stripe', severity: 'medium', effort: 'S',
    title: 'Webhook body parsed as JSON before signature verification',
    why: 'Signature verification needs the exact raw bytes Stripe sent. Parsing JSON first makes verification fail (so people switch it off) or verifies a re-serialized body.',
    fix: 'Use `await req.text()` (Next.js route handlers, Deno) or `express.raw({ type: "application/json" })` for this route, set `export const config = { api: { bodyParser: false } }` for Next.js pages/api, and pass the raw body to constructEvent.',
  },
  'stripe.webhook-no-idempotency': {
    category: 'stripe', severity: 'low', effort: 'S',
    title: 'Webhook handler does not de-duplicate events',
    why: 'Stripe retries webhooks and can deliver the same event more than once. Without tracking event IDs a customer can get double credits, duplicate orders or duplicate emails.',
    fix: 'Store processed `event.id` values in a table with a unique constraint (insert first, skip if it already exists), or make fulfillment an upsert keyed by the session or payment ID.',
  },
  'stripe.client-fulfillment': {
    category: 'stripe', severity: 'high', effort: 'M', tier4: 'payments',
    title: 'Payment fulfilled from the client-side success page',
    why: 'The success page is just a URL: anyone can open it without paying, or replay it. If the browser closes before it loads, paying customers never get what they bought. It also means browser users are allowed to set their own paid flag.',
    fix: 'Move fulfillment into the verified webhook handler (`checkout.session.completed`), make paid/plan columns writable only by the server (no client update policy on them, or a separate table), and have the success page only read the status.',
  },

  // 5. Auth --------------------------------------------------------------
  'auth.service-role-no-user-check': {
    category: 'auth', severity: 'high', effort: 'M',
    title: 'Server endpoint uses the service_role key without verifying the caller',
    why: 'This endpoint runs with full database access but never checks who is calling it. Anyone who finds the URL can read or modify other users\' data.',
    fix: 'Read the `Authorization: Bearer <jwt>` header, call `supabase.auth.getUser(jwt)` (or use the user-scoped client from @supabase/ssr), return 401 when it fails, and scope every query to that user. Use service_role only for the specific operations that need it.',
  },
  'auth.signup-no-email-confirmation': {
    category: 'auth', severity: 'low', effort: 'S',
    title: 'Sign-up flow with no sign of email confirmation',
    why: 'Without email confirmation, people can register with someone else\'s address and bots can create unlimited accounts.',
    fix: 'Turn on "Confirm email" in Supabase Auth settings, pass `emailRedirectTo` to signUp, and show a "check your inbox" state after sign-up.',
  },
  'auth.hardcoded-admin-email': {
    category: 'auth', severity: 'high', effort: 'M',
    title: 'Admin access decided by a hard-coded email',
    why: 'Checks in browser code can be bypassed by editing JavaScript in dev tools, and hard-coded emails reveal who your admins are. Real protection has to happen in the database (RLS) or on the server.',
    fix: 'Store roles in a table (e.g. `user_roles`) or in app_metadata set only by the server, enforce them in RLS policies and server routes, and keep the client check only for hiding UI.',
  },
  'auth.client-only-admin-check': {
    category: 'auth', severity: 'high', effort: 'M', tier4: 'auth',
    title: 'Admin checks only happen in the browser',
    why: 'An `isAdmin` check in React only hides buttons. Nothing on the server or in RLS stops a regular user from calling the same queries directly with their token.',
    fix: 'Add a server-side role model (roles table or app_metadata), enforce it in RLS policies (e.g. an `is_admin()` security definer function) and in server routes, and keep the client check only for UI.',
  },

  // 6. Dangerous code patterns ---------------------------------------------
  'code.dangerous-html': {
    category: 'code', severity: 'medium', effort: 'S',
    title: 'dangerouslySetInnerHTML with dynamic content',
    why: 'Rendering user- or AI-generated HTML without sanitizing lets attackers inject scripts (XSS) that steal sessions and act as your users.',
    fix: 'Render it as text, or sanitize with DOMPurify (`DOMPurify.sanitize(html)`) first; for Markdown use a renderer that escapes HTML.',
  },
  'code.eval': {
    category: 'code', severity: 'medium', effort: 'S',
    title: 'eval() / new Function() in code',
    why: 'Executing strings as code turns any injection into full code execution in the browser or on the server.',
    fix: 'Replace it with a safe alternative: JSON.parse, a small expression parser, or a lookup table.',
  },
  'code.cors-wildcard': {
    category: 'code', severity: 'medium', effort: 'S',
    title: 'CORS allows any origin on a privileged endpoint',
    why: '`Access-Control-Allow-Origin: *` lets any website call this endpoint from a visitor\'s browser. Combined with service-role access or credentials, other sites can trigger privileged actions.',
    fix: 'Allow only your own domains (read an ALLOWED_ORIGINS env var and echo back the matching origin) and verify the caller\'s JWT inside the function.',
  },
  'code.console-log-sensitive': {
    category: 'code', severity: 'low', effort: 'S',
    title: 'Tokens or session data written to logs',
    why: 'Logged tokens end up in browser consoles, Vercel/Supabase logs and error tools, where they can be copied and reused.',
    fix: 'Remove these logs, or log only non-sensitive identifiers such as the user id.',
  },

  // 7. Deploy and hygiene ----------------------------------------------------
  'deploy.no-security-headers': {
    category: 'deploy', severity: 'low', effort: 'S',
    title: 'No security headers configured',
    why: 'Headers like Content-Security-Policy, frame-ancestors / X-Frame-Options, Strict-Transport-Security and Referrer-Policy block clickjacking and limit the damage of XSS. Hosting defaults do not add them.',
    fix: 'Add a `headers` block in vercel.json, `headers()` in next.config, `[[headers]]` in netlify.toml, or a `public/_headers` file.',
  },
  'deploy.production-source-maps': {
    category: 'deploy', severity: 'medium', effort: 'S',
    title: 'Source maps published in production',
    why: 'Public source maps hand anyone your original source code, including comments, internal endpoints and business logic, which makes weaknesses much easier to find.',
    fix: 'Turn off `productionBrowserSourceMaps` / `build.sourcemap` (or use "hidden" maps uploaded only to Sentry and deleted from the deploy).',
  },
  'deploy.no-error-monitoring': {
    category: 'deploy', severity: 'low', effort: 'S',
    title: 'No error monitoring',
    why: 'When something breaks for real users (failed payments, broken sign-ups) you will not know until someone complains.',
    fix: 'Add Sentry (or similar) to the front end and server functions, with PII scrubbing turned on.',
  },
  'deploy.no-tests': {
    category: 'deploy', severity: 'low', effort: 'M',
    title: 'No automated tests',
    why: 'Every AI re-prompt or dependency update can silently break auth, payments or data access. Tests catch regressions before users do.',
    fix: 'Start with a few high-value tests: RLS (anonymous and other users cannot read private rows), webhook signature rejection, and a smoke test of sign-up and checkout.',
  },
  'deploy.no-lockfile': {
    category: 'deploy', severity: 'low', effort: 'S',
    title: 'package.json without a lockfile',
    why: 'Without a lockfile every install can pull different dependency versions, so builds are not reproducible and a compromised package update can slip in.',
    fix: 'Run your package manager install and commit the lockfile; use `npm ci` (or equivalent) in CI and on the host.',
  },
  'deploy.outdated-major': {
    category: 'deploy', severity: 'low', effort: 'M',
    title: 'Outdated major version',
    why: 'Old major versions stop receiving security fixes, and the longer an upgrade waits the bigger and riskier it gets.',
    fix: 'Plan an upgrade on a branch with the framework\'s migration guide and run the app and tests before merging.',
  },
};

export function catalogEntry(id) {
  return CATALOG[id] || (id.startsWith('secret.') ? CATALOG['secret.pattern'] : null);
}
