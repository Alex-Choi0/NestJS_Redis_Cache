import { Test, TestingModule } from '@nestjs/testing';
import { RedisCrudController } from './redis_crud.controller';
import { RedisCrudService } from './redis_crud.service';

describe('RedisCrudController', () => {
  let controller: RedisCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisCrudController],
      providers: [RedisCrudService],
    }).compile();

    controller = module.get<RedisCrudController>(RedisCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
