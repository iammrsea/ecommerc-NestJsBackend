import { Injectable } from "@nestjs/common";
import {Base64} from 'js-base64'

@Injectable()
export class CursorService{

    encode(id:number):string{
        return  Base64.encode(String(id));
    }
    decode(cursor:string):number{
        if(!cursor)
        return 1;
        return parseInt(Base64.decode(cursor));
    }
}