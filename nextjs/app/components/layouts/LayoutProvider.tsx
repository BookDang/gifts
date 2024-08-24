'use client'

import React from 'react'
import GSnackbar from '@/app/components/common/GSnackbar'

type LayoutProviderProps = {
  children: React.ReactNode
}

const LayoutProvider: React.FC<LayoutProviderProps> = (props) => {
  return (
    <main className="max-w-7xl mx-auto">
      {props.children}
      <GSnackbar />
    </main>
  )
}

export default LayoutProvider
