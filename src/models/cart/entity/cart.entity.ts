import { ProductToCart } from 'src/models/cart/entity/productToCart.entity';
import { User } from 'src/models/user/entity/user.entity';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
   OneToMany,
   DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'carts' })
export class Cart {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ default: 0 })
   total: number;

   @Column({ name: 'is_finished', default: false })
   isFinished: boolean;

   @ManyToOne(() => User, (user) => user.carts)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @OneToMany(() => ProductToCart, (productToCart) => productToCart.cart)
   public productToCart: ProductToCart[];

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;
}
