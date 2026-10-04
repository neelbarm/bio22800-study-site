// Check 3: Supabase service_role exposure, RLS and policies in SQL, storage buckets.
import { snippet, decodeJwtPayload, JWT_RE } from '../patterns.mjs';
import { lineAt, lineText, isClientFile, isMaybeClientFile, isCodeFile, isCommentLine } from '../context.mjs';
import { splitSql, parseStatement, isTrueExpr, openExpr } from '../sql.mjs';

const SERVICE_ROLE_REF = /SUPABASE_SERVICE_ROLE|SERVICE_ROLE_KEY|SUPABASE_SERVICE_KEY|SUPABASE_SECRET_KEY|service_role|serviceRole(?:Key)?\b|sb_secret_/;
const SENSITIVE_TABLE =
  /(user|profile|account|order|payment|invoice|message|chat|conversation|document|file|upload|customer|subscription|transaction|billing|address|contact|lead|booking|appointment|patient|employee|secret|token|session|key|note|private|wallet|credit|purchase|email|phone|medical|health)/i;
const WRITE_CMDS = new Set(['insert', 'update', 'delete', 'all']);

export const SUPABASE_EXPORT_SQL = `-- Read-only. Run in the Supabase SQL editor and paste the results into the audit notes.

-- 1. Tables in exposed schemas with RLS turned off
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname in ('public')
  and rowsecurity = false
order by tablename;

-- 2. Every RLS policy (look for qual/with_check = 'true', roles {anon} or {public} on writes)
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies
order by schemaname, tablename, policyname;

-- 3. Storage buckets and whether they are public
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
order by name;

-- 4. security definer functions in public without a fixed search_path
select n.nspname as schema, p.proname as function, p.proconfig
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where p.prosecdef
  and n.nspname = 'public'
  and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) c where c like 'search_path=%');

-- 5. Views in public (views bypass RLS unless created with security_invoker)
select table_schema, table_name from information_schema.views where table_schema = 'public';`;

// Does the file point Supabase at a server a demo key could reach? Local hosts and hosted
// *.supabase.co projects (which never accept the demo signature) don't count.
const LOCAL_HOST = /^(?:localhost|127\.0\.0\.1|0\.0\.0\.0|host\.docker\.internal|kong|supabase[\w-]*|\[::1\])$/i;
function pointsAtSelfHosted(text) {
  return text.split('\n').some((line) => {
    if (!/supabase|API_EXTERNAL_URL/i.test(line)) return false;
    const hosts = [...line.matchAll(/\bhttps?:\/\/([\w.-]+)/g)].map((m) => m[1]);
    return hosts.some((h) => !LOCAL_HOST.test(h) && !/\.supabase\.(?:co|in)$/i.test(h));
  });
}

export function checkSupabase(ctx) {
  // 3a. service role referenced in client code; JWTs whose payload role is service_role.
  const jwtLines = new Set();
  for (const f of ctx.files) {
    const re = new RegExp(JWT_RE.source, 'g');
    let m;
    while ((m = re.exec(f.text))) {
      const payload = decodeJwtPayload(m[0]);
      if (payload?.role !== 'service_role') continue;
      const line = lineAt(f.text, m.index);
      jwtLines.add(`${f.path}:${line}`);
      if (payload.iss === 'supabase-demo') {
        // The Supabase CLI's published local key. Only a self-hosted Supabase on the default
        // JWT secret would accept it, so say so when the file points at a non-local, non-hosted URL.
        const selfHosted = pointsAtSelfHosted(f.text);
        ctx.add('supabase.demo-service-role-key', {
          severity: selfHosted ? 'high' : 'info',
          title: selfHosted
            ? 'Supabase demo service_role key next to a non-local URL (self-hosted with the default JWT secret?)'
            : undefined,
          file: f.path, line, evidence: snippet(lineText(f.text, line)),
        });
        continue;
      }
      const client = isClientFile(f.path, f.text, ctx);
      ctx.add('supabase.service-role-jwt', {
        title: `Supabase service_role key hard-coded${client ? ' in client-side code' : ''}`,
        file: f.path,
        line,
        evidence: snippet(lineText(f.text, line)) + (payload.ref ? ` (project ref: ${String(payload.ref).slice(0, 4)}…)` : ''),
      });
    }
  }
  const coveredFiles = new Set([...jwtLines].map((k) => k.slice(0, k.lastIndexOf(':'))));
  for (const f of ctx.findings) if (f.id === 'secret.supabase-secret-key') coveredFiles.add(f.file); // the key finding covers it
  for (const f of ctx.files) {
    if (!isClientFile(f.path, f.text, ctx) || coveredFiles.has(f.path)) continue; // the JWT finding already covers this file
    const lines = f.text.split('\n');
    const hits = [];
    lines.forEach((text, i) => { if (SERVICE_ROLE_REF.test(text) && !isCommentLine(text)) hits.push(i + 1); });
    if (hits.length) {
      const maybe = isMaybeClientFile(f.path, f.text, ctx);
      ctx.add('supabase.service-role-in-client', {
        ...(maybe ? {
          severity: 'medium',
          title: 'Supabase service_role key referenced in a component that may run in the browser (no \'use client\'; verify)',
        } : {}),
        file: f.path, line: hits[0],
        evidence: snippet(lines[hits[0] - 1]) + (hits.length > 1 ? ` (+${hits.length - 1} more line(s) in this file)` : ''),
      });
    }
  }

  // 3b. SQL: replay every migration in order, then report on the final state, so issues
  // that a later migration fixed (DROP POLICY, CREATE OR REPLACE FUNCTION, bucket made
  // private, view switched to security_invoker) are not reported.
  const sqlFiles = ctx.files.filter((f) => /\.sql$/i.test(f.path)).sort((a, b) => a.path.localeCompare(b.path));
  const tables = new Map(); // full -> { file, line, rls }
  const policies = new Map(); // table|name -> { st, where, evidence }
  const functions = new Map(); // name -> { st, where, evidence }
  const buckets = new Map(); // name -> { public, where, evidence }
  const views = new Map(); // full -> { st, where, evidence, revoked: Set }
  for (const f of sqlFiles) {
    for (const stmt of splitSql(f.text)) {
      const st = parseStatement(stmt.sql);
      if (!st) continue;
      const where = { file: f.path, line: stmt.line };
      const first = stmt.sql.split('\n')[0];
      switch (st.type) {
        case 'create-table':
          if (st.table.schema === 'public' && !tables.has(st.table.full)) tables.set(st.table.full, { ...where, rls: null, evidence: first });
          break;
        case 'drop-table':
          tables.delete(st.table.full);
          for (const key of [...policies.keys()]) if (key.startsWith(`${st.table.full}|`)) policies.delete(key);
          break;
        case 'rls': {
          const t = tables.get(st.table.full);
          if (t && st.enabled !== null) {
            t.rls = st.enabled;
            if (st.enabled === false) Object.assign(t, { disabledAt: where, disabledEvidence: first });
          }
          if (!t && st.enabled === false && st.table.schema === 'public') {
            tables.set(st.table.full, { ...where, rls: false, disabledAt: where, disabledEvidence: first });
          }
          break;
        }
        case 'policy':
          policies.set(`${st.table.full}|${st.name}`, { st, where, evidence: snippet(stmt.sql, 220) });
          break;
        case 'drop-policy':
          policies.delete(`${st.table.full}|${st.name}`);
          break;
        case 'alter-policy': {
          const key = `${st.table.full}|${st.name}`;
          const p = policies.get(key);
          if (!p) break;
          if (st.rename) {
            policies.delete(key);
            policies.set(`${st.table.full}|${st.rename}`, { ...p, st: { ...p.st, name: st.rename } });
            break;
          }
          const next = { ...p.st };
          if (st.roles) next.roles = st.roles;
          if (st.using !== undefined) next.using = st.using;
          if (st.check !== undefined) next.check = st.check;
          next.usingTrue = isTrueExpr(next.using);
          next.checkTrue = isTrueExpr(next.check);
          policies.set(key, { st: next, where, evidence: snippet(stmt.sql, 220) });
          break;
        }
        case 'function':
          functions.set(st.name, { st, where, evidence: snippet(first) });
          break;
        case 'drop-function':
          functions.delete(st.name);
          break;
        case 'alter-function': {
          const fn = functions.get(st.name);
          if (!fn) break;
          const next = { ...fn.st };
          if (st.hasSearchPath !== undefined) next.hasSearchPath = st.hasSearchPath;
          if (st.securityDefiner !== undefined) next.securityDefiner = st.securityDefiner;
          functions.set(st.name, { ...fn, st: next });
          break;
        }
        case 'bucket':
          for (const b of st.buckets) buckets.set(b.name, { public: b.public, where, evidence: snippet(stmt.sql) });
          break;
        case 'bucket-update':
          if (st.name === null) for (const b of buckets.values()) Object.assign(b, { public: st.public, where, evidence: snippet(stmt.sql) });
          else buckets.set(st.name, { public: st.public, where, evidence: snippet(stmt.sql) });
          break;
        case 'bucket-delete':
          buckets.delete(st.name);
          break;
        case 'view':
          if (st.view.schema === 'public') views.set(st.view.full, { st, where, evidence: snippet(first), revoked: new Set() });
          break;
        case 'alter-view': {
          const v = views.get(st.view.full);
          if (v) v.st = { ...v.st, securityInvoker: st.securityInvoker };
          break;
        }
        case 'drop-view':
          for (const name of st.views) views.delete(name);
          break;
        case 'revoke': {
          const v = views.get(st.object);
          if (v) for (const r of st.roles) v.revoked.add(r);
          break;
        }
        default:
      }
    }
  }

  for (const { st, where, evidence } of policies.values()) reportPolicy(ctx, st, where, evidence, buckets);
  for (const { st, where, evidence } of functions.values()) {
    if (st.securityDefiner && !st.hasSearchPath) {
      ctx.add('supabase.security-definer-search-path', { title: `security definer function ${st.name} has no fixed search_path`, ...where, evidence });
    }
  }
  for (const [name, b] of buckets) {
    if (b.public) ctx.add('supabase.public-bucket', { title: `Storage bucket "${name}" is public`, ...b.where, evidence: b.evidence });
  }
  for (const [full, v] of views) {
    if (v.st.securityInvoker) continue;
    const revoked = (r) => v.revoked.has(r) || v.revoked.has('public');
    if (revoked('anon') && revoked('authenticated')) continue; // not reachable through the API
    const sensitive = v.st.sources.filter((t) => SENSITIVE_TABLE.test(t.split('.')[1] || ''));
    ctx.add('supabase.view-bypasses-rls', {
      severity: sensitive.length ? 'high' : 'medium',
      title: `View ${full} runs with its owner's rights and bypasses RLS${v.st.sources.length ? ` on ${[...new Set(v.st.sources)].slice(0, 3).join(', ')}` : ''}`,
      ...v.where, evidence: v.evidence,
    });
  }
  for (const [full, t] of tables) {
    if (t.rls === true) continue;
    if (t.rls === false) {
      ctx.add('supabase.rls-disabled', { title: `Row Level Security disabled on ${full}`, ...t.disabledAt, evidence: snippet(t.disabledEvidence) });
    } else {
      ctx.add('supabase.rls-missing', { title: `Table ${full} has no Row Level Security`, file: t.file, line: t.line, evidence: snippet(t.evidence) });
    }
  }

  // 3c. Buckets created from JS with public: true
  for (const f of ctx.files.filter((x) => isCodeFile(x.path))) {
    const re = /createBucket\(\s*['"`]([^'"`]+)['"`]\s*,\s*\{[^}]*\bpublic\s*:\s*true/g;
    let m;
    while ((m = re.exec(f.text))) {
      const line = lineAt(f.text, m.index);
      ctx.add('supabase.public-bucket', { title: `Storage bucket "${m[1]}" is created public`, file: f.path, line, evidence: snippet(lineText(f.text, line)) });
    }
  }

  // 3d. No migrations at all.
  const hasMigrations = ctx.files.some((f) => /(^|\/)supabase\/migrations\/.*\.sql$/i.test(f.path));
  if (ctx.usesSupabase && !hasMigrations) {
    ctx.add('supabase.no-migrations', {
      file: 'supabase/migrations/', line: null,
      evidence: sqlFiles.length ? `${sqlFiles.length} loose .sql file(s) found, but no supabase/migrations folder` : 'no SQL files in the repo',
    });
  }
}

const CMD_TEXT = { all: 'insert, update and delete', insert: 'insert', update: 'update', delete: 'delete', select: 'read' };

/** Findings for one policy in its final state. */
function reportPolicy(ctx, st, where, evidence, buckets) {
  const write = WRITE_CMDS.has(st.cmd);
  const label = `Policy "${st.name}" on ${st.table.full}`;
  const reasons = [];
  if (st.usingTrue) reasons.push('using (true)');
  if (st.checkTrue) reasons.push('with check (true)');
  const rolesAnon = st.roles.includes('anon') || st.roles.includes('public');
  // The expression that decides which rows a caller reaches: WITH CHECK for insert, USING otherwise
  // (for update, USING picks the rows and is reused as WITH CHECK when that is missing).
  const decisiveExpr = st.cmd === 'insert' ? st.check : st.using;
  const open = openExpr(decisiveExpr);
  const who = !open ? null : rolesAnon && open.who === 'anyone' ? 'anyone' : 'any-user';

  if (st.table.full === 'storage.objects' && open) {
    const bucket = open.bucket;
    const scope = bucket ? `bucket "${bucket}"` : 'every bucket';
    const whoText = who === 'anyone' ? 'anyone, including logged-out visitors,' : 'any logged-in user';
    if (write) {
      ctx.add('supabase.storage-policy-open', {
        severity: st.cmd === 'insert' && who === 'any-user' ? 'medium' : 'high',
        title: `Storage policy "${st.name}" lets ${whoText} ${CMD_TEXT[st.cmd]} any file in ${scope}`,
        ...where, evidence,
      });
      return;
    }
    const b = bucket ? buckets.get(bucket) : null;
    const privateBucket = !bucket || (b ? !b.public : SENSITIVE_TABLE.test(bucket));
    if (privateBucket) {
      ctx.add('supabase.storage-policy-open', {
        title: `Storage policy "${st.name}" lets ${whoText} read every file in ${b ? 'private ' : ''}${scope}`,
        ...where, evidence,
      });
    }
    return;
  }

  if (st.roles.includes('anon') && write) {
    ctx.add('supabase.policy-anon-write', {
      title: `${label} lets anonymous users ${st.cmd === 'all' ? 'insert/update/delete' : st.cmd}${reasons.length ? ` (${reasons.join(', ')})` : ''}`,
      ...where, evidence,
    });
  } else if (write && (st.usingTrue || st.checkTrue)) {
    ctx.add('supabase.policy-always-true', {
      title: `${label} allows ${st.cmd === 'all' ? 'all operations' : st.cmd} on every row (${reasons.join(', ')})`,
      ...where, evidence,
    });
  } else if (st.cmd === 'select' && st.usingTrue && SENSITIVE_TABLE.test(st.table.name)) {
    ctx.add('supabase.policy-always-true', {
      title: `${label} lets ${st.roles.includes('authenticated') && !rolesAnon ? 'every logged-in user' : 'anyone'} read every row of a private-looking table`,
      ...where, evidence,
    });
  } else if (write && open) {
    const whoText = who === 'anyone' ? 'anyone' : 'any logged-in user';
    ctx.add('supabase.policy-unrestricted', {
      // Inserting rows for other users is less severe than changing or deleting theirs.
      ...(st.cmd === 'insert' && who === 'any-user' ? { severity: 'medium' } : {}),
      title: st.cmd === 'insert'
        ? `${label} lets ${whoText} insert rows without tying them to the caller (${normalizeForTitle(decisiveExpr)})`
        : `${label} lets ${whoText} ${CMD_TEXT[st.cmd]} every row (${normalizeForTitle(decisiveExpr)})`,
      ...where, evidence,
    });
  } else if (st.cmd === 'select' && open && SENSITIVE_TABLE.test(st.table.name)) {
    ctx.add('supabase.policy-unrestricted', {
      title: `${label} lets ${who === 'anyone' ? 'anyone' : 'any logged-in user'} read every row of a private-looking table (${normalizeForTitle(st.using)})`,
      ...where, evidence,
    });
  }
}

const normalizeForTitle = (expr) => {
  const s = String(expr ?? '').replace(/\s+/g, ' ').trim();
  return s.length > 60 ? `${s.slice(0, 59)}…` : s;
};
