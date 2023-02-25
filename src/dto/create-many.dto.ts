import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateManyDto {
  @IsString({ each: true })
  @ApiProperty({
    type: Array,
    description: '배열도 된 key값. redis 저장용',
    example: ['key1', 'key2', 'key3'],
  })
  keys: string[];

  @ApiProperty({
    type: Array,
    description: '배열도 된 values값. redis 저장용',
    example: [
      { value1: 'hello' },
      { value2: { data: true, str: 'world' } },
      'value3',
    ],
  })
  values: any[];
}
