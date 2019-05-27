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
  private archiveList: any [];


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
        this.archiveList = [];
        for (let i = this.notes.length; i > 0; i--) {
          if (this.notes[i - 1]["isDeleted"] == false)
            this.archiveList.push(this.notes[i - 1])
        }
      }, (error) => {
      });
  }
}
