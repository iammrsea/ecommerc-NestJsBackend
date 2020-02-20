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

  @Column({default: 'Employee'})
  role: string

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

