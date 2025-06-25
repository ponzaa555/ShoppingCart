import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('search',{static:false}) searchTerm!:ElementRef ;
  products!:IProduct[] ;
  brands:IBrand[] = [];
  types:IType[] = [];
  shopParams = new ShopParams();
  totalCount!:number;
  totalPage!:number;
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
      this.shopParams.pageNamber = respnse!.currentPage
      this.shopParams.pageSize = respnse!.pageSize
      this.totalCount = respnse!.totalCount
      this.totalPage = respnse!.totalPage
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
    this.shopParams.pageNamber = 1;
    this.getProduct();
  }

  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNamber = 1;
    this.getProduct();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProduct()
  }

  onPageChange(event : any){
    // console.log({event})
    if(this.shopParams.pageNamber !== event)
    {
      this.shopParams.pageNamber = event;
      this.getProduct();
    }
  }
  
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNamber = 1;
    this.getProduct()
  }

  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProduct();
  }
}
