import { Component, OnInit, Inject } from '@angular/core';
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

  // notes: Note[] = [];
  collab = new Collaborator();
  
  collaba: any[];
  constructor( 
    private snackbar : MatSnackBar,
    private noteService : NotesService, 
    private dataService : DataService, 
    private dialog : MatDialog, 
    private userService :UserserviceService,
    public dialogRef: MatDialogRef<CollaboratorComponent>, @Inject(MAT_DIALOG_DATA) 
    public data: any, ) { }

   
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  img = environment.url + localStorage.getItem("userImage")

  ngOnInit() {
    
  }

  cancel(){
    this.dialog.closeAll();
  }

  // SearchUser
  searchUser(){
    let searchWord= {
      'searchWord':this.searchValue
    }
    this.userService.searchUserList(searchWord).subscribe((response)=>{
      this.userList = [];
      this.userList = response['data'].details;
      console.log("this.userList ===>",this.userList);
    }, (error)=>{
      console.log(error);
    });
  }

 // addColll
  addCol(data){
    console.log("AddcollaboratorsNotes data note id === >",this.data.id);
    // const body ={
    //   'firstName': this.collab.firstName,
    //   'lastName': this.collab.lastName,
    //   'email':this.collab.email,
    //   "noteId": [data.id],//backend id
    //   "userId":this.collab.id
    // }
    this.collaba=this.userList[0];
    
    console.log('console for updateNote @@@@@@@@@@@@@@@@@=======================>', this.collaba);
    try {
      this.noteService.addColNote(data,this.data['id']).subscribe(
        data => {
          this.snackbar.open('Note added successfully......!', 'Done...!', { duration: 3000 });
          console.log('Register infor ==========>', data);
        },
        error => {
          this.snackbar.open('Error while adding note......!', 'Error', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });

    } catch (error) {
      this.snackbar.open('Error something wrong', "error", { duration: 3000 });
    }
  }
}
