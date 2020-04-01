import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'float' })
  profit: number;

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
