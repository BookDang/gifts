
import { Injectable } from '@nestjs/common';
import { IFish } from '../interfaces/fish.interface';

@Injectable()
export class FishService {
  private readonly fish: IFish[] = [];

  create(fish: IFish) {
    this.fish.push(fish);
  }

  findAll(): IFish[] {
    return this.fish;
  }
}
