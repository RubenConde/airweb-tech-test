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
import {
   CartUpdateProductParamsDTO,
   CartUpdateProductBodyDTO,
} from 'src/config/dto/cartUpdateProduct.dto';
import { RequestParamsDTO } from 'src/config/dto/request-params.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/config/guards/optional-jwt.guard';
import { SwaggerErrorDescriptions } from 'src/config/swagger/error.descriptions.swagger';
import { swaggerErrorResponse } from 'src/config/swagger/error.response.swagger';
import { SwaggerSuccessDescriptions } from 'src/config/swagger/success.descriptions.swagger';
import { CartService } from 'src/models/cart/cart.service';
import { CreateCartDTO, UpdateCartDTO } from 'src/models/cart/dto/cart.dto';
import { successCartCollectionResponse } from 'src/models/cart/swagger/cart.collection.swagger';
import { successCartResourceResponse } from 'src/models/cart/swagger/cart.resource.swagger';

@Controller('carts')
@ApiTags('Carts')
@ApiBearerAuth()
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
   @UseGuards(JwtAuthGuard)
   @ApiOkResponse(successCartCollectionResponse)
   async index() {
      const cartList = await this.service.index();
      return cartList;
   }

   @Get(':id')
   @UseGuards(OptionalJwtAuthGuard)
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
   @UseGuards(OptionalJwtAuthGuard)
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
   async addProduct(
      @Param() params: CartUpdateProductParamsDTO,
      @Request() request,
      @Body() body: CartUpdateProductBodyDTO,
   ) {
      const { id, productId } = params;
      const cart = await this.service.addProduct(id, productId, request.user, body.quantity);
      return cart;
   }

   @Put(':id/subtract/:productId')
   @UseGuards(OptionalJwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiCreatedResponse(successCartResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async subtractProduct(
      @Param() params: CartUpdateProductParamsDTO,
      @Request() request,
      @Body() body: CartUpdateProductBodyDTO,
   ) {
      const { id, productId } = params;
      const cart = await this.service.subtractProduct(id, productId, request.user, body.quantity);
      return cart;
   }

   @Put(':id/checkout')
   @UseGuards(JwtAuthGuard)
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
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   async delete(@Param() params: RequestParamsDTO) {
      const { id } = params;
      await this.service.delete(id);
   }
}
