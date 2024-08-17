'use client'

import React, { use } from 'react'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { AxiosError } from 'axios'

import GButton from '@/app/components/form/inputs/GButton'
import GTextField from '@/app/components/form/inputs/GTextField'
import { styleButton, styleTextField } from '@/app/login/utils/config-styles'
import PasswordHint from '@/app/login/components/PasswordHint'
import { CircularProgress } from '@mui/material'
import AuthService from '@/services/authService'
import { TLogin } from '@/types/user'
import GSnackbar from '@/app/components/common/GSnackbar'
import snackbarStore from '@/stores/SnackbarStore'

const minPasswordLength = 6
const maxPasswordLength = 30
const minUserNameLength = 8
const maxUserNameLength = 30

const LoginForm: React.FC = () => {
  console.log('LoginForm render')

  const authService = new AuthService()
  const { setMessage, setOpenSnackbar, setSeverity, setHorizontal } =
    snackbarStore()

  const d = useTranslations('LoginPage') // LoginPage is the namespace
  const t = useTranslations('ValidationMessages') // ValidationMessages is the namespace

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<TLogin>({
    defaultValues: {
      email: '',
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

  const emailHint = React.useMemo(() => {
    return (
      <div>
        <p>
          {t('required', {
            this_field: d('email'),
          })}
        </p>
        <p>{d('example_mail')}</p>
      </div>
    )
  }, [t, d, minUserNameLength, maxUserNameLength])

  const onSubmit: SubmitHandler<TLogin> = data => {
    const loginData = { ...data }
    authService
      .login(loginData)
      .then(res => {
        console.log('res: ', res)
      })
      .catch((error: AxiosError) => {
        console.log('error: ', (error.response?.data as any).message)
        setMessage((error.response?.data as any).message)
        setOpenSnackbar(true)
        setSeverity('error')
        setHorizontal('right')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-form px-8 py-16 flex flex-col gap-y-8 bg-[rgb(255_255_255_/_90%)]">
        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: new RegExp(
                  '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                  'g',
                ),
                message: ``,
              },
            }}
            render={({ field }) => (
              <GTextField
                {...field}
                fullWidth
                size="small"
                label={d('email')}
                sx={{
                  ...styleTextField,
                }}
                error={!!errors.email}
                hintcontent={emailHint}
                isError={!!errors.email ? true : false}
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
                isError={!!errors.password ? true : false}
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
