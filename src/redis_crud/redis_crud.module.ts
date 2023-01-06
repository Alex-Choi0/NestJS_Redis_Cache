import { Module } from '@nestjs/common';
import { RedisCrudController } from './redis_crud.controller';
import { RedisCrudService } from './redis_crud.service';

@Module({
  controllers: [RedisCrudController],
  providers: [RedisCrudService],
})
export class RedisCrudModule {}
