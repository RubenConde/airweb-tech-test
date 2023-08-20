import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/config/strategies/jwt.strategy';
import { LocalStrategy } from 'src/config/strategies/local.strategy';
import { User } from 'src/models/user/entity/user.entity';
import { UserController } from 'src/models/user/user.controller';
import { UserService } from 'src/models/user/user.service';
import { UserSubscriber } from 'src/models/user/user.subscriber';

@Module({
   controllers: [UserController],
   providers: [UserService, JwtStrategy, LocalStrategy, UserSubscriber],
   exports: [UserService],
   imports: [
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15 days' },
         }),
      }),
      TypeOrmModule.forFeature([User]),
   ],
})
export class UserModule {}
