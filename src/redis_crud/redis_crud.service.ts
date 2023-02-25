// src/redis_crudredis_crud.service.ts
import {
  CACHE_MANAGER,
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCrudService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async saveData(key: string, value: string) {
    try {
      // ttl이 설정되지 않는다면 기본 5초간 유지되고 사라진다. 0은 무제한
      const result = await this.cacheManager.set(key, value, { ttl: 0 });
      console.log('result : ', result);
      return result;
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  // 여러개의 keys값과 values를 저장하기 위한 서비스
  async saveDataMany(key: string[], value: any[]) {
    try {
      const setKeysValues: any[] = [];

      if (key.length === value.length) {
        // mset을 하기 위해서 [key, value]
        for (let i = 0; i < key.length; i++) {
          setKeysValues.push(key[i]);
          setKeysValues.push(value[i]);
        }
      } else {
        throw new ConflictException('key와 value갯수가 일치하지 않음');
      }
      console.log('setKeysValues : ', setKeysValues);

      // ttl이 설정되지 않는다면 기본 5초간 유지되고 사라진다. 0은 무제한
      const result = await this.cacheManager.store.mset(...setKeysValues, {
        ttl: 0,
      });
      console.log('result : ', result);
      return result;
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async getData(key: string) {
    try {
      const result = await this.cacheManager.get(key);
      console.log('result : ', result);
      if (!result) {
        throw new NotFoundException('데이터가 존재하지 않습니다.');
      }
      return result;
    } catch (err) {
      console.log('Error :', err);
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  // 여러개의 키값을 조회하기 위한 서비스
  async getDataMany(key: string[]) {
    try {
      const result = await this.cacheManager.store.mget(...key);
      console.log('result : ', result);
      if (!result) {
        throw new NotFoundException('데이터가 존재하지 않습니다.');
      }
      return result;
    } catch (err) {
      console.log('Error :', err);
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async deleteData(key: string) {
    try {
      const result = await this.cacheManager.del(key);
      console.log('result : ', result);
      if (!result) {
        throw new NotFoundException('데이터가 존재하지 않습니다.');
      }
      return result;
    } catch (err) {
      console.log('Error :', err);
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }
}
