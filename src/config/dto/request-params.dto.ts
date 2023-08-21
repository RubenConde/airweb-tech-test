import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class RequestParamsDTO {
   @IsString()
   @IsNotEmpty()
   @IsNumberString()
   @ApiProperty({
      description: 'Item ID',
      type: 'string',
   })
   id: number;
}
