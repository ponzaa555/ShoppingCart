import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map, of } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';
import { IPagination, Pagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7153/api/';
  products: IProduct[] = [];
  brand : IBrand[] = [];
  type : IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private http : HttpClient) { 
  }
  getProducts(useCache : boolean){

    if(useCache === false){
      this.products = [];
    }

    if(this.products.length > 0 && useCache === true){
      // How many page will receive mean we are on page 2 or select page 2 
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);

      // Check what page number reqested
      if(this.shopParams.pageNamber <= pagesReceived){
        // this mean we have page
        this.pagination.data = this.products.slice(
          (this.shopParams.pageNamber - 1) * this.shopParams.pageSize,
          this.shopParams.pageNamber * this.shopParams.pageSize
        );

        return of(this.pagination);
      }
    }

    let params = new HttpParams();
    
    // check มี query ไหม
    if(this.shopParams.brandId !== 0)
    {
      params = params.append("brandId" , this.shopParams.brandId.toString())
    }

    if(this.shopParams.typeId !== 0)
    {
      params = params.append("typeId" , this.shopParams.typeId.toString());
    }

    if(this.shopParams.search)
    {
      params = params.append("search" , this.shopParams.search);
    }

    params = params.append("sort" , this.shopParams.sort);
    params = params.append("PageNumber" , this.shopParams.pageNamber.toString())
    params = params.append('PageSize' , this.shopParams.pageSize.toString());
    // to add query to url
    return this.http.get<IPagination>(this.baseUrl + 'Product' , {observe:'response' , params})
          .pipe(
            map(response => {
              console.log("response :" , response)
              // add new product from api to list
              this.products = [...this.products , ...response.body?.data!];
              this.pagination = response.body!;
              return this.pagination;
            }),
          );
  }

  setShopParams(params : ShopParams){
    this.shopParams = params;
  }
  getShopParams(){
    return this.shopParams;
  }
  getProduct(productId : number){
    const product = this.products.find(p => p.id === productId);

    if(product){
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'Product/' + productId)
  }
  getBrand(){
    if(this.brand.length > 0){
      return of(this.brand);
    }
    return this.http.get<IBrand[]>(this.baseUrl+'Product/brands').pipe(
      map(response => {
        this.brand = response;
        return response;
      })
    );
  }
  getTypes(){
    if(this.type.length > 0){
      return of(this.type);
    }
    return this.http.get<IType[]>(this.baseUrl+'Product/types').pipe(
      map(response => {
        this.type = response;
        return response;
      })
    );
  }
}
