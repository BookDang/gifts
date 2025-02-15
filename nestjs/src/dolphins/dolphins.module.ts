import { Module } from '@nestjs/common';
import { DolphinsService } from './dolphins.service';
import { DolphinsController } from './dolphins.controller';

@Module({
  controllers: [DolphinsController],
  providers: [DolphinsService],
})
export class DolphinsModule {}
