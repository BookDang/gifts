import { Test, TestingModule } from '@nestjs/testing';
import { DolphinsService } from './dolphins.service';

describe('DolphinsService', () => {
  let service: DolphinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DolphinsService],
    }).compile();

    service = module.get<DolphinsService>(DolphinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
