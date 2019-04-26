import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { Login1Component } from './component/login1/login1.component';
import { Login2Component } from './component/login2/login2.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'login1', component: Login1Component },
  { path: 'login2', component: Login2Component }
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
