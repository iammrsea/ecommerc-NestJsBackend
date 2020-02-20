import { IsString, IsEmail, IsNumber, IsOptional } from "class-validator";

export class UpdateUserDto{

    @IsOptional()
    @IsNumber()
    id?:number

    @IsOptional()
    @IsString()
    username?:string;

    @IsOptional()
    @IsEmail({})
    email?:string;

}