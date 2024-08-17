// Create a store with SnackbarStore name using zustant

import create from 'zustand'

type SnackbarStoreType = {
  message: string
  setMessage: (message: string) => void
  open: boolean
  setOpenSnackbar: (isOpen: boolean) => void
  vertical?: 'top' | 'bottom'
  setVertical: (vertical: 'top' | 'bottom') => void
  horizontal?: 'left' | 'center' | 'right'
  setHorizontal: (horizontal: 'left' | 'center' | 'right') => void
  autoHideDuration?: number
  setAutoHideDuration: (autoHideDuration: number) => void
  severity?: 'error' | 'info' | 'success' | 'warning'
  setSeverity: (severity: 'error' | 'info' | 'success' | 'warning') => void
}

const snackbarStore = create<SnackbarStoreType>(set => ({
  message: '',
  setMessage: (message: string) => set({ message }),
  open: false,
  setOpenSnackbar: (open: boolean) => set({ open }),
  vertical: 'top',
  setVertical: (vertical: 'top' | 'bottom') => set({ vertical }),
  horizontal: 'right',
  setHorizontal: (horizontal: 'left' | 'center' | 'right') =>
    set({ horizontal }),
  autoHideDuration: 3000,
  setAutoHideDuration: (autoHideDuration: number) => set({ autoHideDuration }),
  severity: 'success',
  setSeverity: (severity: 'error' | 'info' | 'success' | 'warning') =>
    set({ severity }),
}))

export default snackbarStore
