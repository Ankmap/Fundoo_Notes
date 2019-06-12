import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NavbarComponent } from './component/navbar/navbar.component';
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
import { QuestionanswerComponent } from './component/questionanswer/questionanswer.component';
import { SortPipePipe } from '../app/core/pipe/sort/sort-pipe.pipe';
import { SearchNotePipe } from './core/pipe/filter/search-note.pipe';
import { NotefilterPipe } from './core/pipe/noteFilter/notefilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
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
    SearchNotePipe,
    SortPipePipe,
    NotefilterPipe,
    QuestionanswerComponent,
  ],
  imports: [
    MaterialDesignModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
