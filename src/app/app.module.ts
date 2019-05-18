import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../app/core/service/auth/auth.guard';
/**
 * @Purpose : Configure animations and FlexLayoutModule
 **/
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Components **/
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

/**
 * @Purpose : Material Required file
 **/
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';

/** Form Validation **/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentLifecycleComponent } from './component/component-lifecycle/component-lifecycle.component';
import { NoteListComponent } from './component/note-list/note-list.component';
import { IconComponent } from './component/icon/icon.component';
import { SortPipePipe } from './core/pipe/sort-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,

    /** Components **/
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotesAddComponent,
    NavbarComponent,
    ReminderComponent,
    LabelComponent,
    ArchiveComponent,
    TrashComponent,
    SearchNoteComponent,
    ComponentLifecycleComponent,
    NoteListComponent,
    IconComponent,
    SortPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    /** Angular material **/
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
