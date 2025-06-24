import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { provideRouter, RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { HomeModule } from "./home/home.module";
import { ErrorInterceptor } from "./core/intercepture/error.interceptor";



@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CoreModule,
      RouterModule.forRoot(routes),
      HomeModule,
      HttpClientModule
    ],
    bootstrap: [AppComponent], 
    providers:[
      {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor , multi:true}
    ]
  })
export class AppModule { }