import { UpdateSalesDto } from './dto/update-sales.dto';
import { CreateSalesDto } from './dto/create-sales.dto';
import { SalesService } from './sales.service';
import {
  Controller,
  Get,
  UseInterceptors,
  Query,
  Post,
  Body,
  ParseIntPipe,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async find(@Query() queries) {
    return await this.salesService.find(queries.limit, queries.cursor);
  }

  @Post('/bulk')
  async createBulk(@Body() createSalesDto: CreateSalesDto[]) {
    return await this.salesService.createBulk(createSalesDto);
  }

  // @Put('/bulk')
  // async updateBulk(){
  //   return await this.productsService.updateBulk();
  // }

  @Get(':salesId')
  async findById(@Param('salesId', new ParseIntPipe()) productId: number) {
    return (
      (await this.salesService.findById(productId)) || new NotFoundException()
    );
  }
  @Put(':salesId')
  async update(
    @Param('salesId', new ParseIntPipe()) salesId: number,
    @Body() updateSaleDto: UpdateSalesDto,
  ) {
    return await this.salesService.update(salesId, updateSaleDto);
  }

  @Delete(':salesId')
  async delete(@Param('productId', new ParseIntPipe()) salesId: number) {
    return await this.salesService.delete(salesId);
  }
}
