import { SecurePasswordService } from './../secure-password/secure-password.service';
import { Injectable, Inject } from '@nestjs/common';
// import { UserRepository } from 'src/users/user.repository';
import {JwtService} from '@nestjs/jwt'
import { Connection } from 'typeorm';

import C from '../constants'

@Injectable()
export class AuthService {
    constructor(
        @Inject(C.REPO_OPTIONS)private repo_options,
        private readonly securePassword: SecurePasswordService,
        private readonly jwtService:JwtService,
        private readonly connection:Connection
        ){
        }

    async validateUser(username:string,password:string):Promise<any>{
        try{
        const user = await this.findByUsername(username,this.repo_options.repoName);
        if(user){
            const match = await this.securePassword.compare(password,user.password);
            if(!match){
                return null;
            }
            delete user.password;
            return user;
        }
    }catch(e){
        console.log(e)
    }
       return null;
    }
    async login(user:any){
        const payload ={username:user.username,sub:user.id,role:user.role};
        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
            user
        }
    }
    async findByUsername(username:string,repoName:string):Promise<any>{
        return await this.connection.getRepository(repoName).findOne({username})
    }
}
