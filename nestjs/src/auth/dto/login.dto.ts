import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@/utils/constants/auth.constants'
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  @Matches(PASSWORD_REGEX)
  readonly password: string
}
