import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';

import { SecurePasswordModule } from './secure-password/secure-password.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { AuthModule } from './auth/auth.module';

import * as ormconfig from './ormconfig';
import { CursorModule } from './cursor/cursor.module';
import { UploaderModule } from './uploader/uploader.module';
import { SalesModule } from './sales/sales.module';

console.log('ormconfig', ormconfig);
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
    CursorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StripeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UploaderModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        cloud_name: configService.get('CLOUD_NAME'),
        api_key: configService.get('API_KEY'),
        api_secret: configService.get('API_SECRET'),
      }),
      inject: [ConfigService],
    }),
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
