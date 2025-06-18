import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  standalone:false
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(){}

  ngOnInit(): void {
    
  }
}
