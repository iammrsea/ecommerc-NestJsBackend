import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
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
import { CursorModule } from './cursor/cursor.module';



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
    AuthModule,
    CursorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


