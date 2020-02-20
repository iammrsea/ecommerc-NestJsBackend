import { Module, DynamicModule } from '@nestjs/common';
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
    })
  ],
  providers: [],
  exports:[]
})
export class AuthModule {
  static register(options):DynamicModule{
    return {
      module: AuthModule,
      imports:[],
      providers:[
        {
          provide: C.REPO_OPTIONS,
          useValue:options
        },
        AuthService,LocalStrategy,JwtStrategy
      ],
      exports:[AuthService]
    }
  }
  static forRoot():DynamicModule{
    return {
      module:AuthModule
    }
  }
}
