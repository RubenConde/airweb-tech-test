import { Product } from 'src/models/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   label: string;

   @Column()
   description: string;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   @Column({ type: 'int' })
   index: number;

   @OneToMany(() => Product, (product) => product.category)
   products: Product[];
}
