import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  MaxLength,
  Matches,
  IsDateString,
} from 'class-validator' // use class-validator to validate the data
import { UserRoles } from '@/utils/enums/user-role.enum'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @MaxLength(30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/, {
    message: `Password must contain at least 6 characters, including uppercase, lowercase letters, and numbers`,
  })
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
