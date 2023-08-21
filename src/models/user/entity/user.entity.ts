import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
   @PrimaryGeneratedColumn()
   id: string;

   @Column({ unique: true })
   email: string;

   @Column()
   name: string;

   @Column({ name: 'password_hash' })
   password: string;
}
