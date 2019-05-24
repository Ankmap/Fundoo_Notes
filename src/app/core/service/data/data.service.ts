/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - data.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotesService } from '../notes/notes.service';

/**
 * @Purpose : The BehaviorSubject has the characteristic that it stores the “current” value. 
 * This means that you can always directly get the last emitted value from the BehaviorSubject.
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
   * @Description : private BehaviorSubject hold the current value of the message
   **/
  private assignData = new BehaviorSubject<any[]>([]);
  allNote = this.assignData.asObservable();

  /**
   * @Purpose : get note without refresh
   **/ 
  getAllNote() {
    this.noteService.getNotes().subscribe(data => {
      this.assignData.next(data.data.data)
      console.log("Get all note ==>",data.data.data);
    })
  }
  /********************************** get note without refresh End**************************************/ 

  /**
   * @Purpose : search
   
   * @Description : private BehaviorSubject hold the current value of the message
   *  then subscribe to the currentMessageView observable and 
   *  set its value equal to the message variable.
   **/
  private messageSourceSearch = new BehaviorSubject('default');
  currentMessageSearch = this.messageSourceSearch.asObservable();

  private viewSource = new BehaviorSubject(false)
  currentMessageView = this.viewSource.asObservable();
  changeMessageSearch(message : string){
    this.messageSourceSearch.next(message)
  }
  /********************************** Search End**************************************/ 
  
 /********************************** grid start**************************************/ 
  changeView(message:boolean){
    this.viewSource.next(message)
  }
 /********************************** grid End**************************************/ 
}