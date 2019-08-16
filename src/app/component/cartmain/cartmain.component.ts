import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
// import { Product } from 'src/app/core/model/productCart/product';
import { Product } from '../../core/model/productCart/product';

import { takeUntil } from 'rxjs/operators';
// import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { ProductService } from '../../core/service/productCarts/product.service';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cartmain',
  templateUrl: './cartmain.component.html',
  styleUrls: ['./cartmain.component.scss']
})
export class CartmainComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productService: ProductService,
    private snackbar: MatSnackBar,
  ) { }

  products: Product = new Product();
  ProductDeatils = '';
  getDetails = '';
  userCartList: '';
  product: '';
  userList = '';
  userListId = '';
  mycarts = '';
  mycarts1 = '';
  resultMycart = ''
  address = '';
  productCartId = localStorage.getItem("productCartId");

  ngOnInit() {
    this.getProductcarts();
    this.getCartDetails();
    this.mycart();

    this.productService.userCartList().subscribe(
      data => {
        console.log('product service ===>', data);
        this.userCartList = data["data"];
        console.log('userCartList ====>', this.userCartList);
        this.userList = this.userCartList[0];
        console.log('check cartMain ====>', this.userList);
        this.userListId = this.userList['id'];
        console.log('check cartMain id  ====>', this.userListId);
      }
    )
  }


  /***************************************************************************** */

  getProductcarts() {
    this.productService.userService()
      .pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.product = response["data"].data;
      }, (error) => {
        console.log("Data Product Cart User Service ====>", error);
      });
  }

  getCartDetails() {
    console.log('cartId while get cart details ===========>', this.productCartId);
    this.productService.getCartDetails(this.productCartId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.ProductDeatils = data['data'];
          console.log('getCartDetails in sign in proceed ===>', this.ProductDeatils);
          this.getDetails = this.ProductDeatils["product"];
          console.log('get card details in proceed cart ===>', this.getDetails);
        }, (error) => {
          console.log("getCartDetails in  sign in proceed error ===>", error);
        });
  }

  mycart() {
    this.productService.mycart().subscribe(
      data => {
        this.mycarts = data['data'];
        console.log('get my cart 1 ===>', this.mycarts);
        this.mycarts1 = this.mycarts[0];
        console.log('Check cart is empty or not ====>', this.mycarts1);
        this.resultMycart = this.mycarts1["product"]
        console.log('Get my cart details ====>', this.resultMycart);
      }
    )
  }

  placeOrder() {
    console.log('Id while place order ====>', this.mycarts1['id']);
    if (this.address == '') {
      this.snackbar.open("Failed", "Please enter address", {
        duration: 2000,
      });
      return;
    }
    var body = {
      "cartId": this.mycarts1['id'],
      "address": this.address
    }
    this.productService.placeOrder(body).subscribe(
      response => {
        console.log('Place order successfully', response);
        this.snackbar.open('Place order successfully.......!', 'Done...!', { duration: 3000 });
      })
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}