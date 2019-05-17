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
import { DataService } from '../../core/service/data/data.service'

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = [];
  message: string;

  constructor(private noteService: NotesService, private data: DataService) { }

  ngOnInit() {
   // this.getNotes();
    this.data.allNote.subscribe(data => this.notes = data);
    console.log('all note -->',this.notes);
    
  }

  /**
   * @Purpose : Get Notes
   */
  // getNotes() {
  //   this.noteService.getNotes().subscribe((data: any) => {
  //     this.notes = data.data.data;
  //   });
  }



