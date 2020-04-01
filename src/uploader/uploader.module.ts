import { Module, DynamicModule, Global } from '@nestjs/common';
import { UploaderService } from './uploader.service';

@Global()
@Module({
  providers: [UploaderService],
})
export class UploaderModule {
  static forRootAsync(options): DynamicModule {
    return {
      module: UploaderModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      exports: [UploaderService],
    };
  }
}
