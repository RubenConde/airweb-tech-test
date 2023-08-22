import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumberString, IsOptional, IsInt } from 'class-validator';

export class CartUpdateProductParamsDTO {
   @IsString()
   @IsNotEmpty()
   @IsNumberString()
   @ApiProperty({
      description: 'Cart ID',
      type: 'string',
   })
   id: number;

   @IsString()
   @IsNotEmpty()
   @IsNumberString()
   @ApiProperty({
      description: 'Product ID',
      type: 'string',
   })
   productId: number;
}
export class CartUpdateProductBodyDTO {
   @IsOptional()
   @IsInt()
   @ApiProperty({
      description: 'Product Quantity',
      type: 'number',
      default: 1,
   })
   quantity: number;
}
