import { GENDER } from '@/utils/constants/user.const'
import { GenderType } from '@/utils/types/user.type'
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'

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

  @IsOptional()
  @IsString()
  @Length(5, 255)
  avatar_url: string
}

