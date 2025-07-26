import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

const routers:Routes = [
  {path:'' , component:OrdersComponent},
  {path:':id', component:OrderDetailedComponent ,  data: { breadcrumb: { alias: 'OrderDetailed' } }}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ],
  exports:[
    RouterModule
  ]
})
export class OrdersRoutingModule { }
