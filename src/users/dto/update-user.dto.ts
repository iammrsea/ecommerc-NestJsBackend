import { IsString, IsEmail, IsNumber, IsOptional } from "class-validator";

export class UpdateUserDto{

    @IsOptional()
    @IsNumber()
    id?:number

    @IsOptional()
    @IsString()
    username?:string;

    @IsOptional()
    @IsString()
    address?:string;

    @IsOptional()
    @IsString()
    city?:string;

    @IsOptional()
    @IsNumber()
    zip?:number;


    @IsOptional()
    @IsEmail()
    email?:string;



}