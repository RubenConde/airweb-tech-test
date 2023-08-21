import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseCategoryInfo = {
   id: {
      description: "Category's ID",
      format: 'uuid',
      type: 'string',
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

export const successCategoryJWTResourceSchema: SchemaObject = {
   description: "Category's information",
   properties: {
      ...baseCategoryInfo,
      accessToken: {
         description: 'JWT token to perform actions',
         type: 'string',
      },
   },
   type: 'object',
};

export const successCategoryResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successCategoryResourceSchema,
};

export const successCategoryJWTResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successCategoryJWTResourceSchema,
};
