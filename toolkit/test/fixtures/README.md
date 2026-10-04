# Test fixtures: FAKE apps, FAKE keys

Everything under this folder is a deliberately small, fake app used by the
`shipready-audit` tests. **None of it is a real project and none of it contains
real credentials.**

- `vulnerable-vite-app/`: a Vite + Supabase + Stripe app with the classic
  AI-builder mistakes (service_role key in `src/`, a table without RLS,
  `using (true)` policies, an anon write policy, a public bucket, a Stripe
  webhook without `constructEvent`, `VITE_OPENAI_API_KEY` in a committed `.env`,
  client-side payment fulfillment, ...).
- `clean-next-app/`: a Next.js + Supabase + Stripe app that should produce no
  actionable findings.

## Why there are no key-shaped strings in these files

Secret scanners (GitHub push protection included) block anything that looks
like a key, fake or not. So the fixture files only contain placeholders such as
`{{FAKE_STRIPE_LIVE}}`, `{{FAKE_OPENAI}}`, `{{FAKE_SERVICE_ROLE_JWT}}` and
`{{FAKE_ANON_JWT}}`. At test time `test/helpers.mjs` copies a fixture into a
temporary directory (`os.tmpdir()`), builds obviously fake values by string
concatenation (e.g. the Stripe prefix + `FAKE` + mixed filler + `FAKE`; a bare
`FAKEFAKE...` run would be treated as a documentation placeholder and ignored),
substitutes them, and
renames `dot-*` files to dot-files (`dot-env` -> `.env`, `dot-gitignore` ->
`.gitignore`) so the parent repo's `.gitignore` does not swallow them.

Do not paste real keys here. Do not "fix" the vulnerable fixture: the tests
depend on every mistake in it. The `.ts`/`.tsx` files are never compiled or run.
