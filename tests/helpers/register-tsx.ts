import { register } from 'node:module'

// Lets component tests import .tsx files under node --test: "@/..." resolves to the repo root, Next's CJS
// entry points get their .js extension, and .tsx is compiled with the project's TypeScript (react-jsx).
register(
  'data:text/javascript,' +
    encodeURIComponent(`
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
const root = ${JSON.stringify(new URL('../../', import.meta.url).href)}
const ts = createRequire(root + 'package.json')('typescript')
export async function resolve(spec, ctx, next) {
  if (spec.startsWith('@/')) return next(new URL(spec.slice(2), root).href, ctx)
  if (/^next\\/(?:link|navigation|server)$/.test(spec)) return next(spec + '.js', ctx)
  return next(spec, ctx)
}
export async function load(url, ctx, next) {
  if (!url.endsWith('.tsx')) return next(url, ctx)
  const src = await readFile(new URL(url), 'utf8')
  const out = ts.transpileModule(src, { fileName: url, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: false } })
  return { format: 'module', source: out.outputText, shortCircuit: true }
}`),
)
