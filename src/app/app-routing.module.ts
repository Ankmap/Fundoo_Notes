import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Parent Component*/
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NavbarComponent } from './component/navbar/navbar.component';

/*Child Components*/
import { NotesAddComponent } from './component/notes-add/notes-add.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { LabelComponent } from './component/label/label.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { SearchNoteComponent } from './component/search-note/search-note.component';

/*AuthGuard service*/
import { AuthGuard } from './core/service/auth/auth.guard'

/*Component lifecycle hook*/
import { ComponentLifecycleComponent } from './component/component-lifecycle/component-lifecycle.component';

/*Routing path set*/ 
const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {
    /*Apply AuthGuard*/ 
    path: '', component: NavbarComponent,canActivate: [AuthGuard],
    /*Routing path set for child component*/ 
    children: [
      {path: 'home', component: NotesAddComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'label', component: LabelComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'search', component: SearchNoteComponent }
    ]
  },
  /*Componnet Lifecycle Demo path set*/ 
  { path: 'lifecycle', component: ComponentLifecycleComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
    /*Tracing*/
    { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

