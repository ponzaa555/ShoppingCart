import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../shared/models/order';

@Component({
  selector: 'app-checkout-success',
  standalone: false,
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent  implements OnInit{
  order!:IOrder;

  constructor(private router : Router){
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    this.order = navigation?.extras?.state as IOrder
  }
  ngOnInit(): void {
    return;
  }

}
