import { NextRequest, NextResponse } from 'next/server'

export async function authMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  try {
    const loginToken = req.cookies.get('access_token')
    if (!loginToken) {
      url.pathname = '/login'
      url.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(new URL(url))
    }
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(url)
  }
}
