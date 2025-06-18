import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7153/api/';

  constructor(private http : HttpClient) { 
  }
  getProducts(){
    return this.http.get<IProduct[]>(this.baseUrl + 'Product');
  }
}
