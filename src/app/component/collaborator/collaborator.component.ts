import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/service/notes/notes.service';
import { DataService } from 'src/app/core/service/data/data.service';
import { MatDialog } from '@angular/material';
import { UserserviceService } from 'src/app/core/service/user/user-service.service';
import { Collaborator } from 'src/app/core/model/collaborator/collaborator';

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
  constructor( private noteService : NotesService, private dataService : DataService, private dialog : MatDialog, private userService :UserserviceService, ) { }

  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

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
    console.log("AddcollaboratorsNotes data === >",data)
    
  }
}
