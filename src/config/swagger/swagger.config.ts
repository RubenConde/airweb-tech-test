import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

const swaggerConfiguration = new DocumentBuilder()
   .addBearerAuth({ scheme: 'bearer', type: 'http' })
   .setDescription(`API REST for ${process.env.API_NAME}`)
   .setTitle(String(process.env.API_NAME))
   .setVersion(String(process.env.npm_package_version));

export const swaggerConfig = swaggerConfiguration.build();

export const swaggerDocConfig: SwaggerDocumentOptions = {};

export const swaggerCustomConfig: SwaggerCustomOptions = {
   swaggerOptions: {
      persistAuthorization: true,
   },
   customSiteTitle: `${process.env.API_NAME} API Documentation`,
};
