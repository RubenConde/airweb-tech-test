import {
   ConflictException,
   ForbiddenException,
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
      const userList = await this.UserRepo.find({
         relations: {
            carts: false,
         },
         select: {
            email: true,
            id: true,
            name: true,
            password: false,
         },
      });

      return userList;
   }

   async show(userId: number) {
      const userFound = await this.UserRepo.findOne({
         relations: {
            carts: false,
         },
         select: {
            email: true,
            id: true,
            name: true,
            password: false,
         },
         where: {
            id: userId,
         },
      });
      if (userFound === null) throw new NotFoundException(`${User.name} not found.`);

      return userFound;
   }

   async store(userData: CreateUserDTO, requestUser: User | null) {
      const userFound = await this.UserRepo.findOne({
         where: {
            email: userData.email,
         },
         withDeleted: true,
      });
      if (userFound) throw new ConflictException('There is already a user with this email.');

      const lastUser = await this.UserRepo.find({ order: { id: 'DESC' }, withDeleted: true });

      const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;

      const { password, ...userInfo } = userData;

      const hashedPassword = createHash('md5').update(`${newId}${password}`).digest('hex');

      const newUser = await this.UserRepo.save({
         ...userInfo,
         id: newId,
         password: hashedPassword,
      });

      const user = await this.show(newUser.id);

      return user;
   }

   async update(userId: number, userData: UpdateUserDTO, requestUser: User | null) {
      await this.show(userId);

      if (requestUser?.id !== Number(userId))
         throw new ForbiddenException("You can't modify this user.");

      let newPossiblePassword: string | undefined;

      if (userData.password) {
         newPossiblePassword = createHash('md5')
            .update(`${userId}${userData.password}`)
            .digest('hex');
      }
      const user = await this.UserRepo.findOneBy({ id: userId });

      await this.UserRepo.save({
         ...user,
         ...userData,
         password: newPossiblePassword ?? user?.password,
      });
   }

   async delete(userId: number) {
      await this.show(userId);

      await this.UserRepo.softDelete(userId);
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
