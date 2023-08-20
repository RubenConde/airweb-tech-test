import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class RequestParamsDTO {
   @IsString()
   @IsNotEmpty()
   @IsUUID()
   @ApiProperty({
      description: 'Item ID',
      type: 'string',
   })
   id: string;
}
