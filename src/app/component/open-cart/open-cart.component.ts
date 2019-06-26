import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/core/service/productCarts/product.service';

@Component({
  selector: 'app-open-cart',
  templateUrl: './open-cart.component.html',
  styleUrls: ['./open-cart.component.scss']
})
export class OpenCartComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  cartData: [];

  private getCartDetails;
  private getCartDetailsId;
  
  constructor(
    private productService: ProductService,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<OpenCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.cartData = this.data["data"]
    console.log('Cart Data in dialog box=====>', this.cartData);
    console.log('Cart Id in dialog box=====>', this.cartData["id"]);
  }

  cartGo() {
    console.log('Add to cart productId =====>', this.cartData["id"]);
    var body = {
      "productId": this.cartData["id"]
    }
    console.log('Add to cart productId body check ====>', body);
    this.productService.addToCart(body).subscribe(
      data => {
        this.snackbar.open('Cart added successfully......!', 'Done...!', { duration: 3000 });
        console.log('Cart added successfully ==========>', data);
        this.getCartDetails = data["data"].details;
        console.log('Get Cart Details after adding cart ====>', this.getCartDetails);
        this.getCartDetailsId = this.getCartDetails['id'];
        console.log('Get cartId to proceed to registration ====>', this.getCartDetailsId);
        localStorage.setItem('productCartId', this.getCartDetailsId);
        this.router.navigateByUrl('/registration');
        this.dialogRef.close();
      },
      error => {
        this.snackbar.open('Error while cart ......!', 'Error', { duration: 3000 });
        console.log("Error something wrong while cart adding ", error)
      });
  }
  cartBack(): void {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
