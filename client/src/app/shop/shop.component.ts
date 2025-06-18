import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  standalone:false
})
export class ShopComponent implements OnInit {
  products:IProduct[] = [];
  
  constructor(private shopService:ShopService){}

  ngOnInit(): void {
    this.shopService.getProducts().subscribe(respnse => {
      this.products = respnse 
    },error => {
      console.log(error);
    })
  }
}
