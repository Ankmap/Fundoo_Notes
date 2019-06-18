/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - reset-password.ts.
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/service/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  register: User = new User();
  model: any;
  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router, private activeRoute: ActivatedRoute) { }
  /**
   * @Purpose : To get a token 
   **/
  accesstoken = this.activeRoute.snapshot.paramMap.get('token');

  ngOnInit() {
    console.log('accesstoken =========>', this.accesstoken);
    localStorage.setItem('token', this.accesstoken)
  }
  /**
   * @Purpose : Password validation
   **/

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
      this.userService.userResetpassword(this.model)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            console.log("Data =========>", data);
            this.snackbar.open('Note updated successfully.......!', 'Done...!', { duration: 3000 });
          },
          error => {
            console.log("Error =========>", error);
            this.snackbar.open('Error while update the note.......!', 'Error...!', { duration: 3000 });
          })
    } catch (err) {
      console.log('Try-Catch:', err);
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}