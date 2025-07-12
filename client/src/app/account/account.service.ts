import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser|null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http : HttpClient , private router: Router) { }


  getCurrentUserValue(){
    return this.currentUserSource.value
  }

  // load current user if we have token
  loadCurrentUser(token : string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization' , `Bearer ${token}`);


    return this.http.get<IUser>(this.baseUrl + 'account' , {headers}).pipe(
      map((user : IUser) => {
        if (user){
          localStorage.setItem('token' , user.token)
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values : any){
    return this.http.post<IUser>(this.baseUrl+"account/login",values).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem("token" , user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values : any){
    return this.http.post<IUser>(this.baseUrl+'Account/register' , values).pipe(
      map((user : IUser) => {
        if(user){
          localStorage.setItem("token" , user.token);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + "Account/emailexists?email=" + email);
  }
}
