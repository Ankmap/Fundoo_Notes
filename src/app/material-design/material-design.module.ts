import { NgModule } from '@angular/core';
/* Editor */
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
/**
 * @Purpose : Material Required file 
 **/
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule,MatNativeDateModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports:[
    /** Angular material **/
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatChipsModule,
    ImageCropperModule,

    /* Editor */
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  exports:[
    /** Angular material **/
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatChipsModule,
    ImageCropperModule,
    /* Editor */
    FroalaEditorModule,
    FroalaViewModule
  ]
})
 
export class MaterialDesignModule { }