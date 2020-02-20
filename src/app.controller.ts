import { Controller, Get, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpresReq } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request()req: ExpresReq){
    return req.user;
  }
}
