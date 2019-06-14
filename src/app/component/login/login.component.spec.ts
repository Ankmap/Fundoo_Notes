import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { IconComponent } from '../icon/icon.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ArchiveComponent } from '../archive/archive.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotesAddComponent } from '../notes-add/notes-add.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelComponent } from '../label/label.component';
import { SearchNoteComponent } from '../search-note/search-note.component';
import { ComponentLifecycleComponent } from '../component-lifecycle/component-lifecycle.component';
import { NoteListComponent } from '../note-list/note-list.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DialogComponent } from '../dialog/dialog.component';
import { TrashComponent } from '../trash/trash.component';
import { ImageCropComponent } from '../image-crop/image-crop.component';
import { GetlabelComponent } from '../getlabel/getlabel.component';
import { PinComponent } from '../pin/pin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipe } from '../../core/pipe/filter/filter.pipe';
import { SortPipe } from '../../core/pipe/sort/sort.pipe';
import { NotefilterPipe } from 'src/app/core/pipe/noteFilter/notefilter.pipe';
import { QuestionanswerComponent } from '../questionanswer/questionanswer.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        PinComponent,
        QuestionanswerComponent,
        FilterPipe,
        SortPipe,
        NotefilterPipe,
      ],
      imports: [
        RouterTestingModule,
        /** Material File **/
        MaterialDesignModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        /** Pipes **/
        FilterPipe,
        SortPipe,
        NotefilterPipe,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', () => {
    expect(component.register.email).toEqual('Aabc@gmail.com');
    expect(component.register.email).toEqual('@abc.ABC.com');
    expect(component.register.email).toEqual('AbC.23@abc.com');
    expect(component.register.email).toEqual('');
    expect(component.register.password).toEqual('');

    expect(component.register.email).toBeFalsy();
    expect(component.register.password).toBeFalsy();
  });

  it('should be valid', () => {
    expect(component.register.email).toEqual('abc@gmail.com');
    expect(component.register.password).toEqual('abcXYZ123');
    expect(component.register.password).toEqual('@abc123');

    expect(component.register.email).toBeTruthy();
    expect(component.register.password).toBeTruthy();
  });
  
});