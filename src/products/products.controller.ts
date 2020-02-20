import { ProductsService } from './products.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/v1/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    async findAll(@Query('limit')limit: number, @Query('cursor')cursor:string){
      const products = await this.productsService.findAll(limit,cursor);
      return products
    }
}
