'use client'

import React from 'react'

import { TextField, TextFieldProps } from '@mui/material'

export type GTextFieldProps = {}

const GTextField: React.FC<GTextFieldProps> = props => {
  return <TextField {...props} />
}

export default GTextField
