import { CreateSalesDto } from './dto/create-sales.dto';
import { UpdateSalesDto } from './dto/update-sales.dto';
import { SalesRepository } from './sales.repository';
import { Injectable } from '@nestjs/common';
import { CursorService } from 'src/cursor/cursor.service';
import { Sales } from './sales.entity';

import C from '../constants';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly cursorService: CursorService,
  ) {}

  find(limit?: number, cursor?: string): Promise<Sales[]> {
    const perPage = limit || C.QUERY_RESULT_LIMIT;
    const startFrom = this.cursorService.decode(cursor);
    const query = this.salesRepository
      .createQueryBuilder('sales')
      .where('sales.id >= :id', { id: startFrom })
      .take(perPage + 1);

    return query.getMany();
  }
  findById(id: number): Promise<Sales> {
    return this.salesRepository
      .createQueryBuilder('sales')
      .where('sales.id = :id', { id })
      .getOne();
  }
  create(createSalesDto: CreateSalesDto): Promise<Sales> {
    return this.salesRepository.save(createSalesDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.salesRepository.delete(id);
  }

  update(id: number, updateSalesDto: UpdateSalesDto): Promise<UpdateResult> {
    return this.salesRepository.update(id, updateSalesDto);
  }

  createBulk(createProductDto: CreateSalesDto[]): Promise<Sales[]> {
    return this.salesRepository.save(createProductDto);
  }
  async updateBulk() {
    const products = await this.salesRepository.find({ price: null });
    const productIs = products.map(product => product.id);
    return this.salesRepository.update([...productIs], { price: 200 });
  }
}
