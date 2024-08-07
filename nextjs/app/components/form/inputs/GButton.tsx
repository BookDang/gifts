/**
 * Path import the GButton component:
 * import GButton from '@/app/components/form/inputs/GButton'
 */

'use client'

import React from 'react'
import { Button, ButtonProps } from '@mui/material'

export type GButtonProps = {} & ButtonProps

const GButton: React.FC<GButtonProps> = props => {
  return <Button {...props} />
}

export default GButton
