import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from 'src/app/core/service/question/question.service';
import { Question } from 'src/app/core/model/question/question';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/core/service/notes/notes.service';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.scss']
})
export class QuestionanswerComponent implements OnInit {

  /* question Model */
  addQue: Question = new Question();

  /* Get Notes Detail */
  private noteList;
  private questionData = '';

  /* Binding the message and description */
  message = new FormControl('')

  /* Decorator */
  @Input() id;

  /* Notecard open */
  private notecard: boolean = true;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private noteService: NotesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.questionData = params['id'];
      console.log('check aquestion id ====>', this.questionData);
    });

    /* Get Notes Detail */
    this.getNotesDetail()
  }

  /**
    * @Purpose : Add Question
    **/
  addQuestion() {
    var body = {
      "message": this.addQue.message,
      "notesId": this.questionData /* Access notesId */
    }
    console.log('Add Question ====>', body)
    try {
      this.questionService.questionAndAnswerNotes(body).subscribe(
        data => {
          this.snackbar.open('Question add successfully......!', 'Done...!', { duration: 4000, verticalPosition: 'top' });
          console.log('question add successfully......!', data);
        },
        error => {
          this.snackbar.open('Error while question add......!', 'Done...!', { duration: 3000 });
          console.log("Error while question add ====> ", error)
        });

    } catch (error) {
      console.log("Error while question add ====> ", error)
    }
  }

  /* close */
  close() {
    this.router.navigateByUrl('/home');
  }

  /**
   * @Purpose : For new Notecard open
   **/
  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  /**
  * @Purpose : Get Notes Detail
  **/
  getNotesDetail() {
    this.noteService.getNotesDetail(this.questionData).subscribe(
      data => {
        this.addQue = data["data"].data;
        this.noteList = [];
        this.noteList = this.addQue;
        this.snackbar.open('Get Notes Detail', '', { duration: 4000 });
        console.log('Get Notes Detail ===>', data);
        console.log('Get Question Notes Detail show ===>', this.noteList);
      },
      error => {
        this.snackbar.open('Get Notes Detail ===>', '', { duration: 3000 });
        console.log("Get Notes Detail ===>", error)
      }
    )
  }

}
