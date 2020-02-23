import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Controller, Get, Query, Post, Body, ParseIntPipe, Param, Put, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService){}

    @Get()
    @UseInterceptors(TransformInterceptor)
    async find(@Query()queries){
        return this.categoryService.find(queries.limit,queries.cursor,queries.relation);
    }

    @Post()
    async create(@Body()createCategoryDto: CreateCategoryDto){
        return await this.categoryService.create(createCategoryDto);
    }
    @Post('/bulk')
    async createBulk(@Body()createCategoryDto: CreateCategoryDto[]){
        return await this.categoryService.createBulk(createCategoryDto);
    }

    @Get(':categoryId')
    async findById(@Param('categoryId',new ParseIntPipe())categoryId: number){
        return await this.categoryService.findById(categoryId) || new NotFoundException();
    }
    @Get(':categoryName')
    async findByName(@Param('categoryName')categoryName: string){
        return await this.categoryService.findByName(categoryName) || new NotFoundException();
    }
    @Put(':categoryId')
    async update(
        @Param('categoryId',new ParseIntPipe())categoryId: number,
        @Body()updateCategoryDto: UpdateCategoryDto
    ){
        return await this.categoryService.update(categoryId,updateCategoryDto)
    }
    @Delete(':categoryId')
    async delete(@Param('categoryId',new ParseIntPipe())categoryId: number){
        return await this.categoryService.delete(categoryId)
    }
}
