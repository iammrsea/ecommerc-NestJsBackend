import { SalesRepository } from './sales.repository';
import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SalesRepository])],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
