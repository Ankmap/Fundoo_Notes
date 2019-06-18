import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCartComponent } from './open-cart.component';
import { CartmainComponent } from '../cartmain/cartmain.component';

import { CartComponent } from '../cart/cart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';

import { ArchiveComponent } from '../archive/archive.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotesAddComponent } from '../notes-add/notes-add.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelComponent } from '../label/label.component';
import { SearchNoteComponent } from '../search-note/search-note.component';
import { ComponentLifecycleComponent } from '../component-lifecycle/component-lifecycle.component';
import { NoteListComponent } from '../note-list/note-list.component';
import { IconComponent } from '../icon/icon.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DialogComponent } from '../dialog/dialog.component';
import { TrashComponent } from '../trash/trash.component';
import { ImageCropComponent } from '../image-crop/image-crop.component';
import { GetlabelComponent } from '../getlabel/getlabel.component';
import { PinComponent } from '../pin/pin.component';

/* Material File */
import { MaterialDesignModule } from '../../material-design/material-design.module';

/** Pipe **/
import { SortPipe } from '../../core/pipe/sort/sort.pipe';
import { FilterPipe } from '../../core/pipe/filter/filter.pipe';
import { NotefilterPipe } from '../../core/pipe/noteFilter/notefilter.pipe';
import { QuestionanswerComponent } from '../questionanswer/questionanswer.component';
describe('OpenCartComponent', () => {
  let component: OpenCartComponent;
  let fixture: ComponentFixture<OpenCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ArchiveComponent,
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
        CartComponent,
        OpenCartComponent,
        CartmainComponent,
        FilterPipe,
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
        FilterPipe,
        SortPipe,
        NotefilterPipe,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
