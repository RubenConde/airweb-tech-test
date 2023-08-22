import { ProductToCart } from 'src/models/cart/entity/productToCart.entity';
import { Product } from 'src/models/product/entity/product.entity';
import { User } from 'src/models/user/entity/user.entity';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
   ManyToMany,
   JoinTable,
   OneToMany,
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

   @ManyToMany(() => Product)
   @JoinTable()
   products: Product[];

   @OneToMany(() => ProductToCart, (productToCart) => productToCart.cart)
   public productToCart: ProductToCart[];
}
