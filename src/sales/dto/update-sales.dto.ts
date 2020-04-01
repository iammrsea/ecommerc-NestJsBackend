import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateSalesDto {
  @IsNumber()
  @IsOptional()
  qty?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  profit?: number;
}
