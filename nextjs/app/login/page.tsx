// /app/login/page.tsx

'use client'

import { ACCESS_TOKEN } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError('Username and Password are required.')
      return
    }

    if (username === 'admin' && password === 'password') {
      document.cookie = `${ACCESS_TOKEN}=valid-token; path=/`
      router.back()
    } else {
      setError('Invalid Username or Password.')
    }
  }

  return (
    <div className="flex -mt-14 items-center justify-center h-[calc(100vh-2rem)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 pb-9 bg-white rounded-lg shadow-lg border border-orange-light"
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-orange">Login</h1>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-orange mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-2 border border-orange-light rounded bg-orange-50 focus:outline-none focus:border-orange-dark"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-orange mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border border-orange-light rounded bg-orange-50 focus:outline-none focus:border-orange-dark"
          />
        </div>

        <button type="submit" className="w-full p-2 text-white rounded bg-orange hover:bg-orange-dark transition">
          Login
        </button>
      </form>
    </div>
  )
}
