import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/models/user/entity/user.entity';

export const sqliteConfig: TypeOrmModuleAsyncOptions = {
   useFactory: () => ({
      type: 'sqlite',
      database: String(process.env.DATABASE_NAME),
      entities: [User],
      synchronize: process.env.NODE_ENV === 'development',
   }),
};
