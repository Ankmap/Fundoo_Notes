import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user';
import { UserserviceService } from '../../core/service/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  register: User = new User();  
  service: any;
  constructor(private userService: UserserviceService, private snackbar: MatSnackBar, private router: Router) {
    //Button
    this.currentLesson = this.classes[0].currentLesson
  }
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)])
  firstNameValidation() {
    return this.firstName.hasError('required') ? 'You must enter a firstName' :
      this.firstName.hasError('firstName') ? 'Not a valid firstName' : '';
  }
  lastNameValidation() {
    return this.lastName.hasError('required') ? 'You must enter a lastName' :
      this.lastName.hasError('lastName') ? 'Not a valid lastName' : '';
  }
  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a email' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  passwordValidation() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('password') ? 'Enter min 4 digit password' : '';
  }
  confirmPasswordValidation() {
    return this.confirmPassword.hasError('required') ? 'You must enter a confirmPassword' :
      this.confirmPassword.hasError('confirmPassword') ? 'Enter min 4 digit confirmPassword' : '';
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

  submit() {
    console.log('console @@@@@@@@@@@@@@@@@=======================>', this.register);
    try {
      if (this.password.value != this.confirmPassword.value) 
      throw "password and confirmpassword does not match"
      // if(this.firstName.value == '' || this.lastName.value == '' || this.email.value == '' || this.service.value=='' || this.password.value == '' || this.confirmPassword.value == '') throw "Fields are missing"

      this.userService.postRequest('user/userSignUp', this.register).subscribe(
        data => {
          console.log("console =======================>", data);
          this.snackbar.open('Register successfully......!', 'Done...!', { duration: 1000 });
          this.router.navigateByUrl('login');
        },
        error => {
          this.snackbar.open('Register not successfully......!', 'Stop...!', { duration: 3000 });
          console.log("Error something wrong: ", error)
        });
    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
  }
}
