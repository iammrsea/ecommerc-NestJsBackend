import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany } from 'typeorm';
import { Product } from 'src/products/product.entity';


@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column()
  total: number;

  @OneToMany(()=>Product, product=>product.category,{cascade:true})
  products: Product[];

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