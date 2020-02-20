import { MessagesService } from './messages.service';
import { Controller, Post, Body } from '@nestjs/common';

import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class MessagesController {
    constructor(private readonly messageService: MessagesService){

    }
    @Post()
    async sendMail(@Body()createEmailDto: CreateEmailDto){
        return await this.messageService.sendEmail(createEmailDto)
    }
}
