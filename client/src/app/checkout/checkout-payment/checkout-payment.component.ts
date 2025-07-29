import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
import { IOrderToCreate } from '../../shared/models/order';
import { firstValueFrom } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  standalone: false,
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm!: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement!: ElementRef;

  stripe: any;
  cardNumber: any;
  cardExpire: any;
  cardCvc: any;
  cardError: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  constructor(
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private basketService: BasketService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpire.destroy();
    this.cardCvc.destroy();
  }

  // give a chance to html to initialize and mount the stripe element on top
  async ngAfterViewInit() {
    this.stripe = await loadStripe(
      'pk_test_51RpSeiQ0LWcNT9y249QR7z07P71kwTDm6iafJyALtN9QSRimnKKohJkmHMIMAOFa0XWJBnfaWKFim97U6hD8bmFj00kzucZOXz'
    );
    const elements = this.stripe.elements();

    // we mount the stripe element on to native card number element on html page
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    // this.cardNumber is to get stripe element
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpire = elements.create('cardExpiry');
    this.cardExpire.mount(this.cardExpiryElement.nativeElement);
    this.cardExpire.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  // Get error from stripe
  onChange({ error }: any) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
  }
  async submiteOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    const createdOrder = await this.createOrder(basket);
    console.log(' basket.clientSecret' ,  basket.clientSecret)
    this.stripe
      .confirmCardPayment(
        basket.clientSecret, 
      {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkoutForm.get('paymentForm')?.get('nameOnCard')?.value,
          },
        },
      })
      .then((result: any) => {
        console.log(result);
        if (result.paymentIntent) {
          // line under this have to process after payment success from stripe
          this.basketService.deleteBasket(basket);
          const navigationExtras: NavigationExtras = {state: createdOrder};
          this.router.navigate(['checkout/success'] , navigationExtras) 
        }else{
          this.toastr.error('Payment error');
        }
      });
  }

  private async createOrder(basket: IBasket) {
    const basketId = basket.id;
    const deliveryNumber = Number(
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value
    );
    const address = this.checkoutForm.get('addressFrom')?.value;
    const createOrder = {
      basketId: basketId,
      deliveryMethodId: deliveryNumber,
      shipToAddress: address,
    } as IOrderToCreate;
    console.log(createOrder);
    return firstValueFrom(this.checkoutService.submiteOrder(createOrder));
  }
}
