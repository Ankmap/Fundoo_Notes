/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - notes-add.component.html
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/core/service/data/data.service';
import { Note } from '../../core/model/note/note';
import { Label } from 'src/app/core/model/label/label';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent implements OnInit {
  pinUnpin: any;
  private isPin: boolean = false;
  /**
   * @Purpose : Inject the MatSnackBar, NotesService, 
   *            MatDialog, DataService in the constructor
   **/
  constructor(private NoteAddService: NotesService, private snackbar: MatSnackBar,
    private updateNote: DataService) { }

  /**
  * @Purpose : Note Model
  **/
  addNotes: Note = new Note();

  /* Binding the title and description*/
  title = new FormControl('')
  description = new FormControl('')

  ngOnInit() {
  }

  /**
   * @Purpose : Notecard open
   **/
  private notecard: boolean = true;

  private listNote: boolean = false
  /**
   * @Purpose : For new Notecard open
   **/
  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  /**
   * @Purpose : for new newList open
   **/
  newListOpen() {
    this.listNote = true;
  }

  /**
   * @Purpose :CardColor
   **/
  setColor: any;
  receivecolor($event) {
    this.setColor = $event
    console.log("color", this.setColor);
  }

  //
  reminder: any;
  receiveReminder($event) {
    this.reminder = $event
    console.log("reminder", this.reminder);

  }
  /**
   * @Purpose : Add Note
   **/
  addNote() {
    this.notecard = !(this.notecard);
    this.addNotes.color = this.setColor;
    this.addNotes.reminder = this.reminder;
    var body = {
      "title": this.addNotes.title,
      "description": this.addNotes.description,
      "color": this.addNotes.color,
      "reminder": this.addNotes.reminder,
      "isPined" : this.isPin
    }
    console.log('console for addNote ================>', body);
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

      this.addNotes.title = null;
      this.addNotes.description = null;
      this.addNotes.color = null;

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.updateNote.getAllNote(), 100);
  }

  //pin()
 
  onPinChange($event){

    this.isPin = $event
  }
}









