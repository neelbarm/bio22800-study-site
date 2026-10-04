import type { NextConfig } from 'next'

const securityHeaders = [
  // Add includeSubDomains (and only after that, preload plus a hstspreload.org submission) once the custom domain
  // is final and every current and planned subdomain serves valid HTTPS. Removing a preloaded domain takes months.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // The scanner's SSRF guard uses undici's Agent directly; load it from node_modules rather than bundling it.
  serverExternalPackages: ['undici'],
  outputFileTracingIncludes: {
    '/privacy': ['./business/legal/site-privacy.md'],
    '/terms': ['./business/legal/site-terms.md'],
    '/legal/service-agreement': ['./business/legal/master-services-agreement.md'],
    '/legal/diagnosis-terms': ['./business/legal/sow-diagnosis.md'],
    '/sample-report': ['./business/sample-report.md'],
    '/guides': ['./business/sales/teardown-posts.md'],
    '/guides/[slug]': ['./business/sales/teardown-posts.md'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
