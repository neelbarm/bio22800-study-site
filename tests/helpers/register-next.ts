import { register } from 'node:module'

// Resolve the app's "@/..." alias and next/server so route handlers can be imported under node --test.
// Import this first, then load route modules with a dynamic import().
register(
  'data:text/javascript,' +
    encodeURIComponent(`
const root = ${JSON.stringify(new URL('../../', import.meta.url).href)}
export async function resolve(spec, ctx, next) {
  if (spec.startsWith('@/')) return next(new URL(spec.slice(2), root).href, ctx)
  if (spec === 'next/server') return next('next/server.js', ctx)
  return next(spec, ctx)
}`),
)
