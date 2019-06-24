import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpenCartComponent } from '../open-cart/open-cart.component';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/model/productCart/product';

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

  @Input() data;

  destroy$: Subject<boolean> = new Subject<boolean>();

  product: Product[] = []

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProductcarts();
  }

  getProductcarts() {
    this.productService.userService()
      .pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.product = response["data"].data;
        console.log("check product Cart User Service =====>", this.product);
      }, (error) => {
        console.log("Data product Cart User Service ====>", error);
      });
  }


  addtoCartd(data): void {
    const dialogRef = this.dialog.open(OpenCartComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        data: data
      }
    });
    dialogRef.afterClosed()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}