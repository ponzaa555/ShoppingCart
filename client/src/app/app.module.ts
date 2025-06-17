import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule(
    {
        declarations:[
            AppComponent
        ],
        imports:[
            BrowserModule,
            Router,
            TooltipModule.forRoot(),
            BrowserAnimationsModule
        ],
        providers:[],
        bootstrap:[AppComponent]
    }
)
export class AppModule { }