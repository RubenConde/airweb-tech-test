/* eslint-disable max-classes-per-file */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      format: 'email',
      description: 'Email of the user',
   })
   email: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      format: 'password',
      description: 'Password of the user',
   })
   password: string;
}

export class CreateUserDTO {
   @IsEmail()
   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      format: 'email',
      description: 'Email of the user',
   })
   email: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      description: 'Name of the user',
   })
   name: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty({
      type: 'string',
      format: 'password',
      description: 'Password of the user',
   })
   password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
