import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, loginMiddleware } from '@/utils/middlewares/authMiddleware'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/login') {
    return loginMiddleware(req)
  }

  if (req.nextUrl.pathname.startsWith('/users')) {
    return authMiddleware(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/users', '/login'],
}
