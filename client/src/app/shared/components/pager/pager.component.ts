import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
  standalone:false
})
export class PagerComponent implements OnInit {
  @Input() totalCount!:number;
  @Input() pageSize!:number;

  @Output() pageChanged = new EventEmitter<number>();

  constructor(){}

  ngOnInit(): void {
    
  }

  onPagerChange(event:any){
    // event.page is number
    this.pageChanged.emit(event.page);
  }
}
