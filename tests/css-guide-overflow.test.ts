import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// Guide pages render markdown (with <pre> code blocks) inside `.prose.page-head`, a CSS grid.
// Grid items default to min-width:auto, so an unwrapped code line widened the whole article
// past a 390px viewport (horizontal page scroll). Guard the rules that prevent that.
const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')
const rule = (sel: string) => {
  const esc = sel.replace(/[.*+?^${}()|[\]\\>:]/g, '\\$&')
  const m = css.match(new RegExp(`(?:^|\\n)${esc}\\s*\\{([^}]*)\\}`))
  return m ? m[1] : ''
}

test('page-head grid children can shrink below their content width', () => {
  assert.match(rule('.page-head > *'), /min-width:\s*0/)
})

test('prose code blocks scroll inside themselves instead of widening the page', () => {
  const pre = rule('.prose pre')
  assert.match(pre, /overflow-x:\s*auto/)
  assert.match(pre, /max-width:\s*100%/)
})
