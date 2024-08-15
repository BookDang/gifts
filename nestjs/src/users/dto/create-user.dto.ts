import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
} from '@nestjs/class-validator'
import {
  EMAIL_REGEX,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@/utils/constants/auth.constants'
import { EUserRoles } from '@/utils/enums/user-role.enum'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @Matches(EMAIL_REGEX, {
    message: 'Invalid email',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_PASSWORD_LENGTH)
  @MinLength(MIN_PASSWORD_LENGTH)
  @Matches(PASSWORD_REGEX, { message: 'Invalid password' })
  password: string

  @IsDateString()
  @IsNotEmpty()
  birthday: Date

  @IsNotEmpty()
  @IsEnum(EUserRoles)
  @IsOptional()
  roles: EUserRoles
}
