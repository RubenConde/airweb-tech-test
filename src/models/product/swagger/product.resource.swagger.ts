import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseProductInfo = {
   id: {
      description: "Product's ID",
      format: 'integer',
      type: 'string',
   },
   label: {
      description: "Product's label",
      type: 'string',
   },
   description: {
      description: "Product's description",
      type: 'string',
   },
   price: {
      description: "Product's price in cents",
      type: 'integer',
   },
   categoryId: {
      description: "Product's category identifier",
      type: 'integer',
   },
   thumbnailUrl: {
      description: "Product's thumbnail url",
      format: 'url',
      type: 'string',
   },
   visiblePublic: {
      description: 'Defines if the product is visible for all public',
      type: 'boolean',
   },
   visibleAuthenticated: {
      description: 'Defines if the product is visible for authenticated users',
      type: 'boolean',
   },
};

export const successProductResourceSchema: SchemaObject = {
   description: "Product's information",
   properties: baseProductInfo,
   type: 'object',
};

export const successProductJWTResourceSchema: SchemaObject = {
   description: "Product's information",
   properties: {
      ...baseProductInfo,
      accessToken: {
         description: 'JWT token to perform actions',
         type: 'string',
      },
   },
   type: 'object',
};

export const successProductResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successProductResourceSchema,
};

export const successProductJWTResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successProductJWTResourceSchema,
};
