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
import { Note } from '../../core/model/note/note';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent implements OnInit {

  /**
   * @Purpose : Inject the MatSnackBar, NotesService, 
   *            MatDialog, DataService in the constructor
   **/
  constructor(private NoteAddService: NotesService, private snackbar: MatSnackBar,
    private updateNote: DataService) { }

  /**
  * @Purpose : addNote
  **/
  addNotes: Note = new Note();
  title = new FormControl('')
  description = new FormControl('')

  ngOnInit() {
  }

  /**
   * @Purpose : Notecard open
   **/
  private notecard: boolean = true;

  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  /**
   * @Purpose :CardColor
   **/
  setColor: any;

  receivecolor($event) {
    this.setColor = $event
    console.log("color", this.setColor);
  }

  /**
   * @Purpose : addNote
   **/
  addNote() {
    this.notecard = !(this.notecard);
    this.addNotes.color = this.setColor;
    var body = {
      "title": this.addNotes.title,
      "description": this.addNotes.description,
      "color": this.addNotes.color
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
    setTimeout(() => this.updateNote.getAllNote(), 100);
  }
}









