import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private accountService : AccountService , private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if(auth){
          // this mean we have current user
          return true
        }
        this.router.navigate(['account/login'] , {queryParams:{returnUrl:state.url}})
        return false
      })
    )
  }

}