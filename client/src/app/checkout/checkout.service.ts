import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/models/order';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + "Orders/deliveryMethods").pipe(
     map((dm : IDeliveryMethod[]) => {
      return dm.sort((a,b) => b.price - a.price);
     })
    )
  }
  
  submiteOrder(order : IOrderToCreate){
    return this.http.post<IOrder>(this.baseUrl + 'Orders' , order).pipe(
      map((orderRes : IOrder) => {
        console.log(orderRes)
        return orderRes
      })
    )
  }

  // createOrder(checkoutForm : FormGroup): IOrderToCreate{
  //   var basketId = localStorage.getItem('basket_id');
  //   var res = 
  // }
}
