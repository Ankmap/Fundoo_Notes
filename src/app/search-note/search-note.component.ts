import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/service/data/data.service';
import { NotesService } from '../core/service/notes/notes.service';
import { Note } from '../core/model/note';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.scss']
})
export class SearchNoteComponent implements OnInit {

  destroy$ : Subject<boolean> = new Subject<boolean>();
  constructor( private data : DataService,  private searchService : NotesService) { }

  private notes :Note[]=[];
  private message : string
  private notesArray=[];

  ngOnInit() {
    this.getNotes()
    this.data.currentMessageSearch.pipe(takeUntil(this.destroy$))
    .subscribe(message=>{
      this.message = message
    })
  
  }

  getNotes(){
    this.data.allNote.
    pipe(takeUntil(this.destroy$))
    .subscribe( (response) =>{
      this.notes = response['data'].data
      this.notesArray=[];
    },(error)=>{
      console.log("Error:",error); 
    }
      
    );
  }
}
