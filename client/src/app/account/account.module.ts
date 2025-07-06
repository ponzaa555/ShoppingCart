import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutongModule } from './account-routong.module';
import { SharedModule } from '../shared/share.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutongModule,
    SharedModule
  ]
})
export class AccountModule { }
