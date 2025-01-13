import { NgModule } from '@angular/core';
import { AuthRoutes } from './auth.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [AuthRoutes, CommonModule, ReactiveFormsModule],
})
export class AuthModule {}
