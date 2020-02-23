import { Category } from './category.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{
    findByName(categoryName:string):Promise<Category>{
        return this.findOne({name:categoryName})
    }
    findProductsByCategory(id:number):Promise<Category[]>{
        return this.find({where:{id}, relations:['products']})
    //    return this.createQueryBuilder('category')
    //     .where('category.id = :id',{id})
    //     .relation('products')
    //     .loadMany()
    }
}