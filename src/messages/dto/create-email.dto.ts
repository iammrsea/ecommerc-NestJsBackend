import { IsNotEmpty, IsEmail, IsString, IsArray } from "class-validator";

export class CreateEmailDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    subject: string

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsArray()
    recipients: string[];
}