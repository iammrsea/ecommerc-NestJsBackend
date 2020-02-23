import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    total: number;
}