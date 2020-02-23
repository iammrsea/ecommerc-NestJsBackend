import { User } from "src/users/user.entity";
import { IsString, IsOptional } from "class-validator";

export class UpdateOrderDto{

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    user?: User;
}