import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPage } from './signup/signup.page';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
];

@NgModule({
  declarations: [SignupPage, LoginPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
  ],
  exports: [SignupPage],
})
export class AuthModule {}
