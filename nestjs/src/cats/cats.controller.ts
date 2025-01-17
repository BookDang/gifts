
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from '../interfaces/cat.interface';
import { IFish } from 'src/interfaces/fish.interface';
import { FishService } from './fish.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private fishService: FishService
  ) {}

  @Post('fish')
  async createFish(@Body() createFishDto: IFish) {
    this.fishService.create(createFishDto);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('fish')
  async findFish(): Promise<IFish[]> {
    return this.fishService.findAll();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
