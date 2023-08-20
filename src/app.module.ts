import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { configModuleConfig } from 'src/config/config-module.config';
import { throttlerProvider } from 'src/config/providers/throttler.provider';
import { throttlerConfig } from 'src/config/throttler.config';
import { UserModule } from 'src/models/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqliteConfig } from 'src/config/database/sqlite.config';

@Module({
   controllers: [AppController],
   providers: [AppService, throttlerProvider],
   imports: [
      ConfigModule.forRoot(configModuleConfig),
      TypeOrmModule.forRootAsync(sqliteConfig),
      ThrottlerModule.forRoot(throttlerConfig),
      UserModule,
   ],
   exports: [TypeOrmModule],
})
export class AppModule {}
