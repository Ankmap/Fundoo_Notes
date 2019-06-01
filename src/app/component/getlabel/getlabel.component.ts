import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Label } from 'src/app/core/model/label/label';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-getlabel',
  templateUrl: './getlabel.component.html',
  styleUrls: ['./getlabel.component.scss']
})
export class GetlabelComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private labelService: NotesService, private route: ActivatedRoute) { }

  private label: Label[] = [];
  private labelNotesList = [];
  private labelName = '';

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.labelName = params['label'];
      this.labelNotes();
    })
  }

  refresh(event) {
    if (event) {
      this.labelNotes();
    }
  }

  /**
   * 
   * @Purpose : getting the notes according to label
   */
  labelNotes() {
    this.labelService.getNotesListByLabel(this.labelName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.label = response["data"].data;
        this.labelNotesList = [];
        for (let i = this.label.length; i > 0; i--) {
          this.labelNotesList.push(this.label[i - 1])
        }
        console.log('Add Label to Note response ====>', response);
      }, (error) => {
        console.log('Add Label to Note error ====>', error);
      });
  }
}
