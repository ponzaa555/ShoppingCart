import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: false,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements OnInit {
  @Input() type = "text";
  @Input() label = "";
  @Input() placeholder = " ";

  constructor(@Self() public controlDir: NgControl){
  }

  ngOnInit(): void {
    this.controlDir.valueAccessor = this;
  }
  
  writeValue(obj:any):void {

  }

  registerOnChange(fn:any):void {

  }
  registerOnTouched(fn: any):void{

  }
  
  get control():FormControl{
    return this.controlDir.control as FormControl;
  }
}
