import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  standalone: false,
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm!:FormGroup
  deliveryMethod!: IDeliveryMethod[]

  constructor(private checkoutSevice : CheckoutService){}
  ngOnInit(){
    this.checkoutSevice.getDeliveryMethods().subscribe({
      next: (dm : IDeliveryMethod[]) => this.deliveryMethod = dm,
      error: (error) => console.log(error)
    });
  }
}
