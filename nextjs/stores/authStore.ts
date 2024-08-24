import { create } from 'zustand'

type TAuthStore = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useAuthStore = create<TAuthStore>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
}))

export default useAuthStore
