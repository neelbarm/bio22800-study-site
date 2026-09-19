// Run: NODE_PATH=/opt/node22/lib/node_modules node tools/qa.js   (W=390 for phone width; SHOTS=dir for screenshots)
// Generic smoke test: open the app from file://, walk routes, click tabs, record console errors, screenshot.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const root = '/home/user/bio22800-study-site';
  const out = process.env.SHOTS || '/tmp/usp-shots'; fs.mkdirSync(out, { recursive: true });
  const width = +(process.env.W || 1280);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await page.goto('file://' + root + '/index.html');
  await page.waitForTimeout(1500);
  const units = await page.evaluate(() => (window.UNITS || []).map(u => u.id));
  console.log('units loaded:', units.length, units.join(','));
  const routes = ['#/home', '#/unit/' + (units[2] || 'u03') + '/learn', '#/unit/' + (units[2] || 'u03') + '/objectives',
    '#/unit/' + (units[2] || 'u03') + '/flashcards', '#/unit/' + (units[2] || 'u03') + '/quiz', '#/unit/' + (units[2] || 'u03') + '/drills',
    '#/unit/' + (units[2] || 'u03') + '/whiteboard', '#/unit/' + (units[2] || 'u03') + '/mnemonics',
    '#/test', '#/flashcards', '#/objectives', '#/whiteboard', '#/group', '#/cram', '#/missed', '#/mnemonics', '#/settings'];
  for (const r of routes) {
    await page.evaluate(h => { location.hash = h; }, r);
    await page.waitForTimeout(400);
    const name = r.replace(/[#\/]+/g, '_').replace(/^_/, '') || 'home';
    await page.screenshot({ path: path.join(out, `${width}-${name}.png`), fullPage: false });
  }
  console.log('errors:', errors.length);
  errors.slice(0, 30).forEach(e => console.log('  ' + e));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
