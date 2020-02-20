import { Module } from '@nestjs/common';
import { providers } from './nodemailer.service';

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class NodemailerModule {}
