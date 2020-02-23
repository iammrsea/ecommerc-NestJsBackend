import { OrdersModule } from './../orders/orders.module';
import { CursorModule } from './../cursor/cursor.module';
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
    AuthModule,
    CursorModule,
    OrdersModule
],
  providers: [UsersService],
  controllers: [UsersController,UserLoginController],
  exports: [TypeOrmModule]
})
export class UsersModule {}
