import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Meta{
  hasNext:boolean;
  cursor: string
}
class Response{
  data: [];
  meta: Meta
}


@Injectable()
export class TransformInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => this.transformData(data)));
  }

  private transformData(data){
      console.log('transform interceptor');
      // const res = new Response();
      // res.data = data;

      // return res;
      return {
        data,
        meta:{}
      }
  }
}