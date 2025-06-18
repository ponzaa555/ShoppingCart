import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  standalone:false
})
export class ShopComponent implements OnInit {
  products:IProduct[] = [];
  brands:IBrand[] = [];
  types:IType[] = [];
  brandIdSelected!: number ;
  typeIdSelectd!:number;

  
  constructor(private shopService:ShopService){}

  // call when component load
  ngOnInit(): void {
    this.getProduct();
    this.getBrand();
    this.getTypes();
  }
  getProduct(){
    this.shopService.getProducts(this.brandIdSelected , this.typeIdSelectd).subscribe(respnse => {
      this.products = respnse 
    },error => {
      console.log(error);
    })
  }

  getBrand(){
    this.shopService.getBrand().subscribe(response => {
      this.brands = [{id: 0 , name : 'All'} , ...response];
    })
  }
  
  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{ id:0 , name: 'All'} , ...response];
    })
  }

  onBrandSelected(brandId : number){
    this.brandIdSelected = brandId;
    this.getProduct();
  }

  onTypeSelected(typeId : number){
    this.typeIdSelectd = typeId;
    this.getProduct();
  }
}
