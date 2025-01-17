import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { FishService } from 'src/cats/fish.service';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [CatsModule],
})
export class DogsModule {}
