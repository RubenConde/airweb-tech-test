import { Cart } from 'src/models/cart/entity/cart.entity';
import { Product } from 'src/models/product/entity/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductToCart {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public count: number;

   @ManyToOne(() => Product, (product) => product.productToCart)
   @JoinColumn({ name: 'product_id' })
   public product: Product;

   @ManyToOne(() => Cart, (cart) => cart.productToCart)
   @JoinColumn({ name: 'cart_id' })
   public cart: Cart;
}
