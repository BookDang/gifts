import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from '@/src/user/dto/create-user.dto'
import { IsDate, IsOptional } from '@nestjs/class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsDate()
  @IsOptional()
  createdAt?: Date

  @IsDate()
  @IsOptional()
  updatedAt?: Date

  @IsDate()
  @IsOptional()
  deletedAt?: Date
}
