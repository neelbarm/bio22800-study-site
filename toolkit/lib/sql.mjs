// Tiny, forgiving SQL helpers for Supabase migrations. Not a real parser:
// it splits statements (respecting quotes, dollar quoting and comments)
// and pattern-matches the handful of statements the audit cares about.

/** Split SQL into statements: [{ sql, line }] with comments blanked out. */
export function splitSql(text) {
  const out = [];
  let buf = '';
  let start = -1;
  let line = 1;
  let startLine = 1;
  let i = 0;
  const n = text.length;
  const push = () => {
    const sql = buf.trim();
    if (sql) out.push({ sql, line: startLine });
    buf = '';
    start = -1;
  };
  const add = (s) => {
    if (start < 0 && /\S/.test(s)) { start = i; startLine = line; }
    buf += s;
  };
  while (i < n) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '-' && next === '-') {
      while (i < n && text[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && next === '*') {
      i += 2;
      while (i < n && !(text[i] === '*' && text[i + 1] === '/')) { if (text[i] === '\n') { line++; buf += '\n'; } i++; }
      i += 2;
      buf += ' ';
      continue;
    }
    if (c === "'" || c === '"') {
      let j = i + 1;
      while (j < n) {
        if (text[j] === c && text[j + 1] === c) { j += 2; continue; }
        if (text[j] === c) break;
        j++;
      }
      const chunk = text.slice(i, j + 1);
      add(chunk);
      line += (chunk.match(/\n/g) || []).length;
      i = j + 1;
      continue;
    }
    if (c === '$') {
      const m = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(text.slice(i, i + 64));
      if (m) {
        const tag = m[0];
        const end = text.indexOf(tag, i + tag.length);
        const stop = end < 0 ? n : end + tag.length;
        const chunk = text.slice(i, stop);
        add(chunk);
        line += (chunk.match(/\n/g) || []).length;
        i = stop;
        continue;
      }
    }
    if (c === ';') { i++; push(); continue; }
    if (c === '\n') line++;
    add(c);
    i++;
  }
  push();
  return out;
}

const IDENT = '(?:"[^"]+"|[A-Za-z_][\\w$]*)';
const QUALIFIED = `(${IDENT}(?:\\s*\\.\\s*${IDENT})?)`;

export function parseIdent(raw) {
  const parts = raw.split('.').map((p) => p.trim().replace(/^"|"$/g, '').toLowerCase());
  const [schema, name] = parts.length === 2 ? parts : ['public', parts[0]];
  return { schema, name, full: `${schema}.${name}` };
}

/** Find the balanced parenthesised expression starting at the "(" at/after `from`. */
export function balancedParen(str, from) {
  const open = str.indexOf('(', from);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < str.length; i++) {
    const ch = str[i];
    if (ch === "'") { const e = str.indexOf("'", i + 1); if (e < 0) break; i = e; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') { depth--; if (depth === 0) return { inner: str.slice(open + 1, i), end: i + 1 }; }
  }
  return null;
}

/** Split on top-level commas, respecting quotes and parentheses. */
export function splitTopLevel(str) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === "'") { const e = str.indexOf("'", i + 1); const stop = e < 0 ? str.length - 1 : e; cur += str.slice(i, stop + 1); i = stop; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

const stripParens = (e) => {
  let out = e.trim();
  while (out.startsWith('(') && out.endsWith(')') && balancedParen(out, 0)?.end === out.length) out = out.slice(1, -1).trim();
  return out;
};

const normExpr = (expr) =>
  stripParens(
    String(expr)
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\(\s*select\s+(auth\.\w+\(\s*\))\s*\)/g, '$1') // (select auth.uid()) -> auth.uid()
      .replace(/\(\s*(auth\.\w+\(\s*\))\s*\)/g, '$1')
      .replace(/"/g, ''),
  );

export const isTrueExpr = (expr) => {
  if (expr == null) return false;
  const e = normExpr(expr);
  return e === 'true' || e === '1 = 1' || e === '1=1';
};

/** Split on top-level AND (outside parentheses and quotes). */
function splitAnd(e) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < e.length; i++) {
    const ch = e[i];
    if (ch === "'") { const end = e.indexOf("'", i + 1); const stop = end < 0 ? e.length - 1 : end; cur += e.slice(i, stop + 1); i = stop; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth === 0 && /^\sand\s/.test(e.slice(i, i + 5))) { parts.push(cur.trim()); cur = ''; i += 4; continue; }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts.map(stripParens);
}

const ANY_USER_TERMS = [
  /^auth\.uid\(\) is not null$/,
  /^auth\.role\(\) = 'authenticated'$/,
  /^'authenticated' = auth\.role\(\)$/,
  /^auth\.jwt\(\) ->> 'role' = 'authenticated'$/,
  /^\(?auth\.jwt\(\) ->> 'role'\)?(?:::text)? = 'authenticated'$/,
];
const ANYONE_TERMS = [/^auth\.role\(\) = 'anon'$/, /^true$/, /^1 ?= ?1$/];
const BUCKET_TERM = /^bucket_id = '([^']+)'$/;

/**
 * Classify a policy expression that does not tie rows to the caller.
 * Returns null when the expression restricts rows (ownership, roles table, ...), or
 * { who: 'anyone' | 'any-user', bucket } when every AND-ed term is only one of:
 * true, auth.uid() is not null, auth.role() = 'authenticated' / 'anon', bucket_id = '...'.
 */
export function openExpr(expr) {
  if (expr == null) return null;
  const e = normExpr(expr);
  if (/\bor\b/.test(e.replace(/'[^']*'/g, "''"))) return null; // an OR can hide an owner check; stay quiet
  let who = 'anyone';
  let bucket = null;
  for (const term of splitAnd(e)) {
    const b = BUCKET_TERM.exec(term);
    if (b) { bucket = b[1]; continue; }
    if (ANY_USER_TERMS.some((r) => r.test(term))) { who = 'any-user'; continue; }
    if (ANYONE_TERMS.some((r) => r.test(term))) continue;
    return null;
  }
  return { who, bucket };
}

/**
 * Parse one statement. Returns a typed object or null:
 *  { type: 'create-table', table }
 *  { type: 'rls', table, enabled }
 *  { type: 'drop-table', table }
 *  { type: 'policy', name, table, cmd, roles, using, check, usingTrue, checkTrue }
 *  { type: 'drop-policy', name, table }
 *  { type: 'alter-policy', name, table, rename?, roles?, using?, check? }
 *  { type: 'function', name, securityDefiner, hasSearchPath }
 *  { type: 'drop-function', name }
 *  { type: 'alter-function', name, securityDefiner?, hasSearchPath? }
 *  { type: 'bucket', buckets: [{ name, public }] }
 *  { type: 'bucket-update', name (null = every bucket), public }
 *  { type: 'bucket-delete', name }
 *  { type: 'view', view, securityInvoker, sources: [table full names] }
 *  { type: 'alter-view', view, securityInvoker }
 *  { type: 'drop-view', views: [...] }
 *  { type: 'revoke', object, roles }
 */
export function parseStatement(sql) {
  const s = sql.replace(/\s+/g, ' ').trim();
  let m;

  if ((m = new RegExp(`^create\\s+(?:(?:global|local)\\s+)?(?:(?:temporary|temp|unlogged)\\s+)?table\\s+(?:if\\s+not\\s+exists\\s+)?${QUALIFIED}`, 'i').exec(s))) {
    if (/^create\s+(?:global\s+|local\s+)?(?:temporary|temp)\s/i.test(s)) return null;
    return { type: 'create-table', table: parseIdent(m[1]) };
  }
  if ((m = new RegExp(`^alter\\s+table\\s+(?:if\\s+exists\\s+)?(?:only\\s+)?${QUALIFIED}\\s+(.*)$`, 'i').exec(s))) {
    const rest = m[2];
    const rls = /\b(enable|disable|force|no\s+force)\s+row\s+level\s+security\b/i.exec(rest);
    if (rls) {
      const verb = rls[1].toLowerCase();
      return { type: 'rls', table: parseIdent(m[1]), enabled: verb === 'enable' || verb === 'force' ? true : verb === 'disable' ? false : null };
    }
    return null;
  }
  if ((m = new RegExp(`^drop\\s+table\\s+(?:if\\s+exists\\s+)?${QUALIFIED}`, 'i').exec(s))) {
    return { type: 'drop-table', table: parseIdent(m[1]) };
  }
  if ((m = new RegExp(`^create\\s+policy\\s+("[^"]+"|\\S+)\\s+on\\s+${QUALIFIED}(.*)$`, 'i').exec(s))) {
    const name = m[1].replace(/^"|"$/g, '');
    const rest = m[3];
    const cmdM = /\bfor\s+(all|select|insert|update|delete)\b/i.exec(rest);
    const cmd = cmdM ? cmdM[1].toLowerCase() : 'all';
    const { roles, using, check } = policyClauses(rest);
    return { type: 'policy', name, table: parseIdent(m[2]), cmd, roles: roles || ['public'], using, check, usingTrue: isTrueExpr(using), checkTrue: isTrueExpr(check) };
  }
  if ((m = new RegExp(`^drop\\s+policy\\s+(?:if\\s+exists\\s+)?("[^"]+"|\\S+)\\s+on\\s+${QUALIFIED}`, 'i').exec(s))) {
    return { type: 'drop-policy', name: m[1].replace(/^"|"$/g, ''), table: parseIdent(m[2]) };
  }
  if ((m = new RegExp(`^alter\\s+policy\\s+("[^"]+"|\\S+)\\s+on\\s+${QUALIFIED}(.*)$`, 'i').exec(s))) {
    const out = { type: 'alter-policy', name: m[1].replace(/^"|"$/g, ''), table: parseIdent(m[2]) };
    const rename = /^\s*rename\s+to\s+("[^"]+"|\S+)/i.exec(m[3]);
    if (rename) return { ...out, rename: rename[1].replace(/^"|"$/g, '') };
    const { roles, using, check } = policyClauses(m[3]);
    if (roles) out.roles = roles;
    if (using != null) out.using = using;
    if (check != null) out.check = check;
    return out;
  }
  if ((m = new RegExp(`^drop\\s+function\\s+(?:if\\s+exists\\s+)?${QUALIFIED}`, 'i').exec(s))) {
    return { type: 'drop-function', name: parseIdent(m[1]).full };
  }
  if ((m = new RegExp(`^alter\\s+function\\s+${QUALIFIED}(.*)$`, 'i').exec(s))) {
    const out = { type: 'alter-function', name: parseIdent(m[1]).full };
    if (/\bset\s+search_path\b/i.test(m[2])) out.hasSearchPath = true;
    if (/\breset\s+(?:search_path|all)\b/i.test(m[2])) out.hasSearchPath = false;
    if (/\bsecurity\s+definer\b/i.test(m[2])) out.securityDefiner = true;
    if (/\bsecurity\s+invoker\b/i.test(m[2])) out.securityDefiner = false;
    return out;
  }
  if ((m = new RegExp(`^create\\s+(?:or\\s+replace\\s+)?(?:(?:temp|temporary)\\s+)?(?:recursive\\s+)?view\\s+(?:if\\s+not\\s+exists\\s+)?${QUALIFIED}(.*)$`, 'i').exec(s))) {
    if (/^create\s+(?:or\s+replace\s+)?(?:temp|temporary)\s/i.test(s)) return null;
    const rest = m[2];
    const asAt = rest.search(/\bas\b/i);
    const opts = asAt >= 0 ? rest.slice(0, asAt) : rest;
    const body = asAt >= 0 ? rest.slice(asAt) : '';
    const sources = [];
    const re = new RegExp(`\\b(?:from|join)\\s+(?:only\\s+)?${QUALIFIED}`, 'gi');
    let src;
    while ((src = re.exec(body))) sources.push(parseIdent(src[1]).full);
    return { type: 'view', view: parseIdent(m[1]), securityInvoker: INVOKER_ON.test(opts), sources };
  }
  if ((m = new RegExp(`^alter\\s+view\\s+(?:if\\s+exists\\s+)?${QUALIFIED}\\s+(.*)$`, 'i').exec(s))) {
    if (INVOKER_ON.test(m[2])) return { type: 'alter-view', view: parseIdent(m[1]), securityInvoker: true };
    if (/\bsecurity_invoker\s*=\s*(?:false|off|0)\b/i.test(m[2]) || /\breset\s*\([^)]*security_invoker/i.test(m[2])) {
      return { type: 'alter-view', view: parseIdent(m[1]), securityInvoker: false };
    }
    return null;
  }
  if ((m = /^drop\s+view\s+(?:if\s+exists\s+)?(.*?)(?:\s+(?:cascade|restrict))?$/i.exec(s))) {
    return { type: 'drop-view', views: splitTopLevel(m[1]).map((v) => parseIdent(v).full) };
  }
  if ((m = new RegExp(`^revoke\\s+(?:all|select)(?:\\s+privileges)?(?:\\s*,\\s*\\w+)*\\s+on\\s+(?:table\\s+)?${QUALIFIED}\\s+from\\s+(.*)$`, 'i').exec(s))) {
    return { type: 'revoke', object: parseIdent(m[1]).full, roles: m[2].split(',').map((r) => r.trim().replace(/"/g, '').replace(/\s+cascade$/i, '').toLowerCase()) };
  }
  if ((m = new RegExp(`^create\\s+(?:or\\s+replace\\s+)?function\\s+${QUALIFIED}`, 'i').exec(s))) {
    // Look only outside the function body for the attributes.
    const header = sql.replace(/\$([A-Za-z_][A-Za-z0-9_]*)?\$[\s\S]*?\$\1\$/g, ' ').replace(/'(?:[^']|'')*'/g, (q) => (q.length > 40 ? "''" : q));
    return {
      type: 'function',
      name: parseIdent(m[1]).full,
      securityDefiner: /\bsecurity\s+definer\b/i.test(header),
      hasSearchPath: /\bset\s+search_path\b/i.test(header) || /\bset\s+search_path\b/i.test(s),
    };
  }
  if (/^insert\s+into\s+storage\s*\.\s*buckets\b/i.test(s)) {
    const cols = balancedParen(s, s.search(/buckets/i));
    const valuesAt = s.search(/\bvalues\b/i);
    if (!cols || valuesAt < 0) return { type: 'bucket', buckets: [] };
    const names = splitTopLevel(cols.inner).map((c) => c.replace(/"/g, '').toLowerCase());
    const buckets = [];
    let pos = valuesAt;
    let tuple;
    while ((tuple = balancedParen(s, pos))) {
      const vals = splitTopLevel(tuple.inner);
      const get = (col) => { const idx = names.indexOf(col); return idx >= 0 ? vals[idx] : undefined; };
      const unq = (v) => (v || '').replace(/^'|'$/g, '');
      buckets.push({ name: unq(get('name') ?? get('id')), public: /^true$/i.test((get('public') || '').trim()) });
      pos = tuple.end;
      if (!/^\s*,/.test(s.slice(pos))) break;
    }
    return { type: 'bucket', buckets };
  }
  if ((m = /^update\s+storage\s*\.\s*buckets\s+set\s+(.*)$/i.exec(s))) {
    const [set, where = ''] = m[1].split(/\bwhere\b/i);
    const pub = /\bpublic\s*=\s*(true|false)\b/i.exec(set);
    if (!pub) return null;
    const nameM = /\b(?:id|name)\s*=\s*'([^']+)'/i.exec(where);
    return { type: 'bucket-update', name: nameM ? nameM[1] : where.trim() ? '(unknown)' : null, public: pub[1].toLowerCase() === 'true' };
  }
  if ((m = /^delete\s+from\s+storage\s*\.\s*buckets\b(.*)$/i.exec(s))) {
    const nameM = /\b(?:id|name)\s*=\s*'([^']+)'/i.exec(m[1]);
    return nameM ? { type: 'bucket-delete', name: nameM[1] } : null;
  }
  return null;
}

const INVOKER_ON = /\bsecurity_invoker\s*(?:=\s*(?:true|on|1|'true'|'on')\b|(?=[,)]))/i;

/** TO / USING / WITH CHECK clauses of CREATE or ALTER POLICY. */
function policyClauses(rest) {
  const toM = /\bto\s+([\w\s,"]+?)(?=\s+using\b|\s+with\s+check\b|$)/i.exec(rest);
  const roles = toM ? toM[1].split(',').map((r) => r.trim().replace(/"/g, '').toLowerCase()).filter(Boolean) : null;
  const usingM = /\busing\s*\(/i.exec(rest);
  const using = usingM ? balancedParen(rest, usingM.index)?.inner ?? null : null;
  const checkM = /\bwith\s+check\s*\(/i.exec(rest);
  const check = checkM ? balancedParen(rest, checkM.index)?.inner ?? null : null;
  return { roles, using, check };
}
