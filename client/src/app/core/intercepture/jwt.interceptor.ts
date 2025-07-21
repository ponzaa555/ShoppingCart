import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // fetch token from local storage
        const token = localStorage.getItem("token");

        // set token to the header
        if(token){
            // clone req
            req = req.clone({
                setHeaders: {
                    Authorization : `Bearer ${token}`
                }
            });
        }
        // sending token
        return  next.handle(req);
    }
}