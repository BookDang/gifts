'use client'

import React from 'react'
import GSnackbar from '@/app/components/common/GSnackbar'

type LayoutProviderProps = {
  children: React.ReactNode
}

const LayoutProvider: React.FC<LayoutProviderProps> = (props) => {

  return (
    <>
      {props.children}
      <GSnackbar />
    </>
  )
}

export default LayoutProvider
