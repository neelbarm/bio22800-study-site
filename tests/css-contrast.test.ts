import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// WCAG contrast for the colour tokens in app/globals.css, in both themes: focus rings and form-field borders
// need 3:1 against the page and card backgrounds (1.4.11), severity labels 4.5:1 on their tinted backgrounds (1.4.3).

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8')
function tokens(block: string): Record<string, string> {
  return Object.fromEntries([...block.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})\b/gi)].map(m => [m[1], m[2].toLowerCase()]))
}
const light = tokens(css.slice(css.indexOf(':root {'), css.indexOf('@media (prefers-color-scheme: dark)')))
const darkBlock = css.slice(css.indexOf('@media (prefers-color-scheme: dark)'))
const dark = { ...light, ...tokens(darkBlock.slice(0, darkBlock.indexOf('\n}\n'))) }

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function ratio(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

for (const [name, t] of [['light', light], ['dark', dark]] as const) {
  test(`${name} theme: focus ring and field borders reach 3:1 on paper and sheet`, () => {
    for (const fg of ['focus', 'field']) for (const bg of ['paper', 'sheet']) {
      assert.ok(t[fg] && t[bg], `missing --${fg} or --${bg}`)
      const r = ratio(t[fg], t[bg])
      assert.ok(r >= 3, `--${fg} ${t[fg]} on --${bg} ${t[bg]} is ${r.toFixed(2)}:1`)
    }
  })
  test(`${name} theme: severity colours reach 4.5:1 on their backgrounds`, () => {
    for (const sev of ['crit', 'high', 'med', 'low', 'pass']) {
      assert.ok(t[sev] && t[`${sev}-bg`], `missing --${sev} or --${sev}-bg`)
      const r = ratio(t[sev], t[`${sev}-bg`])
      assert.ok(r >= 4.5, `--${sev} ${t[sev]} on --${sev}-bg ${t[`${sev}-bg`]} is ${r.toFixed(2)}:1`)
    }
  })
}
