import { authMiddleware } from '@/utils/middlewares/authMiddleware'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Apply adminMiddleware to specific paths
  if (req.nextUrl.pathname.startsWith('/users')) {
    return authMiddleware(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/users'], // Apply middleware to these paths
}
