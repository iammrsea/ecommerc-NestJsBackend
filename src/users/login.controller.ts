import { UsersService } from './users.service';
import { AuthService } from './../auth/auth.service';
import { Controller, UseGuards, Post,Request, Body, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {Request as ExpressReq} from 'express'
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/password.interceptor';

@Controller()
export class UserLoginController{

    constructor(
        private readonly authService:AuthService,
        private readonly usersService: UsersService
        ){}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request()req: ExpressReq){
        return await this.authService.login(req.user);
    }

    @UseInterceptors(ExcludePasswordInterceptor)
    @Post('users')
    async create(@Body()createUserDto:CreateUserDto):Promise<User>{
       return await this.usersService.create(createUserDto);
       
    }
    @UseInterceptors(ExcludePasswordInterceptor)
    @Post('users/bulk')
    async createBulk(@Body()createUserDto:CreateUserDto[]):Promise<User[]>{
       return await this.usersService.createBulk(createUserDto);
       
    }

}