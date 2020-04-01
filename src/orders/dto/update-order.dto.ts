import { User } from 'src/users/user.entity';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  user?: User;
}
