import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user';
import { UserserviceService } from '../../core/service/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  register: User = new User();
  service: any;
  constructor(private userService: UserserviceService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }
  // Email Validation
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a email' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // On click login button
  forgotPassword() {
    console.log('console forthis.register @@@@@@@@@@@@@@@@@=======================>', this.register);
    try {
      if (this.email.value == this.register.email) {
        this.userService.postRequest2('user/reset', this.register).subscribe(
          data => {
            console.log("console for data =======================>", data);
            this.snackbar.open('Set password link sent to you registered email, please check.......!', 'Done...!', { duration: 1000 });
            this.router.navigateByUrl('resetPassword');
          },
          error => {
            this.snackbar.open('Error while reset password......!', 'Error', { duration: 3000 });
            console.log("Error while reset password......!", error)
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
