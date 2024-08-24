'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

type PasswordHintProps = {
  minPasswordLength: number
  maxPasswordLength: number
}

const PasswordHint: React.FC<PasswordHintProps> = props => {
  const d = useTranslations('LoginPage')
  const t = useTranslations('ValidationMessages')

  return (
    <div>
      <p>{t('required', { this_field: d('password') })}</p>
      <p>
        {t('between', {
          this_field: d('password'),
          min: props.minPasswordLength,
          max: props.maxPasswordLength,
        })}
      </p>
      <p>{t('password.conditions', { this_field: d('password') })}</p>
      <p>{t('password.number')}</p>
      <p>{t('password.uppercase')}</p>
      <p>{t('password.lowercase')}</p>
      <p>{t('password.special')}</p>
    </div>
  )
}

export default React.memo(PasswordHint)
