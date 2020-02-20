import { Test, TestingModule } from '@nestjs/testing';
import { SecurePasswordService } from './secure-password.service';
import {genSalt,hash} from 'bcrypt'

describe('SecurePasswordService', () => {
  let service: SecurePasswordService;
  let result;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurePasswordService],
    }).compile();

    service = module.get<SecurePasswordService>(SecurePasswordService);
    const salt = await genSalt(10);
    result  = await hash('password',salt);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return hashed password',async ()=>{
    const hashed = await service.encrypt('password');
    expect(hashed.substr(0,6)).toBe(result.substr(0,6));
  })
});
