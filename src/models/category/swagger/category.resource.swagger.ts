import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseCategoryInfo = {
   id: {
      description: "Category's ID",
      type: 'integer',
   },
   label: {
      description: "Category's label",
      type: 'string',
   },
   description: {
      description: "Category's description",
      type: 'string',
   },
   index: {
      description: "Category's index",
      type: 'integer',
   },
};

export const successCategoryResourceSchema: SchemaObject = {
   description: "Category's information",
   properties: baseCategoryInfo,
   type: 'object',
};

export const successCategoryResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successCategoryResourceSchema,
};
