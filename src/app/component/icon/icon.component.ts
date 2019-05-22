import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { CollaboratorComponent } from '../../component/'
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() card;
  @Output() onChangeColor = new EventEmitter()
  @Output() onChangeDelete = new EventEmitter()
  constructor() { }

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
  // Set color
  setColor(color) {
    this.onChangeColor.emit(color);
  }
  //Delete Note
  deleteNote(note) {
    this.onChangeDelete.emit(note);
  }
  //addCollaborator
  // addCollaborator(){
  //   const dialogRef = this.dialog.open(CollaboratorComponent, {
  //     width: '300px',
  //     height: '250px'
  //   });
  // }
}
