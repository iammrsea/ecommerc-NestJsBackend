import {createTransport} from 'nodemailer';
import C from '../constants';
import Mail = require('nodemailer/lib/mailer');



export const providers =[
    {
        provide: C.MAIL_TRANSPORTER,
        useFactory: ():Mail=> createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'andysopuru@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN, 
            }
        })
    },
    
]

