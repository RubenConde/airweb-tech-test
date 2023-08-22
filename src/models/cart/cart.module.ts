import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/models/cart/entity/cart.entity';
import { CartController } from 'src/models/cart/cart.controller';
import { CartService } from 'src/models/cart/cart.service';
import { Product } from 'src/models/product/entity/product.entity';
import { User } from 'src/models/user/entity/user.entity';
import { ProductToCart } from 'src/models/cart/entity/productToCart.entity';

@Module({
   controllers: [CartController],
   providers: [CartService],
   exports: [CartService],
   imports: [
      TypeOrmModule.forFeature([Cart]),
      TypeOrmModule.forFeature([Product]),
      TypeOrmModule.forFeature([User]),
      TypeOrmModule.forFeature([ProductToCart]),
   ],
})
export class CartModule {}
