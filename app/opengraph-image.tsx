import { ImageResponse } from 'next/og'
import { config } from '@/lib/config.ts'

export const alt = `${config.brand}: make your AI-built app safe to launch`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The share card for every page: brand, promise and the free-scan call to action, in the site's colours. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#f3f4f0', color: '#0f1b2d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 44, height: 44, border: '6px solid #0f1b2d', borderRadius: 10, display: 'flex' }} />
          {config.brand}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>Your app works in the demo. Make it safe for real users.</div>
          <div style={{ fontSize: 32, color: '#566273' }}>Open databases, leaked keys, fakeable payments: found and fixed for AI-built apps.</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ background: '#f2c230', color: '#0f1b2d', fontSize: 30, fontWeight: 700, padding: '14px 26px', borderRadius: 10 }}>Free 60-second scan</div>
        </div>
      </div>
    ),
    size,
  )
}
