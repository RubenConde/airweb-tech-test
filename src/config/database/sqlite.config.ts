import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Cart } from 'src/models/cart/entity/cart.entity';
import { ProductToCart } from 'src/models/cart/entity/productToCart.entity';
import { Category } from 'src/models/category/entity/category.entity';
import { Product } from 'src/models/product/entity/product.entity';
import { User } from 'src/models/user/entity/user.entity';

export const sqliteConfig: TypeOrmModuleAsyncOptions = {
   useFactory: () => ({
      type: 'sqlite',
      database: String(process.env.DATABASE_NAME),
      entities: [User, Category, Product, Cart, ProductToCart],
      synchronize: process.env.NODE_ENV === 'development',
   }),
};
