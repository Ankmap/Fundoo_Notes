/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - dialog.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Note } from 'src/app/core/model/note/note';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  /**
  * @Purpose : Bind title and description
  **/
  // title = new FormControl(this.data.title);
  // description = new FormControl(this.data.description);

  /**
   * @Purpose : using @ViewChild to inject the plain HTML element of a component
  **/
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;

  /**
  * @Purpose : Note model
  **/
  addNotes: Note = new Note();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA)
    public data: any,
    private noteService: NotesService,
    private dataService: DataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  /**
    * @Purpose :For close dialog box
    **/
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
    * @Purpose : Update Note
    **/
  updateNote(data) {
    let titleValue = this.title.nativeElement.innerHTML;
    let descriptionValue = this.description.nativeElement.innerHTML;
    var body = {
      // "title": this.title.value,
      // "description": this.description.value,
      "title": titleValue,
      "description": descriptionValue,
      "noteId": [data.id] /* Access noteId for particular note*/
    }
    console.log('console for updateNote ============', body);
    try {
      this.noteService.updateNote(body).subscribe(
        data => {
          this.snackbar.open('Note update successfully......!', 'Done...!', { duration: 3000 });
          console.log('Note update successfully ==========>', data);
        },
        error => {
          this.snackbar.open('Error while update note......!', 'Error', { duration: 3000 });
          console.log("Error while update note ===========>", error)
        });
    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
    setTimeout(() => this.dataService.getAllNote(), 100);
  }
}
