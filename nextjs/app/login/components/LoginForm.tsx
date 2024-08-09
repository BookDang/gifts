'use client'

import React, { use } from 'react'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import GButton from '@/app/components/form/inputs/GButton'
import GTextField from '@/app/components/form/inputs/GTextField'
import { styleButton, styleTextField } from '@/app/login/utils/config-styles'
import PasswordHint from '@/app/login/components/PasswordHint'
import { COLORS } from '@/utils/constants/colors'
import { CircularProgress } from '@mui/material'

const minPasswordLength = 6
const maxPasswordLength = 30
const minUserNameLength = 8
const maxUserNameLength = 30

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
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const passwordPattern = new RegExp(
    '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%^&*])[\\w@!#%^&*]{' +
      minPasswordLength +
      ',' +
      maxPasswordLength +
      '}$',
    'g',
  )

  const passwordHint = React.useMemo(() => {
    return (
      <PasswordHint
        minPasswordLength={minPasswordLength}
        maxPasswordLength={maxPasswordLength}
      />
    )
  }, [minPasswordLength, maxPasswordLength])

  const userNameHint = React.useMemo(() => {
    return (
      <div>
        <p>
          {t('required', {
            this_field: d('user_name'),
          })}
        </p>
        <p>
          {t('between', {
            this_field: d('user_name'),
            min: minUserNameLength,
            max: maxUserNameLength,
          })}
        </p>
      </div>
    )
  }, [t, d, minUserNameLength, maxUserNameLength])

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    console.log('data: ', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-form px-8 py-16 flex flex-col gap-y-8 bg-[rgb(255_255_255_/_90%)]">
        <div>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
              maxLength: maxUserNameLength,
              minLength: minUserNameLength,
            }}
            render={({ field }) => (
              <GTextField
                {...field}
                fullWidth
                size="small"
                label={d('user_name')}
                sx={{
                  ...styleTextField,
                }}
                error={!!errors.username}
                hintcontent={userNameHint}
                hinticoncolor={!!errors.username ? COLORS['red-error'] : ''}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              pattern: {
                value: passwordPattern,
                message: ``,
              },
            }}
            render={({ field }) => (
              <GTextField
                {...field}
                fullWidth
                size="small"
                label={d('password')}
                type="password"
                sx={{
                  ...styleTextField,
                }}
                error={!!errors.password}
                hintcontent={passwordHint}
                hinticoncolor={!!errors.password ? COLORS['red-error'] : ''}
              />
            )}
          />
        </div>
        <GButton
          variant="contained"
          disableElevation
          type="submit"
          disabled={isSubmitting}
          sx={{
            ...styleButton,
          }}
        >
          {isSubmitting ? <CircularProgress color="inherit" /> : d('login')}
        </GButton>
      </div>
    </form>
  )
}

export default LoginForm
