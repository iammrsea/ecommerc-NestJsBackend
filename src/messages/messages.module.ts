import { NodemailerModule } from './../nodemailer/nodemailer.module';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [NodemailerModule]
})
export class MessagesModule {}
