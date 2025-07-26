import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrder } from '../shared/models/order';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderHistory! : IOrder[]
  constructor(private orderService : OrdersService){}
  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(){
    this.orderService.getOrderHistory().subscribe({
      next:(order) => this.orderHistory = order,
      error: err => console.log(err)
    });
  }
}
