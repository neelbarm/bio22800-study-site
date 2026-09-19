// Dependency-free static release: validate first, then copy only public assets.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
execFileSync(process.execPath, [path.join(__dirname, 'validate.js')], { stdio: 'inherit' });
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const file of ['index.html', 'app.js', 'styles.css', 'data']) {
  fs.cpSync(path.join(root, file), path.join(out, file), { recursive: true });
}
console.log('Static release ready in dist/');
