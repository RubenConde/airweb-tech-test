import { Product } from 'src/models/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   label: string;

   @Column()
   description: string;

   @Column({ type: 'int' })
   index: number;

   @OneToMany(() => Product, (product) => product.category)
   products: Product[];
}
