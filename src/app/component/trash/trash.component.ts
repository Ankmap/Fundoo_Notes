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


  destory$: Subject<boolean> = new Subject<boolean>();

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
    this.dataService.getView().subscribe((response) => {
      this.view = response;
      this.direction = this.view.data
    });
  }

  /**
   * @Purpose : Archive Note
   **/

  getTrashNotesList() {
    this.noteService.getTrashNotesList()
      .pipe(takeUntil(this.destory$))
      .subscribe((response) => {
        this.notes = response["data"].data;
        console.log(" getArchivedList ======> ", this.notes);
        this.snackbar.open('Note Restores', 'Undo !', { duration: 2000 });
      }, (error) => {
        console.log("getArchivedList ======>", error);
      });
  }

  /**
   * @Purpose : Delete Note Forever 
   **/
  private isDeleted: false;

  deleteNoteForever(data) {

    var deleteNote = {
      "isDeleted": !this.isDeleted,
      "noteIdList": [data.id] /* Access noteIdList for particular note*/
    }
    console.log("Delete Note  Forever=======>", deleteNote);
    try {
      this.noteService.deleteNote(deleteNote).subscribe(
        data => {
          console.log('Register infor ==========>', data);
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


  /**
   * @Purpose : Delete Note Forever 
   **/
  noteRestore() {
    this.getTrashNotesList();

    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 100);
  }
}
