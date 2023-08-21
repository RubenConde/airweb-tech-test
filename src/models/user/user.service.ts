import {
   ConflictException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, UpdateUserDTO } from 'src/models/user/dto/user.dto';
import { BaseUserService } from 'src/models/user/interfaces/user.service.interface';
import { User } from 'src/models/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';

@Injectable()
export class UserService implements BaseUserService {
   constructor(
      @InjectRepository(User) private UserRepo: Repository<User>,
      private jwtService: JwtService,
   ) {}

   async index() {
      const userList = await this.UserRepo.find();

      return userList;
   }

   async show(userId: string) {
      const user = await this.UserRepo.findOneBy({ id: userId }).then((foundUser) => {
         if (foundUser === null) throw new NotFoundException(`${User.name} not found`);
         const { password, id, ...filteredUser } = foundUser;
         return filteredUser;
      });

      return user;
   }

   async store(userData: CreateUserDTO, requestUser: User | null) {
      const isAlreadyCreated = await this.UserRepo.findOneBy({ email: userData.email });

      if (isAlreadyCreated) throw new ConflictException('User already exists');

      const { password, ...userInfo } = userData;

      const newUser = await this.UserRepo.save({
         ...userInfo,
         password,
      });

      const hashedPassword = await createHash('md5')
         .update(`${newUser.id}${password}`)
         .digest('hex');

      await this.UserRepo.save({
         ...newUser,
         password: hashedPassword,
      });
      const user = await this.show(newUser.id);

      return user;
   }

   async update(userId: string, userData: UpdateUserDTO, requestUser: User | null) {
      await this.show(userId);

      const user = await this.UserRepo.findOneBy({ id: userId });

      await this.UserRepo.save({ id: userId, ...user, ...userData });
   }

   async delete(userId: string) {
      await this.show(userId);

      await this.UserRepo.delete(userId);
   }

   async signIn(userData: User) {
      const payload = { email: userData.email, userId: userData.id };
      const accessToken = this.jwtService.sign(payload);

      const user = await this.show(userData.id);

      const returnUser: UserWithToken = {
         ...user,
         accessToken,
      };

      return returnUser;
   }

   async validateUser(email: string, password: string) {
      const user = await this.UserRepo.findOneBy({ email });

      if (!user) throw new NotFoundException(`${User.name} not found`);

      const md5Hash = createHash('md5').update(`${user.id}${password}`).digest('hex');

      const isValidPassword = md5Hash === user.password;

      if (!isValidPassword) throw new UnauthorizedException();

      return user;
   }
}
