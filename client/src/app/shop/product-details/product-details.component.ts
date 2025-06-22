import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone : false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent  implements OnInit{
  product!:IProduct;

  constructor(private shopService:ShopService , private activateRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.loadProduct(); 
  }

  loadProduct(){
    // id ต้องตรงกับ ที่set ไว้ใน route.ts
    this.shopService.getProduct(Number(this.activateRoute.snapshot.paramMap.get('id'))).subscribe(product => {
      this.product = product
    }, error => {
      console.log(error)
    })
  }
}
