import { Test, TestingModule } from '@nestjs/testing';
import { ManagedGroupsController } from './managed-groups.controller';
import { ManagedGroupsService } from './managed-groups.service';

describe('ManagedGroupsController', () => {
  let controller: ManagedGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagedGroupsController],
      providers: [ManagedGroupsService],
    }).compile();

    controller = module.get<ManagedGroupsController>(ManagedGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
