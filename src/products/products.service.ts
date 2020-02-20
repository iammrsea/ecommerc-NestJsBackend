import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product';

@Injectable()
export class ProductsService {
    private products: CreateProductDto[] = [];

    async findAll(limit:number, cursor?:string): Promise<{data: CreateProductDto[],paging:object}>{
      return {
          data: this.products,
          paging:{},
      }
    }

    // async create(){}
}
