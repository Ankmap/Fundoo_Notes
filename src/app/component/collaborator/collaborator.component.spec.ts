import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorComponent } from './collaborator.component';

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
import { DialogComponent } from '../dialog/dialog.component';
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
import { FilterPipe } from '../../core/pipe/filter/filter.pipe';
import { NotefilterPipe } from '../../core/pipe/noteFilter/notefilter.pipe';
import { ArchiveComponent } from '../archive/archive.component';
import { QuestionanswerComponent } from '../questionanswer/questionanswer.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OpenCartComponent } from '../open-cart/open-cart.component';
import { CartmainComponent } from '../cartmain/cartmain.component';
import { CartComponent } from '../cart/cart.component';

describe('CollaboratorComponent', () => {
  let component: CollaboratorComponent;
  let fixture: ComponentFixture<CollaboratorComponent>;

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
        FilterPipe,
        SortPipe,
        NotefilterPipe,
        CartComponent,
        CartmainComponent,
        OpenCartComponent
      ],
      imports: [
        RouterTestingModule,
        /** Material File **/
        MaterialDesignModule,
        FlexLayoutModule,
      ],
      providers: [
        /** Pipes **/
        FilterPipe,
        SortPipe,
        NotefilterPipe,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
