import { ProductToCart } from 'src/models/cart/entity/productToCart.entity';
import { Category } from 'src/models/category/entity/category.entity';
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
   OneToMany,
   DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   label: string;

   @Column()
   description: string;

   @Column()
   price: number;

   @Column({ name: 'category_id' })
   categoryId: number;

   @Column({ name: 'thumbnail_url', nullable: true })
   thumbnailUrl: string;

   @Column({ name: 'visible_public' })
   visiblePublic: boolean;

   @Column({ name: 'visible_authenticated' })
   visibleAuthenticated: boolean;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   @ManyToOne(() => Category, (category) => category.products)
   @JoinColumn({ name: 'category_id' })
   category: Category;

   @OneToMany(() => ProductToCart, (productToCart) => productToCart.product)
   public productToCart: ProductToCart[];
}
