import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { successProductResourceSchema } from 'src/models/product/swagger/product.resource.swagger';

const successProductCollectionSchema: SchemaObject = {
   description: 'List of pages',
   items: successProductResourceSchema,
   type: 'array',
};

export const successProductCollectionResponse: ApiResponseOptions = {
   description: 'Successful collection data',
   schema: successProductCollectionSchema,
};
