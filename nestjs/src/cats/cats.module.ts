import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { FishService } from './fish.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, FishService],
  exports: [FishService],
})
export class CatsModule {}
