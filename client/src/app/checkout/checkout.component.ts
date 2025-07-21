import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  checkoutForm! : FormGroup;
  constructor(private fb : FormBuilder){}
  ngOnInit(): void {
    this.createCheckoutForm();
  }

  //create checkout form
  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressFrom : this.fb.group({
        firstName : [null,Validators.required],
        lastName : [null,Validators.required],
        street : [null,Validators.required],
        state : [null,Validators.required],
        zipcode : [null,Validators.required],
      }),
      deliveryForm : this.fb.group({
        deliveryMethod : [null , Validators.required]
      }),
      pahmentForm : this.fb.group({
        nameOnCard : [null , Validators.required]
      })
    });
  }
}
