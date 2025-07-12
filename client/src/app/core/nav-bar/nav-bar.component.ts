import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone:false
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket|null>;
  currentUser$!: Observable<IUser|null>
  constructor(private http : HttpClient , private basketSevice:BasketService , private accountService : AccountService) {  
  }
  ngOnInit(){
      this.basket$ = this.basketSevice.basket$;
      this.currentUser$ = this.accountService.currentUser$; 
  }

  logout(){
    this.accountService.logout();
  }
}
