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
  model: any;
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
    console.log("model----",this.model);
    try{
     
      if( this.email.value == '') throw "Fields are missing"
      this.model = {
      "email":this.email.value
      }
      this.userService.postRequest('user/reset',this.model).subscribe(
      data => {
      console.log("Response",data);
     // localStorage.setItem('access-token',data.token)
      this.snackbar.open('check ur mail..', 'End now', {duration: 1000});
      // this.router.navigateByUrl('reset-password');
    },
    error=> {
      this.snackbar.open('invalid email', 'End now', {duration: 3000});
      console.log("error: ",error)
    });
    }catch(error){
      this.snackbar.open('error',"", {duration: 3000});
    }

  }
}
