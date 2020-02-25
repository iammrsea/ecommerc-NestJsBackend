import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Intent } from './models/Intent';

@Injectable()
export class AppService {
  constructor(
    @InjectStripe()
    private readonly stripeService: Stripe,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  private calculateAmout(items, amount): number {
    return 20000;
  }
  createPaymentIntent(options: Intent): Promise<Stripe.PaymentIntent> {
    const { items, amount, currency } = options;
    return this.stripeService.paymentIntents.create({
      amount: this.calculateAmout(items, amount),
      currency,
    });
  }
}
