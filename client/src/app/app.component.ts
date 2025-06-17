import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:false
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products:IProduct[] = [];
  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.http.get<IProduct[]>('https://localhost:7153/api/Product').subscribe((response:IProduct[]) => {
      console.log(response);
      this.products = response
    },error =>{
      console.log(error);
    });
  }
}
