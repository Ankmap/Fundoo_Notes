// import { TestBed, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';
// import { FormsModule } from '@angular/forms';


// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         FormsModule
//       ],
//       declarations: [
//         AppComponent,
//       ],
//     }).compileComponents();
//   }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

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

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

import { MaterialDesignModule } from './material-design/material-design.module';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { SortPipe } from '../app/core/pipe/sort/sort.pipe';
import { SearchNotePipe } from './core/pipe/filter/search-note.pipe';
import { NotefilterPipe } from './core/pipe/noteFilter/notefilter.pipe';
import { QuestionanswerComponent } from './component/questionanswer/questionanswer.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        RouterTestingModule,
        MaterialDesignModule,
        MatDialogModule,
      ],
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
        QuestionanswerComponent
      ],
      providers : [SearchNotePipe,SortPipe,NotefilterPipe,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'fundooNotes'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('fundooNotes');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to fundooNotes!');
  // });
});