/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - label.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Label } from '../../core/model/label/label'
import { MatDialogRef } from "@angular/material";
import { NavbarComponent } from '../navbar/navbar.component'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  /* Label Model*/
  labels: Label = new Label();
  private labelList = []

  /* Get Id from localstorage*/
  id = localStorage.getItem('userId');

  changeText: boolean;

  constructor(
    private note: NotesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<NavbarComponent>
  ) {
    this.changeText = false;
  }

  ngOnInit() {
    /* Show label*/
    this.showLabel();
  }

  /**
   * @purpose : Add Label
   **/
  done() {
    var body = {
      "label": this.labels.label,
      "isDeleted": false,
      "userId": this.id
    }
    const label = this.labels.label
    if (label == " ") {
      this.dialogRef.close();
      return false;
    }
    console.log('Data after edit label', body);
    try {
      this.note.addLabel(body).pipe(takeUntil(this.destroy$))
        .subscribe(
          (response) => {
            console.log("Response ====>", response);
            this.showLabel();
          },
          error => {
            console.log("Data ====>", error);
          }
        )
    } catch (err) {
      console.log("Error", err);
    }
  }

  /**
   * @Purpose  : Getting label data 
   */
  showLabel() {
    this.note.showNoteLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.labels = response.data.details
        this.labelList = [];
        console.log("check showLabel=====>", response);
      }, (error) => {
        console.log("Data ====>", error);
      });
  }

  /**
   * @Purpose : ShowLabel in sideNavbar
   **/
  add() {
    this.done();
    this.dialogRef.close();
  }

  // deleteLabel
  deleteLabel(labelId) {
    this.note.deleteNoteLabel(labelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log("deleteLabel response ===>", response);
        this.showLabel();
      }, (error) => {
        console.log("deleteLabel error ===>", error);
      });
  }
}
