import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagginHeaderComponent } from './components/paggin-header/paggin-header.component';
import {  PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import {PagerComponent} from"./components/pager/pager.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [PagginHeaderComponent , PagerComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports:[
    PaginationModule,
    PagginHeaderComponent,
    PagerComponent,
    CarouselModule
  ]
})
export class SharedModule { }
