import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/models/category/entity/category.entity';
import { CategoryController } from 'src/models/category/category.controller';
import { CategoryService } from 'src/models/category/category.service';

@Module({
   controllers: [CategoryController],
   providers: [CategoryService],
   exports: [CategoryService],
   imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
