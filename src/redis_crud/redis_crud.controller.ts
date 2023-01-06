import { Controller, Delete, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RedisCrudService } from './redis_crud.service';

@ApiTags('Redis CRUD API')
@Controller('redis-crud')
export class RedisCrudController {
  constructor(private readonly redisCrudService: RedisCrudService) {}

  @Get()
  @ApiOperation({
    summary: 'Redis Set',
    description: 'redis에 key와 value를 각각 string 으로 저장한다',
  })
  @ApiQuery({
    name: 'key',
    type: String,
    example: 'key',
    description: 'redis에 저장될 key값을 지정한다',
  })
  @ApiQuery({
    name: 'value',
    type: String,
    example: 'value',
    description: 'redis에서 지정된 key에 value를 저장한다',
  })
  @ApiOkResponse({
    status: 200,
    description: 'redis에 저장 완료후 응답',
    schema: {
      type: `{
        data : boolean;
        message : string;
      }`,
      example: {
        data: true,
        message: '저장완료',
      },
    },
  })
  async create(@Query('key') key: string, @Query('value') value: string) {
    console.log('redis create working : ', key, ' / ', value);
    return (await this.redisCrudService.saveData(key, value)) === 'OK'
      ? { data: true, message: '저장완료' }
      : { data: false, message: '저장되지 않음' };
  }

  @Get('get/keys')
  @ApiOperation({
    summary: 'Redis get',
    description: 'redis에서 key를 조회해서 value를 출력한다.',
  })
  @ApiQuery({
    name: 'key',
    type: String,
    example: 'key',
    description: 'redis에 조회될 key값을 지정한다',
  })
  @ApiOkResponse({
    status: 200,
    description: 'redis에 조회 완료후 응답',
    schema: {
      type: `{
        data : string;
        message : string;
      }`,
      example: {
        data: 'data string',
        message: '저장완료',
      },
    },
  })
  async getValue(@Query('key') key: string) {
    console.log('redis create working : ', key);
    return await this.redisCrudService.getData(key);
  }

  @Delete()
  @ApiOperation({
    summary: 'Redis Delete',
    description: 'redis에 key값을 조회해서 삭제한다',
  })
  @ApiQuery({
    name: 'key',
    type: String,
    example: 'key',
    description: 'redis에서 삭제될 key값을 지정한다',
  })
  @ApiOkResponse({
    status: 200,
    description: 'redis에 삭제 완료후 응답',
    schema: {
      type: `{
        data : boolean;
        message : string;
      }`,
      example: {
        data: true,
        message: '삭제완료',
      },
    },
  })
  async delete(@Query('key') key: string) {
    console.log('redis create working : ', key, ' / ');
    const result = await this.redisCrudService.deleteData(key);
    console.log('delete result : ', result);
    return { data: true, message: '삭제완료' };
  }
}
