import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { IAddress } from '../../shared/models/address';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  standalone: false,
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  form!:FormGroup;
  firstNameControl! : FormControl;
  lastNameControl! : FormControl;
  streetControl! : FormControl;
  cityControl! : FormControl;
  stateControl! : FormControl;
  zipcodeControl! :FormControl;
  constructor(private accountService : AccountService , private toastService : ToastrService){}
  ngOnInit(): void {
    this.form = this.checkoutForm.get('addressFrom') as FormGroup
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
  saveUserAddress(){
    this.accountService.updateUserAddress(this.form?.value).subscribe({
      next:(address : IAddress) => {
        this.toastService.success("Address saved");
        // save address to address form
        this.form.get('addressFrom')?.reset(address)
      },
      error : (err) => {
        console.log(err)
      }
    })
  }
}
