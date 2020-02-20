import { Injectable } from '@nestjs/common';
import {genSalt,hash,compare} from 'bcrypt'

@Injectable()
export class SecurePasswordService {
  
    async encrypt(password:string){
       const salt = await genSalt(10);
       return await hash(password,salt);  
       
    }
  
    async compare(plainPassword: string,hashedPassword:string):Promise<boolean>{   
        return  await compare(plainPassword,hashedPassword);
             
    }
}
