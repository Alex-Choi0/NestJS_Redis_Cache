import {
  CACHE_MANAGER,
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
