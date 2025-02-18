import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateGroupDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  group_name: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string

  @IsOptional()
  @IsString()
  avatar_url: string

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number
}
