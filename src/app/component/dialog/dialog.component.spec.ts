import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

/** Parent Components **/
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { NavbarComponent } from '../navbar/navbar.component';

/** Child Components **/
import { NotesAddComponent } from '../notes-add/notes-add.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelComponent } from '../label/label.component';
import { SearchNoteComponent } from '../search-note/search-note.component';
import { ComponentLifecycleComponent } from '../component-lifecycle/component-lifecycle.component';
import { NoteListComponent } from '../note-list/note-list.component';
import { IconComponent } from '../icon/icon.component';
import { TrashComponent } from '../trash/trash.component';
import { ImageCropComponent } from '../image-crop/image-crop.component';
import { GetlabelComponent } from '../getlabel/getlabel.component';
import { PinComponent } from '../pin/pin.component';

import { FlexLayoutModule } from '@angular/flex-layout';

/* Material File */
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { RouterTestingModule } from '@angular/router/testing';

/** Pipe **/
import { SortPipe } from '../../core/pipe/sort/sort.pipe';
import { SearchNotePipe } from '../../core/pipe/filter/search-note.pipe';
import { NotefilterPipe } from '../../core/pipe/noteFilter/notefilter.pipe';
import { ArchiveComponent } from '../archive/archive.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { QuestionanswerComponent } from '../questionanswer/questionanswer.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArchiveComponent,
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
        QuestionanswerComponent,
        PinComponent,
        SearchNotePipe,
        SortPipe,
        NotefilterPipe,
      ],
      imports: [
        RouterTestingModule,
        /** Material File **/
        MaterialDesignModule,
        FlexLayoutModule,
      ],
      providers: [
        /** Pipes **/
        SearchNotePipe,
        SortPipe,
        NotefilterPipe,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
