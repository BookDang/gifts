/**
 * Path import the GTextField component:
 * import GTextField from '@/app/components/form/inputs/GTextField'
 */

'use client'

import React from 'react'

import { TextField, TextFieldProps } from '@mui/material'

export type GTextFieldProps = {} & TextFieldProps

const GTextField: React.FC<GTextFieldProps> = props => {
  return <TextField {...props} />
}

export default GTextField
