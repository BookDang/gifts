import { Test, TestingModule } from '@nestjs/testing';
import { ManagedGroupsService } from './managed-groups.service';

describe('ManagedGroupsService', () => {
  let service: ManagedGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagedGroupsService],
    }).compile();

    service = module.get<ManagedGroupsService>(ManagedGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
