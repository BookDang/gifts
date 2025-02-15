import { PartialType } from '@nestjs/mapped-types';
import { CreateDolphinDto } from './create-dolphin.dto';

export class UpdateDolphinDto extends PartialType(CreateDolphinDto) {}
