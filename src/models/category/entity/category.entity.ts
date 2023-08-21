import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
