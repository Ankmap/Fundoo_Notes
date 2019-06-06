/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - forgot-password.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  register: User = new User();
  model: any;
  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

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
    var body = {
      "email": this.register.email
    }
    try {
      this.userService.userReset(body).subscribe(
        data => {
          this.snackbar.open('Reset link send to ur register email id...', 'Check it', { duration: 3000 });
          console.log('data', data);
        },
        error => {
          this.snackbar.open('Please enter register email', 'Error', { duration: 3000 });
          console.log("error: ", error)
        });
    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
  }
}
