import { AuthService } from './../auth/auth.service';
import { Controller, UseGuards, Post,Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {Request as ExpressReq} from 'express'

@Controller('users/auth/login')
export class UserLoginController{

    constructor(private readonly authService:AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request()req: ExpressReq){
        console.log('What is happening?')
        return await this.authService.login(req.user);
    }
}