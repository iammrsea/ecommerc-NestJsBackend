import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './user.repository'
import { UserLoginController } from './login.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule
],
  providers: [UsersService],
  controllers: [UsersController,UserLoginController],
  exports: [TypeOrmModule]
})
export class UsersModule {}
