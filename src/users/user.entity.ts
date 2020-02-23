import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany } from 'typeorm';
import {Exclude} from 'class-transformer'
import { Order } from 'src/orders/order.entity';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  username: string;

  @Column({unique:true})
  email: string;

  @Column()
  @Exclude({toPlainOnly:true})
  password: string;

  @Column()
  role: string;

  @Column({nullable:true})
  address: string;

  @Column({nullable:true})
  city: string;

  @Column({nullable:true})
  state: string;

  @Column({nullable:true})
  zip: number;

  @OneToMany(()=>Order,order=>order.user,{cascade:true})
  orders: Order[]

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

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

