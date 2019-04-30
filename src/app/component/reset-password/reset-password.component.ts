import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }
  
  password = new FormControl('',[Validators.required,Validators.minLength(4)]);
  confirmpassword = new FormControl('',[Validators.required,Validators.minLength(4)])
  
  passwordValidation() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('password') ? 'Enter min 4 digit password' :'';
  }
  confirmpasswordValidation(){
    return this.confirmpassword.hasError('required') ? 'You must enter a confirmpassword' :
      this.confirmpassword.hasError('confirmpassword') ? 'Enter min 4 digit confirmpassword' :'';
  }
  ngOnInit() {
  }

}
