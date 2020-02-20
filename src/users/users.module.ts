import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './user.repository'
import { LoginController } from './login.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule.register({repoName:'User'})
],
  providers: [UsersService],
  controllers: [UsersController,LoginController],
  exports: [TypeOrmModule]
})
export class UsersModule {}
// console.log("TypeOrmModule ",TypeOrmModule.forFeature([UserRepository]))