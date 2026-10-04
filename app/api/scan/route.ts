import { handleScanRequest } from '@/lib/scan-handler.ts'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  return handleScanRequest(req)
}
