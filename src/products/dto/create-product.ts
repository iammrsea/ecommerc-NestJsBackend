import { Category } from '../../categories/category.entity';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @ValidateIf(product => {
    product.price = +product.price;
    product.total = +product.total;
    product.category = +product.category;
    product.available = !!+product.available;

    return true;
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsNotEmpty()
  category: Category;
}
