import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSalesDto {
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  profit: number;
}
