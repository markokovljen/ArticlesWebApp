import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, concatMap, retryWhen } from 'rxjs/operators';
import { ErrorCode } from '../article/enums/enums';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttperorInterceptorService implements HttpInterceptor {

    constructor(private alertify:AlertifyService) { }

    intercept(request:HttpRequest<any>, next:HttpHandler){
      console.log('Http Request started');
      return next.handle(request)
      .pipe(
          retryWhen(error=>
            error.pipe(
              concatMap((checkErr:HttpErrorResponse,count:number)=>{

                if(count<=10){

                    switch(checkErr.status){
                        case ErrorCode.serverDown:
                          return of(checkErr);
                    }

                }

                return throwError(checkErr);
              })
            )
           ),
          catchError((error:HttpErrorResponse)=>{
            const errorMessage=this.setError(error);
            console.log(error);
            this.alertify.error(errorMessage);
            return throwError(errorMessage);
          })
      );
    }

    setError(error:HttpErrorResponse): string{
      let errorMessage='Unknown error occured';
      if(error.error instanceof ErrorEvent){
        //Client side error
            errorMessage=error.error.message;

      }else {
        //server side error
        if(error.status===401){
            return error.statusText
        }
        if(error.error.errorMessage && error.status!==0)//status polje je 0 kada je API server pao
        {
            errorMessage=error.error.errorMessage;//ovde moze da udje npr kada database server pao
        }
      }
      return errorMessage;
    }

}
