import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../env/env';
import { error } from 'console';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss',
  standalone:false
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl
  validationError!:any;
  constructor( private http:HttpClient){ }
  ngOnInit(): void {
    
  }
  get404Error(){
    this.http.get(this.baseUrl + 'Product/42').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUrl + 'Buggy/servererror').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }

  get400Error(){
    this.http.get(this.baseUrl + 'Buggy/badrequest').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }

  get404ValidationError(){
    this.http.get(this.baseUrl + 'Product/fourtytwo').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
      this.validationError = error .errors;
    })
  }
}
