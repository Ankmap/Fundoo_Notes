/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - note-list.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../core/model/note/note'
import { DataService } from '../../core/service/data/data.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = [];
  message: string;

  destory$: Subject<boolean> = new Subject<boolean>();

  private view :boolean;
  @Input() note;
  @Input() searchItem;
  @Output() anyChanges = new EventEmitter();
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.allNote.pipe(takeUntil(this.destory$)).subscribe(data => this.notes = data);
    console.log('all note -->',this.notes);

    this.data.currentMessageView.pipe(takeUntil(this.destory$))
    .subscribe(message =>{
      this.view = message
    })
  }

}



