import { authMiddlewareDashboard } from '@/middlewares/authMiddlewareDashboard'
import { DASHBOARD_PATH } from '@/utils/constants'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const response = authMiddlewareDashboard(req)
  if (response) return response
  return NextResponse.next()
}

export const config = {
  matcher: [DASHBOARD_PATH + '/:path*'],
}
