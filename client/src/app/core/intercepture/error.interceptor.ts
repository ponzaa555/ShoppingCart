import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { catchError, delay, Observable, throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router:Router , private toastr : ToastrService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if(error){
          console.log({error})
          switch (error.status){
            case 404:
              this.router.navigateByUrl("/not-found");
              break
            case 500:
              const NavigationExtras:NavigationExtras = {state:{error:error.error}}
              this.router.navigateByUrl("/server-error",NavigationExtras );
              break;
            case 400:
              if(error.error.errors){
                throw error.error
              }else{
                this.toastr.error(error.error.message , error.error.statusCode);
              }
              break;
            case 401:
              this.toastr.error(error.error.message , error.error.statusCode);
              break;
          }
        }
        return throwError(() => error);
      })
    )
  } 
}

