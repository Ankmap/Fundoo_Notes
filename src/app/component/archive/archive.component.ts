import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Note } from 'src/app/core/model/note/note';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/service/data/data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  destory$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private noteService: NotesService,
    private snackbar: MatSnackBar,
    private dataService: DataService
  ) { }

  private notes: Note[] = []

  /* Archive Note */
  isArchived = false;

  /* Grid View*/
  direction: String = "row";
  wrap: string = "wrap";
  view: any;

  ngOnInit() {
    this.getArchivedList();

    /* Grid View*/
    this.dataService.getView().subscribe((response) => {
      this.view = response;
      this.direction = this.view.data
    });
  }

  /**
   * @Purpose : Archive Note
   **/
  newNotes: Note[];
  getArchivedList() {
    this.noteService.getArchivedList()
      .pipe(takeUntil(this.destory$))
      .subscribe((response) => {
        this.notes = response["data"].data.filter(function(el){
          return (el.isArchived === true)
        });
        console.log(" getArchivedList ======> ", this.notes);
      }, (error) => {
        console.log("getArchivedList ======>", error);
      });
  }
  /**
   * @Purpose : Unarchive Note
   **/

  unarchiveNote(data) {
    var archiveNote = {
      "isArchived": this.isArchived,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log('Archive Note =====>', archiveNote);

    try {
      this.noteService.archiveNote(archiveNote).subscribe(
        data => {
          this.snackbar.open(' Note unarchive ', ' Undo ', { duration: 1000 });
          console.log('Archive Note Successfully....!', data);
        },
        error => {
          this.snackbar.open(' Note archive ', ' Undo ', { duration: 3000 });
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
