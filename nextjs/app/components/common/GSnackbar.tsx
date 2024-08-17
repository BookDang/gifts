'use client'

import React from 'react'
import { Alert, Snackbar, SnackbarProps } from '@mui/material'
import snackbarStore from '@/stores/SnackbarStore'

type GSnackbarProps = {}

const GSnackbar: React.FC<GSnackbarProps> = props => {
  const {
    message,
    setMessage,
    open,
    setOpenSnackbar,
    autoHideDuration,
    vertical,
    horizontal,
    severity,
    setSeverity,
  } = snackbarStore()

  console.log('horizontal book: ', horizontal)

  const handleClose = () => {
    setOpenSnackbar(false)
    setSeverity('success')
    setMessage('')
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: vertical || 'top',
        horizontal: horizontal || 'center',
      }}
    >
      <Alert severity={severity || 'success'} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}

// export default GSnackbar
export default React.memo(GSnackbar)
