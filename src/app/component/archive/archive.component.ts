import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Note } from 'src/app/core/model/note/note';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  destory$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private noteService: NotesService
  ) { }

  private notes: Note[] = []
  private archiveList: any[];


  ngOnInit() {
    this.getArchivedList();
  }

  /**
   * @Purpose : Archive Note
   **/

  getArchivedList() {
    this.noteService.getArchivedList()
      .pipe(takeUntil(this.destory$))
      .subscribe((response) => {
        this.notes = response["data"].data;
        console.log(" getArchivedList ======> ", this.notes);
      }, (error) => {
        console.log("getArchivedList ======>", error);

      });
  }
}
