import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlabelComponent } from './getlabel.component';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ArchiveComponent } from '../archive/archive.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
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
import { PinComponent } from '../pin/pin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchNotePipe } from '../../core/pipe/filter/search-note.pipe';
import { SortPipePipe } from '../../core/pipe/sort/sort-pipe.pipe';
import { NotefilterPipe } from '../../core/pipe/noteFilter/notefilter.pipe';
import {MatDialogModule} from '@angular/material/dialog';
describe('GetlabelComponent', () => {
  let component: GetlabelComponent;
  let fixture: ComponentFixture<GetlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ArchiveComponent,
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
        SearchNotePipe,
        SortPipePipe,
        NotefilterPipe,
      ],
      imports: [
        RouterTestingModule,
        /** Material File **/
        MaterialDesignModule,

        MatDialogModule,
        FlexLayoutModule,
      ],
      providers: [{
        /** Pipes **/
        SearchNotePipe,
        SortPipePipe,
        NotefilterPipe,
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
