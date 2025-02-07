import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePointDto {
  @IsNumber()
  @IsNotEmpty()
  points: number

  @IsNotEmpty()
  @IsDateString()
  expirationDate: String
}
