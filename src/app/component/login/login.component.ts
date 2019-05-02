import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user';
import { UserserviceService } from '../../core/service/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  register: User = new User();
  service: any;
  constructor(private userService: UserserviceService, private snackbar: MatSnackBar, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)])
  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a email' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  passwordValidation() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('password') ? 'Enter min 4 digit password' : '';
  }
  // ngOnInit function is called whenever the component is loaded. And used to load the data for the component
  ngOnInit() {
  }

  login() {
    console.log('console forthis.register @@@@@@@@@@@@@@@@@=======================>', this.register);
    try {
      if (this.email.value == this.register.email) {
        this.userService.postRequest1('user/login', this.register).subscribe(
          data => {
            console.log("console for data =======================>", data);
            this.snackbar.open('Login done successfully......!', 'Done...!', { duration: 1000 });
            this.router.navigateByUrl('registration');
          },
          error => {
            this.snackbar.open('Error while login account......!', 'Error', { duration: 3000 });
            console.log("Error while login account: ", error)
          });
      }
      else {
        this.snackbar.open('Email not exist......!', 'Error...!', { duration: 1000 });
      }
    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
  }
}
