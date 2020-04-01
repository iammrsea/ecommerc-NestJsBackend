import { User } from './../../users/user.entity';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CraeateOrderDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  items: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  user: User;
}
