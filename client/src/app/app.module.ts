import { NgModule } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { provideRouter, RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { HomeModule } from "./home/home.module";



@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CoreModule,
      RouterModule,
      HomeModule
    ],
    bootstrap: [AppComponent], 
    providers:[provideHttpClient() , provideRouter(routes)]
  })
export class AppModule { }