import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { GenderType } from '@/utils/types/user.type'
import { GENDER } from '@/utils/constants/user.const'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  fullname: string

  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  username: string

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GenderType

  @IsNotEmpty()
  @IsDateString()
  birthdate: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/)
  @Length(5, 255)
  password: string
}

