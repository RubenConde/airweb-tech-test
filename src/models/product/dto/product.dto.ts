/* eslint-disable max-classes-per-file */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProductDTO {
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
      description: 'Price of the product',
   })
   price: number;

   @IsNotEmpty()
   @IsInt()
   @ApiProperty({
      type: 'number',
      description: 'Category of the product',
   })
   categoryId: number;

   @IsNotEmpty()
   @IsUrl()
   @ApiProperty({
      type: 'string',
      format: 'url',
      description: 'Thumbnail Url of the product',
   })
   thumbnailUrl: string;

   @IsNotEmpty()
   @IsBoolean()
   @ApiProperty({
      type: 'string',
      description: 'Defines if the product is visible for all public',
   })
   visiblePublic: boolean;

   @IsNotEmpty()
   @IsBoolean()
   @ApiProperty({
      type: 'string',
      description: 'Defines if the product is visible for authenticated users',
   })
   visibleAuthenticated: boolean;
}
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
