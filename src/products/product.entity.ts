import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  imageUrl: string;

  @Column('int')
  total: number;

  @Column('boolean')
  available: boolean;

  // @Index()
  @ManyToOne(
    () => Category,
    category => category.products,
  )
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  /**
   * @Column({
   * default: ()=>"NOW()"
   * })
   * createdAt: Date
   *
   * @Column({
   * default: ()=>"NOW()"
   * })
   * updatedAt: Date
   *
   *
   */
}
