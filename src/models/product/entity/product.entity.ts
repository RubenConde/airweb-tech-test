import { Category } from 'src/models/category/entity/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   label: string;

   @Column()
   description: string;

   @Column({ type: 'int' })
   price: number;

   @Column({ name: 'category_id' })
   categoryId: number;

   @Column({ name: 'thumbnail_url', nullable: true })
   thumbnailUrl: string;

   @Column({ name: 'visible_public' })
   visiblePublic: boolean;

   @Column({ name: 'visible_authenticated' })
   visibleAuthenticated: boolean;

   @ManyToOne(() => Category, (category) => category.products)
   @JoinColumn({ name: 'category_id' })
   category: Category;
}
