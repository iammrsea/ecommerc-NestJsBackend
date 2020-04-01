import { UpdateOrderDto } from './dto/update-order.dto';
import { CursorService } from 'src/cursor/cursor.service';
import { Injectable } from '@nestjs/common';

import C from '../constants';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CraeateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cursorService: CursorService,
  ) {}

  find(limit?: number, cursor?: string, relation?: boolean): Promise<Order[]> {
    let perPage = limit || C.QUERY_RESULT_LIMIT;
    const startFrom = this.cursorService.decode(cursor);

    if (limit && limit > C.QUERY_RESULT_LIMIT) {
      perPage = C.QUERY_RESULT_LIMIT;
    }
    const query = this.orderRepository
      .createQueryBuilder('order')
      .where('order.id >= :id', { id: startFrom })
      .take(perPage + 1);
    if (relation) {
      query.leftJoinAndSelect('order.user', 'user');
    }
    return query.getMany();
  }
  findById(id: number): Promise<Order> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.id = :id', { id })
      .getOne();
  }

  create(createOrderDto: CraeateOrderDto): Promise<Order> {
    return this.orderRepository.save(createOrderDto);
  }
  createBulk(createOrderDto: CraeateOrderDto[]): Promise<Order[]> {
    return this.orderRepository.save(createOrderDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.orderRepository.delete(id);
  }
  update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    return this.orderRepository.update(id, updateOrderDto);
  }
}
