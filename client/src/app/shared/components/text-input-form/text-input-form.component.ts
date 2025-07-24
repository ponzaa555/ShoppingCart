import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input-form',
  standalone: false,
  templateUrl: './text-input-form.component.html',
  styleUrl: './text-input-form.component.scss',
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: TextInputFormComponent,
      multi:true
    }
  ]
})
export class TextInputFormComponent implements OnInit , ControlValueAccessor  {
  @Input() formControl!:FormControl;
  @Input() label! : string;
  @Input() type = 'text';
  constructor(){}
  writeValue(obj: any): void {
    // assgin value to form
    return
  }
  registerOnChange(fn: any): void {
    return
  }
  registerOnTouched(fn: any): void {
    return
  }
  setDisabledState?(isDisabled: boolean): void {
    return
  }

  ngOnInit(): void {
    
  }

}
