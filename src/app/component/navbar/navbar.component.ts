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

  /* from localStorage */
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

  /* label */
  private label: Label[] = [];
  private labelList = [];
  private signoutCard: boolean = false; /* signOut */
  private searchValue: any; /* search the not */

  /*Grid*/
  list: boolean = true;
  grid: boolean = false;
  view: any;
  direction: string;

  appName: String;
  /**
   * @Purpose : Inject the UserserviceService, Router, NotesService, 
   *            MatDialog, DataService in the constructor
   **/
  constructor(
    private NavbarServiceUser: UserserviceService,
    private router: Router,
    private notes: NotesService,
    private dialog: MatDialog,
    private data: DataService
  ) { }

  ngOnInit() {
    this.appName = "Fundoo";
    /* For Show Label*/
    this.showLabel();

    /*For gridView and ListView*/
    this.data.getView().subscribe((response) => {
      this.view = response;
      this.direction = this.view.data;
    });
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
   * @Purpose : account and addAccount method for Logout
   **/
  account() {
    this.signoutCard = !(this.signoutCard);
  }

  /**
   * @Purpose : createLabel method for popup and go to the LabelComponnent
   **/
  createLabel() {
    this.appName = "Label";
    const dialogRef = this.dialog.open(LabelComponent, {
      width: '350px',
      height: ''
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.showLabel();
      })
  }

  /**
   * @Purpose : For ShowLabel
   **/
  showLabel() {
    this.notes.showNoteLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.label = response["data"].details;
        this.labelList = [];
        for (let i = 0; i < this.label.length; i++) {
          this.labelList.push(this.label[i].label);
        }
      });
  }

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
  /**
   * @Purpose : Note Click show all label
   **/
  displayNote() {
    this.appName = "Notes";
    this.router.navigateByUrl('/home')
    this.data.allNote.subscribe((response) => {
      console.log("response ====>", response);
    });
  }

  /**
   * @Purpose : Grid
   **/
  changeView() {
    /* Toggle the btn */
    if (this.list) {
      this.grid = true;
      this.list = false;
    } else {
      this.list = true;
      this.grid = false;
    }
    this.data.gridView();
  }
  /**
   * @Purpose : Reminder 
   * 
   **/
  reminders() {
    this.appName = "Reminders";
  }

  /**
   * @Purpose : Archive 
   **/
  archive() {
    this.appName = "Archive";
    this.router.navigateByUrl('/archive');
  }

  /**
   * @Purpose : Trash 
   **/
  Trash() {
    this.appName = "Trash";
  }
}

