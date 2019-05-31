import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { Note } from 'src/app/core/model/note/note';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/core/service/data/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  /* Reminder */
  private reminderArray = [];
  private array = [];

  /* Note */
  private notes: Note[] = [];
  
  /* Grid View*/
  direction: String = "row";
  wrap: string = "wrap";
  view: any;

  /* SetColor*/
  setColor: any;
  
  /* Reminder Update*/
  setReminder: any;

  /* Archive Note */
  isArchived = true;
  archiveNote1: any

  constructor(
    private noteService : NotesService,
    private dataService : DataService,
    private snackbar : MatSnackBar
  ) { }

  ngOnInit() {
    this.showReminder();

    /* Grid View*/
    this.dataService.getView().subscribe((response) => {
      this.view = response;
      this.direction = this.view.data
    });
  }


  /**
   * @Purpose : For ShowLabel
   **/
  showReminder() {
    this.noteService.getReminderNotesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.notes = [];
        this.notes = response["data"].data;
        console.log("Show Reminder ====>",this.notes);
        this.reminderArray = [];
        this.reminderArray.push(this.notes)
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
    setTimeout(() => this.dataService.getAllNote(), 0);
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
    setTimeout(() => this.dataService.getAllNote(), 100);
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
    setTimeout(() => this.dataService.getAllNote(), 100);
  }
}
