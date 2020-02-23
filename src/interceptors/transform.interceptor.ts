import { CursorService } from 'src/cursor/cursor.service';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import C from '../constants';


@Injectable()
export class TransformInterceptor implements NestInterceptor{
  constructor(private readonly cursorService:CursorService){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => this.transformData(data)));
  }

  private transformData(data){
    const hasNext = !!data[C.QUERY_RESULT_LIMIT];
    const result =  this.getNextCursor(data)
      return {
        data: result.itemList,
        meta:{
          hasNext,
          nextCursor: result.nextCursor
        }
      }
  }
  private getNextCursor(data){
    let nextCursor='';
    let itemList;
    if(data[C.QUERY_RESULT_LIMIT]){
      const extraUser = data[C.QUERY_RESULT_LIMIT];
      itemList = data.filter(user=>user.id !== extraUser.id);
      nextCursor = this.cursorService.encode(extraUser.id);
      return {
        itemList,
        nextCursor
      }
    }
    return{
      itemList: data,
      nextCursor
    }
  }
}