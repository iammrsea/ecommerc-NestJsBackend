import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';
import {Exclude} from 'class-transformer'

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

