import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/core/model/productCart/product';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/core/service/productCarts/product.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartmain',
  templateUrl: './cartmain.component.html',
  styleUrls: ['./cartmain.component.scss']
})
export class CartmainComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }
  private addCartId = '';
  @Input() id;
  product: Product[] = [];
  ProductDeatils = '';
  getDetails = '';

  ngOnInit() {
    /* Get  cart Id */
    this.route.params.subscribe((params: Params) => {
      this.addCartId = params['id'];
      console.log('Check cart Id after registartion ====>', this.addCartId);
    });

    this.getProductcarts();
    this.getCartDetails(this.addCartId);
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

  getCartDetails(cardId) {
    console.log('cartId while get cart details ===========>', cardId);
    this.productService.getCartDetails(cardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.ProductDeatils = data['data'];
          console.log('getCartDetails in sign in proceed ===>', this.ProductDeatils);
          this.getDetails = this.ProductDeatils["product"];
          console.log('get card details in proceed cart ===>',this.getDetails); 
        }, (error) => {
          console.log("getCartDetails in  sign in proceed error ===>", error);
        });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
