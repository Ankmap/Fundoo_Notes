/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - note-list.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/service/notes/notes.service'
import { Note } from '../../core/model/note'
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NotesService) { }

  ngOnInit() {
    this.getNotes();
  }

  /**
   * @Purpose : Get Notes
   */ 
  getNotes() {
    this.noteService.getNotes().subscribe((data: any) => {
      this.notes = data.data.data
    });
  }
  

}
