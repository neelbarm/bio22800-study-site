// Focused pure-function regression tests for app answer grading.
const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync(require('path').join(__dirname, '..', 'app.js'), 'utf8');

function extract(name, nextName) {
  const start = src.indexOf('  function ' + name + '(');
  const end = src.indexOf('  function ' + nextName + '(', start + 1);
  if (start < 0 || end < 0) throw new Error('could not extract ' + name);
  return src.slice(start, end);
}

const box = {};
vm.createContext(box);
vm.runInContext(extract('normAns', 'shortIsCorrect') + '\n' + extract('numIsCorrect', 'defaultState') + '\nthis.normAns=normAns; this.numIsCorrect=numIsCorrect;', box);

function assert(ok, msg) { if (!ok) throw new Error(msg); }
assert(box.normAns('-3 dB') !== box.normAns('3 dB'), 'negative sign was discarded');
assert(box.normAns('+3 dB') !== box.normAns('-3 dB'), 'plus and minus signs collapsed');
assert(box.normAns('sub-dicing') === box.normAns('subdicing'), 'hyphenated word normalization regressed');
assert(!box.numIsCorrect('1/2', 12, 0), 'fraction text was parsed as 12');
assert(!box.numIsCorrect('abc12', 12, 0), 'arbitrary text was parsed as 12');
assert(!box.numIsCorrect('100.5', 100, 0.1), 'hidden relative tolerance overrode displayed tolerance');
assert(box.numIsCorrect('-3', -3, 0), 'signed numeric literal was rejected');
assert(box.numIsCorrect('1,540', 1540, 0), 'proper thousands separator was rejected');
console.log('answer grading unit tests: OK');
