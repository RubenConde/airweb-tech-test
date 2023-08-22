import type { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const baseCartInfo = {
   id: {
      description: "Cart's ID",
      type: 'integer',
   },
   total: {
      description: "Cart's total",
      type: 'integer',
   },
   isFinished: {
      description: 'Defines if the cart is finished and no more updates can be made',
      type: 'boolean',
      default: false,
   },
};

export const successCartResourceSchema: SchemaObject = {
   description: "Cart's information",
   properties: baseCartInfo,
   type: 'object',
};

export const successCartResourceResponse: ApiResponseOptions = {
   description: 'Successful resource data',
   schema: successCartResourceSchema,
};
