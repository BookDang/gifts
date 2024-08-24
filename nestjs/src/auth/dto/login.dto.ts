import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator'
import {
  EMAIL_REGEX,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@/utils/constants/auth.constants'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_PASSWORD_LENGTH)
  @MinLength(MIN_PASSWORD_LENGTH)
  @Matches(PASSWORD_REGEX, { message: 'Invalid password' })
  password: string
}
