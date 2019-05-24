import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollaboratorComponent } from '../collaborator/collaborator.component'
import { MatDialog } from '@angular/material';

export interface DialogData {
  noteData: object
}
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  /* Decorators */
  @Input() card;
  @Output() onChangeColor = new EventEmitter()
  @Output() onChangeDelete = new EventEmitter()

  constructor(
    private dialog: MatDialog
  ) { }

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
  addCollaborator(cardDetails) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '600px',
      data: { noteData: cardDetails }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

}
