import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useAuth = (token: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])
  return isAuthenticated
}

export default useAuth
