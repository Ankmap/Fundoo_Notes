/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - login.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../core/model/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { UserService } from 'src/app/core/service/user/user.service';
import { UserService } from '../../core/service/user/user.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { ProductService } from 'src/app/core/service/productCarts/product.service';
// import { Product } from 'src/app/core/model/productCart/product';
import { ProductService } from '../../core/service/productCarts/product.service';
import { Product } from '../../core/model/productCart/product';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  register: User = new User();
  productCartId = localStorage.getItem("productCartId");
  product: Product[] = [];
  ProductDeatils = '';
  getDetails = '';
  hide = true;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  /**
   * @Purpose : Validation for login page
   **/
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
  /**
  * @Purpose :ngOnInit function is called whenever the component is loaded.
  */
  ngOnInit() {
    this.getProductcarts();
    this.getCartDetails();
  }

  /*
  * @Purpose : On click login button
  */
  login() {
    var body = {
      "email": this.register.email,
      "password": this.register.password,
      "cartId": this.productCartId
    }
    console.log('Console for Login Account ======>', body);
    try {
      this.userService.userLogin(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            console.log("Data while login account ====>", data)
            localStorage.setItem('token', data['id']);
            localStorage.setItem('firstname', data['firstName']);
            localStorage.setItem('lastname', data['lastName']);
            localStorage.setItem('email', data['email']);
            localStorage.setItem('userId', data['userId']);
            localStorage.setItem('userImage', data['imageUrl']);
            this.snackbar.open('Login done successfully......!', 'Done...!', {
              duration: 3000, panelClass: 'center',
            });
            this.router.navigateByUrl('/home');
          },
          error => {
            this.snackbar.open('Error while login account......!', 'Error', {
              duration: 3000, panelClass: 'center',
              verticalPosition: 'top'
            });
            console.log("Error while login account ====>", error)
          });
    } catch (error) {
      this.snackbar.open('error', "", { duration: 3000 });
    }
  }

  getProductcarts() {
    this.productService.userService()
      .pipe(takeUntil(this.destroy$)).subscribe(
        response => {
          this.product = response["data"].data;
          console.log("Data product Cart User Service ====>", this.product);
          console.log("Data product Cart User Service id====>", this.product[0].id);
        }, (error) => {
          console.log("Data product Cart User Service ====>", error);
        });
  }

  getCartDetails() {
    console.log('cartId while get cart details ===========>', this.productCartId);
    this.productService.getCartDetails(this.productCartId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.ProductDeatils = data['data'];
          this.getDetails = this.ProductDeatils["product"];
          console.log('getCartDetails in login ===>', this.getDetails);
          console.log('id to pass login ===>', this.ProductDeatils["product"].id);
          console.log('name to pass login ===>', this.ProductDeatils["product"].name);
          console.log('Get productCartId grom localstorage ===>', localStorage.getItem("productCartId"));
        }, (error) => {
          console.log("getCartDetails in login error xxxx>", error);
        });
  }

  account1() {
    localStorage.removeItem("productCartId")
    this.router.navigateByUrl('/cart');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

/**/