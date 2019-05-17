/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - navbar.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../../core/service/user/user-service.service';
import { NotesService } from '../../core/service/notes/notes.service';
import { DataService } from '../../core/service/data/data.service'
import { MatDialog } from '@angular/material';
import { LabelComponent } from '../../component/label/label.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

  private signoutCard:boolean=false;
  private gridView: boolean = true

  constructor(private NavbarServiceUser: UserserviceService, private router: Router, private notes: NotesService, private dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
  }

  /**
   * @Purpose : Logout
   **/ 
  logout() {
    this.NavbarServiceUser.userLogout().subscribe((response) => {
      console.log("response ====>", response);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("email");
      this.router.navigateByUrl('/login');
    });
  }

  /**
   * @Purpose : account,addAccount method for Logout
   **/
  account(){
    this.signoutCard=!(this.signoutCard);
  }
  addAccount(){
    this.router.navigateByUrl('/registration');
  }

  /**
   * @Purpose : createLabel method for popup and go to the LabelComponnent
   **/
  createLabel() {
    this.dialog.open(LabelComponent, {
      width: '300px',
      height: '250px'
    })
  }
  /**
   * @Purpose : Grid View
   **/
  view() {
    this.data.changeView(this.gridView)
    this.gridView = !this.gridView;
  }

}

