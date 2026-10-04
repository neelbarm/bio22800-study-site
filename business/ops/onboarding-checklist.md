# Onboarding checklist

Use this the moment a client pays for a diagnosis, sprint deposit or retainer. Principle from the brief: **client owns all accounts; we get collaborator access, staging only where possible, removed at handover. Never put service-role keys in an AI agent's environment.**

## 0. Paperwork (before access)

- [ ] Payment received (diagnosis 100%, sprint 50% deposit, retainer first month).
- [ ] MSA accepted (signature, email confirmation, or Payment Link that references it). Marketplace clients: platform contract in place.
- [ ] SOW accepted with SOW number.
- [ ] NDA signed if the client asked (`../legal/nda-mutual.md`).
- [ ] DPA signed if the client asked (`../legal/dpa-lite.md`).
- [ ] Client confirmed in writing they own the app or are authorized to grant access.
- [ ] Client confirmed a current backup exists (Supabase plan backups or a manual `pg_dump` they hold).
- [ ] Create the client folder: `clients/[client-slug]/` (outside any public repo) with `notes.md`, `findings/`, `report/`.

## 1. Access requests

Ask for the least access that lets you do the job. Send the kickoff message (Section 4) with this list.

### GitHub
- [ ] Repo in a GitHub **organization**: client adds you with **Read** access for a diagnosis, **Write** for sprints.
- [ ] Repo on a **personal account**: GitHub only offers collaborators **Write** access on private personal repos. Accept it and don't push during a diagnosis, or ask for a zip export instead.
- [ ] Alternative: client adds you to their org with access to this repo only.
- [ ] Branch protection on `main` stays on; you work through pull requests.
- [ ] If the app lives only in a builder (Lovable, Bolt, etc.): client connects or exports it to a GitHub repo they own first.

### Supabase
- [ ] Preferred: access to a **staging project** (a copy of the schema, not real user data).
- [ ] Production: the **Read-only** role (and project-scoped roles) exists only on Supabase **Team and Enterprise** plans. On Free and Pro, any invite, Developer included, reaches every project in that organization, production too. On those plans ask for a staging project in a **separate organization** and an invite there, or use the SQL fallback below.
- [ ] If neither is possible: client runs the SQL queries from `diagnosis-runbook.md` and shares results, or shares screen on a call.
- [ ] Do **not** ask for the service-role key for a diagnosis. For a sprint, use the Supabase CLI with your own login against staging; never place a service-role key in Claude Code's environment, `.env` files the agent reads, or prompts.

### Hosting (Vercel / Netlify)
- [ ] Vercel: invite to the team as a Member (or Viewer for a diagnosis) on the project; or the client lists env var **names** (not values) and shares a screenshot of project settings.
- [ ] Netlify: team member invite, or same screenshot fallback.
- [ ] Confirm which branch deploys to production and whether preview deployments are protected.

### Stripe (if used)
- [ ] For a diagnosis: read-only teammate role (e.g. "View only" or "Analyst") or screenshots of Developers > Webhooks and API keys pages (keys masked).
- [ ] For a sprint: test-mode access only. If they need a restricted key, the client creates it with minimum permissions.

### Other
- [ ] Sentry: client creates the org (free tier is fine) and invites you, at sprint start.
- [ ] Test accounts: two normal user accounts (User A and User B) and one admin account on staging, to test cross-user access.
- [ ] Domain/DNS: only if the sprint includes production deploy or email setup.

## 2. Secure credential handling

- [ ] Credentials arrive only through a **1Password share link** (or Bitwarden Send, or a similar expiring, view-limited link). Never in chat, email, Upwork/Fiverr messages, Loom, or a GitHub issue.
- [ ] If a client pastes a secret in chat anyway: do not use it, ask them to rotate it, and delete the message where the platform allows.
- [ ] Store anything you must keep in a dedicated 1Password vault named `client-[slug]`.
- [ ] Enable MFA on every account you use for client work.
- [ ] No production personal data or production secret keys in AI tools. Use staging data, or anonymized samples.
- [ ] Keep an access log in `clients/[slug]/notes.md`: what access, granted when, by whom.
- [ ] At handover: remove yourself from every service, delete the vault, delete local clones and any data exports, and send the client the access-removal checklist from `handover-template.md`.

## 3. Day-0 setup (your side)

- [ ] Clone the repo into `clients/[slug]/repo` (diagnosis: read-only use).
- [ ] Note the commit SHA at start in the SOW and notes.
- [ ] Create a calendar block for the delivery deadline (48h for diagnosis).
- [ ] Add the client to `metrics-tracker.md`.

## 4. Kickoff message template

> Subject: [APP NAME] x ShipReady: kickoff and access checklist
>
> Hi [FIRST NAME],
>
> Thanks for booking the [Ship-Ready Diagnosis / Fix & Ship Sprint / retainer]. Payment received, so we're all set. Here's how this works:
>
> **Timeline:** the clock starts once I have the access below. You'll get [the written report, a Loom walkthrough and a fixed-price fix quote within 48 hours / the first pull requests within X days].
>
> **Access I need (all on accounts you own; I'll be removed at the end):**
> 1. GitHub: add me (`[GITHUB USERNAME]`) as a collaborator on the repo. [Diagnosis: if the repo is in a GitHub organization, Read access is enough. On a personal account GitHub only offers Write access; that's fine, I won't push anything during the diagnosis. A zip export also works. / Sprint: Write access.]
> 2. Supabase: invite `[EMAIL]` to [a staging project in its own organization / your project as Read-only (Team and Enterprise plans only)]. On Free and Pro plans an invite gives access to every project in the organization, production included, so if you don't have a separate staging organization, tell me and I'll send you a few SQL queries to run instead.
> 3. [Vercel / Netlify]: invite `[EMAIL]` to the project, or send a screenshot of the environment variable *names* (not values).
> 4. [Stripe: a view-only teammate invite, or screenshots of the Webhooks page.]
> 5. Two test user accounts on [staging / the live app] so I can check that users can't see each other's data.
>
> **Please don't send passwords or API keys in chat or email.** If I need a credential, I'll send you a secure link to drop it into, and I'll never ask for your Supabase service-role key or Stripe live secret key for a diagnosis.
>
> **Before I start:** please confirm (1) you own the app or are authorized to have it tested, and (2) you have a recent database backup.
>
> **One request:** while I'm working, please avoid re-prompting the builder on [auth / database / payments] so we're both looking at the same code.
>
> I work async, so the best way to reach me is [CHANNEL]. I'll reply within [X] hours on business days.
>
> Thanks,
> [YOUR NAME]
> ShipReady
