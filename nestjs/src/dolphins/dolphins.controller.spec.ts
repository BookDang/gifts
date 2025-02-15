import { Test, TestingModule } from '@nestjs/testing';
import { DolphinsController } from './dolphins.controller';
import { DolphinsService } from './dolphins.service';

describe('DolphinsController', () => {
  let controller: DolphinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DolphinsController],
      providers: [DolphinsService],
    }).compile();

    controller = module.get<DolphinsController>(DolphinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
