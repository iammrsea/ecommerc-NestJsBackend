import { User } from './../users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order{

    @PrimaryGeneratedColumn()
    id:number

    @Column('text')
    description: string;

    @ManyToOne(()=>User,user=>user.orders)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}