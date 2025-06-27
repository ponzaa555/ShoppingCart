import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor(private basketService : BasketService) {}

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
