import {
   ConflictException,
   ForbiddenException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Roles } from 'src/config/constants/roles.constant';
import { CreateUserDTO, UpdateUserDTO } from 'src/models/user/dto/user.dto';
import { BaseUserService } from 'src/models/user/interfaces/user.service.interface';
import { User } from 'src/models/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements BaseUserService {
   constructor(
      @InjectRepository(User) private UserRepo: Repository<User>,
      private jwtService: JwtService,
   ) {
      this.insertDefaultUser();
   }

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
      const isRequestUserAdmin = requestUser?.role === Roles.ADMIN;
      const isNewUserAdmin = userData.role === Roles.ADMIN;

      if (!isRequestUserAdmin && isNewUserAdmin) throw new ForbiddenException('Forbidden resource');

      const isAlreadyCreated = await this.UserRepo.findOneBy({ email: userData.email });

      if (isAlreadyCreated) throw new ConflictException('User already exists');

      const { password, ...userInfo } = userData;

      const saltValue = 10;
      const hashedPassword = await hash(password, saltValue);

      const newUser = await this.UserRepo.save({
         ...userInfo,
         password: hashedPassword,
      });

      const user = await this.show(newUser.id);

      return user;
   }

   async update(userId: string, userData: UpdateUserDTO, requestUser: User | null) {
      const isRequestUserAdmin = requestUser?.role === Roles.ADMIN;
      const isModifyingRole = !!userData.role;

      if (!isRequestUserAdmin && isModifyingRole)
         throw new ForbiddenException('Forbidden resource');

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

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) throw new UnauthorizedException();

      return user;
   }

   private async insertDefaultUser() {
      const user: CreateUserDTO = {
         email: 'admin@example.com',
         firstName: 'Admin',
         lastName: 'User',
         password: String(process.env.DEFAULT_USER_PASSWORD),
         role: 'admin',
      };
      const foundUser = await this.UserRepo.findOneBy({ email: user.email });

      if (foundUser === null) {
         const { password, ...userInfo } = user;
         const saltValue = 10;
         const hashedPassword = await hash(password, saltValue);
         await this.UserRepo.insert({
            ...userInfo,
            password: hashedPassword,
         });
      }
   }
}
