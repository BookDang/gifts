/**
 * Path import the constants in this file:
 * import { styleTextField } from '@/app/login/utils/config-styles'
 */

import { COLORS } from '@/utils/constants/colors'

export const styleTextField = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: COLORS['login-light_yellow'],
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS['login-light_yellow'],
    },
    backgroundColor: 'white',
  },
  '& .MuiFormControl-root': {
    '&:hover .MuiInputLabel-root': {
      color: COLORS['amber-500'],
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: COLORS['amber-500'],
    },
  },
  '&:hover .MuiInputLabel-root': {
    color: COLORS['amber-500'],
  },
  '& .MuiInputBase-root input': {
    color: '#6f6f6f !important',
    backgroundColor: 'white !important',
  },
}

export const styleButton = {
  '&.MuiButton-contained': {
    backgroundColor: COLORS['login-light_yellow'],
    color: 'white',
    '&:hover': {
      backgroundColor: COLORS['amber-400'],
    },
  },
}

export const backgroundImageStyle = {
  backgroundImage: "url('/favicon.png')",
  backgroundSize: '315px 315px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}
