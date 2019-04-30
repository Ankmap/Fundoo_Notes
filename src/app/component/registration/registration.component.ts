import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() {
    //Button
    this.currentLesson=this.classes[0].currentLesson
   }
  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmpassword = new FormControl('', [Validators.required, Validators.minLength(4)])
  firstnameValidation() {
    return this.firstname.hasError('required') ? 'You must enter a firstname' :
      this.firstname.hasError('firstname') ? 'Not a valid firstname' : '';
  }
  lastnameValidation() {
    return this.lastname.hasError('required') ? 'You must enter a lastname' :
      this.lastname.hasError('lastname') ? 'Not a valid lastname' : '';
  }
  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a email' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  passwordValidation() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('password') ? 'Enter min 4 digit password' : '';
  }
  confirmpasswordValidation() {
    return this.confirmpassword.hasError('required') ? 'You must enter a confirmpassword' :
      this.confirmpassword.hasError('confirmpassword') ? 'Enter min 4 digit confirmpassword' : '';
  }
  //Button
  currentLesson: string;

  classes = [
    {
      name: 'string',
      level: 'string',
      code: 'number',
      currentLesson: '1'
    }]

  ngOnInit() {
  }

}
