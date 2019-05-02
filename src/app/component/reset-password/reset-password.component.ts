/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - reset-password.ts.
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user';
import { UserserviceService } from '../../core/service/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  register: User = new User();
  model: any;
  constructor(private userService: UserserviceService, private snackbar: MatSnackBar, private router: Router, private activeRoute: ActivatedRoute) { }
  /**
   * @Purpose : To get a token 
   **/
  accesstoken = this.activeRoute.snapshot.paramMap.get('token');

  ngOnInit() {
    // console.log('@@@@@@@@@@@@@=========>', this.accesstoken);
    localStorage.setItem('token', this.accesstoken)
  }

  // Password validation 
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmpassword = new FormControl('', [Validators.required, Validators.minLength(4)])

  passwordValidation() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('password') ? 'Enter min 4 digit password' : '';
  }
  confirmpasswordValidation() {
    return this.confirmpassword.hasError('required') ? 'You must enter a confirmpassword' :
      this.confirmpassword.hasError('confirmpassword') ? 'Enter min 4 digit confirmpassword' : '';
  }

  login() {
    try {
      this.model = {
        "newPassword": this.password.value,
      }
      var data = new FormData();
      data.append('newPassword', this.password.value);
      this.userService.post('user/reset-password', this.model).subscribe(
        data => {
          // console.log("@@@@@@@@=========>", data);
          this.snackbar.open('Password Set successfully.......!', 'Done...!', { duration: 1000 });
          this.router.navigateByUrl('login');
        },
        error => {
          this.snackbar.open('Password not set successfully.......!', 'Error...!', { duration: 1000 });
          console.log("@@@@Error", error)
        })
    } catch (err) {
      console.log('Try-Catch:', err);
    }
  }

}
