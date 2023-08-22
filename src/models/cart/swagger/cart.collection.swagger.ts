import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { successCartResourceSchema } from 'src/models/cart/swagger/cart.resource.swagger';

const successCartCollectionSchema: SchemaObject = {
   description: 'List of pages',
   items: successCartResourceSchema,
   type: 'array',
};

export const successCartCollectionResponse: ApiResponseOptions = {
   description: 'Successful collection data',
   schema: successCartCollectionSchema,
};
