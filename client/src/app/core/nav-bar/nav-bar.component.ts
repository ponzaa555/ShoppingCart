import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone:false
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket|null>;
  constructor(private http : HttpClient , private basketSevice:BasketService) {  
  }
  ngOnInit(){
      this.basket$ = this.basketSevice.basket$;
  }
}
