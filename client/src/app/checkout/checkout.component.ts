import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account/account.service';
import { IOrderToCreate } from '../shared/models/order';
import { CheckoutService } from './checkout.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../basket/basket.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  addressForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private basketService : BasketService
  ) {}
  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValue();
    this.getDeliveryMethodValue();
    this.addressForm = this.checkoutForm.get('addressFrom') as FormGroup;
  }

  //create checkout form
  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressFrom: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
      }),
    });
  }

  getAddressFormValue() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        if (address) {
          console.log('getAddressFormValue', address);
          this.checkoutForm.get('addressFrom')?.patchValue(address);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getDeliveryMethodValue(){
    // ถ้ามี delivery mathod ให้ดึงมาใช้เลย
    const basket = this.basketService.getCurrentBasketValue();
    if(basket?.deliveryMethodId !== null){
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.patchValue(basket?.deliveryMethodId?.toString())
    }
  }
}
