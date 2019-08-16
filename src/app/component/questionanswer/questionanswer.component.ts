import { Component, OnInit, Input } from '@angular/core';
// import { QuestionService } from 'src/app/core/service/question/question.service';
// import { Question, Reply } from 'src/app/core/model/question/question';
import { QuestionService } from '../../core/service/question/question.service';
import { Question, Reply } from '../../core/model/question/question';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
// import { NotesService } from 'src/app/core/service/notes/notes.service';
import { NotesService } from '../../core/service/notes/notes.service';
// import { environment } from 'src/environments/environment';
import { environment } from '../../../environments/environment';
// import { DataService } from 'src/app/core/service/data/data.service';
import { DataService } from '../../core/service/data/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.scss'],
})
export class QuestionanswerComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  /* Get from localstorage */
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  img = environment.url + localStorage.getItem("userImage")

  /* question Model */
  addQue: Question = new Question();
  replyQue: Reply = new Reply();

  /* Get Notes Detail */
   noteList;
   questionData = '';
   questionDisplay;
   parentId;
   questionRate;
   questionLike;

  /* Binding the message */
  message = new FormControl('')

  /* Decorator to get id */
  @Input() id;

  /* Notecard open conditions */
   notecard: boolean = true;
   notecardreply: boolean = true;
   notecardAnswer: boolean = true

  /* Rate the question */
  title = 'Star Rating';
  starList: boolean[] = [true, true, true, true, true];
  rating: number;

  /* Like the question */
   like: boolean = true;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private noteService: NotesService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    /* Get  Note Id */
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.questionData = params['id'];
        console.log('check aquestion id ====>', this.questionData);
      });

    /* Get Notes Detail */
    this.getNotesDetail()
  }


  /* close */
  close() {
    this.router.navigateByUrl('/home');
  }

  /** For new Notecard open **/
  notecardOpen() {
    this.notecard = !(this.notecard);
  }

  notecardOpenAnswer() {
    this.notecardreply = !(this.notecardreply);
  }

  /**
  * @Purpose : Get Notes Detail
  **/
  getNotesDetail() {
    this.noteService.getNotesDetail(this.questionData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.addQue = data["data"].data;
          this.noteList = [];
          this.noteList = this.addQue;
          console.log('Get Notes Detail ===>', this.noteList);
          this.questionDisplay = this.noteList[0].questionAndAnswerNotes[0];
          console.log('Question Display ===>', this.questionDisplay);
          this.parentId = this.questionDisplay.id[0];
          console.log('Question Id is answer parentId =====>', this.questionDisplay.id)
          /* Rate an like */ 
          this.questionRate = this.questionDisplay.rate;
          console.log('Rate the question ====>',this.questionRate);
          this.questionLike = this.questionDisplay.like;
          console.log('Like the question ====>',this.questionLike);
          
        },
        error => {
          console.log("Get Notes Detail ===>", error)
        })
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
      this.questionService.questionAndAnswerNotes(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Question add successfully......!', 'Done...!', { duration: 4000, verticalPosition: 'top' });
            console.log('question add successfully......!', data);
            this.getNotesDetail();
            this.dataService.changeMessage('')
          },
          error => {
            this.snackbar.open('Error while question add......!', 'Done...!', { duration: 3000 });
            console.log("Error while question add ====> ", error)
          });
      this.addQue.message = null;
      this.notecardAnswer = !(this.notecardAnswer);
    } catch (error) {
      console.log("Error while question add ====> ", error)
    }
  }

  /**
    * @Purpose : Add Replys
  **/
  addReply() {
    this.parentId = this.questionDisplay.id;
    console.log('Check parentId in add answer ====>', this.parentId);
    var body = {
      "message": this.replyQue.message,
    }
    console.log('Reply Question body ====>', body)
    try {
      this.questionService.questionAndAnswerNotesreply(this.parentId, body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.snackbar.open('Reply add successfully......!', 'Done...!', { duration: 4000, verticalPosition: 'top' });
            console.log('Reply add successfully......!', data);
            this.getNotesDetail();
            this.dataService.changeMessage('')
          },
          error => {
            this.snackbar.open('Error while Reply add......!', 'Done...!', { duration: 3000 });
            console.log("Error while Reply add ====> ", error)
          });
      this.replyQue.message = null;
    } catch (error) {
      console.log("Error while Reply add ====> ", error)
    }
  }

  /**
    * @Purpose : Delete Question
  **/
  questionDelete() {
    this.parentId = this.questionDisplay.id;
    console.log('check parentId in question delete ====>', this.parentId);
    this.questionService.questionAndAnswerNotesDelete(this.parentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.snackbar.open('Delete question successfully', '', { duration: 1000 });
          console.log('Delete question successfully ===>', data)
          this.getNotesDetail();
          this.dataService.changeMessage('')
        },
        error => {
          this.snackbar.open('delete question error', '', { duration: 1000 });
          console.log('delete question error ===>', error);

        })
  }

  /**
    * @Purpose : Rate Question
  **/

  setStarQuestion(data: any) {
    this.parentId = this.questionDisplay.id;
    console.log('check parentId in rating ====>', this.parentId);
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
    var body = {
      "rate": this.rating = data + 1,
    }
    console.log('Rate the question ====>', body)
    try {
      this.questionService.questionAndAnswerrate(this.parentId, body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            console.log('Question Rating ====>', this.rating);
            console.log('rate add successfully......!', data);
            this.getNotesDetail();
            this.dataService.changeMessage('')
          },
          error => {
            console.log("Error while rate add ====> ", error)
          });
    } catch (error) {
      console.log("Error while rate add ====> ", error)
    }
  }


  /**
    * @Purpose : Like Question
  **/
  setLikeQuestion() {
    this.like = !this.like;
    this.parentId = this.questionDisplay.id;
    console.log('check parentId in like the question ====>', this.parentId);
    var body = {
      "like": this.like,
    }
    console.log('Like Question body ====>', body)
    try {
      this.questionService.questionAndAnswerlike(this.parentId, body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            console.log('Like question successfully......!', data);
            this.getNotesDetail();
            this.dataService.changeMessage('')
          },
          error => {
            console.log("Error while like question ====> ", error)
          });
    } catch (error) {
      console.log("Error while like question ====> ", error)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}