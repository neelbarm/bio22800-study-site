// Shared helpers: file classification, line lookup, .gitignore and git index reading.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

export const CODE_EXT = /\.(?:[cm]?[jt]sx?|vue|svelte|astro|html)$/i;

export const isCodeFile = (p) => CODE_EXT.test(p);

export const isTestFile = (p) =>
  /(^|\/)(__tests__|__mocks__|tests?|e2e|cypress|playwright)\//.test(p) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(p);

export const isEnvFile = (p) => /^\.env(\.[\w.-]+)?$/.test(basename(p));
export const isExampleEnv = (p) => /\.(example|sample|template|dist|defaults|tpl|schema)$/i.test(basename(p));

const SERVER_PATHS = [
  /^supabase\//,
  /(^|\/)netlify\/(edge-)?functions\//,
  /^functions\//,
  /^api\//,
  /^(src\/)?server\//,
  /^scripts\//,
  /(^|\/)pages\/api\//,
  /(^|\/)app\/(.*\/)?route\.[cm]?[jt]sx?$/,
  /(^|\/)middleware\.[cm]?[jt]s$/,
  /\.server\.[cm]?[jt]sx?$/,
  /(^|\/)[^/]+\.config\.[cm]?[jt]s$/,
  /(^|\/)lib\/server\//,
];

/**
 * Monorepos: path rules are written for a single app at the repo root, so a file is
 * classified by its path inside the nearest package (apps/web/src/x.ts -> src/x.ts).
 * ctx.packageRoots holds the package directories (with a trailing slash), longest first.
 */
export function localPath(path, ctx) {
  const roots = ctx?.packageRoots;
  if (!roots?.length) return path;
  const root = roots.find((r) => path.startsWith(r));
  return root ? path.slice(root.length) : path;
}

/** Framework flags for the package that holds `path` (falls back to the repo-wide flags). */
export function frameworkOf(path, ctx) {
  const roots = ctx?.packageRoots;
  const root = roots?.find((r) => path.startsWith(r));
  const own = root ? ctx.packageFlags?.[root] : null;
  if (own && (own.isNext || own.isVite)) return own;
  return { isNext: !!ctx?.isNext, isVite: !!ctx?.isVite };
}

export const hasUseServer = (text = '') => /^\s*['"]use server['"]/m.test(text.slice(0, 600));
export const hasUseClient = (text = '') => /^\s*['"]use client['"]/m.test(text.slice(0, 600));

// Server rules are tried on both the repo path and the package-relative path, so a nested
// server package (functions/, server/) keeps its classification.
const bothPaths = (path, ctx) => {
  const p = localPath(path, ctx);
  return p === path ? [path] : [path, p];
};

export function isServerFile(path, text = '', ctx = null) {
  if (bothPaths(path, ctx).some((p) => SERVER_PATHS.some((r) => r.test(p)))) return true;
  if (hasUseServer(text)) return true;
  if (/import\s+['"]server-only['"]/.test(text)) return true;
  return false;
}

/**
 * Route handlers / serverless functions that answer HTTP requests. Next.js server actions
 * ('use server' files) count too: every exported action is a public POST endpoint.
 */
export function isServerHandler(path, text = '', ctx = null) {
  return hasUseServer(text) || bothPaths(path, ctx).some((p) =>
    /^supabase\/functions\/(?!_shared\/)[^/]+\//.test(p) ||
    /(^|\/)pages\/api\//.test(p) ||
    /(^|\/)app\/(.*\/)?route\.[cm]?[jt]sx?$/.test(p) ||
    /^api\//.test(p) ||
    /(^|\/)netlify\/(edge-)?functions\//.test(p) ||
    /^functions\//.test(p) ||
    /^(src\/)?server\//.test(p));
}

/**
 * Next.js App Router: files without 'use client' are server components unless a client
 * file imports them. These signals mean the file can only run on the server.
 */
export function hasServerSignals(text = '') {
  return (
    /export\s+(?:default\s+)?async\s+function\b/.test(text) || // client components cannot be async
    /from\s+['"]next\/headers['"]/.test(text) ||
    /from\s+['"][^'"]*\/supabase\/server['"]/.test(text) ||
    /\bcreateServerClient\s*\(/.test(text) ||
    /\bprocess\.env\.(?!NEXT_PUBLIC_|NODE_ENV\b)[A-Z_][A-Z0-9_]*/.test(text) // never inlined into the browser bundle
  );
}

const NEXT_CLIENT_FOLDER = /(^|\/)(components|hooks|contexts?|providers)\//;

/** Heuristic: does this file end up in the browser bundle? */
export function isClientFile(path, text, ctx) {
  if (!isCodeFile(path) || isTestFile(path)) return false;
  if (isServerFile(path, text, ctx)) return false;
  const p = localPath(path, ctx);
  if (hasUseClient(text)) return true;
  if (/^public\//.test(p) || /(^|\/)index\.html$/.test(p)) return true;
  if (frameworkOf(path, ctx).isNext) {
    if (/(^|\/)pages\//.test(p)) return true; // pages/api already excluded as server
    if (NEXT_CLIENT_FOLDER.test(p)) return !hasServerSignals(text);
    return false;
  }
  return /^(src|app|components|hooks|lib|utils|pages|views|screens)\//.test(p);
}

/**
 * True when isClientFile() only guessed "client" from the folder name: a Next.js file under
 * components/ (etc.) with no 'use client'. It may be a server component, so findings should
 * ask the reviewer to verify instead of stating that the code ships to the browser.
 */
export function isMaybeClientFile(path, text, ctx) {
  if (!isClientFile(path, text, ctx) || hasUseClient(text)) return false;
  const p = localPath(path, ctx);
  return frameworkOf(path, ctx).isNext && NEXT_CLIENT_FOLDER.test(p) && !/(^|\/)pages\//.test(p);
}

/** Next.js server component page/layout (App Router, no 'use client'). */
export function isNextServerPage(path, text, ctx) {
  return frameworkOf(path, ctx).isNext && /(^|\/)app\/(.*\/)?(page|layout|template|default)\.[cm]?[jt]sx?$/.test(localPath(path, ctx)) && !hasUseClient(text);
}

const RESOLVE_EXT = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];

/** Resolve an import specifier (relative, @/, ~/, src/) to a file in ctx.files, or null. */
export function resolveSpecifier(fromPath, spec, ctx) {
  const byPath = ctx._byPath || (ctx._byPath = new Map(ctx.files.map((f) => [f.path, f])));
  const dir = fromPath.includes('/') ? fromPath.slice(0, fromPath.lastIndexOf('/')) : '';
  const root = ctx.packageRoots?.find((r) => fromPath.startsWith(r)) || '';
  let bases;
  if (spec.startsWith('.')) bases = [normalize(`${dir}/${spec}`)];
  else if (/^[@~]\//.test(spec)) bases = [`${root}${spec.slice(2)}`, `${root}src/${spec.slice(2)}`];
  else if (spec.startsWith('src/')) bases = [`${root}${spec}`];
  else return null;
  for (const b of bases) {
    const hit = RESOLVE_EXT.map((e) => byPath.get(b + e)).find(Boolean);
    if (hit) return hit;
  }
  return null;
}

const IMPORT_RE = /(?:import|export)\s([^'"]*?)from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g;

/**
 * Import statements of `file`: [{ index, end, spec, module, bindings: [{ imported, local }] }].
 * `module` is the resolved local file or null; a default import has imported = 'default'.
 */
export function importsOf(file, ctx) {
  const out = [];
  for (const m of file.text.matchAll(IMPORT_RE)) {
    const spec = m[2] || m[3] || m[4];
    const clause = (m[1] || '').replace(/^\s*type\s+/, '').trim();
    const bindings = [];
    const braces = /\{([^}]*)\}/.exec(clause);
    if (braces) {
      for (const part of braces[1].split(',')) {
        const [imported, local = imported] = part.replace(/^\s*type\s+/, '').trim().split(/\s+as\s+/);
        if (imported) bindings.push({ imported, local });
      }
    }
    const outside = clause.replace(/\{[^}]*\}/, ' ');
    const ns = /\*\s*as\s+([\w$]+)/.exec(outside);
    if (ns) bindings.push({ imported: '*', local: ns[1] });
    const def = /^([A-Za-z_$][\w$]*)\s*(?:,|$)/.exec(outside.trim());
    if (def && m[0].startsWith('import')) bindings.push({ imported: 'default', local: def[1] });
    out.push({ index: m.index, end: m.index + m[0].length, spec, module: resolveSpecifier(file.path, spec, ctx), bindings });
  }
  return out;
}

/** Local modules imported by `file` (resolved file objects). */
export function localImports(file, ctx) {
  return importsOf(file, ctx).map((i) => i.module).filter(Boolean);
}

function normalize(p) {
  const parts = [];
  for (const seg of p.split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  return parts.join('/');
}

export function lineAt(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

export function lineText(text, lineNo) {
  return text.split('\n')[lineNo - 1] ?? '';
}

export const isCommentLine = (line) => /^\s*(\/\/|\*|\/\*|#|--)/.test(line);

// ---------------------------------------------------------------------------
// .gitignore (root only; enough to answer "is .env ignored?")

function globToRegex(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') { re += '.*'; i++; if (glob[i + 1] === '/') i++; } else re += '[^/]*';
    } else if (c === '?') re += '[^/]';
    else re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`^${re}$`);
}

export function readGitignore(root) {
  const file = join(root, '.gitignore');
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const negate = l.startsWith('!');
      let pat = negate ? l.slice(1) : l;
      const anchored = pat.startsWith('/') || pat.replace(/\/$/, '').includes('/');
      pat = pat.replace(/^\//, '').replace(/^\*\*\//, '').replace(/\/$/, '');
      return { negate, anchored, re: globToRegex(pat) };
    });
}

/** Is a repo-relative path ignored by the root .gitignore? (null when there is no .gitignore) */
export function isGitignored(rules, relPath) {
  if (!rules) return null;
  let ignored = false;
  const parts = relPath.split('/');
  for (const r of rules) {
    const hit = r.anchored ? r.re.test(relPath) : parts.some((seg, i) => r.re.test(seg) || r.re.test(parts.slice(i).join('/')));
    if (hit) ignored = !r.negate;
  }
  return ignored;
}

// ---------------------------------------------------------------------------
// git index (read-only, no git commands): which paths are tracked?

export function readGitTrackedPaths(root) {
  const gitDir = join(root, '.git');
  try {
    if (!existsSync(gitDir) || !statSync(gitDir).isDirectory()) return null;
    const indexFile = join(gitDir, 'index');
    if (!existsSync(indexFile)) return new Set();
    const buf = readFileSync(indexFile);
    if (buf.toString('latin1', 0, 4) !== 'DIRC') return null;
    const version = buf.readUInt32BE(4);
    if (version !== 2 && version !== 3) return null; // v4 uses prefix compression; skip
    const count = buf.readUInt32BE(8);
    const paths = new Set();
    let off = 12;
    for (let i = 0; i < count; i++) {
      const start = off;
      const flags = buf.readUInt16BE(off + 60);
      off += 62;
      if (version >= 3 && flags & 0x4000) off += 2;
      const end = buf.indexOf(0, off);
      if (end < 0) return null;
      paths.add(buf.toString('utf8', off, end));
      const entryLen = end - start + 1;
      off = start + Math.ceil(entryLen / 8) * 8;
    }
    return paths;
  } catch {
    return null;
  }
}
