import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/core/model/productCart/product';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
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
    // private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }
  // private addCartId = '';
  @Input() id;
  product: Product[] = [];
  products: Product = new Product();
  ProductDeatils = '';
  getDetails = '';
  userCartList: '';
  userList = '';
  userListId = '';
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

  mycarts = '';
  mycarts1 = '';
  resultMycart = ''
  mycart() {
    this.productService.mycart().subscribe(
      data => {
        this.mycarts = data['data'];
        console.log('get my cart 1 ===>', this.mycarts);
        this.mycarts1 = this.mycarts[0];
        this.resultMycart = this.mycarts1["product"]
        console.log('get my cart @@@@@@@@@@====>', this.resultMycart);
      }
    )
  }
  placeOrder() {
    console.log('Id while place order ====>', this.mycarts1['id']);
    if (this.products.address == '') {
      this.snackbar.open("failed", "please enter address", {
        duration: 2000,
      });
      return;
    }
    var body = {
      "cartId": this.mycarts1['id'],
      "address": this.products.address
    }
    this.productService.placeOrder(body).subscribe(
      response => {
        console.log('Place order successfully', response);
        this.snackbar.open('Place order successfully.......!', 'Done...!', { duration: 3000 });
      })
  }

  completeOrder() {
    console.log('Id while complete order ====>', this.productCartId);
    var body = {
      "cartId": this.productCartId
    }
    this.productService.adminCompleteOrder(body).subscribe(
      response => {
        console.log('Order complete successfully', response);
        this.snackbar.open('Order complete successfully.......!', 'Done...!', { duration: 3000 });
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
