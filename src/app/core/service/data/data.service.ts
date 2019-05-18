import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotesService } from '../notes/notes.service';


/**
 * Purpose : The BehaviorSubject has the characteristic that it stores the “current” value. This means that you can always directly get the last emitted value from the BehaviorSubject.
 **/ 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private noteService: NotesService) {
    this.getAllNote();
  }
  /**
   * @Purpose : get note without refresh
   **/
  private assignData = new BehaviorSubject<any[]>([]);
  allNote = this.assignData.asObservable();

  /**
   * @Purpose : search
   **/
  private messageSourceSearch = new BehaviorSubject('default');
  currentMessageSearch = this.messageSourceSearch.asObservable();

  private viewSource = new BehaviorSubject(false)
  currentMessageView = this.viewSource.asObservable();
  changeMessageSearch(message : string){
    this.messageSourceSearch.next(message)
  }
  
  /**
   * @Purpose : get note without refresh
   **/ 
  getAllNote() {
    this.noteService.getNotes().subscribe(data => {
      console.log(data.data.data);
      ; this.assignData.next(data.data.data)
    })
  }
 
}