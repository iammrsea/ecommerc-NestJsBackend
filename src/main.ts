import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
// import './connect';

// dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  await app.listen(4000);
}
bootstrap();
