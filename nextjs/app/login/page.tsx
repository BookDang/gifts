'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import FormTitle from '@/app/login/components/FormTitle'
import LoginForm from '@/app/login/components/LoginForm'
import { backgroundImageStyle } from '@/app/login/utils/config-styles'

const LoginPage: React.FC = () => {
  const t = useTranslations('LoginPage')

  return (
    <div className="relative">
      <div
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute
       bg-white shadow-md rounded-t-xl w-full max-w-md"
        style={backgroundImageStyle}
      >
        <div className="login-wrap w-full">
          <FormTitle title={t('login')} />
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
