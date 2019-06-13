/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - getlabel.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
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

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private labelService: NotesService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  /* Model */
  private label: Label[] = [];
  private labelName = '';

  /* Grid View */
  direction: String = "row";
  wrap: string = "wrap";
  view: any;

  ngOnInit() {
    /* Accessing url parameters 
       The subscription will continue to update as the parameter changes for that specific route.
    */
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

  /**
   * @Purpose: Refresh event 
   **/
  refresh(event) {
    if (event) {
      this.labelNotes();
    }
  }

  /**
   * @Purpose : Getting the notes according to label
   **/
  labelNotes() {
    this.labelService.getNotesListByLabel(this.labelName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.label = response["data"].data;
        this.label.reverse();
        console.log('Get Label Notes ===>', this.label);
        console.log('Add Label to Note response ====>', response);
      }, (error) => {
        console.log('Add Label to Note error ====>', error);
      });
  }
}
