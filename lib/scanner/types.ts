export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export interface Finding {
  id: string
  severity: Severity
  title: string
  /** Plain-English explanation of why it matters. */
  detail: string
  /** What to do about it. */
  fix: string
  /** Where it was found (file URL, header, endpoint). Never contains a full secret. */
  where?: string
  /** Masked evidence. */
  evidence?: string
}

export interface ScanResult {
  url: string
  finalUrl: string
  checkedAt: string
  platform: string[]
  backend: string[]
  score: number
  grade: 'ready' | 'risky' | 'not-ready'
  counts: Record<Severity, number>
  findings: Finding[]
  passed: string[]
  notes: string[]
  stats: { scripts: number; bytes: number; ms: number }
}

export const SEVERITY_ORDER: Severity[] = ['critical', 'high', 'medium', 'low', 'info']
