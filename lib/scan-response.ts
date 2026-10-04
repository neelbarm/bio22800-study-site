/** What the scan form shows for a response from /api/scan. Pure, so it can be tested without a browser. */
export const TOO_SLOW = 'The scan took too long. Try again, or book a diagnosis and we will check it by hand.'

export type ScanOutcome<T> = { kind: 'result'; result: T } | { kind: 'error'; message: string; slow: boolean }

/**
 * Maps the HTTP status and parsed JSON body (null when the body was not JSON) to a result or a message.
 * A 504 or a non-JSON body means the platform cut the function off (or sent its own error page).
 */
export function scanOutcome<T>(status: number, data: unknown): ScanOutcome<T> {
  if (status === 504 || data === null || typeof data !== 'object') return { kind: 'error', message: TOO_SLOW, slow: true }
  const d = data as { error?: unknown }
  if (status < 200 || status >= 300) return { kind: 'error', message: typeof d.error === 'string' && d.error ? d.error : 'The scan failed. Please try again.', slow: false }
  return { kind: 'result', result: data as T }
}

/** The message for a request that threw (no response at all). */
export function scanFailure(err: unknown): { message: string; slow: boolean } {
  return (err as Error)?.name === 'TimeoutError' ? { message: TOO_SLOW, slow: true } : { message: 'Could not reach the scan service. Check your connection and try again.', slow: false }
}
