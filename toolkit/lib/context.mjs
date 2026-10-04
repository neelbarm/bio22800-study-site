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

export function isServerFile(path, text = '') {
  if (SERVER_PATHS.some((r) => r.test(path))) return true;
  const head = text.slice(0, 600);
  if (/^\s*['"]use server['"]/m.test(head)) return true;
  if (/import\s+['"]server-only['"]/.test(text)) return true;
  return false;
}

/** Route handlers / serverless functions that answer HTTP requests. */
export function isServerHandler(path) {
  return (
    /^supabase\/functions\/(?!_shared\/)[^/]+\//.test(path) ||
    /(^|\/)pages\/api\//.test(path) ||
    /(^|\/)app\/(.*\/)?route\.[cm]?[jt]sx?$/.test(path) ||
    /^api\//.test(path) ||
    /(^|\/)netlify\/(edge-)?functions\//.test(path) ||
    /^functions\//.test(path) ||
    /^(src\/)?server\//.test(path)
  );
}

/** Heuristic: does this file end up in the browser bundle? */
export function isClientFile(path, text, ctx) {
  if (!isCodeFile(path) || isTestFile(path)) return false;
  if (isServerFile(path, text)) return false;
  if (/^\s*['"]use client['"]/m.test(text.slice(0, 600))) return true;
  if (/^public\//.test(path) || /(^|\/)index\.html$/.test(path)) return true;
  if (ctx.isNext) {
    if (/(^|\/)pages\//.test(path)) return true; // pages/api already excluded as server
    if (/(^|\/)(components|hooks|contexts?|providers)\//.test(path)) return true;
    return false;
  }
  return /^(src|app|components|hooks|lib|utils|pages|views|screens)\//.test(path);
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
