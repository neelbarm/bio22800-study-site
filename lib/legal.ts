import { config } from './config.ts'

/** Public URLs of the standard contract documents. Paying a Payment Link means accepting both. */
export const LEGAL_LINKS = {
  serviceAgreement: '/legal/service-agreement',
  diagnosisTerms: '/legal/diagnosis-terms',
}

const cell = (label: string, value: string) => (line: string) => line.replace(new RegExp(`^\\| ${label} \\|.*\\|\\s*$`), `| ${label} | ${value} |`)

/**
 * Turns the MSA or Diagnosis SOW template into the standard version published on the site: names, law and venue
 * come from the NEXT_PUBLIC_LEGAL_* settings, per-client blanks become "as given at checkout / in the intake form",
 * bracketed defaults ("[7]") keep their number, and signature tables are replaced by how acceptance works.
 * Any placeholder left over is removed (with a build-time warning) so no raw "[PLACEHOLDER]" text is published.
 */
export function fillAgreement(md: string): string {
  const L = config.legal
  const brand = config.brand
  const legalName = L.name || brand
  const governing = L.state ? `the State of ${L.state}` : `the state in which ${legalName} is based`
  const venue = L.state ? (L.county ? `${L.county} County, ${L.state}` : L.state) : 'that state'
  const notices = config.contactEmail || 'the contact address on our website'
  const msa = `${config.siteUrl}${LEGAL_LINKS.serviceAgreement}`
  const provider = L.name ? `${L.name}, doing business as ${brand}` : brand

  let out = md
    // MSA parties and law.
    .replace('[EFFECTIVE DATE]', 'the date Client accepts it')
    .replace(
      /\[YOUR LEGAL NAME OR BUSINESS ENTITY\], doing business as ShipReady, a \[STATE\] \[sole proprietorship \/ LLC\], with its address at \[PROVIDER ADDRESS\]/,
      `${provider}${L.address ? `, with its address at ${L.address}` : ''}`,
    )
    .replace(/\[CLIENT LEGAL NAME\], a \[CLIENT ENTITY TYPE AND STATE\/COUNTRY\], with its address at \[CLIENT ADDRESS\]/, 'the person or business named at checkout, on the invoice or in the SOW')
    .replace(/the laws of the State of \[STATE\]/g, `the laws of ${governing}`)
    .replace(/located in \[COUNTY\], \[STATE\]/g, `located in ${venue}`)
    .replace(/\s*\[OPTIONAL: [^\]]*\]/g, '')
    .replace('sent to the email addresses below (with confirmation of receipt) or to the addresses above', 'sent by email to the addresses in the Acceptance section below, with confirmation of receipt')
    .replace(/\n## Signatures\n[\s\S]*$/, `\n## Acceptance\n\nClient accepts this Agreement by signing it, by confirming by email, or by paying an invoice or Payment Link for services under it. Notices to Provider go to ${notices}; notices to Client go to the email address given at checkout or on the SOW.\n`)
    // Diagnosis SOW header and scope (the standard version is completed from checkout and the intake form).
    .replace('[SOW-YYYY-NNN]', 'the Stripe payment reference (or the invoice number)')
    .replace('**Date:** [DATE]', '**Date:** the date of payment')
    .replace('**Client:** [CLIENT LEGAL NAME]', '**Client:** the person or business named at checkout')
    .replace(/\[YOUR LEGAL NAME OR BUSINESS ENTITY\], d\/b\/a ShipReady/, L.name ? `${L.name}, d/b/a ${brand}` : brand)
    .replace('the MSA template attached to this SOW applies', 'the published MSA applies')
    .replace('by signing below,', 'by signing a copy,')
    .replace('Master Services Agreement dated [MSA DATE]', `[Master Services Agreement](${msa}) published on our website`)
    .replace('[are / are not] counted', 'are counted')
    .replace(/\*\*\$\[[^\]]*\]\*\*/, '**The amount paid at checkout or on the invoice**')
    .replace(/\[OPTIONAL\] /g, 'Optional: ')
    // "[7]" and similar are suggested defaults: keep the number.
    .replace(/\[(\d+)\]/g, '$1')
    .replace(/doing business as ShipReady|d\/b\/a ShipReady/g, m => m.replace('ShipReady', brand))

  out = out
    .split('\n')
    .map(line =>
      [
        cell('App name', 'As named in the intake form'),
        cell('Live URL', 'As given in the intake form'),
        cell('Repository', 'The repository Client shares, at the commit current when work starts'),
        cell('Backend', 'The Supabase project (or other backend) Client shares, staging or production'),
        cell('Payments', 'Stripe, if the app uses it (test or live mode, as Client shares)'),
        cell('Hosting', 'As shared during onboarding (for example Vercel or Netlify)'),
        cell('Builder used', 'As given in the intake form'),
      ].reduce((l, f) => f(l), line),
    )
    .join('\n')

  // The SOW's signature table: acceptance at checkout is described in the paragraph above it.
  const acc = out.lastIndexOf('\n## Acceptance\n')
  if (acc >= 0) out = out.slice(0, acc) + out.slice(acc).replace(/\n\|[^\n]*(?=\n|$)/g, '')

  const left = out.match(/\[[A-Z][A-Z0-9 _/,.-]*\](?!\()/g)
  if (left) {
    console.warn(`[legal] unfilled placeholders removed from a published agreement: ${[...new Set(left)].join(', ')}`)
    out = out.replace(/\[[A-Z][A-Z0-9 _/,.-]*\](?!\()/g, '')
  }
  return out
}
