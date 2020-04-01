import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(value => this.excludePassword(value)));
  }
  private excludePassword(value) {
    if (!value) {
      return value;
    }
    if (value.data && value.data.length > 0) {
      const data = value.data.map(user => classToPlain(user));
      return { ...value, data };
    }
    if (value.data && !value.data.length) {
      delete value.data.password;
      return value;
    }

    delete value.data.password;

    return value;
  }
}
