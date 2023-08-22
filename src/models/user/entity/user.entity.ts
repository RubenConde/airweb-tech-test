import { Cart } from 'src/models/cart/entity/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   email: string;

   @Column()
   name: string;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   @Column({ name: 'password_hash' })
   password: string;

   @OneToMany(() => Cart, (cart) => cart.user)
   carts: Cart[];
}
