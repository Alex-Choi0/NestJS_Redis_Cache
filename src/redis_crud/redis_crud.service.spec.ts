import { Test, TestingModule } from '@nestjs/testing';
import { RedisCrudService } from './redis_crud.service';

describe('RedisCrudService', () => {
  let service: RedisCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisCrudService],
    }).compile();

    service = module.get<RedisCrudService>(RedisCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
