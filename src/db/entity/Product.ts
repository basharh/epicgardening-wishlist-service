import { Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product)
  products: Product[];
}
