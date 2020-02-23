import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto{

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    total?: number
}