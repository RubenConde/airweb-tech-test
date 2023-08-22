import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseCartInfo = {
   id: {
      description: "Cart's ID",
      format: 'uuid',
      type: 'string',
   },
   label: {
      description: "Cart's label",
      type: 'string',
   },
   description: {
      description: "Cart's description",
      type: 'string',
   },
   index: {
      description: "Cart's index",
      type: 'integer',
   },
};

export const successCartResourceSchema: SchemaObject = {
   description: "Cart's information",
   properties: baseCartInfo,
   type: 'object',
};

export const successCartJWTResourceSchema: SchemaObject = {
   description: "Cart's information",
   properties: {
      ...baseCartInfo,
      accessToken: {
         description: 'JWT token to perform actions',
         type: 'string',
      },
   },
   type: 'object',
};

export const successCartResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successCartResourceSchema,
};

export const successCartJWTResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successCartJWTResourceSchema,
};
