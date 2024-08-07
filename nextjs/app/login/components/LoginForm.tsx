'use client'

import React from 'react'
import GTextField from '@/app/components/form/inputs/GTextField'
import { styleButton, styleTextField } from '@/app/login/utils/config-styles'
import GButton from '@/app/components/form/inputs/GButton'
import { useTranslations } from 'next-intl'

const LoginForm: React.FC = () => {
  
  const t = useTranslations('LoginPage')

  return (
    <div className="login-form px-8 py-16 flex flex-col gap-y-8 bg-[rgb(255_255_255_/_90%)]">
      <GTextField
        fullWidth
        size="small"
        label="Username"
        sx={{
          ...styleTextField,
        }}
      />

      <GTextField
        fullWidth
        size="small"
        label="Password"
        type="password"
        sx={{
          ...styleTextField,
        }}
      />

      <GButton
        variant="contained"
        disableElevation
        sx={{
          ...styleButton,
        }}
      >
        {t('login')}
      </GButton>
    </div>
  )
}

export default LoginForm
