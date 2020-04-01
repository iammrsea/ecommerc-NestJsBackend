import { User } from './../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  qty: number;

  @Column('float')
  amount: number;

  @Column()
  items: string;

  @Column()
  status: string;

  @Column()
  currency: string;

  @ManyToOne(
    () => User,
    user => user.orders,
  )
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
