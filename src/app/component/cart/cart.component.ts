import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpenCartComponent } from '../open-cart/open-cart.component';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

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
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class CartComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private product;
  private productId;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProductcarts();
  }

  addtoCart() {
    const dialogRef = this.dialog.open(OpenCartComponent, {
      panelClass: 'app-full-bleed-dialog',
      height: ''
    });
    dialogRef.afterClosed()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getProductcarts() {
    this.productService.userService()
      .pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.product = response["data"].data;
        console.log("check productCart User Service =====>", this.product);
        this.productId = this.product[0].id;
        console.log('productId ====>', this.productId);
      }, (error) => {
        console.log("Data productCart User Service ====>", error);
      });
  }
  /**
    * @Purpose : Product add to cart
  **/
  addToRegistration(productId) {
    console.log('Add to cart productId =====>', productId);
    var body = {
      "productId": productId
    }
    console.log('Add to cart productId body check ====>', body);

    this.productService.addToCart(body).subscribe(
      data => {
        this.snackbar.open('Cart added successfully......!', 'Done...!', { duration: 3000 });
        console.log('Cart added successfully ==========>', data);
      },
      error => {
        this.snackbar.open('Error while cart ......!', 'Error', { duration: 3000 });
        console.log("Error something wrong while cart adding ", error)
      });
  }
}
