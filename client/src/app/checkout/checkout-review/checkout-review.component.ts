import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  standalone: false,
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit{
  @Input() appStepper! : CdkStepper;
  basket$!: Observable<IBasket | null>
  constructor(private basketService: BasketService , private toaster: ToastrService){}

  ngOnInit(): void {
    this.basket$  = this.basketService.basket$;
  }

  createPaymentIntent(){
    return this.basketService.createBasketIntent().subscribe({
      next:(res) => {
        this.toaster.success('Payment intent created');
        this.appStepper.next();
        // move to next steper 
        //  มี ref ที่ component stepper ใน checkout #stepper เรียก create ref
      },
      error:(err) => {
        console.log(err);
        this.toaster.error(err.message);
      }
    });
  }
}
