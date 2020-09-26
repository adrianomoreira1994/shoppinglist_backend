import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('int')
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: string;

  @CreateDateColumn()
  updated_at: string;
}

export default Product;
