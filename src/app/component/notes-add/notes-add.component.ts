/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - notes-add.component.html
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/core/service/data/data.service';


@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent implements OnInit {

  constructor(private NoteAddService: NotesService , private snackbar: MatSnackBar,
    private updateNote : DataService) { }

  private notecard: boolean = true;
  title = new FormControl('')
  description = new FormControl('')
  ngOnInit() {
  }

  /**
   * @Purpose : Notecard open
   **/ 
  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  /**
   * @Purpose : addNote
   **/
  addNote() {
    this.notecard = !(this.notecard);
    var body = {
      "title": this.title.value,
      "description": this.description.value,
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
    setTimeout(() =>this.updateNote.getAllNote(),3000);
  }
}









