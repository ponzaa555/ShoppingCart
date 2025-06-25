import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  standalone : false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent  implements OnInit{
  product!:IProduct;

  constructor(private shopService:ShopService , private activateRoute : ActivatedRoute ,
    private bcService:BreadcrumbService
  ){
    this.bcService.set("@productDetail" , ' ')
  }

  ngOnInit(): void {
    this.loadProduct(); 
  }

  loadProduct(){
    // id ต้องตรงกับ ที่set ไว้ใน route.ts
    this.shopService.getProduct(Number(this.activateRoute.snapshot.paramMap.get('id'))).subscribe(product => {
      this.product = product
      this.bcService.set("@productDetail" , product.name)
    }, error => {
      console.log(error)
    })
  }
}
