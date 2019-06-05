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
import { DataService } from 'src/app/core/service/data/data.service';

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

  public model: any = {
    "labelName": "",
    "newName": ""
  }

  /* Get Id from localstorage*/
  id = localStorage.getItem('userId');

  /* Open and Close editIcon*/
  private labelId

  /* Mouse Over for delete and label icon */
  changeText: boolean;

  constructor(
    private note: NotesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dataService: DataService,
    private dialogRef: MatDialogRef<NavbarComponent>
  ) {
    /* Mouse Over for delete and label icon */
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
    console.log('Data for edit label', body);
    try {
      this.note.addLabel(body).pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          console.log("Response ====>", response);
          this.showLabel();
          /* Add */
          this.dataService.changeMessage('')
        },
          error => {
            console.log("Data add label ====>", error);
          }
        )
    } catch (err) {
      console.log("Data add label Error ====>", err);
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
        console.log("check show Label=====>", response);
      }, (error) => {
        console.log("Data show Label ====>", error);
      });
  }

  /**
   * @Purpose : ShowLabel in sideNavbar
   **/
  add() {
    this.done();
    this.dialogRef.close();
  }

  /**
   * @Purpose  : Clear Label 
   */
  clear() {
    this.labels.label = null;
  }

  /**
   * @Purpose  : Delete Label 
   */
  deleteLabel(labelId) {
    this.note.deleteNoteLabel(labelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log("Delete Label response ===>", response);
        this.showLabel();
      }, (error) => {
        console.log("Delete Label error ===>", error);
      });
  }

  /**
   * @Purpose  : Edit Label 
   */
  editLabel(labelId) {
    let label = this.model.newName;
    let body = {
      "label": label
    }
    this.note.updateNoteLabel(labelId, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log(" Edit Label response ===>", response);
        this.dialogRef.close();
      }, (error) => {
        console.log("Edit Label error ===>", error);
      });
  }

  /**
  @Purpose : Open and Close editIcon
  **/
  editIcon(id, labelName) {
    this.labelId = [];
    this.labelId = id;
    this.model.newName = labelName
  }

}
