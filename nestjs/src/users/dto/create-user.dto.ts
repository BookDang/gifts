import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  MaxLength,
  Matches,
  IsDateString,
  MIN,
  IsOptional,
} from 'class-validator' // use class-validator to validate the data
import { UserRoles } from '@/utils/enums/user-role.enum'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@/utils/constants/auth.constants'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  @Matches(PASSWORD_REGEX)
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsDateString()
  @IsNotEmpty()
  birthday: Date

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoles)
  @IsOptional()
  roles: UserRoles
}

// // give me mock data for testing
// export const mockCreateUserDto = {
//   email: 'test@gmail.com',
//   password: 'Test123',
//   name: 'Test',
//   birthday: '1999-01-01 00:00:00',
//   roles: 'member',
// }
