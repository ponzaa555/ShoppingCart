import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  standalone: false,
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit {
  @Input() form!:FormGroup;
  firstNameControl! : FormControl;
  lastNameControl! : FormControl;
  streetControl! : FormControl;
  cityControl! : FormControl;
  stateControl! : FormControl;
  zipcodeControl! :FormControl;
  constructor(){}
  ngOnInit(): void {
    this.registerFormControl();
  }
  registerFormControl(){
    this.firstNameControl = this.form.get('firstName') as FormControl;
    this.lastNameControl = this.form.get('lastName') as FormControl;
    this.streetControl = this.form.get('street') as FormControl;
    this.stateControl = this.form.get('state') as FormControl;
    this.zipcodeControl = this.form.get('zipcode') as FormControl;
    this.cityControl = this.form.get('city') as FormControl;
  }
}
