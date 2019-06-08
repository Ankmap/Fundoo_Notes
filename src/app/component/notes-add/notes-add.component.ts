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

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})

export class NotesAddComponent implements OnInit {
  @Output() onChangePin = new EventEmitter;
  /* Pin Unpin Note */
  isPined: boolean = false;
  // isPined: any
  isDel :boolean =false;
  /**
  * @Purpose : Note Model
  **/
  addNotes: Note = new Note();

  /**
   * @Purpose : Inject the MatSnackBar, NotesService, 
   *            MatDialog, DataService in the constructor
   **/
  constructor(
    private NoteAddService: NotesService,
    private snackbar: MatSnackBar,
    private dataService: DataService
  ) { }

  /* Binding the title and description */
  title = new FormControl('')
  description = new FormControl('')

  ngOnInit() {
  }

  /**
   * @Purpose : Notecard open
   **/
  private notecard: boolean = true;

  private listNote:boolean = true;

  /**
   * @Purpose : For new Notecard open
   **/
  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  /**
   * @Purpose :Card Color change
   **/
  setColor: any;
  receivecolor($event) {
    this.setColor = $event
    console.log("color", this.setColor);
  }

  /**
   * @Purpose :Card reminder change
   **/
  reminder: any;
  receiveReminder($event) {
    this.reminder = $event
    console.log("reminder", this.reminder);

  }

  /**
   * @Purpose : Add List
   **/ 
  addList(){
    this.listNote = !(this.listNote);
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
      "isPined": this.isPined,
      "isDeleted": this.isDel,
    }
    console.log('console for Add Note ================>', body);
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

      /* Null title, description, and color null after add note */
      this.addNotes.title = null;
      this.addNotes.description = null;
      // this.setColor = null;
      // this.addNotes.color = null;

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 100);
  }

  /**
   * @Purpose : Pin Unpin Note
   **/
  pinUpdate($event) {
    console.log('this.isPinedthis.isPinedthis.isPined');
    this.isPined = $event
    this.onChangePin.emit(this.isPined);
    console.log('onPinChange ====>',this.isPined);
    
  }

  /**
   * @description :  opening the New list card
   */
  listCardOpen() {
    this.listNote = false;
  }
  // showCheckBox(event) {
  //   this.listCardOpen();
  // }

}









