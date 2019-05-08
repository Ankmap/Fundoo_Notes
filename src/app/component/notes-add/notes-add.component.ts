import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent implements OnInit {

  constructor() { }
  private notecard : boolean = true;
  private list : boolean = true;
  ngOnInit() {
  }

  notecardOpen(){
    this.notecard =!(this.notecard);
  }
  listOpen(){
    this.list = !(this.list)
  }

}
