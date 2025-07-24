import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutongModule } from './account-routong.module';
import { SharedModule } from '../shared/share.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutongModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class AccountModule { }
