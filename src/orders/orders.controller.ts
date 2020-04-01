import { ExcludePasswordInterceptor } from './../interceptors/password.interceptor';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CraeateOrderDto } from './dto/create-order.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { OrdersService } from './orders.service';
import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Post,
  Body,
  Put,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ExcludePasswordInterceptor)
  async find(@Query() queries) {
    return await this.orderService.find(
      queries.limit,
      queries.cursor,
      queries.relation,
    );
  }
  @Get(':orderId')
  async findById(@Param('orderId', new ParseIntPipe()) orderId: number) {
    const order = await this.orderService.findById(orderId);
    delete order.user.password;
    return order;
  }
  @Put(':orderId')
  async update(
    @Param('orderId', new ParseIntPipe()) orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(orderId, updateOrderDto);
  }
  @Post()
  @UseInterceptors(ExcludePasswordInterceptor)
  async create(@Body() createOrderDto: CraeateOrderDto[]) {
    return await this.orderService.createBulk(createOrderDto);
  }

  @Post('/bulk')
  @UseInterceptors(ExcludePasswordInterceptor)
  async createBulk(@Body() createOrderDto: CraeateOrderDto[]) {
    return await this.orderService.createBulk(createOrderDto);
  }
}
