/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - note-list.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../core/model/note/note'
import { DataService } from '../../core/service/data/data.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  /* Note Model*/ 
  notes: Note[] = [];
  message: string;

  /* Grid View*/ 
  direction: String = "row";
  wrap : string = "wrap";
  view: any;
  
  destory$: Subject<boolean> = new Subject<boolean>();

  /**
   * @Purpose : Pass data from the parent component class to the child component class
   *  use the @Input decorator. 
   **/
  @Input() note;
  @Input() searchItem;
  /**
    * @Purpose : To emit an event from the child component class to the parent component class,
    *   use EventEmitter with the @Output() decorator. 
    **/
  @Output() anyChanges = new EventEmitter();

  /* SetColor*/ 
  setColor: any;

  /* Delete Note*/ 
  deleteNote1: any;
 
  /**
   * @Purpose : inject the DataService, MatDialog, NotesService, MatSnackBar in the constructor
   **/
  constructor(
    private data: DataService, 
    public dialog: MatDialog, 
    private noteService: NotesService, 
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
    /* Get all Note */ 
    this.data.allNote.pipe(takeUntil(this.destory$))
      .subscribe(data => this.notes = data);

      /* Current message view */ 
    this.data.currentMessageView.pipe(takeUntil(this.destory$))
      .subscribe(message => {
        this.view = message
      })

    /* Grid View*/ 
    this.data.getView().subscribe((response) => {
      this.view = response;
      this.direction = this.view.data
    });
  }

  /**
   * @Purpose : Update color
   **/ 
  updateColor(data, $event) {
    this.setColor = $event;
    var colorUpdate = {
      "color": this.setColor,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("colorUpdate =====>", colorUpdate);
    try {
      this.noteService.cardColorChange(colorUpdate).subscribe(
        data => {
          this.snackbar.open('color update successfully......!', 'Done...!', { duration: 3000 });
          console.log('Register infor ==========>', data);
        },
        error => {
          this.snackbar.open('Error while update note color ......!', 'Error', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/ 
    setTimeout(() => this.data.getAllNote(), 100);
  }
  

  /**
   * @Purpose : Delete Note
   **/
  deleteNote(data, $event) {
    this.deleteNote1 = $event;
    var deleteNote = {
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("DeleteNote =======>", deleteNote);
    try {
      this.noteService.deleteNote(deleteNote).subscribe(
        data => {
          this.snackbar.open('Note deleted successfully......!', 'Done...!', { duration: 3000 });
          console.log('Register infor ==========>', data);
        },
        error => {
          this.snackbar.open('Error while update note color ......!', 'Error', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/ 
    setTimeout(() => this.data.getAllNote(), 100);
  }

  /**
   * @Purpose : Open dialog nad edit it
   **/
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      height: '200px',
      data: {
        'title': data.title,
        'description': data.description,
        'id': data.id,
      }
    });
    /* Close the dialog*/
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }

}



