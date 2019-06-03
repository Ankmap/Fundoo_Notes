import { Component, OnInit, Inject, Input } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserserviceService } from 'src/app/core/service/user/user-service.service';
import { Collaborator } from 'src/app/core/model/collaborator/collaborator';
import { FormControl } from '@angular/forms';
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
  // notes: Note[] = [];
  collab = new Collaborator();
  collabData: any[];
  constructor(
    private snackbar: MatSnackBar,
    private noteService: NotesService,
    private dataService: DataService,
    private dialog: MatDialog,
    private userService: UserserviceService,
    public dialogRef: MatDialogRef<CollaboratorComponent>, @Inject(MAT_DIALOG_DATA)
    public data: any, ) { }
  private collaborators = [];

  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  img = environment.url + localStorage.getItem("userImage")

  ngOnInit() {
    for (let i = 0; i < this.data.noteData["collaborators"].length; i++) {
      this.collaborators.push(this.data.noteData["collaborators"][i])
    }
  }

  cancel() {
    this.dialog.closeAll();
  }

  // SearchUser
  searchUser() {
    let searchWord = {
      'searchWord': this.searchValue
    }
    this.userService.searchUserList(searchWord).subscribe((response) => {
      this.userList = [];
      this.userList = response['data'].details;
      console.log("SearchWord userList ===>", this.userList);
    }, (error) => {
      console.log(error);
    });
  }

  // addColll
  addCol(data) {
    console.log("Add collaborators data 1====>", data);
    console.log("Add collaborators data 2====>", this.collaborators);
    console.log("Add collaborators data note id ===>", this.data.noteData['id']);
    this.collabData = this.userList[0];
    console.log("Check data ===>", this.collabData);

    console.log('console for Add collaborators data note id and collaborators details =======================>', this.collabData, this.data.noteData['id']);
    try {
      this.noteService.addColNote(this.collabData, this.data.noteData['id']).subscribe(
        data => {
          this.snackbar.open('Collaborators added successfully......!', 'Done...!', { duration: 3000 });
          console.log('Collaborators added successfully information ==========>', data);

        },
        error => {
          this.snackbar.open('Error while collaboratoring note......!', 'Error', { duration: 3000 });
          console.log("Error while collaboratoring note", error)
        });

    } catch (error) {
      this.snackbar.open('Error something wrong', "error", { duration: 3000 });
    }
  }
}
