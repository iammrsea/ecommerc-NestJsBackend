import { CursorService } from 'src/cursor/cursor.service';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

import C from '../constants'
@Injectable()
export class CategoriesService {
    constructor(
        private readonly categoryRepository:CategoryRepository,
        private readonly cursorService: CursorService
        ){}

    find(limit?:number,cursor?:string,relation?:boolean):Promise<Category[]>{
        if(relation){
            const perPage = limit || C.QUERY_RESULT_LIMIT;
            const startFrom = this.cursorService.decode(cursor);
            const categories = this.categoryRepository
                                .createQueryBuilder('category')
                                .leftJoinAndSelect('category.products','product')
                                .where('category.id >= :id',{id:startFrom})
                                .take(perPage+1)
                                .getMany();
                return categories;
        }
        return this.categoryRepository.find();
    }
    findByName(categoryName:string):Promise<Category>{
        return this.categoryRepository
                .createQueryBuilder('category')
                .leftJoinAndSelect('category.products','product')
                .where('category.name = :name',{name:categoryName})
                .getOne();
    }
    findById(id:number):Promise<Category>{
        return this.categoryRepository
                .createQueryBuilder('category')
                .leftJoinAndSelect('category.products','product')
                .where('category.id = :id',{id})
                .getOne();
    }
    create(createCategoryDto:CreateCategoryDto):Promise<Category>{
        return this.categoryRepository.save(createCategoryDto);
    }
    delete(id:number):Promise<DeleteResult>{
        return this.categoryRepository.delete(id)
    }
    update(id:number,updateCategory:UpdateCategoryDto):Promise<UpdateResult>{
        return this.categoryRepository.update(id,updateCategory)
    }

    createBulk(createCategoryDto:CreateCategoryDto[]):Promise<Category[]>{
        return this.categoryRepository.save(createCategoryDto)
    }
}
