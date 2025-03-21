import { DASHBOARD_PATH, LOGIN_PATH } from '@/utils/constants'
import { NextRequest, NextResponse } from 'next/server'

const EXCEPT_PATHS = [LOGIN_PATH]

export function authMiddlewareDashboard(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (EXCEPT_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  if (pathname.startsWith(DASHBOARD_PATH)) {
    const token = req.cookies.get('access-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL(LOGIN_PATH, req.url))
    }
  }

  return NextResponse.next()
}
