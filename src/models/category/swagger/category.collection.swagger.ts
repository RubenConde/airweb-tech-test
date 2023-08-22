import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { successCategoryResourceSchema } from 'src/models/category/swagger/category.resource.swagger';

const successCategoryCollectionSchema: SchemaObject = {
   description: 'List of categories',
   items: successCategoryResourceSchema,
   type: 'array',
};

export const successCategoryCollectionResponse: ApiResponseOptions = {
   description: 'Successful collection data',
   schema: successCategoryCollectionSchema,
};
