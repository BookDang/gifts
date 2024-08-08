'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

const PasswordHint: React.FC = () => {
  const d = useTranslations('LoginPage')
  const t = useTranslations('ValidationMessages')

  return (
    <div>
      <p>{t('required', { this_field: d('password') })}</p>
      <p>{t('between', { this_field: d('password'), min: 8, max: 30 })}</p>
      <p>{t('password.conditions', { this_field: d('password') })}</p>
      <p>{t('password.number')}</p>
      <p>{t('password.uppercase')}</p>
      <p>{t('password.lowercase')}</p>
      <p>{t('password.special')}</p>
    </div>
  )
}

export default PasswordHint
