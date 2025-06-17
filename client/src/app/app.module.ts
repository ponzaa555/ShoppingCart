import { NgModule } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



@NgModule({
    declarations: [AppComponent,NavBarComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent],
    providers:[provideHttpClient()]
  })
export class AppModule { }