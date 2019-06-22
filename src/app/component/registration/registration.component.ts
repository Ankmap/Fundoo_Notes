/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - registration.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/core/service/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { Product } from 'src/app/core/model/productCart/product';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  register: User = new User();
  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    /*Enable and disabel Button Button*/
    this.currentLesson = this.classes[0].currentLesson
  }
  /*Validation*/
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)])
  // advancedService = new FormControl('', [Validators.required]);
  // basicService = new FormControl('', [Validators.required]);

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
  // advancedServiceValidation() {
  //   return this.advancedService.hasError('required') ? 'You must choose a value' : '';
  // }
  // basicServiceValidation() {
  //   return this.basicService.hasError('required') ? 'You must choose a value' : '';
  // }
  /**Enable and disabel Button**/
  currentLesson: string;
  classes = [
    {
      name: 'string',
      level: 'string',
      code: 'number',
      currentLesson: ''
    }]

  private addCartId = '';
  @Input() id;

  ngOnInit() {
    /* Get  cart Id */
    this.getProductcarts();

    this.route.params.subscribe((params: Params) => {
      this.addCartId = params['name'];
      console.log('Check cart name ====>', this.addCartId);
    });
  }

  submit() {
    var body = {
      "firstName": this.register.firstName,
      "lastName": this.register.lastName,
      "email": this.register.email,
      "password": this.register.password,
      "confirmPassword": this.register.confirmPassword,
      "service": this.addCartId
    }
    console.log('console registration body check ====>', body);
    try {
      if (this.password.value == this.confirmPassword.value)
        this.userService.userSignup(body)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.snackbar.open('Register done successfully......!', 'Done...!', { duration: 3000 });
              // this.router.navigateByUrl('login');
              console.log('Register done successfully ==========>', data);
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

  /***************************************************************************** */
  product: Product[] = [];
  private productId;
  getProductcarts() {
    this.productService.userService()
      .pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.product = response["data"].data;
        // this.productId = this.product[0].id;
        // console.log('selected service id ===>', this.productId);
      }, (error) => {
        console.log("Data product Cart User Service ====>", error);
      });
  }

  gotoCart(){
    this.router.navigateByUrl('cart');
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}