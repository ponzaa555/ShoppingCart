import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, Observable, throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercept call")
    return next.handle(req).pipe(
      catchError(error => {
        if(error){
          console.log({error})
          switch (error.status){
            case 404:
              this.router.navigateByUrl("/not-found");
              break
            case 500:
              this.router.navigateByUrl("/server-error");
              break;
            default:
              break
          }
        }
        return throwError(error);
      })
    )
  }

}

