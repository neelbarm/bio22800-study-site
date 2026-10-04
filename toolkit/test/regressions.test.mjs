// Regression tests for confirmed false negatives, false positives and leaks.
// Every key-shaped value is assembled at runtime; no fixture file contains one.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { audit } from '../lib/audit.mjs';
import { renderMarkdown, renderHtml, renderJson } from '../lib/report.mjs';
import { redact, snippet, isPlaceholderSecret } from '../lib/patterns.mjs';
import { openExpr } from '../lib/sql.mjs';
import { isClientFile, isServerHandler } from '../lib/context.mjs';
import { makeRepo, cleanup, filler, jwtWith } from './helpers.mjs';

const STRIPE_LIVE = 'sk_' + 'live_';
const WHSEC = 'wh' + 'sec_';
const OPENAI_PROJ = 'sk-' + 'proj-';
const SB_SECRET = 'sb_' + 'secret_';
const SB_PUBLISHABLE = 'sb_' + 'publishable_';

const VITE_PKG = JSON.stringify({ name: 'case', dependencies: { '@supabase/supabase-js': '^2.45.0', react: '^18.3.0', stripe: '^16.0.0' }, devDependencies: { vite: '^5.4.0' } });
const NEXT_PKG = JSON.stringify({ name: 'case', dependencies: { '@supabase/supabase-js': '^2.45.0', '@supabase/ssr': '^0.5.0', next: '^15.0.0', react: '^19.0.0', stripe: '^16.0.0' } });

/** Audit a throwaway repo, then delete it. */
function run(files, name) {
  const dir = makeRepo(files, name);
  try {
    return audit(dir);
  } finally {
    cleanup(dir);
  }
}
const ids = (r) => r.findings.map((f) => f.id);
const of = (r, id) => r.findings.filter((f) => f.id === id);
const reports = (r) => [renderJson(r), renderMarkdown(r), renderHtml(r)];

// ---------------------------------------------------------------------------
// SQL-FN-PERMISSIVE

test('policy classifier: logged-in-only and bucket-only expressions are unrestricted, owner checks are not', () => {
  assert.deepEqual(openExpr('auth.uid() IS NOT NULL'), { who: 'any-user', bucket: null });
  assert.deepEqual(openExpr("(select auth.role()) = 'authenticated'"), { who: 'any-user', bucket: null });
  assert.deepEqual(openExpr("bucket_id = 'documents'"), { who: 'anyone', bucket: 'documents' });
  assert.deepEqual(openExpr("(bucket_id = 'docs') AND ((select auth.uid()) IS NOT NULL)"), { who: 'any-user', bucket: 'docs' });
  assert.equal(openExpr('(select auth.uid()) = user_id'), null);
  assert.equal(openExpr("bucket_id = 'docs' and (storage.foldername(name))[1] = auth.uid()::text"), null);
  assert.equal(openExpr("auth.uid() is not null or owner_id = auth.uid()"), null);
});

const PERMISSIVE_SQL = `
create table public.orders (id uuid primary key, user_id uuid, total int);
alter table public.orders enable row level security;
create policy "Users can update orders" on public.orders for update using (auth.uid() IS NOT NULL);
create policy "Users can delete orders" on public.orders for delete to authenticated using (auth.role() = 'authenticated');
create policy "Users can read orders" on public.orders for select to authenticated using (auth.uid() IS NOT NULL);
create policy "Upload documents" on storage.objects for insert with check (bucket_id = 'documents');
create policy "Delete documents" on storage.objects for delete using (bucket_id = 'documents');
create policy "Read documents" on storage.objects for select using (bucket_id = 'documents');
create view public.order_totals as select user_id, sum(total) as total from public.orders group by user_id;
`;

test('permissive policies, open storage policies and definer views are reported', () => {
  const r = run({ 'package.json': VITE_PKG, 'supabase/migrations/20250101000000_init.sql': PERMISSIVE_SQL }, 'permissive');
  const unrestricted = of(r, 'supabase.policy-unrestricted');
  assert.equal(unrestricted.length, 3, ids(r).join(', '));
  assert.ok(unrestricted.every((f) => f.severity === 'high'));
  assert.ok(unrestricted.some((f) => /any logged-in user update every row/.test(f.title)));
  assert.ok(unrestricted.some((f) => /any logged-in user delete every row/.test(f.title)));
  assert.ok(unrestricted.some((f) => /read every row of a private-looking table/.test(f.title)));
  const storage = of(r, 'supabase.storage-policy-open');
  assert.equal(storage.length, 3);
  assert.ok(storage.every((f) => f.severity === 'high'));
  assert.ok(storage.some((f) => /anyone, including logged-out visitors, insert any file in bucket "documents"/.test(f.title)));
  const view = of(r, 'supabase.view-bypasses-rls');
  assert.equal(view.length, 1);
  assert.equal(view[0].severity, 'high');
  assert.match(view[0].title, /public\.order_totals/);
  assert.ok(r.score < 50);
});

test('owner-scoped policies, folder-scoped storage and security_invoker views stay quiet', () => {
  const sql = `
create table public.orders (id uuid primary key, user_id uuid);
alter table public.orders enable row level security;
create policy "own update" on public.orders for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own read" on public.orders for select to authenticated using ((select auth.uid()) = user_id);
create policy "Catalog is readable" on public.products for select to authenticated using (auth.uid() is not null);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true), ('documents', 'documents', false);
create policy "Avatar images are public" on storage.objects for select using (bucket_id = 'avatars');
create policy "Own documents" on storage.objects for select to authenticated using (bucket_id = 'documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
create view public.order_totals with (security_invoker = true) as select user_id from public.orders;
create view public.recent_orders as select id from public.orders;
alter view public.recent_orders set (security_invoker = on);
`;
  const r = run({ 'package.json': VITE_PKG, 'supabase/migrations/20250101000000_init.sql': sql }, 'scoped');
  for (const id of ['supabase.policy-unrestricted', 'supabase.storage-policy-open', 'supabase.view-bypasses-rls', 'supabase.policy-always-true']) {
    assert.deepEqual(of(r, id).map((f) => f.title), [], id);
  }
  assert.equal(of(r, 'supabase.public-bucket').length, 1, 'avatars stays reported as a public bucket');
});

// ---------------------------------------------------------------------------
// SQL-NO-REPLAY

test('migrations are replayed: dropped policies, replaced functions and buckets made private are not reported', () => {
  const a = `
create table public.orders (id uuid primary key, user_id uuid);
alter table public.orders enable row level security;
create policy "Anyone can update orders" on public.orders for update using (true);
create function public.has_role(uid uuid, r text) returns boolean language sql security definer as $$ select true $$;
insert into storage.buckets (id, name, public) values ('invoices', 'invoices', true);
create function public.touch() returns void language sql security definer as $$ select 1 $$;
create policy "Read invoices" on storage.objects for select using (bucket_id = 'invoices');
`;
  const b = `
DROP POLICY IF EXISTS "Anyone can update orders" ON public.orders;
create or replace function public.has_role(uid uuid, r text) returns boolean language sql security definer set search_path = public as $$ select true $$;
UPDATE storage.buckets SET public = false WHERE id = 'invoices';
alter function public.touch() set search_path = '';
alter policy "Read invoices" on storage.objects to authenticated using (bucket_id = 'invoices' and owner_id = (select auth.uid())::text);
`;
  const r = run({
    'package.json': VITE_PKG,
    'supabase/migrations/20250101000000_a.sql': a,
    'supabase/migrations/20250102000000_b.sql': b,
  }, 'replay');
  const sqlFindings = r.findings.filter((f) => f.id.startsWith('supabase.') && f.severity !== 'info');
  assert.deepEqual(sqlFindings.map((f) => `${f.id} ${f.file}:${f.line}`), []);
});

test('replay still reports what the last migration leaves open', () => {
  const a = `
create table public.orders (id uuid primary key, user_id uuid);
alter table public.orders enable row level security;
create policy "own" on public.orders for update using ((select auth.uid()) = user_id);
insert into storage.buckets (id, name, public) values ('invoices', 'invoices', false);
`;
  const b = `
alter policy "own" on public.orders using (true);
update storage.buckets set public = true where id = 'invoices';
create function public.f() returns void language sql security definer as $$ select 1 $$;
`;
  const r = run({ 'package.json': VITE_PKG, 'supabase/migrations/1_a.sql': a, 'supabase/migrations/2_b.sql': b }, 'replay-open');
  assert.equal(of(r, 'supabase.policy-always-true').length, 1);
  assert.equal(of(r, 'supabase.policy-always-true')[0].file, 'supabase/migrations/2_b.sql');
  assert.equal(of(r, 'supabase.public-bucket').length, 1);
  assert.equal(of(r, 'supabase.security-definer-search-path').length, 1);
});

// ---------------------------------------------------------------------------
// STRIPE-OPTIONAL-VERIFY

const webhookRoute = (body) => `import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;
${body}
  if (event.type === 'checkout.session.completed') {
    await supabase.from('profiles').upsert({ id: event.data.object.client_reference_id, plan: 'pro' });
  }
  return new Response('ok');
}
`;

const OPTIONAL_VARIANTS = {
  'if-else': `  if (sig && secret) {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } else {
    event = JSON.parse(body);
  }`,
  'negated-if': `  if (!secret) {
    event = JSON.parse(body);
  } else {
    event = stripe.webhooks.constructEvent(body, sig!, secret);
  }`,
  ternary: `  event = sig ? stripe.webhooks.constructEvent(body, sig, secret!) : JSON.parse(body);`,
  'catch-fallback': `  try {
    event = stripe.webhooks.constructEvent(body, sig!, secret!);
  } catch (err) {
    console.warn('Signature check failed, parsing anyway', err);
    event = JSON.parse(body);
  }`,
};

for (const [name, body] of Object.entries(OPTIONAL_VARIANTS)) {
  test(`webhook with optional verification is reported (${name})`, () => {
    const r = run({ 'package.json': NEXT_PKG, 'app/api/stripe/webhook/route.ts': webhookRoute(body) }, `wh-${name}`);
    const hit = of(r, 'stripe.webhook-optional-verification');
    assert.equal(hit.length, 1, ids(r).join(', '));
    assert.equal(hit[0].severity, 'high');
    assert.equal(of(r, 'stripe.webhook-parsed-body').length, 0);
  });
}

test('webhooks that always verify are not reported as optional', () => {
  const safe = {
    'early-return': `  if (!sig || !secret) return new Response('Missing signature', { status: 400 });
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }`,
    'verify-then-parse': `  stripe.webhooks.constructEvent(body, sig!, secret!);
  event = JSON.parse(body);`,
  };
  for (const [name, body] of Object.entries(safe)) {
    const r = run({ 'package.json': NEXT_PKG, 'app/api/stripe/webhook/route.ts': webhookRoute(body) }, `wh-safe-${name}`);
    assert.deepEqual(r.findings.filter((f) => f.id.startsWith('stripe.webhook')).map((f) => f.id), [], name);
  }
});

// ---------------------------------------------------------------------------
// AUTH-FN-SERVER-ACTIONS

test('server actions and routes that use an imported admin client without a user check are reported', () => {
  const r = run({
    'package.json': NEXT_PKG,
    'app/admin/actions.ts': `'use server';
import { createClient } from '@supabase/supabase-js';

export async function deleteUser(userId: string) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  await supabase.auth.admin.deleteUser(userId);
}
`,
    'lib/supabase/admin.ts': `import 'server-only';
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}
`,
    'lib/supabase/server.ts': `import { createServerClient } from '@supabase/ssr';
import { createClient as createPlain } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createClient() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { getAll: () => store.getAll() } });
}

export const createServiceClient = () => createPlain(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
`,
    'app/api/users/[id]/route.ts': `import { createAdminClient } from '@/lib/supabase/admin';

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await createAdminClient().auth.admin.deleteUser(params.id);
  return new Response(null, { status: 204 });
}
`,
    'app/api/orders/route.ts': `import { createAdminClient } from '../../../lib/supabase/admin';

export async function GET() {
  const { data } = await createAdminClient().from('orders').select('*');
  return Response.json(data);
}
`,
    'app/api/products/route.ts': `import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('products').select('*');
  return Response.json(data);
}
`,
  }, 'server-actions');
  const files = of(r, 'auth.service-role-no-user-check').map((f) => f.file).sort();
  assert.deepEqual(files, ['app/admin/actions.ts', 'app/api/orders/route.ts', 'app/api/users/[id]/route.ts']);
  assert.ok(of(r, 'auth.service-role-no-user-check').every((f) => f.severity === 'high'));
});

test("'use server' files are handlers; files that only import 'server-only' are not", () => {
  assert.equal(isServerHandler('app/admin/actions.ts', "'use server';\nexport async function a() {}"), true);
  assert.equal(isServerHandler('lib/supabase/admin.ts', "import 'server-only';\n"), false);
});

// ---------------------------------------------------------------------------
// ENV-PLACEHOLDER-FP

test('placeholder keys in .env.example and docs produce no findings', () => {
  const r = run({
    'package.json': VITE_PKG,
    '.gitignore': '.env*\n!.env.example\n',
    '.env.example': [
      `STRIPE_SECRET_KEY=${STRIPE_LIVE}${'x'.repeat(24)}`,
      `STRIPE_WEBHOOK_SECRET=${WHSEC}${'x'.repeat(24)}`,
      `OPENAI_API_KEY=${OPENAI_PROJ}${'x'.repeat(48)}`,
      `STRIPE_TEST_KEY=${'sk_' + 'test_'}${'0'.repeat(24)}`,
      `ANOTHER_KEY=${STRIPE_LIVE}your${'_key_goes_here'.repeat(2)}`,
      'JWT_SECRET=super-secret-jwt-token-with-at-least-32-characters-long',
      'VITE_SUPABASE_URL=https://your-project.supabase.co',
    ].join('\n'),
    'README.md': `Set \`STRIPE_SECRET_KEY\` to something like \`${STRIPE_LIVE}${'x'.repeat(24)}\`.\n`,
    'src/main.ts': 'export {};\n',
  }, 'placeholders');
  const noisy = r.findings.filter((f) => f.id.startsWith('secret.') || f.id.startsWith('env.'));
  assert.deepEqual(noisy.map((f) => `${f.id} ${f.file}`), []);
});

test('placeholder detection keeps real-looking keys', () => {
  assert.equal(isPlaceholderSecret(STRIPE_LIVE + 'x'.repeat(24)), true);
  assert.equal(isPlaceholderSecret(STRIPE_LIVE + 'FAKE'.repeat(8)), true);
  assert.equal(isPlaceholderSecret(OPENAI_PROJ + 'your-key-here-' + 'x'.repeat(30)), true);
  assert.equal(isPlaceholderSecret(STRIPE_LIVE + filler(32)), false);
  assert.equal(isPlaceholderSecret(OPENAI_PROJ + filler(48, 3)), false);
  assert.equal(isPlaceholderSecret('-----BEGIN PRIVATE KEY-----'), false);
});

// ---------------------------------------------------------------------------
// LEAK-UNMASKED-ENV and ENV-DBURL-FN

test('committed .env values are masked in every report, whatever the variable is called', () => {
  const smtp = ['Xk9m', 'P2vL', '8qR4', 'tW7z'].join('');
  const db = ['Hq3L', 'z8Np', '5Rt2', 'Vx9K'].join('');
  const pwd = ['Zr7Q', 'w2Ty', '5Ui8', 'Op3A'].join('');
  const r = run({
    'package.json': VITE_PKG,
    '.gitignore': 'node_modules\n',
    '.env': `SMTP_PASS=${smtp}\nDB_PASS=${db}\nMAIL_PWD=${pwd}\n`,
    '.env.example': `SMTP_PASS=${smtp}\n`,
  }, 'smtp');
  assert.equal(of(r, 'env.dotenv-committed')[0].severity, 'critical');
  assert.equal(of(r, 'env.example-real-values').length, 1);
  for (const out of reports(r)) {
    for (const v of [smtp, db, pwd]) assert.ok(!out.includes(v), 'raw value leaked into a report');
  }
  assert.match(redact(`DB_PASS=${db}`), /DB_PASS=Hq3L\*{4}|DB_PASS=Hq\*{4}/);
});

test('database URLs with a password are real secrets; placeholders and local URLs are not', () => {
  const pw = ['Rk7p', 'Qz9L', 'mW2v', 'Xy4N'].join('');
  const r = run({
    'package.json': VITE_PKG,
    '.gitignore': 'node_modules\n',
    '.env': [
      `DATABASE_URL=postgresql://postgres.abcdefghijklmnop:${pw}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
      `DIRECT_URL=postgresql://postgres:${pw}@db.abcdefghijklmnop.supabase.co:5432/postgres`,
    ].join('\n'),
  }, 'dburl');
  const hit = of(r, 'env.dotenv-committed');
  assert.equal(hit.length, 1, ids(r).join(', '));
  assert.match(hit[0].evidence, /DATABASE_URL, DIRECT_URL/);
  assert.match(hit[0].evidence, /postgres\.abcdefghijklmnop:\*\*\*\*@/);
  for (const out of reports(r)) assert.ok(!out.includes(pw));

  const local = run({
    'package.json': VITE_PKG,
    '.gitignore': 'node_modules\n',
    '.env': [
      'DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres',
      'DIRECT_URL=postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres',
    ].join('\n'),
  }, 'dburl-local');
  assert.equal(of(local, 'env.dotenv-committed').length, 0, ids(local).join(', '));
});

// ---------------------------------------------------------------------------
// LEAK-PRIVATE-KEY-BODY

test('a private key stored on one line in JSON never reaches the reports', () => {
  const { privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256', privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } });
  const json = JSON.stringify({ type: 'service_account', project_id: 'demo', private_key: privateKey, client_email: 'svc@demo.iam.gserviceaccount.com' });
  const body = privateKey.split('\n').filter((l) => l && !l.startsWith('-----')).join('');
  const r = run({ 'package.json': VITE_PKG, 'scripts/firebase-adminsdk.json': json }, 'pkey');
  const hit = of(r, 'secret.private-key');
  assert.equal(hit.length, 1);
  for (const out of reports(r)) {
    for (let i = 0; i + 16 <= body.length; i += 8) assert.ok(!out.includes(body.slice(i, i + 16)), `key body leaked at ${i}`);
  }
  // No END marker on the line: everything after the header is masked.
  assert.equal(redact(`"k": "-----BEGIN RSA PRIVATE KEY-----\\n${body.slice(0, 60)}`), '"k": "[private key redacted]');
});

// ---------------------------------------------------------------------------
// SUPABASE-SB-SECRET-FN and PUBLIC-TOKEN-FP

test('Supabase sb_secret_ keys are critical in client code; publishable keys are not flagged', () => {
  const secret = SB_SECRET + filler(31, 11);
  const publishable = SB_PUBLISHABLE + filler(31, 5);
  const r = run({
    'package.json': VITE_PKG,
    'src/integrations/supabase/client.ts': `import { createClient } from '@supabase/supabase-js';\nconst SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';\nconst SUPABASE_PUBLISHABLE_KEY = "${publishable}";\nexport const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);\n`,
    'src/integrations/supabase/admin.ts': `import { createClient } from '@supabase/supabase-js';\nconst SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';\nconst SUPABASE_SERVICE_KEY = "${secret}";\nexport const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);\n`,
  }, 'sb-secret');
  const hit = of(r, 'secret.supabase-secret-key');
  assert.equal(hit.length, 1, ids(r).join(', '));
  assert.equal(hit[0].severity, 'critical');
  assert.equal(hit[0].file, 'src/integrations/supabase/admin.ts');
  assert.equal(of(r, 'supabase.service-role-in-client').length, 0, 'the key finding already covers this file');
  assert.ok(!r.findings.some((f) => f.file === 'src/integrations/supabase/client.ts' && f.severity !== 'info'));
  for (const out of reports(r)) assert.ok(!out.includes(secret));
});

test('public-by-design tokens are not hard-coded credentials; secret ones still are', () => {
  const r = run({
    'package.json': VITE_PKG,
    'src/components/Map.tsx': `const MAPBOX_TOKEN = "${'pk.' + 'eyJ1Ijoi' + filler(40, 9)}";\nconst POSTHOG_API_KEY = "${'phc_' + filler(40, 13)}";\nconst MAPBOX_SECRET_TOKEN = "${'sk.' + 'eyJ1Ijoi' + filler(40, 17)}";\nexport default function Map() { return null; }\n`,
  }, 'tokens');
  const generic = of(r, 'secret.generic-high-entropy');
  assert.deepEqual(generic.map((f) => f.title), ['Hard-coded credential-like value assigned to MAPBOX_SECRET_TOKEN']);
});

// ---------------------------------------------------------------------------
// NEXT-SERVER-COMPONENT-FP

test('Next.js server components under components/ are not client code', () => {
  const r = run({
    'package.json': NEXT_PKG,
    'components/dashboard/RevenueCard.tsx': `import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export default async function RevenueCard() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const balance = await stripe.balance.retrieve();
  const { count } = await admin.from('orders').select('*', { count: 'exact', head: true });
  return <p>{balance.available[0]?.amount} / {count}</p>;
}
`,
    'components/checkout/BuyButton.tsx': `'use client';
import Stripe from 'stripe';
export function BuyButton() { return <button onClick={() => new Stripe('x')}>Buy</button>; }
`,
    'components/billing/Plans.tsx': `import Stripe from 'stripe';
export function Plans({ stripe }: { stripe: Stripe }) { return <div>{String(!!stripe)}</div>; }
`,
  }, 'server-component');
  const inClient = of(r, 'stripe.secret-in-client');
  assert.equal(inClient.find((f) => f.file === 'components/checkout/BuyButton.tsx')?.severity, 'critical');
  const maybe = inClient.find((f) => f.file === 'components/billing/Plans.tsx');
  assert.equal(maybe?.severity, 'medium');
  assert.match(maybe.title, /may run in the browser/);
  assert.ok(!maybe.tier4);
  assert.ok(!r.findings.some((f) => f.file === 'components/dashboard/RevenueCard.tsx'), ids(r).join(', '));
  assert.equal(isClientFile('components/x.tsx', 'export default async function X() {}', { isNext: true }), false);
  assert.equal(isClientFile('components/x.tsx', 'export function X() {}', { isNext: true }), true);
});

// ---------------------------------------------------------------------------
// TIER4-ADMIN-PROP-FP and ADMIN-EMAIL-FP

test('admin enforced in a Next server page: an isAdmin prop in a nav component is not reported', () => {
  const r = run({
    'package.json': NEXT_PKG,
    'app/admin/page.tsx': `import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id ?? '').single();
  if (profile?.role !== 'admin') redirect('/');
  return <h1>Admin</h1>;
}
`,
    'components/site-nav.tsx': `export function SiteNav({ isAdmin }: { isAdmin: boolean }) {
  return <nav>{isAdmin && <a href="/admin">Admin</a>}</nav>;
}
`,
  }, 'admin-server');
  assert.equal(of(r, 'auth.client-only-admin-check').length, 0, ids(r).join(', '));
  assert.notEqual(r.fixPlan.tier?.price, 4000);
});

test('client-only admin check without migrations is reported but does not set the $4,000 tier alone', () => {
  const r = run({
    'package.json': VITE_PKG,
    'src/pages/Admin.tsx': `export default function Admin({ profile }: any) {\n  if (profile.role !== 'admin') return null;\n  const isAdmin = true;\n  return <p>{String(isAdmin)}</p>;\n}\n`,
  }, 'admin-nosql');
  const hit = of(r, 'auth.client-only-admin-check');
  assert.equal(hit.length, 1);
  assert.ok(!hit[0].tier4);
  assert.match(hit[0].title, /verify/);
  assert.notEqual(r.fixPlan.tier?.price, 4000);
});

test('an admin contact address is not an access check; a compared admin list is', () => {
  const contact = run({
    'package.json': VITE_PKG,
    'src/config/site.ts': `export const siteConfig = {\n  name: 'Acme Bakery',\n  adminEmail: "hello@acmebakery.com", // where contact form messages go\n};\n`,
  }, 'admin-contact');
  assert.equal(of(contact, 'auth.hardcoded-admin-email').length, 0);
  assert.ok(!contact.findings.some((f) => f.category === 'auth' || f.tier4), ids(contact).join(', '));

  const check = run({
    'package.json': VITE_PKG,
    'src/lib/admins.ts': `export const ADMIN_EMAILS = ["founder@acme.test", "ops@acme.test"];\n`,
    'src/pages/Admin.tsx': `import { ADMIN_EMAILS } from '@/lib/admins';\nexport default function Admin({ user }: any) {\n  if (!ADMIN_EMAILS.includes(user.email)) return null;\n  return <p>Admin</p>;\n}\n`,
  }, 'admin-list');
  const hit = of(check, 'auth.hardcoded-admin-email');
  assert.equal(hit.length, 1);
  assert.equal(hit[0].severity, 'high');
  assert.equal(hit[0].tier4, 'auth');
});

// ---------------------------------------------------------------------------
// WEBHOOK-HELPER-FP

test('a handler module called by a verifying route is not a webhook endpoint', () => {
  const r = run({
    'package.json': NEXT_PKG,
    'app/api/stripe/webhook/route.ts': `import Stripe from 'stripe';
import { handleStripeEvent } from '@/lib/stripe/handlers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), req.headers.get('stripe-signature')!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }
  await handleStripeEvent(event);
  return new Response('ok');
}
`,
    'lib/stripe/handlers.ts': `import type Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function handleStripeEvent(event: Stripe.Event) {
  const { error } = await supabaseAdmin.from('processed_events').insert({ id: event.id });
  if (error) return;
  switch (event.type) {
    case 'checkout.session.completed':
      await supabaseAdmin.from('subscriptions').update({ status: 'active' }).eq('id', event.data.object.id);
      break;
  }
}
`,
  }, 'webhook-split');
  assert.deepEqual(r.findings.filter((f) => f.id.startsWith('stripe.webhook')).map((f) => `${f.id} ${f.file}`), []);
});

// ---------------------------------------------------------------------------
// DEMO-KEYS-FP

test('Supabase CLI demo keys are an info note, not a leaked service_role key', () => {
  const demo = jwtWith({ iss: 'supabase-demo', role: 'service_role', exp: 1983812996 });
  const r = run({
    'package.json': VITE_PKG,
    '.gitignore': '.env*\n!.env.example\n',
    '.env.example': `SUPABASE_URL=http://127.0.0.1:54321\nSUPABASE_SERVICE_ROLE_KEY=${demo}\n`,
  }, 'demo-keys');
  assert.equal(of(r, 'supabase.service-role-jwt').length, 0);
  assert.equal(of(r, 'env.example-real-values').length, 0);
  assert.equal(of(r, 'supabase.demo-service-role-key')[0]?.severity, 'info');
  assert.deepEqual(r.findings.filter((f) => ['critical', 'high', 'medium'].includes(f.severity)).map((f) => f.id), []);

  const selfHosted = run({
    'package.json': VITE_PKG,
    'docker/.env.example': `SUPABASE_PUBLIC_URL=https://supabase.acme-internal.com\nSERVICE_ROLE_KEY=${demo}\n`,
  }, 'demo-selfhosted');
  assert.equal(of(selfHosted, 'supabase.demo-service-role-key')[0]?.severity, 'high');
});

// ---------------------------------------------------------------------------
// MONOREPO-FN

test('monorepo apps are classified by their path inside the package', () => {
  const r = run({
    'package.json': JSON.stringify({ name: 'mono', private: true, workspaces: ['apps/*'] }),
    'apps/web/package.json': VITE_PKG,
    'apps/web/src/lib/stripe.ts': `import Stripe from 'stripe';\nexport const stripe = new Stripe(import.meta.env.VITE_STRIPE_KEY);\n`,
    'apps/web/src/lib/admin.ts': `import { createClient } from '@supabase/supabase-js';\nexport const admin = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY);\n`,
    'apps/web/supabase/functions/admin-users/index.ts': `import { createClient } from 'npm:@supabase/supabase-js@2';\nDeno.serve(async () => {\n  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);\n  const { data } = await admin.auth.admin.listUsers();\n  return new Response(JSON.stringify(data));\n});\n`,
    'apps/web/supabase/migrations/20250101000000_init.sql': 'create table public.notes (id int);\nalter table public.notes enable row level security;\n',
  }, 'monorepo');
  assert.equal(of(r, 'stripe.secret-in-client')[0]?.file, 'apps/web/src/lib/stripe.ts');
  assert.equal(of(r, 'supabase.service-role-in-client')[0]?.file, 'apps/web/src/lib/admin.ts');
  assert.equal(of(r, 'auth.service-role-no-user-check')[0]?.file, 'apps/web/supabase/functions/admin-users/index.ts');
  assert.equal(of(r, 'supabase.no-migrations').length, 0);
});

// ---------------------------------------------------------------------------
// CORS-BEARER-FP

test('Supabase CORS boilerplate with a Bearer-token user check is only a note; checkout session ids are not sensitive logs', () => {
  const r = run({
    'package.json': VITE_PKG,
    'supabase/functions/check-subscription/index.ts': `import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  const supabaseClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const token = req.headers.get('Authorization')!.replace('Bearer ', '');
  const { data, error } = await supabaseClient.auth.getUser(token);
  if (error) throw new Error('Authentication error');
  return new Response(JSON.stringify({ user: data.user.id }), { headers: corsHeaders });
});
`,
    'supabase/functions/create-checkout/index.ts': `import Stripe from 'npm:stripe@14';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
Deno.serve(async () => {
  const session = await stripe.checkout.sessions.create({ mode: 'subscription', line_items: [] });
  console.log("Created checkout session", session.id);
  console.log(\`Checkout url \${session.url}\`);
  return new Response(JSON.stringify({ url: session.url }));
});
`,
  }, 'cors-bearer');
  const cors = of(r, 'code.cors-wildcard');
  assert.equal(cors.length, 1);
  assert.equal(cors[0].severity, 'info');
  assert.equal(of(r, 'code.console-log-sensitive').length, 0);
});

// ---------------------------------------------------------------------------
// REDACT-QUADRATIC-HANG

test('redaction stays linear on long identifier runs', () => {
  const run40k = 'a1b2c3d4'.repeat(5000);
  let t = Date.now();
  redact(`const x = "${run40k}";`);
  assert.ok(Date.now() - t < 500, `redact took ${Date.now() - t} ms`);
  t = Date.now();
  const out = snippet(`const x = "${run40k}"; const k = "${STRIPE_LIVE}${filler(32)}";`, 180, 40000);
  assert.ok(Date.now() - t < 500);
  assert.ok(!out.includes(filler(32).slice(0, 16)));
});

test('a 500 KB single-line bundle with a key is audited quickly and the key is masked', () => {
  const key = STRIPE_LIVE + filler(32, 21);
  const line = `var a="${'f0e1d2c3b4a5'.repeat(42000)}";var k="${key}";`;
  const t = Date.now();
  const r = run({ 'package.json': VITE_PKG, 'public/assets/index-abc.js': line }, 'bigline');
  assert.ok(Date.now() - t < 10000, `audit took ${Date.now() - t} ms`);
  const hit = of(r, 'secret.stripe-secret-live');
  assert.equal(hit.length, 1);
  for (const out of reports(r)) assert.ok(!out.includes(key) && !out.includes(key.slice(8, 30)));
});
