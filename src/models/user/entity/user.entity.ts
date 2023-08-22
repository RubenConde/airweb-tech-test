import { Cart } from 'src/models/cart/entity/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   email: string;

   @Column()
   name: string;

   @Column({ name: 'password_hash' })
   password: string;

   @OneToMany(() => Cart, (cart) => cart.user)
   carts: Cart[];
}
