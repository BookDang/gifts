import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDolphinDto } from './dto/create-dolphin.dto';
import { UpdateDolphinDto } from './dto/update-dolphin.dto';

@Injectable()
export class DolphinsService {
  create(createDolphinDto: CreateDolphinDto) {
    return 'This action adds a new dolphin';
  }

  findAll() {
    throw new ConflictException('This is a conflict exception');
    return `This action returns all dolphins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dolphin`;
  }

  update(id: number, updateDolphinDto: UpdateDolphinDto) {
    return `This action updates a #${id} dolphin`;
  }

  remove(id: number) {
    return `This action removes a #${id} dolphin`;
  }
}
