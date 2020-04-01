import { Injectable, Inject } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class UploaderService {
  private readonly uploader = v2;

  constructor(@Inject('CONFIG_OPTIONS') options) {
    console.log('options recevied ', options);
    this.uploader.config({
      ...options,
    });
  }
  getUploader() {
    return this.uploader;
  }

  doSomething() {}
}
