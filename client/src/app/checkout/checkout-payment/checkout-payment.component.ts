import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
import { IOrderToCreate } from '../../shared/models/order';
import { firstValueFrom } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  standalone: false,
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() checkoutForm!: FormGroup
  constructor(
    private checkoutService : CheckoutService , 
    private toastr: ToastrService,
    private basketService: BasketService,
    private router: Router
  ){}

  ngOnInit(): void {
    return;
  }

  async submiteOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    const createdOrder = await this.createOrder(basket);
    this.basketService.deleteBasket(basket);
    this.toastr.success('Create order success')
    const navigationExtras: NavigationExtras = {state: createdOrder};
    this.router.navigate(['checkout/success'] , navigationExtras)
  }

  private async createOrder(basket : IBasket) {
    const basketId = basket.id
    const deliveryNumber = Number(this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value)
    const address = this.checkoutForm.get('addressFrom')?.value
    const createOrder =  {
      basketId : basketId,
      deliveryMethodId : deliveryNumber,
      shipToAddress : address
    } as IOrderToCreate
    console.log(createOrder)
     return firstValueFrom(this.checkoutService.submiteOrder(createOrder));
  }
}
