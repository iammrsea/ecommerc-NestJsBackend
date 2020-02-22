import { CursorService } from './../cursor/cursor.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SecurePasswordService } from './../secure-password/secure-password.service';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

import {MoreThanOrEqual, Equal} from 'typeorm'

import C from '../constants'


@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UserRepository,
        private readonly securePassword: SecurePasswordService,
        private readonly cursorService: CursorService
    ){}

    find(role:string,limit?:number,cursor?:string): Promise<User[]> {
        const perPage = limit || C.QUERY_RESULT_LIMIT;
        const startFrom = this.cursorService.decode(cursor);
        return this.usersRepository.find({
            where:{id:MoreThanOrEqual(startFrom),role:Equal(role)},
            take:perPage+1,
            });
       
      }
    
    findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
    }

    async create(createUserDto:CreateUserDto):Promise<User>{
         createUserDto.password = await this.securePassword.encrypt(createUserDto.password);
        return await this.usersRepository.save(createUserDto);    
    }
    
    async update(updateUserDto: UpdateUserDto){
        return await this.usersRepository.save(updateUserDto);
    }

    async createBulk(createUsersDto: CreateUserDto[]){
        const users = [];
        for(const user of createUsersDto){
            user.password = await this.securePassword.encrypt(user.password);
            users.push(user);
        }
        return await this.usersRepository.save(users);

    //    const users = await createUsersDto.map( user=>{
    //         user.password = await this.securePassword.encrypt(user.password);
    //         return user;
    //     });
    //     return await this.usersRepository.save([...users]);
    }

}


