import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  errors:string[] = [];

  constructor(private fb:FormBuilder , private accountService :AccountService , private router:Router){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      // inside this add form control
      displayName:[null ,[Validators.required]],
      email:[null , 
        [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')],
        [this.validateEmailNotTaken()]
      ],
      password:[null , Validators.required]
    });
  }
  onSubmite(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: (error) => {
        console.log(error),
        this.errors = error.errors
      }
    });
  }

  validateEmailNotTaken():AsyncValidatorFn{
    return control => {
      return timer(500).pipe(
        switchMap(()=> {
          if(!control.value){
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExist:true} : null;
            })
          );
        })
      );
    }
  }
}
