'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import GButton from '@/app/components/form/inputs/GButton'
import GTextField from '@/app/components/form/inputs/GTextField'
import { styleButton, styleTextField } from '@/app/login/utils/config-styles'
import PasswordHint from '@/app/login/components/PasswordHint'

type LoginFormInputs = {
  username: string
  password: string
}

const LoginForm: React.FC = () => {
  console.log('LoginForm render')

  const d = useTranslations('LoginPage') // LoginPage is the namespace
  const t = useTranslations('ValidationMessages') // ValidationMessages is the namespace

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormInputs>()

  React.useEffect(() => {
    console.log('LoginForm useEffect: ', errors)
  }, [errors, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <div className="login-form px-8 py-16 flex flex-col gap-y-8 bg-[rgb(255_255_255_/_90%)]">
        <div>
          <Controller
            name="username"
            control={control}
            rules={{ required: true, maxLength: 30, minLength: 8 }}
            render={({ field }) => (
              <GTextField
                fullWidth
                size="small"
                label={d('user_name')}
                sx={{
                  ...styleTextField,
                }}
                error={!!errors.username}
                hintcontent={
                  <div>
                    <p>
                      {t('required', {
                        this_field: d('user_name'),
                      })}
                    </p>
                    <p>
                      {t('min', {
                        this_field: d('user_name'),
                        min: 8,
                      })}
                    </p>
                    <p>
                      {t('max', {
                        this_field: d('user_name'),
                        max: 30,
                      })}
                    </p>
                  </div>
                }
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 5, maxLength: 20 }}
            render={({ field }) => (
              <GTextField
                fullWidth
                size="small"
                label={d('password')}
                type="password"
                sx={{
                  ...styleTextField,
                }}
                error={!!errors.password}
                hintcontent={<PasswordHint />}
              />
            )}
          />
        </div>

        <GButton
          variant="contained"
          disableElevation
          type="submit"
          sx={{
            ...styleButton,
          }}
        >
          {d('login')}
        </GButton>
      </div>
    </form>
  )
}

export default LoginForm
