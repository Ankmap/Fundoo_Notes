import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Note } from 'src/app/core/model/note/note';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/core/service/data/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {


  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private noteService: NotesService,
    private dataService: DataService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  private notes: Note[] = []

  /* Grid View*/
  direction: String = "row";
  wrap: string = "wrap";
  view: any;


  ngOnInit() {
    this.getTrashNotesList();

    /* Grid View*/
    this.dataService.getView()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.view = response;
        this.direction = this.view.data
      });
  }

  /**
   * @Purpose : Archive Note
   **/

  getTrashNotesList() {
    this.noteService.getTrashNotesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.notes = response["data"].data;
        console.log(" getTrashNotesList ======> ", this.notes);
        this.dataService.getAllNote();
        this.dataService.changeMessage('')
      }, (error) => {
        console.log("getArchivedList ======>", error);
      });
  }

  /**
   * @Purpose : Delete Note Forever 
   **/
  private isDeleted: boolean = false;

  deleteNoteForever(data) {
    var body = {
      "isDeleted": this.isDeleted,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("Delete Note  Forever=======>", body);
    try {
      this.noteService.deleteNote(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Note deleted Forever successfully......!', 'Done...!', { duration: 3000 });
            console.log('Note deleted successfully ==========>', data);
            this.dataService.getAllNote();
            this.dataService.changeMessage('')
          },
          error => {
            this.snackbar.open('Error while deleted note  ......!', 'Error', { duration: 3000 });
            console.log("Error something wrong: ", error)
          });

    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 100);
  }


  /**
   * @Purpose : Delete Note Forever 
   **/
  noteRestore(data) {
    var body = {
      "isDeleted": this.isDeleted,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("Delete Note  Forever=======>", body);
    try {
      this.noteService.trashNotes(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Note restore successfully......!', 'Done...!', { duration: 3000 });
            console.log('Note restore successfully ==========>', data);
            this.dataService.getAllNote();
            this.dataService.changeMessage('')
          },
          error => {
            console.log("Error something wrong: ", error)
          });

    } catch (error) {
      console.log("Error something wrong: ", error)
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 100);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
