#!/usr/bin/env node
/* Validates every data/units/*.js file against SPEC.md.
   Usage: node tools/validate.js [file ...]   (defaults to all unit files) */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const unitDir = path.join(root, 'data', 'units');
let files = process.argv.slice(2);
if (!files.length) {
  files = fs.existsSync(unitDir)
    ? fs.readdirSync(unitDir).filter(f => /^u\d\d-[a-z0-9-]+\.js$/.test(f)).sort().map(f => path.join(unitDir, f))
    : [];
}
if (!files.length) { console.error('No unit files found in data/units/'); process.exit(1); }

const errors = [], warnings = [];
const err = (f, m) => errors.push(`${path.basename(f)}: ${m}`);
const warn = (f, m) => warnings.push(`${path.basename(f)}: ${m}`);
const isStr = (s, min = 1) => typeof s === 'string' && s.trim().length >= min;

// Full validation must check what the browser loads, not just files on disk.
if (!process.argv.slice(2).length) {
  const manifest = path.join(root, 'data', 'manifest.js');
  try {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(manifest, 'utf8'), context, { timeout: 1000 });
    const entries = context.window.UNIT_FILES;
    if (!Array.isArray(entries) || !entries.length) err(manifest, 'UNIT_FILES must be a non-empty array');
    else {
      const listed = new Set();
      for (const entry of entries) {
        if (typeof entry !== 'string' || !/^data\/units\/u\d\d-[a-z0-9-]+\.js$/.test(entry)) {
          err(manifest, `invalid unit path: ${String(entry)}`); continue;
        }
        const absolute = path.join(root, entry);
        if (listed.has(absolute)) err(manifest, `duplicate entry: ${entry}`);
        listed.add(absolute);
        if (!fs.existsSync(absolute)) err(manifest, `missing unit file: ${entry}`);
      }
      for (const file of files) if (!listed.has(file)) err(manifest, `unit omitted from manifest: ${path.basename(file)}`);
    }
  } catch (e) { err(manifest, `cannot load manifest: ${e.message}`); }
}

const ALLOWED_TAGS = new Set(['p','ul','ol','li','b','i','em','strong','br','table','tr','th','td','span','div','sup','sub','code','thead','tbody']);
const ALLOWED_CLASSES = new Set(['lead','kw','kw-2','callout','key','tip','warn','formula','dt','steps']);

function checkHtml(f, where, html) {
  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g; let m;
  while ((m = tagRe.exec(html))) {
    const tag = m[1].toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) err(f, `${where}: disallowed tag <${tag}>`);
    const cls = /class\s*=\s*["']([^"']*)["']/.exec(m[2]);
    if (cls) for (const c of cls[1].split(/\s+/).filter(Boolean)) if (!ALLOWED_CLASSES.has(c)) warn(f, `${where}: unknown class "${c}"`);
    if (/\son[a-z]+\s*=/i.test(m[2])) err(f, `${where}: inline event handler`);
  }
  if (/<script/i.test(html)) err(f, `${where}: <script> not allowed`);
}

function checkSvg(f, where, svg) {
  if (!/^\s*<svg[\s>]/.test(svg) || !/<\/svg>\s*$/.test(svg)) err(f, `${where}: svg must start with <svg and end with </svg>`);
  const vb = /viewBox\s*=\s*["']\s*0\s+0\s+(\d+)\s+(\d+)\s*["']/.exec(svg);
  if (!vb) err(f, `${where}: svg needs viewBox="0 0 600 H"`);
  else {
    if (+vb[1] !== 600) err(f, `${where}: viewBox width must be 600`);
    if (+vb[2] < 200 || +vb[2] > 400) err(f, `${where}: viewBox height must be 200–400`);
  }
  if (/<svg[^>]*\s(width|height)\s*=/.test(svg)) err(f, `${where}: no width/height on <svg>`);
  if (/<script|<image|xlink:href|href\s*=\s*["']https?/i.test(svg)) err(f, `${where}: scripts/images/external refs not allowed in svg`);
  if (/font-family\s*[=:]/i.test(svg)) warn(f, `${where}: do not set font-family in svg`);
  if (!/<title>/.test(svg)) warn(f, `${where}: svg missing <title>`);
  const fs_ = [...svg.matchAll(/font-size\s*[=:]\s*["']?(\d+(?:\.\d+)?)/g)].map(x => +x[1]);
  if (fs_.some(v => v < 14)) warn(f, `${where}: svg font-size below 14`);
  const colors = [...svg.matchAll(/(?:stroke|fill)\s*=\s*["']([^"']+)["']/g)].map(x => x[1].trim());
  for (const c of colors) {
    if (c === 'none' || c === 'currentColor' || /^var\(--(c1|c2|c3|c4|ink|muted|paper)\)$/.test(c) || c === 'url(#'.slice(0, 0)) continue;
    if (/^url\(#/.test(c)) continue;
    warn(f, `${where}: non-palette color "${c}"`);
  }
}

const allIds = new Map();
const unitsSeen = new Map();
let totals = { units: 0, lessons: 0, questions: 0, flashcards: 0, drills: 0, mnemonics: 0, whiteboard: 0, diagrams: 0, objectives: 0 };

for (const f of files) {
  let src;
  try { src = fs.readFileSync(f, 'utf8'); } catch (e) { err(f, 'cannot read'); continue; }
  const sandbox = { window: {} };
  try { vm.runInNewContext(src, sandbox, { filename: f, timeout: 5000 }); }
  catch (e) { err(f, `does not execute: ${e.message}`); continue; }
  const units = sandbox.window.UNITS || [];
  if (units.length !== 1) { err(f, `must push exactly one unit (got ${units.length})`); continue; }
  const u = units[0];
  totals.units++;
  const expectedId = path.basename(f).slice(0, 3);
  if (u.id !== expectedId) err(f, `id "${u.id}" must match filename prefix "${expectedId}"`);
  if (u.order !== +expectedId.slice(1)) err(f, `order must be ${+expectedId.slice(1)}`);
  if (unitsSeen.has(u.id)) err(f, `duplicate unit id ${u.id}`); unitsSeen.set(u.id, f);
  for (const k of ['title','icon','bookRef','blurb']) if (!isStr(u[k])) err(f, `missing ${k}`);
  for (const k of ['objectives','lessons','mnemonics','formulas','keyNumbers','flashcards','questions','drills','whiteboard']) if (!Array.isArray(u[k])) err(f, `${k} must be an array`);
  if (errors.some(e => e.startsWith(path.basename(f)))) continue;

  const reg = (id, kind) => {
    if (!isStr(id)) { err(f, `${kind} missing id`); return; }
    if (!id.startsWith(u.id + '-')) err(f, `${kind} id "${id}" must start with "${u.id}-"`);
    if (allIds.has(id)) err(f, `duplicate id "${id}" (also in ${allIds.get(id)})`);
    allIds.set(id, path.basename(f));
  };
  const objIds = new Set(), lessonIds = new Set();
  u.objectives.forEach(o => { reg(o.id, 'objective'); objIds.add(o.id); if (!isStr(o.text, 10)) err(f, `objective ${o.id}: text too short`); });
  totals.objectives += u.objectives.length;
  if (u.objectives.length < 6 || u.objectives.length > 12) warn(f, `objectives: ${u.objectives.length} (want 6–12)`);

  const objCovered = new Map([...objIds].map(i => [i, { lessons: 0, questions: 0 }]));
  const refObjs = (arr, where) => {
    if (!Array.isArray(arr) || !arr.length) { err(f, `${where}: objectives must be a non-empty array`); return; }
    for (const o of arr) { if (!objIds.has(o)) err(f, `${where}: unknown objective "${o}"`); }
  };
  const refLesson = (id, where, required) => {
    if (id == null) { if (required) err(f, `${where}: missing lesson`); return; }
    if (!lessonIds.has(id)) err(f, `${where}: unknown lesson "${id}"`);
  };

  u.lessons.forEach(l => {
    reg(l.id, 'lesson'); lessonIds.add(l.id);
    if (!isStr(l.title)) err(f, `lesson ${l.id}: missing title`);
    if (!isStr(l.html, 300)) err(f, `lesson ${l.id}: html too short (<300 chars)`); else checkHtml(f, `lesson ${l.id}`, l.html);
    refObjs(l.objectives, `lesson ${l.id}`);
    (l.objectives || []).forEach(o => objCovered.has(o) && objCovered.get(o).lessons++);
    if (!isStr(l.sayIt, 15)) err(f, `lesson ${l.id}: missing sayIt`);
    if (!Array.isArray(l.keyPoints) || l.keyPoints.length < 3) err(f, `lesson ${l.id}: keyPoints needs ≥3 items`);
    if (l.diagrams != null) {
      if (!Array.isArray(l.diagrams)) err(f, `lesson ${l.id}: diagrams must be array`);
      else l.diagrams.forEach((d, i) => { totals.diagrams++; if (!isStr(d.svg)) err(f, `lesson ${l.id} diagram ${i}: missing svg`); else checkSvg(f, `lesson ${l.id} diagram ${i}`, d.svg); if (!isStr(d.caption)) warn(f, `lesson ${l.id} diagram ${i}: missing caption`); });
    }
  });
  totals.lessons += u.lessons.length;
  if (u.lessons.length < 5) warn(f, `only ${u.lessons.length} lessons (want 5–10)`);
  const nDiag = u.lessons.reduce((n, l) => n + ((l.diagrams || []).length), 0);
  if (nDiag < Math.ceil(u.lessons.length / 2)) warn(f, `only ${nDiag} diagrams for ${u.lessons.length} lessons — this student is visual`);

  u.mnemonics.forEach((m, i) => { if (!isStr(m.saying) || !isStr(m.meaning)) err(f, `mnemonic ${i}: needs saying+meaning`); refLesson(m.lesson, `mnemonic ${i}`, false); });
  totals.mnemonics += u.mnemonics.length;
  if (u.mnemonics.length < 4) warn(f, `only ${u.mnemonics.length} mnemonics (want 4–10)`);
  u.formulas.forEach((x, i) => { if (!isStr(x.name) || !isStr(x.expr)) err(f, `formula ${i}: needs name+expr`); });
  u.keyNumbers.forEach((x, i) => { if (!isStr(x.fact) || !isStr(x.value)) err(f, `keyNumber ${i}: needs fact+value`); });

  u.flashcards.forEach((c, i) => { if (!isStr(c.front) || !isStr(c.back)) err(f, `flashcard ${i}: needs front+back`); refLesson(c.lesson, `flashcard ${i}`, false); });
  totals.flashcards += u.flashcards.length;
  if (u.flashcards.length < 25) warn(f, `only ${u.flashcards.length} flashcards (want 25–45)`);

  let hi = 0;
  u.questions.forEach(q => {
    reg(q.id, 'question');
    if (!isStr(q.q, 10)) err(f, `question ${q.id}: q too short`);
    if (!isStr(q.explain, 20)) err(f, `question ${q.id}: explain too short`);
    refObjs(q.objectives, `question ${q.id}`);
    (q.objectives || []).forEach(o => objCovered.has(o) && objCovered.get(o).questions++);
    refLesson(q.lesson, `question ${q.id}`, true);
    if (![1,2,3].includes(q.level)) err(f, `question ${q.id}: level must be 1,2,3`);
    if (q.level >= 2) hi++;
    if (q.type === 'mc') {
      if (!Array.isArray(q.choices) || q.choices.length !== 4) err(f, `question ${q.id}: mc needs 4 choices`);
      else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(f, `question ${q.id}: mc answer must be index 0–3`);
      else if (new Set(q.choices.map(c => String(c).trim().toLowerCase())).size !== 4) err(f, `question ${q.id}: duplicate choices`);
    } else if (q.type === 'tf') {
      if (typeof q.answer !== 'boolean') err(f, `question ${q.id}: tf answer must be boolean`);
    } else if (q.type === 'short') {
      if (!isStr(q.answer)) err(f, `question ${q.id}: short answer must be a string`);
      if (!Array.isArray(q.accept) || !q.accept.length) err(f, `question ${q.id}: short needs accept[]`);
      if (isStr(q.answer) && q.answer.split(/\s+/).length > 6) warn(f, `question ${q.id}: short answer is long ("${q.answer}") — make it mc?`);
    } else err(f, `question ${q.id}: type must be mc|tf|short`);
  });
  totals.questions += u.questions.length;
  if (u.questions.length < 30) warn(f, `only ${u.questions.length} questions (want 30–45)`);
  if (u.questions.length && hi / u.questions.length < 1/3) warn(f, `only ${hi}/${u.questions.length} questions are level 2–3 (want ≥1/3)`);
  const types = u.questions.reduce((a, q) => (a[q.type] = (a[q.type] || 0) + 1, a), {});
  if (!types.short) warn(f, 'no short-answer questions'); if (!types.tf) warn(f, 'no true/false questions');

  for (const [o, c] of objCovered) { if (!c.lessons) err(f, `objective ${o} has no lesson`); if (c.questions < 2) warn(f, `objective ${o} has ${c.questions} questions (want ≥2)`); }

  u.drills.forEach(d => {
    reg(d.id, 'drill');
    if (!isStr(d.title) || !isStr(d.formula)) err(f, `drill ${d.id}: needs title+formula`);
    refLesson(d.lesson, `drill ${d.id}`, true);
    if (typeof d.gen !== 'function') { err(f, `drill ${d.id}: gen must be a function`); return; }
    if (/Math\.random/.test(String(d.gen))) err(f, `drill ${d.id}: gen uses Math.random`);
    // Repeated inputs must produce the same problem, including at domain edges.
    for (const value of [0, 0.25, 0.5, 0.75, 1 - Number.EPSILON]) {
      try {
        const first = JSON.stringify(d.gen(() => value));
        const second = JSON.stringify(d.gen(() => value));
        if (first !== second) err(f, `drill ${d.id}: output is not deterministic`);
      } catch (e) { err(f, `drill ${d.id}: boundary input ${value} threw: ${e.message}`); }
    }
    let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x80000000; };
    const seen = new Set();
    for (let i = 0; i < 60; i++) {
      let p; try { p = d.gen(rnd); } catch (e) { err(f, `drill ${d.id}: gen threw: ${e.message}`); break; }
      if (!p || typeof p !== 'object') { err(f, `drill ${d.id}: gen returned non-object`); break; }
      if (!isStr(p.given) || !isStr(p.ask)) { err(f, `drill ${d.id}: problem needs given+ask`); break; }
      if (!Array.isArray(p.steps) || !p.steps.length) { err(f, `drill ${d.id}: problem needs steps[]`); break; }
      if (p.kind === 'number') {
        if (typeof p.answer !== 'number' || !isFinite(p.answer)) { err(f, `drill ${d.id}: number answer invalid (${p.answer})`); break; }
        if (typeof p.tol !== 'number' || !Number.isFinite(p.tol) || p.tol < 0) { err(f, `drill ${d.id}: number needs finite nonnegative tol`); break; }
        if (!isStr(p.unit, 0)) { err(f, `drill ${d.id}: number needs unit (may be "")`); break; }
      } else if (p.kind === 'choice') {
        if (!Array.isArray(p.choices) || p.choices.length < 2) { err(f, `drill ${d.id}: choice needs choices[]`); break; }
        if (!Number.isInteger(p.answer) || p.answer < 0 || p.answer >= p.choices.length) { err(f, `drill ${d.id}: choice answer out of range`); break; }
        if (new Set(p.choices.map(String)).size !== p.choices.length) { err(f, `drill ${d.id}: duplicate choices`); break; }
      } else { err(f, `drill ${d.id}: kind must be number|choice`); break; }
      seen.add(p.given + '|' + p.ask);
    }
    if (seen.size < 3) warn(f, `drill ${d.id}: only ${seen.size} distinct problems in 60 runs — vary the numbers more`);
  });
  totals.drills += u.drills.length;

  u.whiteboard.forEach(w => {
    reg(w.id, 'whiteboard');
    if (!isStr(w.prompt, 15)) err(f, `whiteboard ${w.id}: prompt too short`);
    if (!Array.isArray(w.keyPoints) || w.keyPoints.length < 5) err(f, `whiteboard ${w.id}: keyPoints needs ≥5 items`);
    if (typeof w.minutes !== 'number') err(f, `whiteboard ${w.id}: minutes must be a number`);
    refLesson(w.lesson, `whiteboard ${w.id}`, false);
  });
  totals.whiteboard += u.whiteboard.length;
  if (u.whiteboard.length < 2) warn(f, `only ${u.whiteboard.length} whiteboard prompts (want 2–5)`);
}

for (const w of warnings) console.log('WARN  ' + w);
for (const e of errors) console.log('ERROR ' + e);
console.log(`\n${totals.units} units · ${totals.objectives} objectives · ${totals.lessons} lessons · ${totals.diagrams} diagrams · ${totals.questions} questions · ${totals.flashcards} flashcards · ${totals.drills} drills · ${totals.mnemonics} mnemonics · ${totals.whiteboard} whiteboard prompts`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
if (errors.length) { process.exit(1); }
console.log('OK');
