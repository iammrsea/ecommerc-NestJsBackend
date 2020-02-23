import { Category } from '../../categories/category.entity';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class CreateProductDto{
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
   total:number

   @IsString()
   @IsNotEmpty()
   imageUrl: string;

   @IsNotEmpty()
   category: Category
}