import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagginHeaderComponent } from './components/paggin-header/paggin-header.component';
import {  PaginationModule } from 'ngx-bootstrap/pagination';
import {PagerComponent} from"./components/pager/pager.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatStepperModule} from '@angular/material/stepper';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { StepperComponent } from './components/stepper/stepper.component';
import { TextInputFormComponent } from './components/text-input-form/text-input-form.component';



@NgModule({
  declarations: [PagginHeaderComponent , PagerComponent, OrderTotalsComponent, BasketSummaryComponent,StepperComponent, TextInputFormComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    MatStepperModule,
    RouterModule,
    MatButtonModule,
    FormsModule
  ],
  exports:[
    PaginationModule,
    PagginHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    ReactiveFormsModule,
    MatStepperModule,
    BasketSummaryComponent,
    MatButtonModule,
    TextInputFormComponent,
    FormsModule
  ],
})
export class SharedModule { }
