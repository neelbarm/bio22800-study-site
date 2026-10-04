import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
// @ts-expect-error plain .mjs script without type declarations
import { checkBuildOutput } from '../scripts/check-build-output.mjs'

// /scan used to bail out to client-side rendering (useSearchParams under Suspense), so its HTML had no form.
// This reads the prerendered output of the last `next build` (the same check runs as "postbuild").

const appDir = fileURLToPath(new URL('../.next/server/app/', import.meta.url))
const built = existsSync(appDir + 'scan.html')

test('prerendered pages: /scan form in static HTML, no raw placeholders in agreements, canonical and og:image', { skip: built ? false : 'run `npm run build` first' }, () => {
  assert.deepEqual(checkBuildOutput(appDir), [])
})
