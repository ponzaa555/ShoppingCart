import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone:false
})
export class NavBarComponent implements OnInit {
  
  /**
   *
   */
  constructor(private http : HttpClient) {  
  }
  ngOnInit(){
      
  }
}
