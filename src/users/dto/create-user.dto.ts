import {IsString,IsEmail,IsNotEmpty, IsEnum, IsNumber} from 'class-validator'
import { Optional } from '@nestjs/common';

enum UserRole{
    ADMIN="Admin",
    EMPLOYEE ="Employee",
    CUSTOMER ="Customer"
}
export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: string;

    @Optional()
    @IsString()
    address?: string

    @Optional()
    @IsString()
    city?: string

    @Optional()
    @IsString()
    state?: string

    @Optional()
    @IsNumber()
    zip?: number
}