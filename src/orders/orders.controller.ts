import { CraeateOrderDto } from './dto/create-order.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { OrdersService } from './orders.service';
import { Controller, Get, Query, Param, ParseIntPipe, UseInterceptors, Post, Body } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Get()
    @UseInterceptors(TransformInterceptor)
    async find(@Query()queries){
        return await this.orderService.find(queries.limit,queries.cursor,queries.relation);
    }
    @Get(':orderId')
    async findById(@Param('orderId',new ParseIntPipe())orderId: number){
        return await this.orderService.findById(orderId)
    }
    @Post()
    async create(@Body()createOrderDto: CraeateOrderDto[]){
        return await this.orderService.createBulk(createOrderDto);
    }
    
    @Post('/bulk')
    async createBulk(@Body()createOrderDto: CraeateOrderDto[]){
        return await this.orderService.createBulk(createOrderDto);
    }
}
