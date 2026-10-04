// Check 3: Supabase service_role exposure, RLS and policies in SQL, storage buckets.
import { snippet, decodeJwtPayload, JWT_RE } from '../patterns.mjs';
import { lineAt, lineText, isClientFile, isCodeFile, isCommentLine } from '../context.mjs';
import { splitSql, parseStatement } from '../sql.mjs';

const SERVICE_ROLE_REF = /SUPABASE_SERVICE_ROLE|SERVICE_ROLE_KEY|service_role|serviceRole(?:Key)?\b/;
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
      const client = isClientFile(f.path, f.text, ctx);
      ctx.add('supabase.service-role-jwt', {
        title: `Supabase service_role key hard-coded${client ? ' in client-side code' : ''}`,
        file: f.path,
        line,
        evidence: snippet(lineText(f.text, line)) + (payload.ref ? ` (project ref: ${String(payload.ref).slice(0, 4)}…)` : ''),
      });
    }
  }
  const jwtFiles = new Set([...jwtLines].map((k) => k.slice(0, k.lastIndexOf(':'))));
  for (const f of ctx.files) {
    if (!isClientFile(f.path, f.text, ctx) || jwtFiles.has(f.path)) continue; // the JWT finding already covers this file
    const lines = f.text.split('\n');
    const hits = [];
    lines.forEach((text, i) => { if (SERVICE_ROLE_REF.test(text) && !isCommentLine(text)) hits.push(i + 1); });
    if (hits.length) {
      ctx.add('supabase.service-role-in-client', {
        file: f.path, line: hits[0],
        evidence: snippet(lines[hits[0] - 1]) + (hits.length > 1 ? ` (+${hits.length - 1} more line(s) in this file)` : ''),
      });
    }
  }

  // 3b. SQL: tables, RLS, policies, functions, buckets.
  const sqlFiles = ctx.files.filter((f) => /\.sql$/i.test(f.path)).sort((a, b) => a.path.localeCompare(b.path));
  const tables = new Map(); // full -> { file, line, rls }
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
        case 'policy': {
          const write = WRITE_CMDS.has(st.cmd);
          const anon = st.roles.includes('anon');
          const label = `Policy "${st.name}" on ${st.table.full}`;
          const reasons = [];
          if (st.usingTrue) reasons.push('using (true)');
          if (st.checkTrue) reasons.push('with check (true)');
          const evidence = snippet(stmt.sql, 220);
          if (anon && write) {
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
              title: `${label} lets ${st.roles.includes('authenticated') && !st.roles.includes('anon') && !st.roles.includes('public') ? 'every logged-in user' : 'anyone'} read every row of a private-looking table`,
              ...where, evidence,
            });
          }
          break;
        }
        case 'function':
          if (st.securityDefiner && !st.hasSearchPath) {
            ctx.add('supabase.security-definer-search-path', { title: `security definer function ${st.name} has no fixed search_path`, ...where, evidence: snippet(first) });
          }
          break;
        case 'bucket':
          for (const b of st.buckets.filter((x) => x.public)) {
            ctx.add('supabase.public-bucket', { title: `Storage bucket "${b.name}" is public`, ...where, evidence: snippet(stmt.sql) });
          }
          break;
        default:
      }
    }
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
  const hasMigrations = ctx.files.some((f) => /^supabase\/migrations\/.*\.sql$/i.test(f.path));
  if (ctx.usesSupabase && !hasMigrations) {
    ctx.add('supabase.no-migrations', {
      file: 'supabase/migrations/', line: null,
      evidence: sqlFiles.length ? `${sqlFiles.length} loose .sql file(s) found, but no supabase/migrations folder` : 'no SQL files in the repo',
    });
  }
}
