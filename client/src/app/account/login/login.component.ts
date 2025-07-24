import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  emailControl! : FormControl
  passwordControl! : FormControl
  returnUrl!:string;
  constructor(private accountService:AccountService , private router : Router,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop'
    this.createLoginForm();
    this.emailControl = this.loginForm.get('email') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email : new FormControl('' , [Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      password: new FormControl('' ,[ Validators.required , Validators.minLength(8)])
    });
  }

  onSubmite(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: error => console.log(error)
    })
  }
}
