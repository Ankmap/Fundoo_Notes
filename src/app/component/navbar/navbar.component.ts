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
import { MatDialog, MatDialogRef } from '@angular/material';
import { LabelComponent } from '../../component/label/label.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Label } from 'src/app/core/model/label/label';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

  private label: Label[] = [];
  private labelList = [];
  private signoutCard: boolean = false;
  private searchValue: any;
  // private labelShow:boolean=false;
  // private labelValue = ''
  /**
   * @Purpose : Inject the UserserviceService, Router, NotesService, 
   *            MatDialog, DataService in the constructor
   **/
  constructor(private NavbarServiceUser: UserserviceService, private router: Router, private notes: NotesService, private dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
    this.showLabel();
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
  account() {
    this.signoutCard = !(this.signoutCard);
  }
  addAccount() {
    this.router.navigateByUrl('/registration');
  }

  /**
   * @Purpose : createLabel method for popup and go to the LabelComponnent
   **/
  createLabel() {
    const dialogRef = this.dialog.open(LabelComponent, {
      width: '300px',
      height: '250px'
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.showLabel();
      })
  }

  showLabel() {
    this.notes.showNoteLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.label = response["data"].details;
        this.labelList = [];
        for (let i = 0; i < this.label.length; i++) {
          this.labelList.push(this.label[i].label);
        }
      })
  }
  // toolbarName(data){
  //   this.labelShow = true
  //   this.labelValue =data
  // }
  /**
   * @Purpose : Search
   **/
  search() {
    this.router.navigateByUrl('/search');
  }
  newMessage() {
    this.data.changeMessageSearch(this.searchValue)
  }
  /**
    * @Purpose : refresh
    **/
  refresh() {
    this.router.navigateByUrl('/home')
  }
}

