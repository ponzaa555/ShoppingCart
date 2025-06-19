import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7153/api/';

  constructor(private http : HttpClient) { 
  }
  getProducts(shopParams:ShopParams){
    let params = new HttpParams();
    
    // check มี query ไหม
    if(shopParams.brandId !== 0)
    {
      params = params.append("brandId" , shopParams.brandId.toString())
    }

    if(shopParams.typeId !== 0)
    {
      params = params.append("typeId" , shopParams.typeId.toString());
    }

    params = params.append("sort" , shopParams.sort);
    params = params.append("page" , shopParams.pageNamber.toString())
    params = params.append('pageSize' , shopParams.pageSize.toString());
    // to add query to url
    return this.http.get<IPagination>(this.baseUrl + 'Product' , {observe:'response' , params})
          .pipe(
            map(response => {
              console.log("response :" , response)
              return response.body ;
            })
          );
  }
  getBrand(){
    return this.http.get<IBrand[]>(this.baseUrl+'Product/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'Product/types');
  }
}
