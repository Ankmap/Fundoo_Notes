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

  private view: boolean;
  /**
   * @Purpose : Pass data from the parent component class to the child component class
   *  use the @Input decorator. 
   **/
  @Input() note;
  @Input() searchItem;
  /**
    * @Purpose : To emit an event from the child component class to the parent component class,
    *   use EventEmitter with the @Output() decorator. 
    **/
  @Output() anyChanges = new EventEmitter();

  /**
   * @Purpose : inject the DataService in the constructor
   **/
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.allNote.pipe(takeUntil(this.destory$))
      .subscribe(data => this.notes = data);
    console.log('all note -->', this.notes);

    this.data.currentMessageView.pipe(takeUntil(this.destory$))
      .subscribe(message => {
        this.view = message
      })
  }

}



