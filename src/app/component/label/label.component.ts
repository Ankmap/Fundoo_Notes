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
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  
  labels: Label = new Label();

  id = localStorage.getItem('userId');
  constructor(private note: NotesService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.showLabel();
  }
  /**
   * @purpose : Add Label
   **/ 
  
  addLabel() {
    var body = {
      "label": this.labels.label,
      "isDeleted": false,
      "userId": this.id
    }
    console.log('Data after edit label', body);

    try {
      this.note.addLabel(body).subscribe(
        data => {
          console.log("Data ====>", data);
          this.snackbar.open('Label created successfully..', '', { duration: 3000 });
          console.log('Label created successfully..');
        },
        error => {
          console.log("Data ====>", error);
          this.snackbar.open('Error while creating lable..', '', { duration: 3000 });
          console.log('Error while creating lable..');
        }
      )
    } catch (err) {
      console.log("Error", err);
    }
  }

  /*
   * @Purpose  : Getting label data 
   */
  showLabel() {
    this.note.showNoteLabel()
      .subscribe((response: any) => {
        this.labels = response.data.details
        console.log("check showLabel=====>", response);
      }, (error) => {
      });
  }
}
