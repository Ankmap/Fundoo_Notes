import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  label: any = {
    "labelName": " "
  }
  id = localStorage.getItem('token');
  constructor(private note: NotesService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }
  addLabel() {
    const label = this.label.labelName;
    console.log(" Label =====>", label);

    var body = {
      "label": "string",
      "isDeleted": true,
      "userId": "id"
    }
    console.log('Data after edit label', body);

    try {
      this.note.addLabel(body).subscribe(
        data => {
          console.log("Data ====>", data);
          this.label.labelName = null;
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

}
