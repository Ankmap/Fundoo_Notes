import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserserviceService } from 'src/app/core/service/user/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  searchValue: any;
  userList: any[];

  @Input() noteData;
  @Output() anyChanges;

  collabData: any[];
  private collaborators = [];

  constructor(
    private snackbar: MatSnackBar,
    private noteService: NotesService,
    private dataService: DataService,
    private dialog: MatDialog,
    private userService: UserserviceService,
    public dialogRef: MatDialogRef<CollaboratorComponent>, @Inject(MAT_DIALOG_DATA)
    public data: any, ) { }


  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  img = environment.url + localStorage.getItem("userImage")

  ngOnInit() {
    //collaborators
    for (let i = 0; i < this.data.noteData["collaborators"].length; i++) {
      this.collaborators.push(this.data.noteData["collaborators"][i])
    }
  }

  // close dialog
  cancel() {
    this.dialog.closeAll();
  }

  // SearchUser
  searchUser() {
    let body = {
      'searchWord': this.searchValue
    }
    this.userService.searchUserList(body).subscribe((response) => {
      this.userList = [];
      this.userList = response['data'].details;
      console.log("SearchWord userList ===>", this.userList);
    }, (error) => {
      console.log(" SearchWord ===>", error);
    });
  }

  // Add collaborators
  addCol(data) {
    console.log("Add collaborators data 1====>", data);
    console.log("Add collaborators data 2====>", this.collaborators);
    console.log("Add collaborators data note id ===>", this.data.noteData['id']);
    this.collabData = this.userList[0];
    // for (let i = 0; this.collaborators.length; i++) {
    //   if (data == this.collaborators[i]) {
    //     return console.log("Add collaborators")
    //   }
    // }
    console.log("Check data ===>", this.collabData);
    // console.log("Check data ===>", data);

    console.log('console for Add collaborators data note id and collaborators details =======================>', this.collabData, this.data.noteData['id']);
    try {
      // this.noteService.addColNote(data, this.data.noteData['id']).subscribe(
        this.noteService.addColNote(this.collabData, this.data.noteData['id']).subscribe(

        data => {
          this.snackbar.open('Collaborators added successfully......!', 'Done...!', { duration: 3000 });
          console.log('Collaborators added successfully information ==========>', data);
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
  //removeCol(ccc)
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

  refresh(event) {
    if (event) {
      this.dataService.getAllNote();
    }
  }
}
