import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { FishService } from 'src/cats/fish.service';

@Injectable()
export class DogsService {
  constructor(
    private readonly fishService: FishService
  ) {}
  
  private readonly dogs = [];

  create(createDogDto: CreateDogDto) {
    this.dogs.push(createDogDto);
    this.fishService.create({ name: 'Dog fish', breed: 'goldfish' });
  }

  findAll() {
    return this.dogs;
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
