import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

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

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_BASE_HREF } from '@angular/common';

/* Material File */
import { MaterialDesignModule } from './material-design/material-design.module';

import { MatFormFieldModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/** Pipe **/
import { SortPipePipe } from '../app/core/pipe/sort/sort-pipe.pipe';
import { SearchNotePipe } from './core/pipe/filter/search-note.pipe';
import { NotefilterPipe } from './core/pipe/noteFilter/notefilter.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,

        /** Form Validation **/
        FormsModule,
        ReactiveFormsModule,

        /** Material File **/
        MaterialDesignModule,

        MatFormFieldModule,
        ImageCropperModule,

        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
      ],
      providers: [{
        provide: APP_BASE_HREF, usevalue: "/"
      }],
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
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});