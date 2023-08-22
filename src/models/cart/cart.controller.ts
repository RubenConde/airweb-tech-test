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

import { SwaggerErrorDescriptions } from 'src/config/swagger/error.descriptions.swagger';
import { swaggerErrorResponse } from 'src/config/swagger/error.response.swagger';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';
import { CreateCartDTO, UpdateCartDTO } from 'src/models/cart/dto/cart.dto';
import { successCartCollectionResponse } from 'src/models/cart/swagger/cart.collection.swagger';
import { successCartResourceResponse } from 'src/models/cart/swagger/cart.resource.swagger';
import { CartService } from 'src/models/cart/cart.service';
import { CartAddProductParamsDTO } from 'src/config/dto/cart-add-product.dto';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';

@Controller('carts')
@ApiTags('Carts')
@ApiUnauthorizedResponse({
   description: SwaggerErrorDescriptions.Unauthorized,
   schema: swaggerErrorResponse,
})
@ApiForbiddenResponse({
   description: SwaggerErrorDescriptions.Forbidden,
   schema: swaggerErrorResponse,
})
export class CartController {
   constructor(private readonly service: CartService) {}

   @Get()
   @ApiOkResponse(successCartCollectionResponse)
   async index() {
      const cartList = await this.service.index();
      return cartList;
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOkResponse(successCartResourceResponse)
   @ApiNotFoundResponse({
      description: SwaggerErrorDescriptions.NotFound,
      schema: swaggerErrorResponse,
   })
   async show(@Param() params: RequestParamsDTO) {
      const { id } = params;
      const cart = await this.service.show(id);
      return cart;
   }

   @Post()
   @ApiCreatedResponse(successCartResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async store(@Body() cartData: CreateCartDTO) {
      const cart = await this.service.store(cartData);
      return cart;
   }

   @Put(':id/add/:productId')
   @UseGuards(OptionalJwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiCreatedResponse(successCartResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async addProduct(@Param() params: CartAddProductParamsDTO, @Request() request) {
      const { id, productId } = params;
      const cart = await this.service.addProduct(id, productId, request.user);
      return cart;
   }

   @Put(':id/checkout')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiCreatedResponse(successCartResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async checkout(@Param() params: RequestParamsDTO, @Request() request) {
      const { id } = params;
      const cart = await this.service.checkOut(id, request.user);
      return cart;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiBearerAuth()
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async update(@Param() params: RequestParamsDTO, @Body() cartData: UpdateCartDTO) {
      const { id } = params;
      await this.service.update(id, cartData);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiBearerAuth()
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   async delete(@Param() params: RequestParamsDTO) {
      const { id } = params;
      await this.service.delete(id);
   }
}
