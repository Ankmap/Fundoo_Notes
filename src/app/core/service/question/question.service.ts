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
   *1. @Purpose : Login the user
   **/
  questionAndAnswerNotes(body) {
    return this.service.postDataquestionAndAnswerNotes("/questionAndAnswerNotes/addQuestionAndAnswer", body)
  }
}
