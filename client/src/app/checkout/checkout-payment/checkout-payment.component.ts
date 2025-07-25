import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { IOrderToCreate } from '../../shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  standalone: false,
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() submite!:() => void;
  constructor(private checkoutService : CheckoutService){}

  ngOnInit(): void {
    return;
  }

}
