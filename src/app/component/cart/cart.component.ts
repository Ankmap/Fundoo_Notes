import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpenCartComponent } from '../open-cart/open-cart.component';
import { Subject } from 'rxjs';
// import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { ProductService } from '../../core/service/productCarts/product.service';

import { takeUntil } from 'rxjs/operators';
// import { Product } from 'src/app/core/model/productCart/product';
import { Product } from '../../core/model/productCart/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(1000, style({ opacity: 0 })))
    ])
  ]
})
export class CartComponent implements OnInit {

  @Input() data;

  destroy$: Subject<boolean> = new Subject<boolean>();

  product: Product[] = []
  productArray = [];
  serviceDetails: '';
  getCartDetails: '';
  getCartDetailsId: '';

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getProductcarts();
  }

  /**
    * @Purpose : Get User Service
  **/
  getProductcarts() {
    this.productService.userService()
      .pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.productArray = response["data"].data;
        console.log("check product Cart User Service =====>", this.productArray);
        console.log('Advance data =====>', this.productArray[0]);
        console.log('Advance id =====>', this.productArray[0].id);
        console.log('Basic data =====>', this.productArray[1]);
        console.log('Basic id =====>', this.productArray[1].id);
      }, (error) => {
        console.log("Data product Cart User Service ====>", error);
      });
  }

  /**
    * @Purpose : Open the selected User Service
  **/
  serviceOpen(value) {
    console.log('Check value after service open ===>', value);
    if (value == "advance") {
      this.serviceDetails = this.productArray[0]
      this.addtoCartd(this.productArray[0].id)
    } else {
      this.serviceDetails = this.productArray[1]
      this.addtoCartd(this.productArray[1].id)
    }
  }


  /**
    * @Purpose : Add User Service to cart
  **/
  addtoCartd(value) {
    console.log('@@@@@@@@@@@@@@@ Add to cart productId @@@@@@@@@@@@@', value);
    var body = {
      "productId": value
    }
    this.productService.addToCart(body).subscribe(
      data => {
        this.snackbar.open('Cart added successfully......!', 'Done...!', { duration: 3000 });
        console.log('Cart added successfully ==========>', data);
        this.getCartDetails = data["data"].details;
        console.log('Get Cart Details after adding cart ====>', this.getCartDetails);
        this.getCartDetailsId = this.getCartDetails['id'];
        console.log('Get cartId to proceed to registration ====>', this.getCartDetailsId);
        localStorage.setItem('productCartId', this.getCartDetailsId);
        /**
         * @Purpose : Open Dialog component
         **/
        const dialogRef = this.dialog.open(OpenCartComponent, {
          panelClass: 'app-full-bleed-dialog',
          data: {
            data: data
          }
        });
        dialogRef.afterClosed()
      },
      error => {
        this.snackbar.open('Error while cart ......!', 'Error', { duration: 3000 });
        console.log("Error something wrong while cart adding ", error)
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}