import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  standalone:false
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:false}) searchTerm!:ElementRef ;
  products!:IProduct[] ;
  brands:IBrand[] = [];
  types:IType[] = [];
  shopParams : ShopParams;
  totalCount!:number;
  totalPage!:number;
  sortOptions =[
    {name:'Alphabetical', value:'name'},
    {name:'Low to High' , value:'priceAsc'},
    {name:'High to Low' , value:"priceDesc"}
  ]

  
  constructor(private shopService:ShopService){
    this.shopParams = this.shopService.getShopParams();
  }

  // call when component load
  ngOnInit(): void {
    this.getProduct(true);
    this.getBrand();
    this.getTypes();
  }
  getProduct(useCache = false){
    this.shopService.getProducts(useCache).subscribe(respnse => {
      this.products = respnse!.data
      this.totalCount = respnse!.totalCount
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
    const prams = this.shopService.getShopParams();
    console.log("onBranSelected : " , prams);

    prams.brandId = brandId;
    prams.pageNamber = 1;
    this.shopService.setShopParams(prams);
    this.getProduct();
  }

  onTypeSelected(typeId : number){
    const prams = this.shopService.getShopParams();
    console.log("onTypeSelected : " , prams);
    prams.typeId = typeId;
    prams.pageNamber = 1;
    this.shopService.setShopParams(prams);
    this.getProduct();
  }

  onSortSelected(sort: string){
    const prams = this.shopService.getShopParams();
    prams.sort = sort;
    this.shopService.setShopParams(prams);
    this.getProduct()
  }

  onPageChange(event : any){
    // console.log({event})
    const prams = this.shopService.getShopParams();
    if(prams.pageNamber !== event)
    {
      this.shopParams.pageNamber = event;
      this.shopService.setShopParams(prams); 
      this.getProduct(true);
    }
  }
  
  onSearch() {
    const prams = this.shopService.getShopParams();
    prams.search = this.searchTerm.nativeElement.value;
    prams.pageNamber = 1;
    this.shopService.setShopParams(prams); 
    this.getProduct()
  }

  onReset(){
    this.searchTerm.nativeElement.value  = "";
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProduct();
  }
}
