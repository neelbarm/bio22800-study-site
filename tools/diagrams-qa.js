// Render every lesson diagram in both themes, create contact sheets, and flag
// text outside its SVG viewBox. NODE_PATH must contain playwright and sharp.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
  const root = path.resolve(__dirname, '..');
  const out = process.env.SHOTS || '/tmp/ultrasound-diagrams';
  fs.mkdirSync(out, { recursive: true });
  const ctx = { window: {} };
  for (const f of fs.readdirSync(path.join(root, 'data/units')).filter(f => /^u\d\d-.*\.js$/.test(f)).sort()) {
    vm.runInNewContext(fs.readFileSync(path.join(root, 'data/units', f), 'utf8'), ctx);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 640, height: 500 } });
  const problems = [];
  let count = 0;
  for (const theme of ['light', 'dark']) {
    for (const unit of ctx.window.UNITS) {
      const images = [];
      for (const lesson of unit.lessons) {
        for (const [i, d] of (lesson.diagrams || []).entries()) {
          const id = `${lesson.id}-${i + 1}`;
          await page.setContent(`<style>${fs.readFileSync(path.join(root, 'styles.css'), 'utf8')}
            body{margin:0;padding:0;background:var(--paper);color:var(--ink)}
            .figure{width:620px;padding:10px;box-sizing:border-box;background:var(--paper)}
            .figure svg{display:block;width:600px;height:auto;color:var(--ink)}
            .label{font:14px system-ui;margin:0 0 8px;color:var(--ink)}
          </style><div class="figure"><p class="label">${id}: ${lesson.title.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</p>${d.svg}</div>`);
          await page.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
          const flags = await page.locator('svg').evaluate(svg => {
            const v = svg.viewBox.baseVal;
            return [...svg.querySelectorAll('text')].flatMap(t => {
              const b = t.getBBox();
              return b.x < -1 || b.y < -1 || b.x + b.width > v.width + 1 || b.y + b.height > v.height + 1
                ? [{ text: t.textContent, bounds: [b.x,b.y,b.width,b.height] }] : [];
            });
          });
          if (flags.length) problems.push({ theme, id, flags });
          const file = path.join(out, `${theme}-${id}.png`);
          await page.locator('.figure').screenshot({ path: file });
          images.push(file); count++;
        }
      }
      // At 600px per diagram, labels remain legible when inspecting the sheet.
      for (let offset = 0; offset < images.length; offset += 6) {
        const subset = images.slice(offset, offset + 6);
        const tiles = await Promise.all(subset.map(async (file, i) => ({
          input: await sharp(file).resize({ width: 620, height: 450, fit: 'contain', background: theme === 'dark' ? '#172025' : '#ffffff' }).png().toBuffer(),
          left: (i % 2) * 620, top: Math.floor(i / 2) * 450,
        })));
        await sharp({ create: { width: 1240, height: Math.ceil(subset.length / 2) * 450, channels: 3, background: theme === 'dark' ? '#172025' : '#ffffff' } })
          .composite(tiles).png().toFile(path.join(out, `${theme}-${unit.id}-sheet-${offset / 6 + 1}.png`));
      }
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(out, 'bounds.json'), JSON.stringify(problems, null, 2));
  console.log(`${count} diagram renders; ${problems.length} diagrams with text outside viewBox. Sheets: ${out}`);
  for (const p of problems) console.log(`${p.theme} ${p.id}: ${p.flags.map(f => f.text).join(' | ')}`);
  if (problems.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exit(1); });
