import { Observable } from 'rxjs';
import { CanActivate,ExecutionContext, Injectable } from "@nestjs/common";
import {Request} from 'express'
import { Reflector } from '@nestjs/core';

interface User{
    id?:number;
    username?:string;
    role?:string
}
@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private readonly reflector:Reflector){}

    canActivate(context:ExecutionContext):boolean|Promise<boolean>|Observable<boolean>{
        let roles = this.reflector.getAllAndMerge<string[]>('roles',[context.getHandler(),context.getClass()]);
        
        roles =this.removeUndefined(roles);
        if(roles && roles.length===0){
            return true;
        }
        const ctx = context.switchToHttp();
        const request:Request = ctx.getRequest();
        const user:User = request.user;
        // console.log('user ',user)
        return this.matchRoles(roles,user.role)
    }
    removeUndefined(roles:string[]):string[]{
        const filteredRoles = roles.filter(role=>role !==undefined);
        if(Array.isArray(filteredRoles[0])){
            return filteredRoles[0];
        }
        return filteredRoles;
    }
    matchRoles(roles:string[],userRole:string):boolean{
        if(!userRole)return false;
        return roles.includes(userRole);
    }
}