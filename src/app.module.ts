import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { MessagesModule } from './messages/messages.module';
import {TypeOrmModule} from '@nestjs/typeorm'

import { SecurePasswordModule } from './secure-password/secure-password.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { AuthModule } from './auth/auth.module';

import * as ormconfig from './ormconfig'



@Module({
  imports: [
    UsersModule, 
    ProductsModule, 
    CategoriesModule, 
    OrdersModule, 
    MessagesModule,
    TypeOrmModule.forRoot(ormconfig),
    SecurePasswordModule,
    NodemailerModule,
    AuthModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

