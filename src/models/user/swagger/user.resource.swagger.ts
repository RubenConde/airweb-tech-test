import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseUserInfo = {
   id: {
      description: "User's ID",
      type: 'integer',
   },
   email: {
      description: "User's email",
      format: 'email',
      type: 'string',
   },
   name: {
      description: "User's name",
      type: 'string',
   },
};

export const successUserResourceSchema: SchemaObject = {
   description: "User's information",
   properties: baseUserInfo,
   type: 'object',
};

export const successUserJWTResourceSchema: SchemaObject = {
   description: "User's information",
   properties: {
      ...baseUserInfo,
      accessToken: {
         description: 'JWT token to perform actions',
         type: 'string',
      },
   },
   type: 'object',
};

export const successUserResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successUserResourceSchema,
};

export const successUserJWTResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successUserJWTResourceSchema,
};
