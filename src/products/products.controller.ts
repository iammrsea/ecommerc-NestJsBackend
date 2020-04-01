import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product';
import { ProductsService } from './products.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseInterceptors,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async find(@Query() queries) {
    return await this.productsService.find(
      queries.limit,
      queries.cursor,
      queries.relation,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: UploadImageDto,
  ) {
    return await this.productsService.createUpdate(createProductDto, file);
  }
  @Post('/bulk')
  async createBulk(@Body() createProductDto: CreateProductDto[]) {
    return await this.productsService.createBulk(createProductDto);
  }

  // @Put('/bulk')
  // async updateBulk(){
  //   return await this.productsService.updateBulk();
  // }

  @Get(':productId')
  async findById(@Param('productId', new ParseIntPipe()) productId: number) {
    return (
      (await this.productsService.findById(productId)) ||
      new NotFoundException()
    );
  }
  @Put(':productId')
  async update(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(productId, updateProductDto);
  }

  @Put(':productId/image')
  @UseInterceptors(FileInterceptor('file'))
  async updateWithImage(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: UploadImageDto,
  ) {
    return await this.productsService.createUpdate(
      createProductDto,
      file,
      productId,
    );
  }

  @Delete(':productId')
  async delete(@Param('productId', new ParseIntPipe()) productId: number) {
    return await this.productsService.delete(productId);
  }
}
