import MYSQL_CONST from '@/utils/constants/mysql.const'
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateGiftsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(MYSQL_CONST.MYSQL_VARCHAR_INDEX_LIMIT)
  gift_name: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  image_url: string
}
