import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetManyDto {
  @IsString({ each: true })
  @ApiProperty({
    type: Array,
    description: '배열도 된 key값. redis 조회용',
    example: ['key1', 'key2', 'key3'],
  })
  keys: string[];
}
