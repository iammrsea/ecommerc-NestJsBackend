import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product';
import { ProductsService } from './products.service';
import { Controller, Get, Query, Post, Body, Param, ParseIntPipe, Put, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    
    @Get()
    @UseInterceptors(TransformInterceptor)
    async find(@Query()queries){
     return await this.productsService.find(queries.limit,queries.cursor,queries.relation);
    }

    @Post()
    async create(@Body()createProductDto: CreateProductDto){
      return await this.productsService.create(createProductDto);
    }
    @Post('/bulk')
    async createBulk(@Body()createProductDto: CreateProductDto[]){
      return await this.productsService.createBulk(createProductDto);
    }

    // @Put('/bulk')
    // async updateBulk(){
    //   return await this.productsService.updateBulk();
    // }

    @Get(':productId')
    async findById(@Param('productId',new ParseIntPipe())productId: number){
      return await this.productsService.findById(productId) || new NotFoundException();
    }
    @Put(':productId')
    async update(
        @Param('productId',new ParseIntPipe())productId: number,
        @Body()updateProductDto: UpdateProductDto
      ){
        return await this.productsService.update(productId,updateProductDto)
      }

    @Delete(':productId')
    async delete(@Param('productId',new ParseIntPipe())productId: number){
      return await this.productsService.delete(productId)
    }
}