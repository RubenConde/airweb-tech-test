import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartDTO {
   @IsNotEmpty()
   @IsBoolean()
   @ApiProperty({
      type: 'boolean',
      description: 'Description of the product',
   })
   isFinished: boolean;

   @IsNotEmpty()
   @IsInt()
   @ApiProperty({
      type: 'number',
      description: 'Index of the product',
   })
   total: number;
}
export class UpdateCartDTO extends PartialType(CreateCartDTO) {}
