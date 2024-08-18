import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800/50 text-white w-full sticky top-0 left-0 z-50">
      <h1 className="text-2xl font-bold">Gitfs</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-login-light_yellow">
              Home
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-login-light_yellow">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
