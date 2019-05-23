import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserserviceService } from 'src/app/core/service/user/user-service.service';
// import { DialogData } from '../icon/icon.component';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  searchValue: any;
  userList: any[];
//private data : DialogData
  constructor( private noteService : NotesService, private dataService : DataService, private dialog : MatDialog, private userService :UserserviceService, ) { }

  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

  private collaborators = [];
  ngOnInit() {
    // for(let i=0;this.data.noteData["collaborators"].length; i++){
    //   this.collaborators.push(this.data.noteData["collaborators"][i])
    // }
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
    }, (error)=>{
      console.log(error);
    });
  }

  // addColll
  addCol(data){
    console.log("/notes/{id}/AddcollaboratorsNotes data === >",data)
    console.log("/notes/{id}/AddcollaboratorsNotes ====>",this.collaborators);
    
  }
}
