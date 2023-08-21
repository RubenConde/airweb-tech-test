/* eslint-disable max-classes-per-file */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/models/product/entity/product.entity';
import { OneToMany } from 'typeorm';

export class CreateCategoryDTO {
   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      description: 'Label of the product',
   })
   label: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      description: 'Description of the product',
   })
   description: string;

   @IsNotEmpty()
   @IsInt()
   @ApiProperty({
      type: 'number',
      description: 'Index of the product',
   })
   index: number;
}
export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
