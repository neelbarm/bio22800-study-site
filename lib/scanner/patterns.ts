import data from '../../shared/secret-patterns.json' with { type: 'json' }
import type { Severity } from './types.ts'

export interface SecretPattern {
  id: string
  name: string
  regex: RegExp
  severity: Severity
  fix: string
}

export const SECRET_PATTERNS: SecretPattern[] = (data.patterns as { id: string; name: string; regex: string; severity: string; fix: string }[]).map(p => ({
  id: p.id,
  name: p.name,
  regex: new RegExp(p.regex, 'g'),
  severity: p.severity as Severity,
  fix: p.fix,
}))

/** Shows only the first 6 and last 4 characters. */
export function mask(value: string): string {
  if (value.length <= 12) return value.slice(0, 3) + '…'
  return `${value.slice(0, 6)}…${value.slice(-4)}`
}
