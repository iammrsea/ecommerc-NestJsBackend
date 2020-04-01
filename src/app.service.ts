import { OrdersService } from './orders/orders.service';
import { CraeateOrderDto } from './orders/dto/create-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Intent } from './models/Intent';

@Injectable()
export class AppService {
  constructor(
    @InjectStripe()
    private readonly stripeService: Stripe,
    private readonly orderService: OrdersService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  private calculateAmout(items, amount): number {
    return 20000;
  }
  private createOrder(intent: Intent): CraeateOrderDto {
    let order = new CraeateOrderDto();
    order = {
      ...intent,
    };
    return order;
  }
  async createPaymentIntent(options: Intent) {
    const order = await this.orderService.create(this.createOrder(options));
    const { amount, currency } = options;
    const intent = await this.stripeService.paymentIntents.create({
      amount,
      currency,
    });
    return { orderId: order.id, client_secret: intent.client_secret };
  }
}
