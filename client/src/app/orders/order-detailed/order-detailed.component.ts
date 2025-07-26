import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../../shared/models/order';

@Component({
  selector: 'app-order-detailed',
  standalone: false,
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit{
  order!:IOrder
  constructor(private bcService:BreadcrumbService , 
    private orderService : OrdersService,
    private activate: ActivatedRoute)
  {
    this.bcService.set('@OrderDetailed' , '')
  }
  ngOnInit(){
    this.loadOrderById()
  }

  loadOrderById(){
    const orderId = Number(this.activate.snapshot.paramMap.get('id'))
    this.orderService.getOrderById(orderId).subscribe({
      next:(order) => 
        {
          this.order = order
          this.bcService.set('@OrderDetailed' , `Order# ${order.id} - ${order.status}`)
        },
      error:err => console.log(err)
    });
  }
}
