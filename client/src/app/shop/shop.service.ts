import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7153/api/';

  constructor(private http : HttpClient) { 
  }
  getProducts(brandId?:number, typeId?:number){
    let params = new HttpParams();
    
    // check มี query ไหม
    if(brandId)
    {
      params = params.append("brandId" , brandId.toString())
    }

    if(typeId)
    {
      params = params.append("typeId" , typeId.toString());
    }
    // to add query to url
    return this.http.get<IProduct[]>(this.baseUrl + 'Product' , {observe:'response' , params})
          .pipe(
            map(response => {
              console.log("response :" , response)
              return response.body ?? [];
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
