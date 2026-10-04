# Handover: [APP NAME]

| | |
|---|---|
| Client | [CLIENT NAME] |
| Engagement | [Fix & Ship Sprint (tier) / Wire-It-Up / Retainer end], SOW [SOW-YYYY-NNN] |
| Prepared by | [YOUR NAME], ShipReady |
| Handover date | [DATE] |
| Final code version | [REPO] @ [COMMIT SHA] on [BRANCH] |
| Production URL | [URL] |

## 1. Summary

[3-4 sentences: what was fixed, what state the app is in now, the most important thing for the client to keep doing.]

## 2. What changed

| ID | Issue | Severity | Pull request | Status | Acceptance criterion met |
|---|---|---|---|---|---|
| F-01 | [Issue] | Critical | [PR link] | Merged, deployed [date] | Yes: [how verified] |
| F-02 | [Issue] | High | [PR link] | Merged, deployed [date] | Yes |
| ... | | | | | |

Also delivered: [Sentry set up on your account; rate limits on X; CI workflow; Playwright tests].

## 3. Database changes (Supabase)

| Migration file | What it does | Rollback script | Applied to staging | Applied to production |
|---|---|---|---|---|
| `supabase/migrations/[TS]_enable_rls_profiles.sql` | Enables RLS, owner-only policies on `profiles` | `supabase/rollback/[TS]_enable_rls_profiles.down.sql` | [date] | [date] |

**Warning:** rollback scripts re-open the original problems. Use only in an emergency and contact us first if possible.

## 4. Secrets and environment variables

Values are **never** written here. Names and where they live:

| Name | Where set | Environments | Server-only? | Notes |
|---|---|---|---|---|
| [SUPABASE_SECRET_KEY] | Vercel | Production | Yes | Rotated [date] |
| [STRIPE_SECRET_KEY] | Vercel | Production (live), Preview (test) | Yes | Rotated [date] |
| [STRIPE_WEBHOOK_SECRET] | Vercel | Production, Preview | Yes | |
| [NEXT_PUBLIC_SUPABASE_URL] | Vercel | All | No (public by design) | |
| [NEXT_PUBLIC_SUPABASE_ANON_KEY] | Vercel | All | No (public by design; protected by RLS) | |
| [SENTRY_DSN / SENTRY_AUTH_TOKEN] | Vercel | All | Token: yes | |

**Rotations done:** [key name, date, old key revoked yes/no]. **Rule going forward:** anything prefixed `NEXT_PUBLIC_` or `VITE_` is visible to every visitor. Never put a secret there.

## 5. How to run and test

```bash
npm install
npm run dev                       # local dev
npm test                          # unit tests
npx playwright test               # end-to-end smoke tests
BASE_URL=https://[url] npx playwright test   # against a preview or production
supabase start && supabase db reset          # local database with all migrations
```

Tests run automatically on pull requests via [GitHub Actions workflow name].

## 6. How to deploy and roll back

- **Deploy:** merge to `[main]`; [Vercel / Netlify] deploys production automatically. Every PR gets a preview link.
- **Roll back code:** [Vercel: Deployments > previous deployment > Instant Rollback / Netlify: Deploys > previous deploy > Publish deploy].
- **Roll back database:** run the matching rollback script in the SQL editor (see section 3), after a backup.
- **Backups:** [Supabase plan backups daily / PITR / manual]. Restore steps: [link or steps].

## 7. Monitoring

- **Errors:** Sentry project [NAME]; alerts go to [EMAILS].
- **Uptime:** [tool and who gets alerts / none: recommended].
- **Rate limits:** [endpoints and limits, e.g. "/api/ai: 20 requests per minute per user"].

## 8. Do not re-prompt over these

AI builder re-prompts can silently overwrite the fixes below. Before asking [BUILDER] to change these areas, check the diff or ask us:

| File or area | Why it matters |
|---|---|
| `supabase/migrations/*` and any table settings | RLS policies protect user data |
| `[app/api/stripe/webhook/route.ts]` | Signature check and duplicate-event protection |
| `[lib/supabase/server.ts]` | Secret key used only on the server |
| `[middleware.ts]` | Rate limits and auth checks |
| Environment variables in [Vercel / Netlify] | Moving a secret to a `NEXT_PUBLIC_` / `VITE_` name exposes it |

**Quick self-check after any big re-prompt:** run the free scan at [SITE URL] and `npx playwright test`. If anything fails, contact us.

## 9. Open risks and recommendations

| Item | Severity | Recommendation | Effort / price |
|---|---|---|---|
| [F-04: description] | Medium | [What to do] | [S / covered by retainer] |
| [Major upgrade pending: Next.js X] | Low | [Schedule] | [M] |

## 10. Access removal checklist

ShipReady's access is removed at handover. Please confirm each item (or we confirm it for you where we can):

- [ ] GitHub: `[GITHUB USERNAME]` removed as collaborator (Settings > Collaborators)
- [ ] Supabase: `[EMAIL]` removed from the organization (Organization > Team)
- [ ] [Vercel / Netlify]: `[EMAIL]` removed from the team
- [ ] Stripe: `[EMAIL]` teammate removed; any restricted key created for us revoked
- [ ] Sentry: `[EMAIL]` removed (or kept, if on retainer)
- [ ] Any password-manager share links expired; any credentials you shared with us rotated
- [ ] ShipReady confirms: local clones, data exports and stored credentials deleted on [DATE]

[If on retainer: access kept under the retainer SOW until it ends.]

## 11. Support after handover

- Defects in the delivered fixes reported within **14 days** of acceptance are fixed at no charge, as long as the code hasn't been changed since (including by builder re-prompts).
- Re-fixing work overwritten by a builder re-prompt is covered only by the **Maintain & Extend retainer** ($500 / $1,000 / $1,500 per month), which also includes dependency updates, Supabase advisor checks, uptime monitoring and small requests.
- Anything else: $150/hour or a fixed quote.

Contact: [YOUR EMAIL] / [CHANNEL]

*Handover reflects the state of the app at the commit above. It is not a guarantee of security.*
