#!/usr/bin/env node
// shipready-audit <path-to-repo> [--out <dir>] [--json] [--fail-on critical|high|medium|low]
import { resolve, join } from 'node:path';
import { audit, meetsFailOn, VERSION } from '../lib/audit.mjs';
import { writeReports, renderConsole, renderJson } from '../lib/report.mjs';

const USAGE = `shipready-audit ${VERSION}

Usage:
  shipready-audit <path-to-repo> [--out <dir>] [--json] [--fail-on critical|high|medium|low]

Options:
  --out <dir>        Where to write shipready-report.{md,html,json} (default: <repo>/shipready-audit/)
  --json             Print the JSON report to stdout instead of the summary table
  --fail-on <level>  Exit 1 if any finding is at or above this severity
  -h, --help         Show this help
  -v, --version      Show the version

Exit codes: 0 ok, 1 --fail-on threshold met, 2 usage or runtime error.`;

const LEVELS = ['critical', 'high', 'medium', 'low'];

function parseArgs(argv) {
  const opts = { repo: null, out: null, json: false, failOn: null, help: false, version: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const takeValue = (name) => {
      const eq = a.indexOf('=');
      if (eq > -1) return a.slice(eq + 1);
      const v = argv[++i];
      if (v === undefined || v.startsWith('--')) throw new Error(`${name} needs a value`);
      return v;
    };
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '-v' || a === '--version') opts.version = true;
    else if (a === '--json') opts.json = true;
    else if (a === '--out' || a.startsWith('--out=')) opts.out = takeValue('--out');
    else if (a === '--fail-on' || a.startsWith('--fail-on=')) {
      opts.failOn = takeValue('--fail-on').toLowerCase();
      if (!LEVELS.includes(opts.failOn)) throw new Error(`--fail-on must be one of ${LEVELS.join(', ')}`);
    } else if (a.startsWith('-')) throw new Error(`Unknown option: ${a}`);
    else if (!opts.repo) opts.repo = a;
    else throw new Error(`Unexpected argument: ${a}`);
  }
  return opts;
}

function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    process.stderr.write(`Error: ${err.message}\n\n${USAGE}\n`);
    return 2;
  }
  if (opts.help) { process.stdout.write(`${USAGE}\n`); return 0; }
  if (opts.version) { process.stdout.write(`${VERSION}\n`); return 0; }
  if (!opts.repo) { process.stderr.write(`Error: missing <path-to-repo>\n\n${USAGE}\n`); return 2; }

  const repo = resolve(opts.repo);
  const outDir = resolve(opts.out || join(repo, 'shipready-audit'));
  let result;
  let files;
  try {
    result = audit(repo, { exclude: [outDir] });
    files = writeReports(result, outDir);
  } catch (err) {
    process.stderr.write(`Error: ${err.message}\n`);
    return 2;
  }
  if (opts.json) process.stdout.write(renderJson(result));
  else process.stdout.write(`${renderConsole(result, [files.md, files.html, files.json])}\n`);

  if (opts.failOn && meetsFailOn(result.findings, opts.failOn)) {
    if (!opts.json) process.stderr.write(`\nFailing: findings at or above "${opts.failOn}" severity.\n`);
    return 1;
  }
  return 0;
}

process.exitCode = main(process.argv.slice(2));
