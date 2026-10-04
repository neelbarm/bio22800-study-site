// Entry point so `node --test toolkit/test/` works on Node 22+, where a directory
// argument is resolved as a module (this file) instead of being searched.
import './unit.test.mjs';
import './audit.test.mjs';
import './cli.test.mjs';
import './regressions.test.mjs';
