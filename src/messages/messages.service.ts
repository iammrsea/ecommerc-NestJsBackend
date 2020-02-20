import { Injectable, Inject } from '@nestjs/common';
import C from '../constants';

import Mail = require('nodemailer/lib/mailer');
import { CreateEmailDto } from './dto/create-email.dto';


@Injectable()
export class MessagesService {
    constructor(
        @Inject(C.MAIL_TRANSPORTER) 
        private readonly transporter :Mail
        ){}

    async sendEmail(createEmailDto: CreateEmailDto){
        const output =`
        <div>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${createEmailDto.name}</li>
            <li>Email: ${createEmailDto.email}</li>
        </ul>
        </div>
        <h3>Message</h3>
        <p>${createEmailDto.message}</p>
        `
        const mail={
            from: `${process.env.EMAIL_FROM} <andysopuru@gmail.com>`,
            subject: createEmailDto.subject,
            to: createEmailDto.recipients.join(','),
            html: output
        }
        // console.log('transporter ',this.transporter)
       return  await this.transporter.sendMail(mail)
    }
    
}
