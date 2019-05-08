import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Parent Component*/
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

/*Child Components*/
import { NotesAddComponent } from './component/notes-add/notes-add.component';
import { CardComponent } from './component/card/card.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'notesAdd', component: NotesAddComponent},
      { path: 'card', component:CardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

