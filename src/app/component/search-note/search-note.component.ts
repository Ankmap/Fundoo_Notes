/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - search-note.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data/data.service';
import { NotesService } from '../../core/service/notes/notes.service';
import { Note } from '../../core/model/note/note';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.scss']
})
export class SearchNoteComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private data: DataService, 
    private searchService: NotesService
    ) { }

  private notes: Note[] = [];
  private message: string

  ngOnInit() {
    /* For get all Note */ 
    this.getNotes()

    /* For current message Search */ 
    this.data.currentMessageSearch.pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.message = message
      })
  }

  /**
   * @Purpose : GetNotes  method for search
   **/ 
  getNotes() {
    this.data.allNote.pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.notes = response;
        console.log("response in search ===>", response);
      }, (error) => {
        console.log("Error in search ===>", error);
      });
  }

}
