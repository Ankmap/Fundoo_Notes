import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private service: HttpService
  ) { }

  /**
   *1. @Purpose : Product Carts Add To Cart 
   **/
  userService() {
    return this.service.postDataForuserService("/user/service")
  }

  /**
   *2. @Purpose : Product Carts Add To Cart 
   **/

  addToCart(body) {
    // return this.service.postDataaddToCart("/productcarts/addToCart", body)
    return this.service.postDataaddToCart("/productcarts/addToCart", body)
  }

  /**
  *3. @Purpose : Product Carts Add To Cart 
  **/

  getCartDetails(cartId) {
    return this.service.postDatagetCartDetails("productcarts/getCartDetails/" + cartId)
  }

  /**
  *4. @Purpose : Product Carts user Cart List
  **/

  userCartList() {
    return this.service.postDataForuserService("/productcarts/userCartList")
  }

  /**
  *5. @Purpose : Complete order
  **/

  adminCompleteOrder(body) {
    return this.service.postDataproductcartsComplete("/productcarts/adminCompleteOrder", body)
  }


  /**
  *6. @Purpose : Complete order
  **/

  placeOrder(body) {
    return this.service.postDataproductcartsComplete("/productcarts/placeOrder", body)
  }

  mycart(){
    return this.service.postDatagetNotesDetail("/productcarts/myCart")
  }
}
