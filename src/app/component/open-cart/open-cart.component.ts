import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
// import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { ProductService } from '../../core/service/productCarts/product.service';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-open-cart',
  templateUrl: './open-cart.component.html',
  styleUrls: ['./open-cart.component.scss']
})
export class OpenCartComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  productCartId = localStorage.getItem("productCartId");
  ProductDeatils = '';
  getDetails;

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialogRef: MatDialogRef<OpenCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getCartDetails()
  }

  /**
    * @Purpose : Get Cart Details
  **/
  getCartDetails() {
    console.log('cartId while get cart details ===========>', this.productCartId);
    this.productService.getCartDetails(this.productCartId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.ProductDeatils = data['data'];
          console.log('getCartDetails in registration ===>', this.ProductDeatils);
          this.getDetails = this.ProductDeatils["product"];
          console.log('id to pass registration ===>', this.ProductDeatils["product"].id);
          console.log('name to pass registration ===>', this.ProductDeatils["product"].name);
          console.log('Get productCartId grom localstorage ===>', localStorage.getItem("productCartId"));
        }, (error) => {
          console.log("getCartDetails in registration error xxxx>", error);
        });
  }

  /**
    * @Purpose : Proceed to checkout
  **/
  cartGo() {
    this.router.navigateByUrl('/registration');
    this.dialogRef.close();
  }

  /**
    * @Purpose : Remove from cart
  **/
  cartBack(): void {
    localStorage.removeItem("productCartId")
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
