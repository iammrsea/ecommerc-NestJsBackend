import {Strategy,ExtractJwt} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'


import C from '../constants'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: C.JWT_SECRET
        });
    }
    async validate(payload:any):Promise<any>{
        return {id: payload.sub,username:payload.username,role:payload.role}
    }
}