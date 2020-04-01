import { createTransport } from 'nodemailer';
import C from '../constants';
import Mail = require('nodemailer/lib/mailer');
import { ConfigService } from '@nestjs/config';

export const providers = [
  {
    provide: C.MAIL_TRANSPORTER,
    useFactory: async (configService: ConfigService): Promise<Mail> =>
      createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: 'andysopuru@gmail.com',
          clientId: configService.get('CLIENT_ID'),
          clientSecret: configService.get('CLIENT_SECRET'),
          refreshToken: configService.get('REFRESH_TOKEN'),
          accessToken: configService.get('ACCESS_TOKEN'),
        },
      }),
    inject: [ConfigService],
  },
];
