// Run: node tools/qa.js   (W=390 for phone width; SHOTS=dir for screenshots)
// Optional: PLAYWRIGHT_PATH=/path/to/node_modules/playwright
const path = require('path');
const fs = require('fs');

function loadPlaywright() {
  const choices = [
    process.env.PLAYWRIGHT_PATH,
    'playwright'
  ].filter(Boolean);
  for (const name of choices) {
    try { return require(name); } catch (_) { /* try the next installed runtime */ }
  }
  throw new Error('Playwright was not found. Set PLAYWRIGHT_PATH to its module directory.');
}

function assert(ok, message) { if (!ok) throw new Error('QA: ' + message); }

(async () => {
  const { chromium } = loadPlaywright();
  const root = path.resolve(__dirname, '..');
  const out = process.env.SHOTS;
  if (out) fs.mkdirSync(out, { recursive: true });
  const width = +(process.env.W || 1280);
  const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const launch = fs.existsSync(chrome) ? { executablePath: chrome } : {};
  const browser = await chromium.launch(launch);
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.addLocatorHandler(page.locator('#welcomeGate'), async gate => {
    await gate.locator('#welcomeEnter').click();
  });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await page.goto('file://' + path.join(root, 'index.html'));
  await page.waitForSelector('body.ready');

  async function answerCurrent(correct) {
    const stem = (await page.locator('.q-stem').textContent()).trim();
    const meta = await page.evaluate(s => {
      for (const u of window.UNITS || []) for (const q of u.questions || []) if (q.q === s) return { type: q.type, answer: q.answer };
      return null;
    }, stem);
    assert(meta, 'could not resolve current question');
    if (meta.type === 'mc') await page.click(`[data-pick="${correct ? meta.answer : (meta.answer + 1) % 4}"]`);
    else if (meta.type === 'tf') await page.click(`[data-pick="${correct ? meta.answer : !meta.answer}"]`);
    else { await page.fill('#shortIn', correct ? String(meta.answer) : 'definitely wrong'); await page.click('#checkShort'); }
  }

  async function completeLearningQuiz(correct) {
    while (!(await page.locator('.results-hero').count())) {
      await answerCurrent(correct);
      if (await page.locator('#finishQ').count()) await page.click('#finishQ');
      else await page.click('#nextQ');
    }
  }

  const units = await page.evaluate(() => (window.UNITS || []).map(u => u.id));
  assert(units.length >= 15, `expected at least 15 units, loaded ${units.length}`);
  console.log('units loaded:', units.length, units.join(','));

  const routes = ['#/home', '#/planner', '#/unit/' + (units[2] || 'u03') + '/learn',
    '#/unit/' + (units[2] || 'u03') + '/objectives', '#/unit/' + (units[2] || 'u03') + '/cards',
    '#/unit/' + (units[2] || 'u03') + '/quiz', '#/unit/' + (units[2] || 'u03') + '/drills',
    '#/unit/' + (units[2] || 'u03') + '/board', '#/unit/' + (units[2] || 'u03') + '/mnemonics',
    '#/test', '#/cards', '#/objectives', '#/board', '#/group', '#/cram', '#/missed', '#/mnemonics', '#/settings'];
  for (const route of routes) {
    await page.evaluate(h => { location.hash = h; }, route);
    await page.waitForTimeout(80);
    assert(!(await page.locator('main').getByText('Something went wrong on this page').count()), `route failed: ${route}`);
    if (out) {
      const name = route.replace(/[#\/]+/g, '_').replace(/^_/, '') || 'home';
      await page.screenshot({ path: path.join(out, `${width}-${name}.png`), fullPage: false });
    }
  }

  await page.goto('file://' + path.join(root, 'index.html') + '#/planner');
  await page.waitForSelector('#saveExam');
  const future = new Date(Date.now() + 7 * 86400000);
  const date = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;
  await page.fill('#examLabel', '<Physics & formulas>');
  await page.fill('#examDate', date);
  await page.locator('.planner-units input').evaluateAll(nodes => nodes.forEach((n, i) => { n.checked = i === 1; }));
  await page.click('#saveExam');
  await page.waitForURL(/#\/home$/);
  assert((await page.locator('.exam-banner').textContent()).includes('<Physics & formulas>'), 'exam label was not safely rendered on Home');
  assert(await page.locator('a[href="#/focus/exam"]').count(), 'Home weak-objective action is not exam scoped');
  assert(await page.locator('a[href="#/cards/exam"]').count(), 'Home flashcard action is not exam scoped');
  await page.click('a[href="#/cards/exam"]');
  await page.waitForSelector('#cardPane');
  assert((await page.locator('#fcUnit option').count()) === 2, 'exam flashcards include units outside the plan');
  assert((await page.locator('.fc-meta .nums').textContent()).includes('/ 20'), 'flashcard session is not capped at 20 cards');

  // Card grading persists in localStorage.
  await page.click('#fcCard');
  await page.click('#yesBtn');
  assert(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('usp.v1')).cards).length === 1), 'flashcard grade did not persist');

  // Custom objectives and mnemonics persist and safely render punctuation.
  await page.goto('file://' + path.join(root, 'index.html') + '#/unit/u03/objectives');
  await page.fill('#customTA', 'Explain PRF & depth <safely>');
  await page.click('#saveCustom');
  assert(await page.getByText('Explain PRF & depth <safely>').count(), 'custom objective did not persist/render');
  await page.goto('file://' + path.join(root, 'index.html') + '#/unit/u03/mnemonics');
  await page.fill('#mnSaying', 'Depth sets the beat');
  await page.fill('#mnMeaning', 'PRP up, PRF down');
  await page.click('#mnAdd');
  assert(await page.getByText('Depth sets the beat').count(), 'custom mnemonic did not persist');

  // Whiteboard reveal and self-grade persist.
  await page.goto('file://' + path.join(root, 'index.html') + '#/unit/u03/board');
  await page.locator('.board-tile').first().click();
  await page.click('#wbDone');
  await page.locator('#wbReveal input[type=checkbox]').first().check();
  await page.click('#wbSave');
  assert(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('usp.v1')).board).length === 1), 'whiteboard score did not persist');

  // Search finds indexed study content.
  await page.goto('file://' + path.join(root, 'index.html') + '#/search');
  await page.fill('#searchBox', 'duty factor');
  await page.waitForTimeout(350);
  assert(await page.locator('.hit').count(), 'search returned no results');

  // Invalid imports are rejected before storage is changed.
  await page.goto('file://' + path.join(root, 'index.html') + '#/settings');
  const beforeBadImport = await page.evaluate(() => localStorage.getItem('usp.v1'));
  await page.setInputFiles('#importFile', { name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ v: 1, settings: { theme: 'light', name: '' }, lessonsDone: [], objRatings: {}, customObjectives: {}, cards: {}, qstats: {}, missed: {}, board: {}, mnemonics: {}, days: {}, exam: { date: '2099-01-01', units: [], label: {} } })) });
  await page.waitForTimeout(100);
  assert(await page.evaluate(x => localStorage.getItem('usp.v1') === x, beforeBadImport), 'invalid import destroyed prior progress');

  // A valid exported-shape import succeeds.
  const goodState = { v: 1, settings: { theme: 'light', name: 'Imported Student' }, lessonsDone: {}, objRatings: {}, customObjectives: {}, cards: {}, qstats: {}, missed: {}, board: {}, mnemonics: {}, days: {}, exam: null };
  await page.setInputFiles('#importFile', { name: 'good.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(goodState)) });
  await page.waitForTimeout(100);
  assert(await page.evaluate(() => JSON.parse(localStorage.getItem('usp.v1')).settings.name === 'Imported Student'), 'valid import did not persist');

  // Capture every route in both themes and both target widths; mobile must not overflow.
  if (out) {
    for (const shotWidth of [1280, 390]) {
      await page.setViewportSize({ width: shotWidth, height: 900 });
      for (const theme of ['light', 'dark']) {
        await page.evaluate(t => { const s = JSON.parse(localStorage.getItem('usp.v1')); s.settings.theme = t; localStorage.setItem('usp.v1', JSON.stringify(s)); }, theme);
        await page.reload();
        for (const route of routes) {
          await page.evaluate(h => { location.hash = h; }, route);
          await page.waitForTimeout(220);
          if (shotWidth === 390) assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `horizontal overflow on ${route} in ${theme}`);
          const name = route.replace(/[#\/]+/g, '_').replace(/^_/, '') || 'home';
          await page.screenshot({ path: path.join(out, `${shotWidth}-${theme}-${name}.png`), fullPage: false });
        }
      }
    }
  }

  await page.goto('file://' + path.join(root, 'index.html') + '#/unit/' + units[2] + '/learn');
  await page.locator('.lesson-link').first().click();
  await page.waitForSelector('.lesson-card');
  await page.goto('file://' + path.join(root, 'index.html') + '#/unit/' + units[2] + '/quiz');
  await page.waitForSelector('#startQuiz');
  assert(!(await page.locator('#startQuiz').isDisabled()), 'unit quiz has no available questions');
  await page.click('#startQuiz');
  await completeLearningQuiz(false);
  assert(await page.locator('.results-hero').count(), 'learning quiz did not complete');

  // Complete a real exam-mode practice test with deferred feedback.
  await page.goto('file://' + path.join(root, 'index.html') + '#/test');
  await page.click('[data-tu="u01"]');
  await page.click('[data-tc="10"]');
  await page.click('#startTest');
  for (let i = 0; i < 10; i++) await answerCurrent(true);
  await page.click('#submitAll');
  await page.waitForTimeout(100);
  assert(await page.locator('.results-hero').count(), 'exam-mode practice test did not complete');

  // A missed question leaves only after two consecutive correct retries.
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('usp.v1')); s.missed = { 'u01-q1': { streak: 0, ts: Date.now() } }; localStorage.setItem('usp.v1', JSON.stringify(s)); });
  await page.reload();
  await page.goto('file://' + path.join(root, 'index.html') + '#/missed');
  await page.click('#drillMissed');
  await completeLearningQuiz(true);
  await page.goto('file://' + path.join(root, 'index.html') + '#/missed');
  await page.click('#drillMissed');
  await completeLearningQuiz(true);
  assert(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('usp.v1')).missed).length === 0), 'missed questions did not clear after two correct retries');

  // Numeric drills reject partial expressions and honor the displayed absolute tolerance.
  await page.goto('file://' + path.join(root, 'index.html') + '#/unit/u01/drills/u01-d8');
  const givenText = await page.locator('.drill-given').textContent().catch(() => page.locator('.q-stem').textContent());
  const radius = +(givenText.match(/radius ([\d.]+)/) || [])[1];
  assert(Number.isFinite(radius), 'could not read circle drill radius');
  const area = Math.PI * radius * radius;
  await page.fill('#drillIn', String(area + 0.1));
  await page.click('#drillCheck');
  assert(await page.locator('.verdict.wrong').count(), 'numeric drill used hidden relative tolerance');
  await page.click('#nextProb');
  await page.fill('#drillIn', '1/2');
  await page.click('#drillCheck');
  assert(await page.locator('.verdict.wrong').count(), 'numeric drill accepted a partial expression');

  assert(errors.length === 0, errors.join('\n'));
  console.log(`functional smoke: OK (${width}px, ${routes.length} routes, planner scope verified)`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
