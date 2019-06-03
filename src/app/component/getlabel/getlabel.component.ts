import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Label } from 'src/app/core/model/label/label';
import { Params, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/service/data/data.service';

@Component({
  selector: 'app-getlabel',
  templateUrl: './getlabel.component.html',
  styleUrls: ['./getlabel.component.scss']
})
export class GetlabelComponent implements OnInit {

  @Input() labels
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private labelService: NotesService,
     private route: ActivatedRoute,
     private dataService : DataService
     ) { }

  private label: Label[] = [];
  private labelName = '';

  /* Grid View*/
  direction: String = "row";
  wrap: string = "wrap";
  view: any;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.labelName = params['label'];
      this.labelNotes();
    })

    /* Grid View*/
    this.dataService.getView().subscribe((response) => {
      this.view = response;
      this.direction = this.view.data
    });
  }

  refresh(event) {
    if (event) {
      this.labelNotes();
    }
  }

  /**
   * @Purpose : getting the notes according to label
   **/
  labelNotes() {
    this.labelService.getNotesListByLabel(this.labelName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.label = response["data"].data;
        console.log('this.label ===>', this.label);
        console.log('Add Label to Note response ====>', response);
      }, (error) => {
        console.log('Add Label to Note error ====>', error);
      });
  }
}
