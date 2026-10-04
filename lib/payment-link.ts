/**
 * Payment Link helpers with no environment access, so client components can import them without
 * pulling in server config.
 */

/** Adds Stripe Payment Link prefill parameters. Returns '' when the link is missing or not a valid URL. */
export function paymentLink(base: string, opts: { email?: string; ref?: string } = {}): string {
  if (!base) return ''
  try {
    const u = new URL(base)
    if (opts.email) u.searchParams.set('prefilled_email', opts.email)
    if (opts.ref) u.searchParams.set('client_reference_id', opts.ref.replace(/[^\w-]/g, '').slice(0, 200))
    return u.toString()
  } catch {
    return ''
  }
}

/**
 * Normalises a Stripe Payment Link pasted into an environment variable: trims it, strips surrounding quotes
 * and adds https:// when the scheme is missing. Only https links on buy.stripe.com or checkout.stripe.com
 * are accepted; anything else returns ''.
 */
export function stripeLink(raw: string | undefined): string {
  const v = (raw || '').trim().replace(/^(["'])(.*)\1$/, '$2').trim()
  if (!v) return ''
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`)
    if (u.protocol === 'https:' && (u.hostname === 'buy.stripe.com' || u.hostname === 'checkout.stripe.com')) return u.toString()
  } catch {
    /* invalid */
  }
  return ''
}
