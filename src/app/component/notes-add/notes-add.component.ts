/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - notes-add.component.html
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { DataService } from 'src/app/core/service/data/data.service';
import { DataService } from '../../core/service/data/data.service';

import { Note } from '../../core/model/note/note';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})

export class NotesAddComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * @Purpose : using @ViewChild to inject the plain HTML element of a component
  **/

  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;

  @Output() onChangePin = new EventEmitter;

  /* Pin Unpin Note */
  isPined: boolean = false;

  /* Delete Note */
  isDeleted: boolean = false;

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
  // title = new FormControl('')
  // description = new FormControl('')

  ngOnInit() {
  }

  /**
   * @Purpose : Notecard open
   **/
   notecard: boolean = true;

   listNote: boolean = true;

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
  addList() {
    this.listNote = !(this.listNote);
  }

  /**
   * @Purpose : Add Note
   **/
  addNote() {
    this.notecard = !(this.notecard);
    this.addNotes.color = this.setColor;
    this.addNotes.reminder = this.reminder;
    let title1 = this.title.nativeElement.innerHTML;
    let description1 = this.description.nativeElement.innerHTML;

    var body = {
      // "title": this.addNotes.title,
      // "description": this.addNotes.description,
      "title": title1,
      "description": description1,
      "color": this.addNotes.color,
      "reminder": this.addNotes.reminder,
      "isPined": this.isPined,
      "isDeleted": this.isDeleted,
    }
    console.log('console for Add Note ================>', body);

    // if ((title1 == " ") && (description1 == " ")) {
    if (title1 == " ") {
      this.snackbar.open('Please Provide data......!', '', { duration: 3000 });
      return false;
    }
    try {
      this.NoteAddService.addNote(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Note added successfully......!', 'Done...!', { duration: 3000 });
            console.log('Note added successfully ==========>', data);
            this.dataService.getAllNote();
            this.dataService.changeMessage('')
          },
          error => {
            this.snackbar.open('Error while adding note......!', 'Error', { duration: 3000 });
            console.log("Error something wrong: ", error)
          });

      /* Null title, description, and color null after add note */
      this.addNotes.title = null;
      this.addNotes.description = null;
      this.setColor = "#FFFFFF";

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
    this.isPined = $event
    console.log('onPinChange while add note ====>', this.isPined);

  }

  /**
   * @description :  opening the New list card
   */
  listCardOpen() {
    this.listNote = false;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}









