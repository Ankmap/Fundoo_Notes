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
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {

  /* Note Model*/
  notes: Note[] = [];
  message: string;

  /* Grid View*/
  direction: String = "row";
  wrap: string = "wrap";
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

  /* Archive Note */
  isArchived = true;
  archiveNote1: any

  /* Reminder Update*/
  setReminder: any;

  /* Trash Note*/
  trashNote1: any;
  newNotes: Note[];

  /* Add Note to Label*/
  labelId: any;
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
    this.getNote();

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

  /* Get all Note */
  getNote() {
    this.data.allNote.pipe(takeUntil(this.destory$)).subscribe(
      data => {
        this.notes = data
        this.notes = this.notes.filter(function (el) {
          return (el.isArchived === false && el.isDeleted === false);
        });
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
   * @Purpose : Trash Note
   **/
  private isDeleted: false;
  trashNote(data, $event) {
    this.trashNote1 = $event;
    var trashNote = {
      "isDeleted": !this.isDeleted,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("DeleteNote =======>", trashNote);
    try {
      this.noteService.trashNotes(trashNote).subscribe(
        data => {
          this.snackbar.open('Note saved in trash successfully......!', 'Done...!', { duration: 3000 });
          console.log('Note saved in trash successfully......!', data);
        },
        error => {
          this.snackbar.open('Error while trash note  ......!', 'Error', { duration: 3000 });
          console.log("Error while trash note ====> ", error)
        });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 100);
  }

  /**
   * @Purpose : Open dialog and edit it
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

  /**
   * @Purpose : Archive Note
   **/
  archiveNote(data, $event) {
    this.archiveNote1 = $event;
    var archiveNote = {
      "isArchived": this.isArchived,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log('Archive Note =====>', archiveNote);

    try {
      this.noteService.archiveNote(archiveNote).subscribe(
        data => {
          this.snackbar.open(' Note archive ', ' Undo ', { duration: 1000 });
          console.log('Archive Note Successfully....!', data);
        },
        error => {
          this.snackbar.open(' Note unarchive ', ' Undo ', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });
    }
    catch (error) {
      this.snackbar.open('Error while archive note', "error", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 100);
  }

  /**
   * @Purpose : Update Reminder
   **/
  updateReminder(data, $event) {
    this.setReminder = $event;
    var reminderUpdate = {
      "reminder": this.setReminder,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("colorUpdate =====>", reminderUpdate);
    try {
      this.noteService.addUpdateReminderNotes(reminderUpdate).subscribe(
        data => {
          this.snackbar.open('Reminder update successfully......!', 'Done...!', { duration: 3000 });
          console.log('Register infor ==========>', data);
        },
        error => {
          this.snackbar.open('Error while update note reminder ......!', 'Error', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 100);
  }

  /**
   * @Purpose : Update Reminder
   **/
  removeReminderNotes(data, $event) {
    this.setReminder = $event;
    var reminderUpdate = {
      "reminder": this.setReminder,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("colorUpdate =====>", reminderUpdate);
    try {
      this.noteService.removeReminderNotes(reminderUpdate).subscribe(
        data => {
          this.snackbar.open('Reminder removed successfully......!', 'Done...!', { duration: 3000 });
          console.log('Register infor ==========>', data);
        },
        error => {
          this.snackbar.open('Error while removed note reminder ......!', 'Error', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 100);
  }

  entry(event) {
    if (event) {
      this.anyChanges.emit({});
    }
  }

  removeLabel(cardId,labelId){
    this.noteService.removeLabelToNotes(cardId,labelId)
    .pipe(takeUntil(this.destory$)).subscribe((response)=>{
      this.anyChanges.emit({})
    },(error)=>{
      console.log('Error ====>',error);      
    })
  }

  showLabel(data){
    this.data.changeMessage(data)
  }

}



