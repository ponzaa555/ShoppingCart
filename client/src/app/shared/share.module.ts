import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagginHeaderComponent } from './components/paggin-header/paggin-header.component';
import {  PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import {PagerComponent} from"./components/pager/pager.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import {MatStepperModule} from '@angular/material/stepper';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { StepperComponent } from './components/stepper/stepper.component';



@NgModule({
  declarations: [PagginHeaderComponent , PagerComponent, OrderTotalsComponent, TextInputComponent, BasketSummaryComponent,StepperComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    MatStepperModule,
    RouterModule,
    MatButtonModule,
  ],
  exports:[
    PaginationModule,
    PagginHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    ReactiveFormsModule,
    MatStepperModule,
    BasketSummaryComponent,
    MatButtonModule
  ],
})
export class SharedModule { }
