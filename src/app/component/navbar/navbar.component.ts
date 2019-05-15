import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router'
import { UserserviceService } from '../../core/service/user/user-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private NavbarServiceUser : UserserviceService, private router : Router) { }

  ngOnInit() {
  }
  logout(){
    this.NavbarServiceUser.userLogout().subscribe((response)=>{
      localStorage.removeItem("token");
      localStorage.removeItem("fundooUserId");
      this.router.navigateByUrl('/login');
    });
  }
}

