import { CreateUserDto } from './dto/create-user.dto';
import { SecurePasswordService } from './../secure-password/secure-password.service';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UserRepository,
        private readonly securePassword: SecurePasswordService,
    ){}

    findAllEmplyees(): Promise<User[]> {
        return this.usersRepository.find({role:'Employee'});
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
}


