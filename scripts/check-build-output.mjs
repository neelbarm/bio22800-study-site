#!/usr/bin/env node
// Post-build checks on the prerendered HTML (runs after `next build` as the npm "postbuild" script).
// - /scan must ship its form in the static HTML (no client-side-rendering bailout), so it works before JS loads.
// - Published agreements must not show raw [PLACEHOLDER] text.
// - Pages carry their own canonical URL and the shared Open Graph image.
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function checkBuildOutput(appDir) {
  const problems = []
  const html = rel => {
    const f = path.join(appDir, rel)
    if (!existsSync(f)) {
      problems.push(`${rel} was not prerendered`)
      return ''
    }
    return readFileSync(f, 'utf8')
  }
  const scan = html('scan.html')
  if (scan) {
    if (!scan.includes('id="scan-url"')) problems.push('scan.html: the scan form (#scan-url) is not in the static HTML')
    if (scan.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING')) problems.push('scan.html: bails out to client-side rendering')
    if (!/<link rel="canonical" href="[^"]*\/scan"/.test(scan)) problems.push('scan.html: missing canonical link to /scan')
    if (!/<meta property="og:image"/.test(scan)) problems.push('scan.html: missing og:image')
  }
  for (const rel of ['legal/service-agreement.html', 'legal/diagnosis-terms.html']) {
    const page = html(rel)
    const main = page.slice(page.indexOf('<main'), page.indexOf('</main>'))
    const visible = main.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')
    const left = visible.match(/\[[A-Z][^\]\n]{0,60}\]/g)
    if (page && left) problems.push(`${rel}: raw placeholders ${[...new Set(left)].join(', ')}`)
  }
  return problems
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const dir = path.join(process.cwd(), '.next', 'server', 'app')
  const problems = checkBuildOutput(dir)
  if (problems.length) {
    console.error('Build output check failed:\n- ' + problems.join('\n- '))
    process.exit(1)
  }
  console.log('Build output check passed.')
}
