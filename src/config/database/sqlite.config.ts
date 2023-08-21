import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Category } from 'src/models/category/entity/category.entity';
import { User } from 'src/models/user/entity/user.entity';

export const sqliteConfig: TypeOrmModuleAsyncOptions = {
   useFactory: () => ({
      type: 'sqlite',
      database: String(process.env.DATABASE_NAME),
      entities: [User, Category],
      synchronize: process.env.NODE_ENV === 'development',
   }),
};
