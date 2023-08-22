import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   Post,
   Put,
   Request,
   UseGuards,
} from '@nestjs/common';
import {
   ApiBadRequestResponse,
   ApiBearerAuth,
   ApiCreatedResponse,
   ApiForbiddenResponse,
   ApiNoContentResponse,
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiTags,
   ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { SwaggerErrorDescriptions } from 'src/config/swagger/error.descriptions.swagger';
import { swaggerErrorResponse } from 'src/config/swagger/error.response.swagger';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';
import { CreateProductDTO, UpdateProductDTO } from 'src/models/product/dto/product.dto';
import { successProductCollectionResponse } from 'src/models/product/swagger/product.collection.swagger';
import { successProductResourceResponse } from 'src/models/product/swagger/product.resource.swagger';
import { ProductService } from 'src/models/product/product.service';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
   description: SwaggerErrorDescriptions.Unauthorized,
   schema: swaggerErrorResponse,
})
@ApiForbiddenResponse({
   description: SwaggerErrorDescriptions.Forbidden,
   schema: swaggerErrorResponse,
})
export class ProductController {
   constructor(private readonly service: ProductService) {}

   @Get()
   @UseGuards(OptionalJwtAuthGuard)
   @ApiOkResponse(successProductCollectionResponse)
   async index(@Request() request) {
      const productList = await this.service.index(request.user);
      return productList;
   }

   @Get(':id')
   @UseGuards(OptionalJwtAuthGuard)
   @ApiOkResponse(successProductResourceResponse)
   @ApiNotFoundResponse({
      description: SwaggerErrorDescriptions.NotFound,
      schema: swaggerErrorResponse,
   })
   async show(@Param() params: RequestParamsDTO, @Request() request) {
      const { id } = params;
      const product = await this.service.show(id, request.user);
      return product;
   }

   @Post()
   @UseGuards(JwtAuthGuard)
   @ApiCreatedResponse(successProductResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async store(@Body() productData: CreateProductDTO) {
      const product = await this.service.store(productData);
      return product;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async update(@Param() params: RequestParamsDTO, @Body() productData: UpdateProductDTO) {
      const { id } = params;
      await this.service.update(id, productData);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   async delete(@Param() params: RequestParamsDTO) {
      const { id } = params;
      await this.service.delete(id);
   }
}
