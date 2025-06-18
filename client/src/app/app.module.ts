import { NgModule } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { ShopComponent } from "./shop/shop.component";
import { ShopModule } from "./shop/shop.module";



@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CoreModule,
      ShopModule,
    ],
    bootstrap: [AppComponent], 
    providers:[provideHttpClient()]
  })
export class AppModule { }