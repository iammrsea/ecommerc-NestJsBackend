import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt'

import C from '../constants';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: C.JWT_SECRET,
      signOptions:{expiresIn:'1h'}
    }),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {
}
