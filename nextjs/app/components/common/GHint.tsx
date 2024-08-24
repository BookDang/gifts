'use client'

import React from 'react'
import { TooltipProps, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'

type GHintProps = {
  content: TooltipProps['title']
  isError?: boolean | string
  placement?: TooltipProps['placement']
}

const GHint: React.FC<GHintProps> = props => {
  console.log('GHint render: ', props.content)

  const redColor = Number(props.isError)
    ? 'text-red-500'
    : 'text-login-light_yellow_60'

  return (
    <div className="hint absolute right-2 top-2">
      <Tooltip
        title={props.content}
        arrow
        placement={props.placement ? props.placement : 'top'}
      >
        <HelpIcon
          className={`cursor-pointer ${redColor} hover:text-login-light_yellow`}
        />
      </Tooltip>
    </div>
  )
}

export default React.memo(GHint)
