import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CoreModule } from "../core/core.module";
import { SharedModule } from '../shared/share.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ShopComponent , ProductItemComponent , ProductDetailsComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule
],
  exports:[ShopComponent]
})
export class ShopModule { }
