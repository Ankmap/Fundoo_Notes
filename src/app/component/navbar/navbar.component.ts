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

  signoutCard:boolean=false;
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  private gridView: boolean = true
  constructor(private NavbarServiceUser: UserserviceService, private router: Router, private notes: NotesService, private dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
  }
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
  account(){
    this.signoutCard=!(this.signoutCard);
  }
  addAccount(){
    this.router.navigateByUrl('/registration');
  }
  createLabel() {
    this.dialog.open(LabelComponent, {
      width: '300px',
      height: '250px'
    })
  }
  view() {
    this.data.changeView(this.gridView)
    this.gridView = !this.gridView;
  }
}

