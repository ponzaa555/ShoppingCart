import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { HomeModule } from "./home/home.module";
import { ErrorInterceptor } from "./core/intercepture/error.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from "./core/intercepture/loading.interceptor";
import { JwtInterceptor } from "./core/intercepture/jwt.interceptor";



@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      CoreModule,
      RouterModule.forRoot(routes),
      HomeModule,
      HttpClientModule,
      NgxSpinnerModule.forRoot()
    ],
    bootstrap: [AppComponent], 
    providers:[
      {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor , multi:true},
      {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor , multi:true},
      {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor , multi:true},
      provideAnimations()
    ]
  })
export class AppModule { }