import { Component, OnInit } from '@angular/core';
import { NavigationError, Router, RouterOutlet } from '@angular/router';
import { response } from 'express';
import { IProduct } from './shared/models/product';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:false
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService : BasketService , private router: Router) {
    // this.router.events.subscribe(event => {
    //   if(event instanceof NavigationError){
    //     if (event.error?.message?.includes('Failed to fetch dynamically imported module')) {
    //       window.location.href = event.url; // Force reload
    //     }
    //   }
    // })
  }

  ngOnInit(): void {
    const baseketId = localStorage.getItem("basket_id");
    if(baseketId){
      this.basketService.getBasket(baseketId).subscribe(() => {
        console.log("initialised Basket");
      }, error => {
        console.log(error);
      })
    }
  }
}
