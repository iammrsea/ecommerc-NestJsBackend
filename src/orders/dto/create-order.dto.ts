import { User } from './../../users/user.entity';
import { IsString, IsNotEmpty } from "class-validator";

export class CraeateOrderDto{
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    user: User;
}