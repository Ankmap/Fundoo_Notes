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

  /* Grid View */
  direction: String = "row";
  wrap: string = "wrap";
  view: any;

  destroy$: Subject<boolean> = new Subject<boolean>();


  /**
   * @Purpose : Pass data from the parent component class to the child component class
   *  use the @Input decorator. 
   **/
  @Input() note;
  @Input() labels;
  @Input() searchItem;
  @Input() noteData;
  /**
    * @Purpose : To emit an event from the child component class to the parent component class,
    *   use EventEmitter with the @Output() decorator. 
    **/
  @Output() anyChanges = new EventEmitter();

  /* SetColor */
  setColor: any;

  /* Delete Note */
  deleteNote1: any;
  private isDeleted: false;

  /* Archive Note */
  isArchived = true;
  archiveNote1: any

  /* Reminder Update */
  setReminder: any;

  /* Trash Note */
  trashNote1: any;
  newNotes: Note[];

  /* Add Note to Label */
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
    this.data.currentMessageView
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.view = message
      })

    /* Grid View and list view */
    this.data.getView()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.view = response;
        this.direction = this.view.data
      });
  }

  /**
   * @Purpose : Pin Unpined Array
   **/
  pinedArray = [];
  unpinedArray = [];

  getNote() {
    this.data.allNote.pipe(takeUntil(this.destroy$))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.notes = data
          // this.notes = this.notes.filter(function (el) {
          //   return (el.isArchived === false && el.isDeleted === false);
          // });
          this.pinedArray = [];
          this.unpinedArray = []
          for (let i = this.notes.length; i > 0; i--) {
            if ((this.notes[i - 1]["isDeleted"] == false) && (this.notes[i - 1]["isArchived"] == false)) {
              if (this.notes[i - 1]["isPined"] == true) {
                this.pinedArray.push(this.notes[i - 1]);
              }
              else {
                this.unpinedArray.push(this.notes[i - 1]);
              }
            }
          }
          console.log("pinned array =====>", this.pinedArray);
          console.log("unpinned array =====>", this.unpinedArray);
          console.log('Get all Notes in  home =====>', this.notes)
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
      this.noteService.cardColorChange(colorUpdate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('color update successfully......!', 'Done...!', { duration: 3000 });
            console.log('Register infor ==========>', data);
            this.data.getAllNote();
            this.data.changeMessage('')
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
      this.noteService.deleteNote(deleteNote)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Note deleted successfully......!', 'Done...!', { duration: 3000 });
            console.log('Register infor ==========>', data);
            this.data.getAllNote();
            this.data.changeMessage('')
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
  trashNote(data, $event) {
    this.trashNote1 = $event;
    var trashNote = {
      "isDeleted": !this.isDeleted,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("DeleteNote =======>", trashNote);
    try {
      this.noteService.trashNotes(trashNote)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Note saved in trash successfully......!', 'Done...!', { duration: 3000 });
            console.log('Note saved in trash successfully......!', data);
            this.data.getAllNote();
            this.data.changeMessage('')
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
   * @Purpose : Open dialog box and edit Note 
   **/
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      height: '500px',
      data: {
        'title': data.title,
        'description': data.description,
        'id': data.id,
      }
    });
    /* Close the dialog box */
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('Dialog closed');
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
      this.noteService.archiveNote(archiveNote)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open(' Note archive ', ' Undo ', { duration: 1000 });
            console.log('Archive Note Successfully....!', data);
            this.data.getAllNote();
            this.data.changeMessage('')
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
      this.noteService.addUpdateReminderNotes(reminderUpdate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Reminder update successfully......!', 'Done...!', { duration: 3000 });
            console.log('Register infor ==========>', data);
            this.data.getAllNote();
            this.data.changeMessage('')
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
   * @Purpose : Remove Reminder
   **/
  removeReminderNotes(data, $event) {
    this.setReminder = $event;
    var reminderUpdate = {
      "reminder": this.setReminder,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("colorUpdate =====>", reminderUpdate);
    try {
      this.noteService.removeReminderNotes(reminderUpdate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Reminder removed successfully......!', 'Done...!', { duration: 3000 });
            console.log('Register infor ==========>', data);
            this.data.getAllNote();
            this.data.changeMessage('')
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

  /**
   * @Purpose : Remove Label from Note
   **/

  removeLabel(labelId, cardId) {
    this.noteService.removeLabelToNotes(cardId, labelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.anyChanges.emit({})
        console.log('response remove Label ====>', response);
      }, (error) => {
        console.log('Error remove Label ====>', error);
      });
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 100);
  }

  /**
   * @Purpose : Show all Label
   **/
  showLabel(data) {
    this.data.changeMessage(data)
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 10);
  }

  /**
   * @Purpose : Pin and Unpin
   **/
  private isPined: boolean = false;

  /**
   * @Purpose : Update Pin
   **/
  pinUpdate(data, $event) {
    this.isPined = $event
    var body = {
      "isPined": this.isPined,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("Set Pin at display note =====>", body);
    try {
      this.noteService.pinUnpinNotes(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('pin update successfully......!', 'Done...!', { duration: 3000 });
            console.log('pin update successfully ==========>', data);
          },
          error => {
            this.snackbar.open('Error while pin update  ......!', 'Error', { duration: 3000 });
            console.log("Error something wrong while pin update ====> ", error)
          });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.data.getAllNote(), 100);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}