import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paggin-header',
  standalone:false,
  templateUrl: './paggin-header.component.html',
  styleUrl: './paggin-header.component.scss'
})
export class PagginHeaderComponent implements OnInit {
  @Input() pageNumber!:number;
  @Input() pageSize!:number;
  @Input() totalCount!:number;
  constructor(){}

  ngOnInit(): void {
    
  }
}
