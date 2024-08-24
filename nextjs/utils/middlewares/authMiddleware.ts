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

export const loginMiddleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone()
  try {
    const loginToken = req.cookies.get('access_token')
    if (loginToken && req.nextUrl.pathname === '/login') {
      url.pathname = '/'
      // I want to check if has a query string
      if (req.nextUrl.search) {
        url.search = req.nextUrl.search
        const redirectUrl = url.searchParams.get('redirect')
        if (redirectUrl) {
          url.searchParams.delete('redirect')
          url.pathname = redirectUrl
        }
      }
      return NextResponse.redirect(new URL(url))
    }
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(url)
  }
}
