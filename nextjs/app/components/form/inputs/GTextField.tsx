/**
 * Path import the GTextField component:
 * import GTextField from '@/app/components/form/inputs/GTextField'
 */

'use client'

import React from 'react'

import { TextField, TextFieldProps, TooltipProps } from '@mui/material'
import GHint from '@/app/components/common/GHint'

export type GTextFieldProps = {
  hintcontent?: TooltipProps['title']
  isError?: boolean
} & TextFieldProps

const GTextField = React.forwardRef(
  (props: GTextFieldProps, ref: React.Ref<HTMLInputElement>) => {
    console.log('GTextField render')
    
    return (
      <div className="relative">
        <TextField
          {...props}
          inputRef={ref}
          sx={{
            '& .MuiInputBase-root': {
              paddingRight: props.hintcontent ? '2rem' : '0',
            },
            ...props.sx,
          }}
        />
        {
          // If the hintcontent is provided, show the hint icon
          props.hintcontent !== undefined && (
            <GHint
              content={props.hintcontent}
              isError={props.isError}
            />
          )
        }
      </div>
    )
  },
)

export default GTextField
