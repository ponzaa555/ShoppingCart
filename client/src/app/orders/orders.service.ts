import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { map, of } from 'rxjs';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) {}

  baseUrl = environment.apiUrl;

  getOrderHistory(){
    // set token header ที่ jwt.interceptor แล้ว
    return this.http.get<IOrder[]>(this.baseUrl + 'Orders').pipe(
      map((orders : IOrder[]) => {
        if(orders){
          return orders.map(order => ({
            ...order,
            orderDate : this.formatDate(order.orderDate)
          }))
          .sort((a,b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime())
        }
        return []
      })
    )
  }

  getOrderById(id : number){
    return this.http.get<IOrder>(this.baseUrl + 'Orders/' +id);
  }

  private formatDate(datetime :string):string{
    const date = new Date(datetime)
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    } as Intl.DateTimeFormatOptions;

    const formatdate = new Intl.DateTimeFormat('en-US',options).format(date)
    return formatdate
  }
}
