import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  Max,
  MaxLength,
  Matches,
} from 'class-validator'
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

  @IsString()
  @IsNotEmpty()
  birthday: Date

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoles)
  roles: UserRoles
}
