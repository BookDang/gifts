
import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { FishService } from './fish.service';

@Injectable()
export class CatsService {
  constructor(private readonly fishService: FishService) {}

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
    this.fishService.create({ name: 'Cat fish', breed: 'goldfish' });
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
