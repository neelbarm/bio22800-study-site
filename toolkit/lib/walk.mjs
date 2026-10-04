// Repository walker: collects text files worth scanning.
import { readdirSync, lstatSync, readFileSync } from 'node:fs';
import { join, relative, sep, extname, basename, resolve } from 'node:path';

export const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.vercel', '.netlify', '.turbo',
  '.cache', '.svelte-kit', '.output', '.expo', '.parcel-cache', '.nuxt', 'shipready-audit',
]);

export const LOCKFILES = new Set([
  'package-lock.json', 'npm-shrinkwrap.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb', 'bun.lock', 'deno.lock',
]);

const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.bmp', '.tif', '.tiff', '.heic', '.psd', '.ai',
  '.pdf', '.zip', '.gz', '.tgz', '.rar', '.7z', '.tar', '.bz2', '.xz',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.mp3', '.mp4', '.mov', '.webm', '.wav', '.ogg', '.avi', '.m4a', '.flac',
  '.wasm', '.so', '.dylib', '.dll', '.exe', '.bin', '.class', '.jar', '.pyc', '.o', '.a',
  '.db', '.sqlite', '.sqlite3', '.map', '.lockb', '.fig', '.sketch', '.glb', '.gltf',
]);

export const MAX_FILE_BYTES = 1024 * 1024;

/**
 * Walk `root` and return { files: [{ path, abs, size, text }], skipped }.
 * `path` is repo-relative with forward slashes.
 */
export function walkRepo(root, { exclude = [] } = {}) {
  const absRoot = resolve(root);
  const excludeAbs = new Set(exclude.map((p) => resolve(p)));
  const files = [];
  const skipped = { dirs: 0, lockfiles: 0, binary: 0, large: 0, symlinks: 0, unreadable: 0 };
  const stack = [absRoot];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      skipped.unreadable++;
      continue;
    }
    entries.sort((a, b) => (a.name < b.name ? 1 : -1)); // reversed so pop() yields sorted order
    for (const ent of entries) {
      const abs = join(dir, ent.name);
      if (ent.isSymbolicLink()) { skipped.symlinks++; continue; }
      if (ent.isDirectory()) {
        if (SKIP_DIRS.has(ent.name) || excludeAbs.has(abs)) { skipped.dirs++; continue; }
        stack.push(abs);
        continue;
      }
      if (!ent.isFile()) continue;
      const name = basename(abs);
      if (LOCKFILES.has(name)) { skipped.lockfiles++; continue; }
      if (BINARY_EXT.has(extname(name).toLowerCase()) || /\.min\.(js|css)$/.test(name)) { skipped.binary++; continue; }
      let size;
      try { size = lstatSync(abs).size; } catch { skipped.unreadable++; continue; }
      if (size > MAX_FILE_BYTES) { skipped.large++; continue; }
      let buf;
      try { buf = readFileSync(abs); } catch { skipped.unreadable++; continue; }
      if (buf.subarray(0, 8000).includes(0)) { skipped.binary++; continue; }
      files.push({ path: relative(absRoot, abs).split(sep).join('/'), abs, size, text: buf.toString('utf8') });
    }
  }
  files.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  return { files, skipped };
}
