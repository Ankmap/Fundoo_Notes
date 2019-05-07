/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - registration.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
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
    /*Enable and disabel Button Button*/
    this.currentLesson = this.classes[0].currentLesson
  }
  /*Validation*/
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)])
  advancedService = new FormControl('', [Validators.required]);
  basicService = new FormControl('', [Validators.required]);

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
  advancedServiceValidation() {
    return this.advancedService.hasError('required') ? 'You must choose a value' : '';
  }
  basicServiceValidation() {
    return this.basicService.hasError('required') ? 'You must choose a value' : '';
  }
  /**Enable and disabel Button**/
  currentLesson: string;
  classes = [
    {
      name: 'string',
      level: 'string',
      code: 'number',
      currentLesson: ''
    }]

  ngOnInit() {
  }

  submit() {
    console.log('console forthis.register @@@@@@@@@@@@@@@@@=======================>', this.register);
    try {
      if (this.password.value == this.confirmPassword.value)
        this.userService.postRequest('user/userSignUp', this.register).subscribe(
          data => {
            console.log("console for data =======================>", data);
            this.snackbar.open('Register done successfully......!', 'Done...!', { duration: 3000 });
            this.router.navigateByUrl('login');
            console.log('Register infor ==========>', data);
          },
          error => {
            this.snackbar.open('Error while creating account......!', 'Error', { duration: 3000 });
            console.log("Error something wrong: ", error)
          });
      else {
        this.snackbar.open('password and confirmpassword does not match......!', 'Error...!', { duration: 3000 });
        console.log("password and confirmpassword does not match");
      }
    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
  }
}
