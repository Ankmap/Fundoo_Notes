import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { Note } from 'src/app/core/model/note/note';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/core/service/data/data.service';

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

  
  constructor(
    private noteService : NotesService,
    private dataService : DataService
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
}
