import { NextRequest, NextResponse } from 'next/server'

export async function authMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('redirect', req.nextUrl.pathname)
  try {
    const loginToken = req.cookies.get('access_token')
    if (!loginToken) {
      return NextResponse.redirect(new URL(url))
    }
  } catch (error) {
    return NextResponse.redirect(url)
  }
}
