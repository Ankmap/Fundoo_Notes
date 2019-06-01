/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - data.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotesService } from '../notes/notes.service'; 
 
/**
 * @Purpose : The BehaviorSubject has the characteristic that it stores the “current” value. 
 * This means that you can always directly get the last emitted value from the BehaviorSubject.
 **/
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* Required for Grid*/
  result: boolean = true;
  subject = new Subject
  
  constructor(private noteService: NotesService) {
    /* Call getAllNote Method*/
    this.getAllNote();
  }
  /**
   * @Purpose : Get note without refresh
   * @Description : private BehaviorSubject hold the current value of the message
   **/
  private assignData = new BehaviorSubject<any[]>([]);
  allNote = this.assignData.asObservable( ); /* allNote() method is store all note*/

  /**
   * @Purpose : get note and access without refresh
   **/
  getAllNote() {
    this.noteService.getNotes().subscribe(data => {
      this.assignData.next(data.data.data)
      console.log("Get all note ===>", data.data.data);
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
  currentMessageSearch = this.messageSourceSearch.asObservable(); /* Used for search */

  private viewSource = new BehaviorSubject(false)
  currentMessageView = this.viewSource.asObservable();

  changeMessageSearch(message: string) {
    this.messageSourceSearch.next(message)
  }
  /********************************** Search End**************************************/

  /* change message for label*/ 
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(messsge:string){
    this.messageSource.next(messsge)
  }

  /* Current message for label*/ 
  private messageSourceLabel = new BehaviorSubject('default');
  currentMessageLabel = this.messageSourceLabel.asObservable();

  changeMessageLabel(messsge:string){
    this.messageSourceLabel.next(messsge)
  }
  /********************************** grid start**************************************/
  /* gridView method*/
  gridView() {
    if (this.result) {
      this.subject.next({ data: "column" });
      this.result = false;
    }
    else {
      this.subject.next({ data: "row" });
      this.result = true;
    }
  }

  getView() {
    this.gridView();
    return this.subject.asObservable();
  }
  /********************************** grid End**************************************/
}