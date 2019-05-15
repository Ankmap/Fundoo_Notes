import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private service: HttpService) { }

  addNote(body){
    return this.service.postDataForEncoded("/notes/addNotes",body)
  }

  getNotes(){
    return this.service.getdDta("notes/getNotesList")
  }
  cardColorChange(){
    return this.service.chnageColor("notes/changesColorNotes")
  }
}
