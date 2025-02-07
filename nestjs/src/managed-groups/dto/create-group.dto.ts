import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsInt, IsPositive } from 'class-validator'

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
