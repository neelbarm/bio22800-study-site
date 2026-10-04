// Renders the audit result as Markdown, self-contained HTML, JSON and a console summary.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SEV = ['critical', 'high', 'medium', 'low', 'info'];
const SEV_LABEL = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low', info: 'Info' };
const SEV_PREFIX = { critical: 'C', high: 'H', medium: 'M', low: 'L', info: 'I' };
const EFFORT_LABEL = { S: 'S (under 2h)', M: 'M (half a day to a day)', L: 'L (more than a day)' };
const money = (n) => `$${n.toLocaleString('en-US')}`;
const where = (f) => (f.file ? `${f.file}${f.line ? `:${f.line}` : ''}` : '(repo)');

function whereList(issue) {
  const all = [...new Set(issue.items.map((x) => x.where).filter((w) => w && w !== '(repo)'))];
  return all.slice(0, 3).join(', ') + (all.length > 3 ? `, +${all.length - 3} more` : '') || '(repo-wide)';
}

function mdCode(s) {
  const str = String(s ?? '');
  if (!str) return '';
  const fence = str.includes('`') ? '``' : '`';
  const pad = str.startsWith('`') || str.endsWith('`') ? ' ' : '';
  return `${fence}${pad}${str}${pad}${fence}`;
}
const mdEsc = (s) => String(s ?? '').replace(/\|/g, '\\|');

function grouped(findings) {
  const out = {};
  for (const s of SEV) out[s] = findings.filter((f) => f.severity === s);
  return out;
}

const DISCLAIMER =
  'Automated, heuristic scan of the repository working tree. It can miss issues and can flag things that are fine; it is not a substitute for manual review and does not prove the app is secure. Issues found are documented; the agreed fixes are delivered and tested.';

// ---------------------------------------------------------------------------
export function renderMarkdown(r) {
  const g = grouped(r.findings);
  const L = [];
  L.push(`# ShipReady audit: ${r.repo}`, '');
  L.push(`- **Date:** ${r.date}`);
  L.push(`- **Repository path:** ${mdCode(r.path)}`);
  L.push(`- **Stack detected:** ${r.stack.length ? r.stack.join(', ') : 'unknown'}`);
  L.push(`- **Files scanned:** ${r.stats.filesScanned}`);
  L.push(`- **Ship-ready score:** **${r.score} / 100**`, '');
  L.push('| Severity | Count |', '|---|---|');
  for (const s of SEV) L.push(`| ${SEV_LABEL[s]} | ${r.counts[s]} |`);
  L.push('', `> ${DISCLAIMER}`, '');
  L.push('Score: starts at 100; each critical finding subtracts 25, high 10, medium 4, low 1 (minimum 0). Info notes do not count.', '');

  L.push('## Findings', '');
  if (!r.findings.some((f) => f.severity !== 'info')) L.push('No actionable findings from the automated checks. Complete the manual checks below.', '');
  for (const s of SEV.filter((x) => x !== 'info')) {
    if (!g[s].length) continue;
    L.push(`### ${SEV_LABEL[s]} (${g[s].length})`, '');
    g[s].forEach((f, i) => {
      L.push(`#### ${SEV_PREFIX[s]}${i + 1}. ${f.title}`, '');
      L.push(`${mdCode(f.id)} · effort **${f.effort}** · ${mdCode(where(f))}`, '');
      if (f.evidence) L.push(`**Evidence:** ${mdCode(f.evidence)}`, '');
      L.push(`**Why it matters:** ${f.why}`, '');
      L.push(`**How to fix:** ${f.fix}`, '');
    });
  }
  if (g.info.length) {
    L.push('### Notes (info)', '');
    for (const f of g.info) {
      L.push(`- **${f.title}** (${mdCode(where(f))})${f.evidence ? `: ${f.evidence}` : ''}. ${f.fix}`);
    }
    L.push('');
  }

  const p = r.fixPlan;
  L.push('## Fix plan', '');
  if (p.tier) {
    L.push(`**Recommended:** ${p.tier.name}, **${money(p.tier.price)}** fixed, delivery ${p.tier.delivery}. The diagnosis fee is credited toward the sprint.`, '');
  } else {
    L.push('**Recommended:** no sprint needed on the automated findings alone.', '');
  }
  for (const reason of p.reasons) L.push(`- ${reason}`);
  L.push('', `Rough internal effort: about ${p.estimatedHours} hours across ${p.issueCount} issue(s) (S = under 2h, M = half a day to a day, L = more than a day). The auditor confirms scope and price after the manual review.`, '');
  if (p.issues.length) {
    L.push('| # | Issue | Severity | Effort | Where |', '|---|---|---|---|---|');
    for (const i of p.issues) {
      const w = whereList(i);
      L.push(`| ${i.n} | ${mdEsc(i.title)} | ${SEV_LABEL[i.severity]} | ${i.effort} | ${mdEsc(w)} |`);
    }
    L.push('');
  }
  L.push('Sprint tiers: up to 5 issues = $1,500; up to 10 issues + production deploy = $2,500; adds payments, auth rebuild or multi-tenant = $4,000. Change orders: $150/hr or fixed quote.', '');

  L.push('## Manual checks the tool cannot do', '');
  for (const m of r.manualChecks) L.push(`- [ ] **${m.area}:** ${m.item}`);
  L.push('');

  if (r.supabaseExportSql) {
    L.push('## Appendix: Supabase export queries', '', 'Read-only queries to run in the Supabase SQL editor. Review every row of the results.', '');
    L.push('```sql', r.supabaseExportSql, '```', '');
  }
  L.push('## Limitations', '');
  L.push('- Pattern and heuristic based: no data-flow analysis, no runtime testing, no access to the live database, Stripe or hosting dashboards.');
  L.push('- Scans the current working tree only (not git history). Skips node_modules, .git, build output, lockfiles, binaries and files over 1 MB.');
  L.push('- Secret values are masked in this report (first 6 and last 4 characters only).');
  L.push('', `_Generated by shipready-audit ${r.version} on ${r.generatedAt}._`, '');
  return L.join('\n');
}

// ---------------------------------------------------------------------------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
// Inline `code` in catalog text -> <code>
const rich = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');

const CSS = `
:root{--bg:#fbfaf8;--panel:#ffffff;--text:#1d1d1f;--muted:#5d5d66;--line:#e4e2dd;--code:#f3f1ec;
--critical:#b42318;--critical-bg:#fdecea;--high:#c4520f;--high-bg:#fdf0e6;--medium:#8a6100;--medium-bg:#fbf4dc;--low:#2f5f9e;--low-bg:#e9f0fa;--info:#55606e;--info-bg:#eef0f3;--ok:#1e7a46}
@media (prefers-color-scheme: dark){:root{--bg:#141416;--panel:#1c1c1f;--text:#ececef;--muted:#a4a4ad;--line:#2e2e33;--code:#26262b;
--critical:#ff8a80;--critical-bg:#3a1714;--high:#ffb27a;--high-bg:#3a2414;--medium:#f0cc6b;--medium-bg:#352c12;--low:#8fb8f0;--low-bg:#172638;--info:#b4bcc8;--info-bg:#24272c;--ok:#6fd49b}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
main{max-width:920px;margin:0 auto;padding:32px 16px 64px}
h1{font-size:28px;margin:0 0 4px;letter-spacing:-.01em}h2{font-size:21px;margin:40px 0 12px;padding-top:8px;border-top:1px solid var(--line)}
h3{font-size:17px;margin:24px 0 10px}
.meta{color:var(--muted);margin:0 0 20px}
.summary{display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:20px}
.score{font-size:52px;font-weight:700;line-height:1;text-align:center;min-width:120px}.score small{display:block;font-size:13px;font-weight:500;color:var(--muted);margin-top:6px}
.counts{display:flex;flex-wrap:wrap;gap:8px}
.pill{display:inline-block;border-radius:999px;padding:2px 10px;font-size:12.5px;font-weight:600;white-space:nowrap}
.sev-critical{color:var(--critical);background:var(--critical-bg)}.sev-high{color:var(--high);background:var(--high-bg)}.sev-medium{color:var(--medium);background:var(--medium-bg)}.sev-low{color:var(--low);background:var(--low-bg)}.sev-info{color:var(--info);background:var(--info-bg)}
.note{color:var(--muted);font-size:13.5px}
.finding{background:var(--panel);border:1px solid var(--line);border-left:4px solid var(--line);border-radius:10px;padding:14px 16px;margin:10px 0;break-inside:avoid}
.finding.critical{border-left-color:var(--critical)}.finding.high{border-left-color:var(--high)}.finding.medium{border-left-color:var(--medium)}.finding.low{border-left-color:var(--low)}.finding.info{border-left-color:var(--info)}
.finding h4{margin:0 0 6px;font-size:15.5px}.finding .loc{color:var(--muted);font-size:13px;margin-bottom:8px;overflow-wrap:anywhere}
.finding p{margin:6px 0}.finding dt{font-weight:600;font-size:13px;color:var(--muted);margin-top:8px}.finding dd{margin:2px 0 0}
code,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;background:var(--code);border-radius:5px}
code{padding:1px 5px;overflow-wrap:anywhere}pre{padding:12px;overflow-x:auto;line-height:1.45}
table{border-collapse:collapse;width:100%;font-size:14px;background:var(--panel)}th,td{border:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}th{font-size:13px;color:var(--muted)}
.tier{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:12px}.tier strong.price{font-size:22px}
ul.check{list-style:none;padding-left:0}ul.check li{padding:4px 0 4px 28px;position:relative}ul.check li:before{content:"";position:absolute;left:4px;top:8px;width:13px;height:13px;border:1.5px solid var(--muted);border-radius:3px}
.disclaimer{font-size:13px;color:var(--muted);border-left:3px solid var(--line);padding-left:10px}
@media (max-width:600px){.summary{grid-template-columns:1fr}.score{text-align:left}}
@media print{:root{--bg:#fff;--panel:#fff;--text:#000;--muted:#444;--line:#ccc;--code:#f2f2f2}body{font-size:11.5pt}main{max-width:none;padding:0}h2{break-after:avoid}.finding,.tier,tr{break-inside:avoid}a{color:inherit}}
`;

export function renderHtml(r) {
  const g = grouped(r.findings);
  const H = [];
  const scoreColor = r.score >= 80 ? 'var(--ok)' : r.score >= 50 ? 'var(--medium)' : 'var(--critical)';
  H.push('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">');
  H.push(`<title>ShipReady audit: ${esc(r.repo)}</title><style>${CSS}</style></head><body><main>`);
  H.push(`<h1>ShipReady audit: ${esc(r.repo)}</h1>`);
  H.push(`<p class="meta">${esc(r.date)} · ${esc(r.stack.join(', ') || 'stack unknown')} · ${r.stats.filesScanned} files scanned</p>`);
  H.push(`<section class="summary"><div class="score" style="color:${scoreColor}">${r.score}<small>ship-ready score / 100</small></div><div><div class="counts">`);
  for (const s of SEV) H.push(`<span class="pill sev-${s}">${SEV_LABEL[s]}: ${r.counts[s]}</span>`);
  H.push(`</div><p class="note">Starts at 100; critical −25, high −10, medium −4, low −1 (minimum 0).</p><p class="disclaimer">${esc(DISCLAIMER)}</p></div></section>`);

  H.push('<h2>Findings</h2>');
  if (!r.findings.some((f) => f.severity !== 'info')) H.push('<p>No actionable findings from the automated checks. Complete the manual checks below.</p>');
  for (const s of SEV) {
    if (!g[s].length) continue;
    H.push(`<h3>${s === 'info' ? 'Notes' : SEV_LABEL[s]} (${g[s].length})</h3>`);
    g[s].forEach((f, i) => {
      H.push(`<article class="finding ${s}"><h4><span class="pill sev-${s}">${SEV_PREFIX[s]}${i + 1}</span> ${esc(f.title)}</h4>`);
      H.push(`<div class="loc"><code>${esc(where(f))}</code> · <code>${esc(f.id)}</code> · effort ${esc(EFFORT_LABEL[f.effort] || f.effort)}</div><dl>`);
      if (f.evidence) H.push(`<dt>Evidence</dt><dd><code>${esc(f.evidence)}</code></dd>`);
      H.push(`<dt>Why it matters</dt><dd>${rich(f.why)}</dd><dt>How to fix</dt><dd>${rich(f.fix)}</dd></dl></article>`);
    });
  }

  const p = r.fixPlan;
  H.push('<h2>Fix plan</h2><div class="tier">');
  if (p.tier) H.push(`<div><strong>${esc(p.tier.name)}</strong></div><div><strong class="price">${money(p.tier.price)}</strong> fixed · delivery ${esc(p.tier.delivery)} · diagnosis fee credited</div>`);
  else H.push('<div><strong>No sprint needed on the automated findings alone.</strong></div>');
  H.push(`<ul>${p.reasons.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p class="note">Rough internal effort: about ${p.estimatedHours} hours across ${p.issueCount} issue(s). The auditor confirms scope and price after the manual review.</p></div>`);
  if (p.issues.length) {
    H.push('<table><thead><tr><th>#</th><th>Issue</th><th>Severity</th><th>Effort</th><th>Where</th></tr></thead><tbody>');
    for (const i of p.issues) {
      const w = whereList(i);
      H.push(`<tr><td>${i.n}</td><td>${esc(i.title)}</td><td><span class="pill sev-${i.severity}">${SEV_LABEL[i.severity]}</span></td><td>${i.effort}</td><td><code>${esc(w)}</code></td></tr>`);
    }
    H.push('</tbody></table>');
  }
  H.push('<p class="note">Sprint tiers: up to 5 issues = $1,500; up to 10 issues + production deploy = $2,500; adds payments, auth rebuild or multi-tenant = $4,000. Change orders: $150/hr or fixed quote.</p>');

  H.push('<h2>Manual checks the tool cannot do</h2><ul class="check">');
  for (const m of r.manualChecks) H.push(`<li><strong>${esc(m.area)}:</strong> ${rich(m.item)}</li>`);
  H.push('</ul>');
  if (r.supabaseExportSql) H.push(`<h2>Appendix: Supabase export queries</h2><p>Read-only queries to run in the Supabase SQL editor.</p><pre>${esc(r.supabaseExportSql)}</pre>`);
  H.push('<h2>Limitations</h2><ul><li>Pattern and heuristic based: no data-flow analysis, no runtime testing, no access to the live database, Stripe or hosting dashboards.</li><li>Scans the current working tree only (not git history). Skips node_modules, .git, build output, lockfiles, binaries and files over 1 MB.</li><li>Secret values are masked (first 6 and last 4 characters only).</li></ul>');
  H.push(`<p class="note">Generated by shipready-audit ${esc(r.version)} on ${esc(r.generatedAt)}.</p></main></body></html>`);
  return H.join('\n');
}

// ---------------------------------------------------------------------------
export function renderJson(r) {
  return `${JSON.stringify(r, null, 2)}\n`;
}

export function renderConsole(r, outFiles = []) {
  const L = [];
  L.push(`ShipReady audit: ${r.repo} (${r.date})`);
  L.push(`Stack: ${r.stack.join(', ') || 'unknown'} | files scanned: ${r.stats.filesScanned} | score: ${r.score}/100`);
  L.push('');
  L.push(`${'Severity'.padEnd(10)} Count`);
  L.push(`${'-'.repeat(10)} -----`);
  for (const s of SEV) L.push(`${SEV_LABEL[s].padEnd(10)} ${String(r.counts[s]).padStart(5)}`);
  const top = r.findings.filter((f) => f.severity !== 'info');
  if (top.length) {
    L.push('', 'Findings:');
    for (const f of top.slice(0, 25)) {
      L.push(`  ${f.severity.toUpperCase().padEnd(8)} ${f.title.length > 80 ? `${f.title.slice(0, 79)}…` : f.title}`);
      L.push(`  ${''.padEnd(8)} ${where(f)}  [${f.id}, effort ${f.effort}]`);
    }
    if (top.length > 25) L.push(`  … and ${top.length - 25} more (see the report)`);
  }
  const p = r.fixPlan;
  L.push('', p.tier ? `Fix plan: ${p.tier.name} (${money(p.tier.price)}), ${p.issueCount} issue(s)` : 'Fix plan: no sprint needed on automated findings');
  if (outFiles.length) L.push('', 'Reports:', ...outFiles.map((f) => `  ${f}`));
  return L.join('\n');
}

export function writeReports(r, outDir) {
  const dir = resolve(outDir);
  mkdirSync(dir, { recursive: true });
  const files = {
    md: join(dir, 'shipready-report.md'),
    html: join(dir, 'shipready-report.html'),
    json: join(dir, 'shipready-report.json'),
  };
  writeFileSync(files.md, renderMarkdown(r));
  writeFileSync(files.html, renderHtml(r));
  writeFileSync(files.json, renderJson(r));
  return files;
}
