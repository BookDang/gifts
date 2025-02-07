import { IsNotEmpty, IsOptional, IsInt, IsPositive, IsEnum } from 'class-validator'
import { USER_STATUSES_ENUM } from '@/utils/enums/user.enum'
export class CreateGroupUserDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  groupId: number

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number

  @IsOptional()
  @IsEnum(USER_STATUSES_ENUM)
  role: USER_STATUSES_ENUM

  @IsOptional()
  @IsEnum(USER_STATUSES_ENUM)
  status: USER_STATUSES_ENUM
}
