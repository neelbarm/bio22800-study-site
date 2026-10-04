import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { audit } from '../lib/audit.mjs';
import { renderMarkdown, renderHtml, renderJson } from '../lib/report.mjs';
import { materialize, cleanup, leakedSecrets } from './helpers.mjs';

let vulnDir;
let cleanDir;
let vuln;
let clean;

before(() => {
  vulnDir = materialize('vulnerable-vite-app');
  cleanDir = materialize('clean-next-app');
  vuln = audit(vulnDir);
  clean = audit(cleanDir);
});
after(() => {
  cleanup(vulnDir);
  cleanup(cleanDir);
});

const find = (r, id, pred = () => true) => r.findings.filter((f) => f.id === id && pred(f));
const one = (r, id, pred) => {
  const hits = find(r, id, pred);
  assert.ok(hits.length >= 1, `expected finding ${id}; got: ${r.findings.map((f) => f.id).join(', ')}`);
  return hits[0];
};

test('every finding has the required fields', () => {
  for (const f of vuln.findings) {
    for (const key of ['id', 'severity', 'title', 'file', 'evidence', 'why', 'fix', 'effort']) assert.ok(key in f, `${f.id} missing ${key}`);
    assert.ok(['critical', 'high', 'medium', 'low', 'info'].includes(f.severity));
    assert.ok(['S', 'M', 'L'].includes(f.effort));
    assert.ok(f.why.length > 20 && f.fix.length > 20, `${f.id} needs why/fix text`);
  }
});

test('vulnerable app: secrets and client-exposed env vars', () => {
  assert.equal(one(vuln, 'secret.stripe-secret-live').severity, 'critical');
  assert.equal(one(vuln, 'secret.stripe-secret-live').file, 'src/lib/stripe.ts');
  assert.equal(one(vuln, 'secret.openai-key').file, '.env');
  const env = one(vuln, 'env.client-exposed-secret', (f) => f.title.includes('VITE_OPENAI_API_KEY'));
  assert.equal(env.severity, 'critical');
  assert.equal(one(vuln, 'env.dotenv-committed').severity, 'critical');
  assert.equal(one(vuln, 'env.gitignore-missing-env').severity, 'medium');
});

test('vulnerable app: Supabase service role, RLS, policies, buckets, functions', () => {
  const jwt = one(vuln, 'supabase.service-role-jwt');
  assert.equal(jwt.severity, 'critical');
  assert.equal(jwt.file, 'src/integrations/supabase/client.ts');
  assert.equal(jwt.line, 5);
  const rls = one(vuln, 'supabase.rls-missing');
  assert.equal(rls.severity, 'high');
  assert.match(rls.title, /public\.orders/);
  assert.equal(find(vuln, 'supabase.rls-missing').length, 1, 'profiles and messages enable RLS');
  const always = find(vuln, 'supabase.policy-always-true');
  assert.equal(always.length, 2);
  assert.ok(always.some((f) => /update/.test(f.title)));
  assert.ok(always.some((f) => /read every row/.test(f.title)));
  assert.ok(always.every((f) => f.severity === 'high'));
  assert.match(one(vuln, 'supabase.policy-anon-write').title, /public\.messages/);
  assert.equal(one(vuln, 'supabase.public-bucket').severity, 'medium');
  assert.match(one(vuln, 'supabase.public-bucket').title, /avatars/);
  assert.equal(one(vuln, 'supabase.security-definer-search-path').severity, 'medium');
  assert.equal(find(vuln, 'supabase.no-migrations').length, 0);
});

test('vulnerable app: Stripe', () => {
  const hook = one(vuln, 'stripe.webhook-no-signature');
  assert.equal(hook.severity, 'high');
  assert.equal(hook.file, 'supabase/functions/stripe-webhook/index.ts');
  assert.equal(one(vuln, 'stripe.webhook-no-idempotency').severity, 'low');
  assert.equal(one(vuln, 'stripe.client-fulfillment').file, 'src/pages/PaymentSuccess.tsx');
  assert.equal(one(vuln, 'stripe.secret-in-client').severity, 'critical');
});

test('vulnerable app: auth, dangerous code and deploy hygiene', () => {
  assert.equal(one(vuln, 'auth.service-role-no-user-check').file, 'supabase/functions/admin-users/index.ts');
  assert.equal(one(vuln, 'auth.hardcoded-admin-email').severity, 'high');
  assert.equal(one(vuln, 'auth.signup-no-email-confirmation').severity, 'low');
  assert.equal(one(vuln, 'code.dangerous-html').severity, 'medium');
  assert.equal(one(vuln, 'code.eval').severity, 'medium');
  assert.equal(one(vuln, 'code.cors-wildcard').file, 'supabase/functions/_shared/cors.ts');
  assert.equal(one(vuln, 'code.console-log-sensitive').severity, 'low');
  assert.equal(one(vuln, 'deploy.production-source-maps').file, 'vite.config.ts');
  for (const id of ['deploy.no-security-headers', 'deploy.no-error-monitoring', 'deploy.no-tests', 'deploy.no-lockfile']) {
    assert.equal(one(vuln, id).severity, 'low', id);
  }
});

test('vulnerable app: score, counts and fix plan', () => {
  assert.equal(vuln.score, 0);
  assert.ok(vuln.counts.critical >= 5);
  assert.ok(vuln.counts.high >= 6);
  assert.equal(vuln.fixPlan.tier.price, 4000);
  assert.ok(vuln.fixPlan.issues.length > 10);
  assert.deepEqual(vuln.stack.slice(0, 2), ['Vite', 'React']);
});

test('evidence is masked and no report format leaks a full fake secret', () => {
  const stripe = one(vuln, 'secret.stripe-secret-live');
  assert.match(stripe.evidence, /sk_liv\*{8}FAKE/);
  assert.match(one(vuln, 'supabase.service-role-jwt').evidence, /eyJhbG\*{8}/);
  for (const out of [renderJson(vuln), renderMarkdown(vuln), renderHtml(vuln)]) {
    assert.deepEqual(leakedSecrets(out), []);
  }
});

test('clean app: no actionable findings, score 100, no sprint', () => {
  const actionable = clean.findings.filter((f) => f.severity !== 'info');
  assert.deepEqual(actionable.map((f) => `${f.id} ${f.file}:${f.line}`), []);
  assert.equal(clean.score, 100);
  assert.equal(clean.fixPlan.tier, null);
  assert.ok(clean.stack.includes('Next.js'));
});

test('reports contain the required sections', () => {
  const md = renderMarkdown(vuln);
  for (const heading of ['# ShipReady audit:', '## Findings', '### Critical', '## Fix plan', '## Manual checks the tool cannot do', '## Appendix: Supabase export queries']) {
    assert.ok(md.includes(heading), heading);
  }
  assert.match(md, /\*\*Ship-ready score:\*\* \*\*0 \/ 100\*\*/);
  assert.match(md, /\$4,000/);
  assert.match(md, /pg_policies/);
  const html = renderHtml(vuln);
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /prefers-color-scheme: dark/);
  assert.match(html, /@media print/);
  assert.ok(!/<script/i.test(html), 'report HTML is static');
  assert.ok(!/(src|href)=["']https?:/i.test(html), 'report HTML is self-contained');
});
