import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

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
  shopParams = new ShopParams();
  totalCount!:number
  sortOptions =[
    {name:'Alphabetical', value:'name'},
    {name:'Low to High' , value:'priceAsc'},
    {name:'High to Low' , value:"priceDesc"}
  ]

  
  constructor(private shopService:ShopService){}

  // call when component load
  ngOnInit(): void {
    this.getProduct();
    this.getBrand();
    this.getTypes();
  }
  getProduct(){
    this.shopService.getProducts(this.shopParams).subscribe(respnse => {
      this.products = respnse!.data
      this.shopParams.pageNamber = respnse!.pageIndex
      this.shopParams.pageSize = respnse!.pageSize
      this.totalCount = respnse!.count
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
    this.shopParams.brandId = brandId;
    this.getProduct();
  }

  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.getProduct();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProduct()
  }

  onPageChange(event : any){
    this.shopParams.pageNamber = event.page;
    this.getProduct();
  }
}
