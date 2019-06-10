/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - icon.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollaboratorComponent } from '../collaborator/collaborator.component'
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { Label } from 'src/app/core/model/label/label';
import { takeUntil } from 'rxjs/operators';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  /* Decorators */
  @Input() card;
  @Input() noteData;
  @Output() onChangeColor = new EventEmitter()
  @Output() onChangeDelete = new EventEmitter()
  @Output() onChangeTrash = new EventEmitter()
  @Output() onChangeArchive = new EventEmitter()
  @Output() onChangeDateReminder = new EventEmitter()
  @Output() onChangeAddNote = new EventEmitter()
  @Output() popupChange = new EventEmitter()
  @Output() onChangeCollaborator = new EventEmitter()

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private dialog: MatDialog,
    private noteService: NotesService,
    private dataService: DataService,
    private router: Router
  ) { }

  /* Archive */
  isArchive: boolean = false;


  /* Reminder */
  currentDate = new Date;

  /* Label Model*/
  private labelList;
  private labelArray = [];
  private Array = [];
  private label: Label[] = [];

  /* Color Code with name*/
  arrayOfColors = [
    [
      { name: "white", hexcode: "#FFFFFF" },
      { name: "salmon", hexcode: "#fa8072" },
      { name: "orange", hexcode: "#FFA500" },
      { name: "yellow", hexcode: "#FFFF00" },
    ],
    [
      { name: "green", hexcode: "#008000" },
      { name: "teal", hexcode: "#008080" },
      { name: "blue", hexcode: "#0000FF" },
      { name: "aqua", hexcode: "#00FFFF" },
    ],
    [
      { name: "purple", hexcode: "#800080" },
      { name: "pink", hexcode: "#FFC0CB" },
      { name: "red", hexcode: "#FF0000" },
      { name: "gray", hexcode: "#808080" },
    ]
  ]

  ngOnInit() {

  }

  /* Set color */
  setColor(color) {
    this.onChangeColor.emit(color);
  }

  /* Delete Note */
  deleteNote(note) {
    this.onChangeDelete.emit(note);
  }

  /* addCollaborator */
  addCollaborator(cardDetails): void {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '600px',
      data: { noteData: cardDetails }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('Dialog closed');
        this.onChangeCollaborator.emit({})
      });
  }

  /* Archive */
  archiveNote(note) {
    this.onChangeArchive.emit(note);
  }

  /* Trash Note */
  trashNote(note) {
    this.onChangeTrash.emit(note);
  }

  /************************************* Reminder start **************************************************/
  /* Today */
  today() {
    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 0, 8, 0, 0)
    console.log(" Current Date Today ====>", date);
    this.onChangeDateReminder.emit(date)
  }

  /* Tomorrow */
  tomorrow() {
    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1, 8, 0, 0)
    console.log(" Current Date Tommorrow ====>", date);
    this.onChangeDateReminder.emit(date)
  }

  /* NextWeek */
  nextWeek() {
    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7, 8, 0, 0)
    console.log(" Current Date Next Week ====>", date);
    this.onChangeDateReminder.emit(date)
  }

  /************************************* Reminder end **************************************************/


  /**
   * @Purpose : Show Label
   **/

  showLabel() {
    this.labelArray = [];
    this.Array = [];
    this.noteService.showNoteLabel().subscribe((response) => {
      this.label = response["data"].details;
      this.labelList = [];
      this.labelList = this.label;

      for (let i = 0; i < this.labelList.length; i++) {
        this.labelList[i].isChecked = false; /* False check */
        if (this.card) {
          for (let j = 0; j < this.card.noteLabels.length; j++) {
            if (this.labelList[i].label == this.card.noteLabels[j].label) {
              this.Array.push(this.labelList[i])
              this.labelList[i].isChecked = true; /* true check */
            }
          }
        }
      }
    }, (error) => {
      console.log("ERR ====>", error);
    });
    /* For GetAll Note without refresh*/
    // setTimeout(() => this.dataService.getAllNote(), 5000);
  }

  /**
   * @Purpose : Add Label to Note
   **/
  addLabel(label) {
    if (this.card) {
      this.noteService.addLabelToNotes(this.card.id, label.id)
        .subscribe((response) => {
          this.onChangeAddNote.emit({})
          console.log("  Add Label to Note response ====>", response);
        }, (error) => {
          console.log(" Add Label to Note error ====>", error);
        });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 100);
  }

  /**
   * @Purpose : Remove Label from Note
   **/
  removeLabel(label) {
    this.noteService.removeLabelToNotes(this.card.id, label.id)
      .subscribe((response) => {
        this.onChangeAddNote.emit({})
        console.log(" Remove Label from Note response ====>", response);
      }, (error) => {
        console.log("Remove Label from Note error ====>", error);
      });
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 100);
  }
}
