import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** Material File **/ 
import { MaterialDesignModule } from './material-design/material-design.module';

/**
 * @Purpose : Configure animations and FlexLayoutModule, AuthGuard, HttpClientModule
 **/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../app/core/service/auth/auth.guard';

/** Parent Components **/
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NavbarComponent } from './component/navbar/navbar.component';

/** Child Components **/
import { NotesAddComponent } from './component/notes-add/notes-add.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { LabelComponent } from './component/label/label.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { SearchNoteComponent } from './component/search-note/search-note.component';
import { ComponentLifecycleComponent } from './component/component-lifecycle/component-lifecycle.component';
import { NoteListComponent } from './component/note-list/note-list.component';
import { IconComponent } from './component/icon/icon.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { TrashComponent } from './component/trash/trash.component';
import { ImageCropComponent } from './component/image-crop/image-crop.component';
import { GetlabelComponent } from './component/getlabel/getlabel.component';
import { PinComponent } from './component/pin/pin.component';

/** Pipe **/
import { SortPipePipe } from '../app/core/pipe/sort/sort-pipe.pipe';
import { SearchNotePipe } from './core/pipe/filter/search-note.pipe';
import { NotefilterPipe } from './core/pipe/noteFilter/notefilter.pipe';

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
    CollaboratorComponent,
    DialogComponent,
    TrashComponent,
    ImageCropComponent,
    GetlabelComponent,
    PinComponent,

    /** Pipes **/
    SearchNotePipe,
    SortPipePipe,
    NotefilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    /** Form Validation **/ 
    FormsModule,
    ReactiveFormsModule,
    
    /** Material File **/ 
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
