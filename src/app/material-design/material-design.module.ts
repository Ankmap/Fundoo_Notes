import { NgModule } from '@angular/core';

/* Editor */
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
/**
 * @Purpose : Material Required file 
 **/
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatSlideToggleModule, MatSliderModule, MatProgressSpinnerModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  // imports:[
  //   BrowserModule,
  //   AppRoutingModule,
  //   BrowserAnimationsModule,
  //   CommonModule,
  //   FlexLayoutModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   HttpClientModule,
  //   /** Angular material **/
  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatSidenavModule,
  //   MatIconModule,
  //   MatListModule,
  //   MatCardModule,
  //   MatMenuModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatRadioModule,
  //   MatButtonToggleModule,
  //   MatSnackBarModule,
  //   MatAutocompleteModule,
  //   MatDialogModule,
  //   MatTooltipModule,
  //   MatDatepickerModule,
  //   MatSelectModule,
  //   MatCheckboxModule,
  //   MatNativeDateModule,
  //   MatChipsModule,
  //   ImageCropperModule,

  //   /* Editor */
  //   FroalaEditorModule.forRoot(), 
  //   FroalaViewModule.forRoot()
  // ],
  // exports:[
  //   BrowserModule,
  //   AppRoutingModule,
  //   BrowserAnimationsModule,
  //   CommonModule,
  //   FlexLayoutModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   HttpClientModule,
  //   /** Angular material **/
  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatSidenavModule,
  //   MatIconModule,
  //   MatListModule,
  //   MatCardModule,
  //   MatMenuModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatRadioModule,
  //   MatButtonToggleModule,
  //   MatSnackBarModule,
  //   MatAutocompleteModule,
  //   MatDialogModule,
  //   MatTooltipModule,
  //   MatDatepickerModule,
  //   MatSelectModule,
  //   MatCheckboxModule,
  //   MatNativeDateModule,
  //   MatChipsModule,
  //   ImageCropperModule,
  //   /* Editor */
  //   FroalaEditorModule,
  //   FroalaViewModule
  // ]
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    ImageCropperModule,
    DragDropModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],

  exports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    ImageCropperModule,
    FroalaEditorModule,
    FroalaViewModule
  ]


})

export class MaterialDesignModule { }