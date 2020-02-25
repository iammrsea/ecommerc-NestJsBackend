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

  @IsOptional()
  items?: object;

  toString(): string {
    return `amount: ${this.amount}, currency: ${this.currency}`;
  }
}
