import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLifecycleComponent } from './component-lifecycle.component';

import { TrashComponent } from '../trash/trash.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';
import { IconComponent } from '../icon/icon.component';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ArchiveComponent } from '../archive/archive.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { NotesAddComponent } from '../notes-add/notes-add.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelComponent } from '../label/label.component';
import { SearchNoteComponent } from '../search-note/search-note.component';
import { NoteListComponent } from '../note-list/note-list.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ImageCropComponent } from '../image-crop/image-crop.component';
import { GetlabelComponent } from '../getlabel/getlabel.component';
import { PinComponent } from '../pin/pin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchNotePipe } from '../../core/pipe/filter/search-note.pipe';
import { SortPipe } from '../../core/pipe/sort/sort.pipe';
import { NotefilterPipe } from '../../core/pipe/noteFilter/notefilter.pipe';
import { QuestionanswerComponent } from '../questionanswer/questionanswer.component';

describe('ComponentLifecycleComponent', () => {
  let component: ComponentLifecycleComponent;
  let fixture: ComponentFixture<ComponentLifecycleComponent>;

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
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
