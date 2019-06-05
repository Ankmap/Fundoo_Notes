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

  constructor(
    private service: HttpService
    ) { }

  /**
   *1. @Purpose : Add Notes
   **/
  addNote(body) {
    return this.service.postDataForEncoded("/notes/addNotes", body)
  }

  /**
   *2. @Purpose : Get Notes List and access without refresh
   **/
  getNotes(): any {
    return this.service.getdDta("notes/getNotesList")
  }

  /**
   *3. @Purpose : Changes Color Notes
   **/
  cardColorChange(body) {
    return this.service.chnageColor("notes/changesColorNotes", body)
  }

  /**
   *4. @Purpose : Delete Note Forever
   **/
  deleteNote(body) {
    return this.service.deleteNote("notes/deleteForeverNotes", body)
  }

  /**
   *5. @Purpose : Add note Labels
   **/
  addLabel(body) {
    return this.service.postDataForAddLabel("noteLabels", body)
  }

  /**
   *6. @Purpose : Get Note Label List
  **/
  showNoteLabel() {
    return this.service.postDataForShowLabel("noteLabels/getNoteLabelList")
  }

  /**
   *7. @Purpose : Add collaborators Notes
  **/
  addColNote(body, id) {
    return this.service.postDataForaddLabelToNotes("/notes/" + id + "/AddcollaboratorsNotes", body)
  }

  /**
    *8. @Purpose : Remove Collaborators
  **/
  removeCollaborators(noteId, userId) {
    return this.service.postDataForRemoveCollaboratorsToNotes("/notes/" + noteId + "/removeCollaboratorsNotes/" + userId)
  }

  /**
   *9. @Purpose : Update Note
  **/
  updateNote(body) {
    return this.service.postDataForUpdateNote("/notes/updateNotes", body)
  }

  /**
   *10. @Purpose : Delete Note Label
  **/
  deleteNoteLabel(labelId) {
    return this.service.postDataForDeleteLabel("/noteLabels/" + labelId + "/deleteNoteLabel")
  }

  /**
   *11. @Purpose : Update Note Label
  **/
  updateNoteLabel(labelId, body) {
    return this.service.postDataForUpdateLabel("/noteLabels/" + labelId + "/updateNoteLabel", body)
  }

  /**
   *12. @Purpose : Archive Note
  **/
  archiveNote(body) {
    return this.service.postDataForArchiveNote("/notes/archiveNotes", body)
  }

  /**
   *13. @Purpose : Get Archived List
  **/
  getArchivedList() {
    return this.service.postDataForArchiveNoteGetList("/notes/getArchiveNotesList")
  }

  /**
  *14. @Purpose : Add Update Reminder Notes
  **/
  addUpdateReminderNotes(body) {
    return this.service.chnageReminder("/notes/addUpdateReminderNotes", body)
  }

  /**
   *15. @Purpose : Remove Reminder Notes
  **/
  removeReminderNotes(body) {
    return this.service.removeReminderNotes("/notes/removeReminderNotes", body)
  }

  /**
   *16. @Purpose : Get Reminder Notes List
  **/
  getReminderNotesList() {
    return this.service.postDataForgetReminderNotesList("/notes/getReminderNotesList")
  }

  /**
   *17. @Purpose : Trash Notes
  **/
  trashNotes(body) {
    return this.service.deleteNote("/notes/trashNotes", body)
  }

  /**
   *18. @Purpose : Get Trash Notes List
  **/
  getTrashNotesList() {
    return this.service.postDataForgetTrashNotesList("/notes/getTrashNotesList")
  }

  /**
   *19. @Purpose : Add Label To Notes 
  **/
  addLabelToNotes(cardId, labelId) {
    return this.service.postDataForaddLabelToNotes("/notes/" + cardId + "/addLabelToNotes/" + labelId + "/add", {})
  }

  /**
   *20. @Purpose :  Remove Label To Notes
  **/
  removeLabelToNotes(cardId, labelId) {
    return this.service.postDataForremoveLabelToNotes("/notes/" + cardId + "/addLabelToNotes/" + labelId + "/remove", {})
  }

  /**
   *21. @Purpose : Get Notes List By Label
  **/
  getNotesListByLabel(label) {
    return this.service.postDataForremoveLabelToNotes("/notes/getNotesListByLabel/" + label, {})
  }

  /**
   *22. @Purpose : pin & Unpin Notes 
  **/
  pinUnpinNotes(body) {
    return this.service.postDataForpinUnpinNotes("/notes/pinUnpinNotes",body)
  }
}
