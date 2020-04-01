import { User } from './../users/user.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum Currency {
  USD = 'usd',
  NGN = 'ngn',
}
export class Intent {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;

  @IsNotEmpty()
  @IsString()
  items: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  toString(): string {
    return `amount: ${this.amount}, currency: ${this.currency}`;
  }
}
