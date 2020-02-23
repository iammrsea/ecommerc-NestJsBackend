import { Category } from '../../categories/category.entity';
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateProductDto{

    @IsString()
    @IsOptional()
    name?: string;
 
    @IsNumber()
    @IsOptional()
    price?: number;
 
    @IsString()
    @IsOptional()
    description?: string;
 
    @IsOptional()
    category?: Category;
 
    @IsBoolean()
    @IsOptional()
    available?: boolean;
 
    @IsNumber()
    @IsOptional()
    total?:number
 
    @IsString()
    @IsOptional()
    image?: string;
}