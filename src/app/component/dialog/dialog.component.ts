import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Note } from 'src/app/core/model/note/note';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title = new FormControl(this.data.title);
  description = new FormControl(this.data.description);
  /**
    * @Purpose : addNote
    **/
  addNotes: Note = new Note();
  setColor: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private noteService: NotesService, private dataService: DataService, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateNote(data) {
    
    var body = {
      "title": this.title.value,
      "description": this.description.value,
      "noteId": [data.id]//backend id
    }
    
    console.log('console for updateNote @@@@@@@@@@@@@@@@@=======================>', body);
    try {
      this.noteService.updateNote(body).subscribe(
        data => {
          this.snackbar.open('Note added successfully......!', 'Done...!', { duration: 3000 });
          console.log('Register infor ==========>', data);
        },
        error => {
          this.snackbar.open('Error while adding note......!', 'Error', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    setTimeout(() => this.dataService.getAllNote(), 100);
  }
}
