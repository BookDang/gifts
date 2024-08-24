'use client'

import React from 'react'

type FormTitleProps = {
  title: string
}

const FormTitle: React.FC<FormTitleProps> = props => {
  console.log('FormTitle render')

  return (
    <div className="form-title rounded-t-xl bg-amber-500 py-5">
      <h1 className="text-2xl font-bold text-center text-white">
        {props.title}
      </h1>
    </div>
  )
}

export default React.memo(FormTitle)
