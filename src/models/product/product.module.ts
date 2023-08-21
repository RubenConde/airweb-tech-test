import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/models/product/entity/product.entity';
import { ProductController } from 'src/models/product/product.controller';
import { ProductService } from 'src/models/product/product.service';

@Module({
   controllers: [ProductController],
   providers: [ProductService],
   exports: [ProductService],
   imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
