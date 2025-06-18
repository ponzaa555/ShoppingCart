import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CoreModule } from "../core/core.module";



@NgModule({
  declarations: [ShopComponent , ProductItemComponent],
  imports: [
    CommonModule,
    CoreModule
],
  exports:[ShopComponent]
})
export class ShopModule { }
