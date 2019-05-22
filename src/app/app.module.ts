import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * @Purpose : Configure animations and FlexLayoutModule, AuthGuard, HttpClientModule
 **/
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../app/core/service/auth/auth.guard';

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
import { SearchNoteComponent } from './component/search-note/search-note.component';
import { ComponentLifecycleComponent } from './component/component-lifecycle/component-lifecycle.component';
import { NoteListComponent } from './component/note-list/note-list.component';
import { IconComponent } from './component/icon/icon.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';

/**
 * @Purpose : Pipe
 **/
import { SortPipePipe } from '../app/core/pipe/sort/sort-pipe.pipe';
import { SearchNotePipe } from './core/pipe/filter/search-note.pipe';

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
import {MatTooltipModule} from '@angular/material/tooltip';

/** Form Validation **/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

    /** Parent Components **/
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    
    /** Child Components **/
    NavbarComponent,
    NotesAddComponent,
    ReminderComponent,
    LabelComponent,
    ArchiveComponent,
    SearchNoteComponent,
    ComponentLifecycleComponent,
    NoteListComponent,
    IconComponent,

    /** Pipes **/
    SearchNotePipe,
    SortPipePipe,
    CollaboratorComponent
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
    MatDialogModule,
    MatTooltipModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
