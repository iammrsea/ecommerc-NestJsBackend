import { Controller, Get, UseGuards,Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectStripe()
    private readonly stripeService:Stripe
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout')
  async getProfile(@Body()checckoutDto){
    return checckoutDto;
  }
}
