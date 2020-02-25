import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

import { Logger } from '@nestjs/common';
import { Intent } from './models/Intent';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout')
  async getProfile(@Body() checckoutDto) {
    return checckoutDto;
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() data: Intent) {
    // this.logger.log('data received', data.toString());
    return await this.appService.createPaymentIntent(data);
  }
  @Post('webhook')
  async webhook(@Body() eventData) {
    let event = eventData;

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        this.logger.log(paymentIntent);
        break;

      default:
        return new BadRequestException('Unexpected Event type');
    }
    return { received: true };
  }
}
