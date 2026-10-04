/** Post-payment steps for /thanks, per product. Payment Links redirect to /thanks?p=diagnosis|sprint|retainer. */
export type ThanksKind = 'diagnosis' | 'sprint' | 'retainer'

/** Which product was paid for, from the Payment Link redirect (?p=). Unknown values fall back to the diagnosis. */
export function thanksKind(p: unknown): ThanksKind {
  return p === 'sprint' || p === 'retainer' ? p : 'diagnosis'
}

export const THANKS_STEPS: Record<ThanksKind, { lede: string; steps: [string, string][] }> = {
  diagnosis: {
    lede: "Stripe has emailed you a receipt. We'll email you within one business day (usually the same day) to confirm and start.",
    steps: [
      ['Share the code', 'If the repo is in a GitHub organization, add us with the Read role. On a personal account GitHub can only add collaborators with write access; we use it read-only and never push. If you prefer, fork the repo into an organization and give us Read there, or export the project from your builder and send the zip. We’ll send our GitHub username in the confirmation email.'],
      ['Share database access safely', 'For Supabase: the Read-only role exists only on Team and Enterprise plans. On Free or Pro, invite us with the Developer role on a staging project (ideally in a separate organization), not on production. Never send passwords or keys by email or chat. We’ll send a secure link if we need anything sensitive.'],
      ['Tell us the important flows', 'Reply with the 3 things users must be able to do (for example: sign up, pay, see only their own data). We test those first.'],
      ['Get your report', 'Within 48 hours of payment and complete access you get the written report, a video walkthrough and a fixed-price quote for the fixes.'],
    ],
  },
  sprint: {
    lede: "Stripe has emailed you a receipt for the deposit. We'll email you within one business day (usually the same day) to confirm the scope and a kickoff date.",
    steps: [
      ['Confirm the scope', 'We confirm the statement of work and the issues in scope, based on your diagnosis.'],
      ['Grant code access', 'Give us write access to open pull requests on your GitHub repo, or confirm the access you gave for the diagnosis still works.'],
      ['Share staging database access', 'For Supabase: invite us with the Developer role on a staging project (ideally in a separate organization). Never send passwords or keys by email or chat.'],
      ['Kick off', 'We agree a kickoff date. The 5–10 day window starts at kickoff, once access is complete. The balance is due on delivery.'],
    ],
  },
  retainer: {
    lede: "Stripe has emailed you a receipt. We'll email you within one business day (usually the same day) to set things up.",
    steps: [
      ['Pick a request channel', 'We agree where you send requests (email or a shared channel) and who on your side can send them.'],
      ['Send your first requests', 'Each request is up to 2 hours of work. Unused requests don’t roll over to the next month.'],
      ['Monitoring', 'We set up uptime and error monitoring so we hear about problems before your users do.'],
    ],
  },
}
