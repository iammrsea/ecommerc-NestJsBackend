import {IsString,IsEmail,IsNotEmpty, IsEnum} from 'class-validator'

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
    role: UserRole;
}