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
import { TrashComponent } from './trash/trash.component';
import { SearchNoteComponent } from './search-note/search-note.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  {
    path: '', component: NavbarComponent,
    children: [
      { path: 'home', component: NotesAddComponent},
      { path: 'reminder', component:ReminderComponent},
      { path: 'label', component:LabelComponent},
      { path: 'archive', component:ArchiveComponent},
      { path: 'trash', component:TrashComponent},
      { path: 'search', component:SearchNoteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

