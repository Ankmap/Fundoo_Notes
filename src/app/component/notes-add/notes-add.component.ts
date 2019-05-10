import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent implements OnInit {

  constructor(private NoteAddService: NotesService , private snackbar: MatSnackBar) { }

  private notecard: boolean = true;
  title = new FormControl('')
  description = new FormControl('')
  ngOnInit() {
  }

  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  addNote() {
    this.notecard = !(this.notecard);
    var body = {
      "title": this.title.value,
      "description": this.description.value,
      // "UserId" : ,
    }
    console.log('console for this.register @@@@@@@@@@@@@@@@@=======================>', body);
    try {
      
        this.NoteAddService.addNote(body).subscribe(
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
  }
}









