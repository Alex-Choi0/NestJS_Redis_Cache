// src/app.module.ts
import * as Joi from '@hapi/joi';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// cachemanager-redis-store를 사용하여 캐시 관리
import * as redisStore from 'cache-manager-redis-store'; // @^2.0.0
import { RedisClientOptions } from 'redis'; // @^4.5.1
// import type { ClientOpts } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisCrudModule } from './redis_crud/redis_crud.module';
// const redisStore = require('cache-manager-redis-store');

@Module({
  imports: [
    ConfigModule.forRoot({
      // env파일 스키마 점검
      validationSchema: Joi.object({
        REDIS_URL: Joi.string().required(), // env파일에 REDIS_URL가 반드시 있어야함
      }),
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true, // 모든 모듈에서 사용 가능하도록 설정
    }),
    RedisCrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
