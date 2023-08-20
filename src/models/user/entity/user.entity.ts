import { Roles } from 'src/config/constants/roles.constant';
import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity()
export class User {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ unique: true })
   email: string;

   @Column({ name: 'first_name' })
   firstName: string;

   @Column({ name: 'last_name' })
   lastName: string;

   @Column()
   password: string;

   @Column({ enum: Object.values(Roles), default: Roles.CREATOR })
   role: string;

   @Column({ name: 'created_at', default: () => new Date().getTime() })
   createdAt: number;

   @Column({ name: 'updated_at', default: () => new Date().getTime() })
   updatedAt: number;
}
