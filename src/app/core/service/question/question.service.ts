/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - question-service.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private service: HttpService) { }

  /**
   *1. @Purpose : add 
   **/
  questionAndAnswerNotes(body) {
    return this.service.postDataquestionAndAnswerNotes("/questionAndAnswerNotes/addQuestionAndAnswer", body)
  }

  /**
   *2. @Purpose : delete
   **/
  questionAndAnswerNotesDelete(id) {
    return this.service.postDataForDeleteQuestion("/questionAndAnswerNotes/" + id + "/notes/questionAndAnswerNotes")
  }

  /**
   *3. @Purpose : reply
   **/
  questionAndAnswerNotesreply(parentId,body) {
    return this.service.postDataquestionAndAnswerNotes("/questionAndAnswerNotes/reply/" + parentId,body)
  }

}
