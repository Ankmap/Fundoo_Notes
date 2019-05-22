/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - notes.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private service: HttpService) { }

  /**
   * @Purpose : Add Note
   **/
  addNote(body) {
    return this.service.postDataForEncoded("/notes/addNotes", body)
  }

  /**
   * @Purpose : Get Note without refresh
   **/
  getNotes(): any {
    return this.service.getdDta("notes/getNotesList")
  }

  /**
   * @Purpose : Color Change
   **/
  cardColorChange(body) {
    return this.service.chnageColor("notes/changesColorNotes", body)
  }

  /**
   * @Purpose : DeleteNote
   **/
  deleteNote(body) {
    return this.service.deleteNote("notes/deleteForeverNotes", body)
  }
  /**
   * @Purpose : Add label
   **/
  addLabel(body) {
    return this.service.postDataForEdit("noteLabels", body)
  }

  /**
    * @Purpose : Show Label
  **/
  showNoteLabel() {
    return this.service.postDataForShowLabel("noteLabels/getNoteLabelList")
  }
}
