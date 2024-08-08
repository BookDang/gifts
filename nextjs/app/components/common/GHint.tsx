'use client'

import React from 'react'
import { TooltipProps, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'

type GHintProps = {
  content: TooltipProps['title']
  iconColor?: string
  placement?: TooltipProps['placement']
}

const GHint: React.FC<GHintProps> = props => {
  console.log('GHint render')

  return (
    <div className="hint absolute right-2 top-2">
      <Tooltip title={props.content} arrow placement={props.placement ? props.placement : 'top'}>
        <HelpIcon className="cursor-pointer text-login-light_yellow_60 hover:text-login-light_yellow" />
      </Tooltip>
    </div>
  )
}

export default GHint
