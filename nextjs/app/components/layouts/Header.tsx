'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { IS_AUTHENTICATED } from '@/utils/constants/auth'

const protectedRoutes = ['/users']

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const redirectStr = searchParams.get('redirect')

  React.useEffect(() => {
    const isAuthenticatedCookie = Cookies.get(IS_AUTHENTICATED)
    if (isAuthenticatedCookie) {
      setIsAuthenticated(true)
      if (pathname === '/login' && !redirectStr) {
        router.push('/')
      } else if (pathname === '/login' && redirectStr) {
        router.push(redirectStr)
      }
    } else {
      setIsAuthenticated(false)
      if (protectedRoutes.includes(pathname)) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      }
    }
  }, [pathname, redirectStr])

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800/10 text-white w-full sticky top-0 left-0 z-50">
      <h1 className="text-2xl font-bold">Gitfs</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-login-light_yellow">
              Home
            </Link>
          </li>
          <li>
            <Link href="/users" className="hover:text-login-light_yellow">
              Users
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link href="/logout" className="hover:text-login-light_yellow">
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" className="hover:text-login-light_yellow">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
