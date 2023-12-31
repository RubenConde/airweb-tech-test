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
import { CategoryService } from 'src/models/category/category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/models/category/dto/category.dto';
import { successCategoryCollectionResponse } from 'src/models/category/swagger/category.collection.swagger';
import { successCategoryResourceResponse } from 'src/models/category/swagger/category.resource.swagger';

@Controller('categories')
@ApiTags('Categories')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
   description: SwaggerErrorDescriptions.Unauthorized,
   schema: swaggerErrorResponse,
})
@ApiForbiddenResponse({
   description: SwaggerErrorDescriptions.Forbidden,
   schema: swaggerErrorResponse,
})
export class CategoryController {
   constructor(private readonly service: CategoryService) {}

   @Get()
   @UseGuards(OptionalJwtAuthGuard)
   @ApiOkResponse(successCategoryCollectionResponse)
   async index() {
      const categoryList = await this.service.index();
      return categoryList;
   }

   @Get(':id')
   @UseGuards(OptionalJwtAuthGuard)
   @ApiOkResponse(successCategoryResourceResponse)
   @ApiNotFoundResponse({
      description: SwaggerErrorDescriptions.NotFound,
      schema: swaggerErrorResponse,
   })
   async show(@Param() params: RequestParamsDTO) {
      const { id } = params;
      const category = await this.service.show(id);
      return category;
   }

   @Post()
   @UseGuards(JwtAuthGuard)
   @ApiCreatedResponse(successCategoryResourceResponse)
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async store(@Body() categoryData: CreateCategoryDTO) {
      const category = await this.service.store(categoryData);
      return category;
   }

   @Put(':id')
   @UseGuards(JwtAuthGuard)
   @HttpCode(HttpStatus.NO_CONTENT)
   @ApiNoContentResponse({ description: SwaggerSuccessDescriptions.NoContent })
   @ApiBadRequestResponse({
      description: SwaggerErrorDescriptions.BadRequest,
      schema: swaggerErrorResponse,
   })
   async update(@Param() params: RequestParamsDTO, @Body() categoryData: UpdateCategoryDTO) {
      const { id } = params;
      await this.service.update(id, categoryData);
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
