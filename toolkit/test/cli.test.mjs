import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { BIN, materialize, cleanup, leakedSecrets } from './helpers.mjs';

const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8' });

let vulnDir;
let cleanDir;
before(() => {
  vulnDir = materialize('vulnerable-vite-app');
  cleanDir = materialize('clean-next-app');
});
after(() => {
  cleanup(vulnDir);
  cleanup(cleanDir);
});

test('vulnerable repo: writes md/html/json to <repo>/shipready-audit and exits 1 with --fail-on critical', () => {
  const res = run(vulnDir, '--fail-on', 'critical');
  assert.equal(res.status, 1, res.stderr);
  const out = join(vulnDir, 'shipready-audit');
  for (const name of ['shipready-report.md', 'shipready-report.html', 'shipready-report.json']) {
    assert.ok(existsSync(join(out, name)), name);
    assert.deepEqual(leakedSecrets(readFileSync(join(out, name), 'utf8')), [], `${name} leaks a secret`);
  }
  assert.match(res.stdout, /Severity\s+Count/);
  assert.match(res.stdout, /Critical\s+\d+/);
  assert.match(res.stdout, /score: 0\/100/);
  assert.deepEqual(leakedSecrets(res.stdout + res.stderr), []);
  const json = JSON.parse(readFileSync(join(out, 'shipready-report.json'), 'utf8'));
  assert.equal(json.score, 0);
  assert.ok(json.findings.length > 10);
});

test('re-running does not scan its own report folder', () => {
  const first = JSON.parse(run(vulnDir, '--json').stdout);
  const second = JSON.parse(run(vulnDir, '--json').stdout);
  assert.equal(second.findings.length, first.findings.length);
  assert.ok(!second.findings.some((f) => String(f.file).startsWith('shipready-audit/')));
});

test('without --fail-on the exit code is 0 even with findings', () => {
  const res = run(vulnDir, '--out', join(vulnDir, 'custom-out'));
  assert.equal(res.status, 0, res.stderr);
  assert.ok(existsSync(join(vulnDir, 'custom-out', 'shipready-report.html')));
});

test('clean repo: --fail-on low exits 0 and --json prints parseable JSON', () => {
  const res = run(cleanDir, '--fail-on', 'low', '--json');
  assert.equal(res.status, 0, res.stderr);
  const json = JSON.parse(res.stdout);
  assert.equal(json.score, 100);
  assert.equal(json.counts.critical + json.counts.high + json.counts.medium + json.counts.low, 0);
});

test('--fail-on thresholds: medium-only repo fails on medium, passes on high', () => {
  const dir = mkdtempSync(join(tmpdir(), 'shipready-medium-'));
  try {
    mkdirSync(join(dir, 'src'));
    writeFileSync(join(dir, '.gitignore'), 'node_modules\n.env*\n');
    writeFileSync(join(dir, 'src', 'calc.js'), 'export const calc = (s) => eval(s);\n');
    assert.equal(run(dir, '--fail-on', 'high').status, 0);
    assert.equal(run(dir, '--fail-on=medium').status, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Supabase app without migrations gets the export-policies note', () => {
  const dir = mkdtempSync(join(tmpdir(), 'shipready-nomig-'));
  try {
    mkdirSync(join(dir, 'src'));
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'nomig', dependencies: { '@supabase/supabase-js': '^2.45.0' } }));
    writeFileSync(join(dir, 'src', 'client.ts'), "import { createClient } from '@supabase/supabase-js';\n");
    const json = JSON.parse(run(dir, '--json').stdout);
    const note = json.findings.find((f) => f.id === 'supabase.no-migrations');
    assert.ok(note);
    assert.equal(note.severity, 'info');
    assert.match(json.supabaseExportSql, /rowsecurity = false/);
    assert.match(json.supabaseExportSql, /pg_policies/);
    const md = readFileSync(join(dir, 'shipready-audit', 'shipready-report.md'), 'utf8');
    assert.match(md, /Supabase export queries/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('usage errors exit 2', () => {
  assert.equal(run().status, 2);
  assert.equal(run(cleanDir, '--fail-on', 'severe').status, 2);
  assert.equal(run(cleanDir, '--bogus').status, 2);
  assert.equal(run(join(tmpdir(), 'definitely-not-a-repo-shipready')).status, 2);
  const help = run('--help');
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage:/);
});
