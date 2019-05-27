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
   * @Purpose : Get Note and access without refresh
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
    return this.service.postDataForAddLabel("noteLabels", body)
  }

  /**
   * @Purpose : Show Label
  **/
  showNoteLabel() {
    return this.service.postDataForShowLabel("noteLabels/getNoteLabelList")
  }

  /**
   * @Purpose : Show Label
  **/
  addColNote(body,id) {
    return this.service.postDataForSearchUser("/notes/" + id + "/AddcollaboratorsNotes",body)
  }

  /**
   * @Purpose : Update Note
   **/
  updateNote(body) {
    return this.service.postDataForUpdateNote("/notes/updateNotes", body)
  }

  /**
   * @Purpose : Delete Note
   **/
  deleteNoteLabel(labelId) {
    return this.service.postDataForDeleteLabel("/noteLabels/" + labelId + "/deleteNoteLabel")
  }

  /**
   * @Purpose : Update Note
   **/
  updateNoteLabel(labelId,body) {
    return this.service.postDataForUpdateLabel("/noteLabels/" + labelId + "/updateNoteLabel",body)
  }

  /**
   * @Purpose : Update Note
   **/
  archiveNote(body){
    return this.service.postDataForArchiveNote("/notes/archiveNotes",body)
  }

  getArchivedList(){
    return this.service.postDataForArchiveNoteGetList("/notes/getArchiveNotesList")
  }

   /**
   * @Purpose : Update Reminder
   **/
  addUpdateReminderNotes(body) {
    return this.service.chnageReminder("/notes/addUpdateReminderNotes", body)
  }

  /**
   * @Purpose : Update Reminder
   **/
  removeReminderNotes(body) {
    return this.service.removeReminderNotes("/notes/removeReminderNotes", body)
  }

  /**
   * @Purpose : Update Reminder
   **/
  getReminderNotesList() {
    return this.service.postDataForgetReminderNotesList("/notes/getReminderNotesList")
  }

}
