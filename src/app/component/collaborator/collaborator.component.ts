/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - collaborator.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})

export class CollaboratorComponent implements OnInit {

  /* Decorators */
  @Input() noteData;
  @Output() anyChanges;

  /* Search USer */
  searchValue: any;
  userList: any[];

  /* Add Collaborators */
  collabData: any[];
  private collaborators = [];

  constructor(
    private snackbar: MatSnackBar,
    private noteService: NotesService,
    private dataService: DataService,
    private dialog: MatDialog,
    private userService: UserService,
    public dialogRef: MatDialogRef<CollaboratorComponent>, // dialogRef is now a reference to the diaolog popup
    @Inject(MAT_DIALOG_DATA) public data: any // allows the sharing of data through dialogConfig.data

  ) { }

  /* Get from localstorage */
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  img = environment.url + localStorage.getItem("userImage")

  ngOnInit() {
    // this.firstName = ' ';
    this.firstName = localStorage.getItem("firstname");
    /* collaborators let i = this.notes.length; i > 0; i--*/
    for (let i = 0; i < this.data.noteData["collaborators"].length; i++) {
      this.collaborators.push(this.data.noteData["collaborators"][i])
    }
  }

  /* Close dialog  box */
  cancel() {
    this.dialog.closeAll();
  }

  /* Search User */
  searchUser() {
    let body = {
      'searchWord': this.searchValue
    }
    this.userService.searchUserList(body).subscribe((response) => {
      this.userList = [];
      this.userList = response['data'].details;
      console.log("Search Word userList response ===>", this.userList);
    }, (error) => {
      console.log(" Search Word userList error ===>", error);
    });
  }

  /**
   *@Purpose : Add collaborators
  **/
  addCol(data) {
    console.log("Add collaborators data 1====>", data);
    console.log("Add collaborators data 2====>", this.collaborators);
    console.log("Add collaborators data note id ===>", this.data.noteData['id']);
    /* Get collaborators details */
    this.collabData = this.userList[0];
    console.log("Check data ===>", this.collabData);
    console.log("Check data ===>", data);
    console.log('console for Add collaborators data note id and collaborators details =======================>', this.collabData, this.data.noteData['id']);
    try {
      this.noteService.addColNote(this.collabData, this.data.noteData['id']).subscribe(
        data => {
          this.snackbar.open('Collaborators added successfully......!', 'Done...!', { duration: 3000 });
          console.log('Collaborators added successfully information ==========>', data);
          /* Push data into collaborators */
          this.collaborators.push(data)
        },
        error => {
          this.snackbar.open('Error while collaboratoring note......!', 'Error', { duration: 3000 });
          console.log("Error while collaboratoring note", error)
        });
    } catch (error) {
      this.snackbar.open('Error something wrong', "error", { duration: 3000 });
    }
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 10);
  }


  /**
   *@Purpose : Remove collaborators
  **/
  removeCol(data) {
    this.noteService.removeCollaborators(this.data.noteData['id'], data.userId)
      .subscribe((response) => {
        this.snackbar.open('Collaborators remove successfully......!', 'Done...!', { duration: 3000 });
        console.log("Remove Collaborators To Notes response ===>", response);
      }, (error) => {
        this.snackbar.open('Error while Collaborators remove......!', 'Error...!', { duration: 3000 });
        console.log("Remove Collaborators To Notes error ===>", error);
      });
    /* For GetAll Note without refresh*/
    setTimeout(() => this.dataService.getAllNote(), 10);
  }

  /**
   *@Purpose : Refresh
  **/
  refresh(event) {
    if (event) {
      this.dataService.getAllNote();
    }
  }

}
