import { SecurePasswordService } from './secure-password.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
    providers:[SecurePasswordService],
    exports: [SecurePasswordService]
})
export class SecurePasswordModule {

}
