import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionService } from 'src/app/core/service/question/question.service';
import { Question, Reply } from 'src/app/core/model/question/question';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/core/service/data/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.scss'],
})
export class QuestionanswerComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() onChangeAskQuestion = new EventEmitter()

  /* Get from localstorage */
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  img = environment.url + localStorage.getItem("userImage")

  /* question Model */
  addQue: Question = new Question();
  replyQue: Reply = new Reply();

  /* Get Notes Detail */
  private noteList;
  private questionData = '';

  /* Binding the message and description */
  message = new FormControl('')

  /* Decorator */
  @Input() id;

  /* Notecard open */
  private notecard: boolean = true;
  private notecardreply: boolean = true;
  private notecardAnswer: boolean = true

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

  /**
   * @Purpose : For new Notecard open
   **/
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
          // this.snackbar.open('Get Notes Detail', '', { duration: 4000 });
          console.log('Get Notes Detail ===>', data);
          console.log('Get Question Notes Detail show ===>', this.noteList);
        },
        error => {
          // this.snackbar.open('Get Notes Detail ===>', '', { duration: 3000 });
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
    * @Purpose : Add Question
  **/
  addReply(parentId) {
    console.log('parentId ===>', parentId)
    var body = {
      "message": this.replyQue.message,
    }
    console.log('Reply Question ====>', body)
    try {
      this.questionService.questionAndAnswerNotesreply(parentId, body)
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
  // question(parentId) {
  //   console.log('parentId for delete ===>', parentId)
  //   this.questionService.questionAndAnswerNotesDelete(parentId)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(
  //       data => {
  //         this.snackbar.open('delete question successfully', '', { duration: 1000 });
  //         console.log('delete question ===>', data)
  //         this.getNotesDetail();
  //         this.dataService.changeMessage('')
  //       },
  //       error => {
  //         this.snackbar.open('delete question error', '', { duration: 1000 });
  //         console.log('delete question error ===>', error);

  //       })
  // }

  title = 'Star Rating';
  // create a list which contains status of 5 stars
  starList: boolean[] = [true, true, true, true, true];       
  rating: number;
  //Create a function which receives the value counting of stars click, 
  //and according to that value we do change the value of that star in list.
  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
