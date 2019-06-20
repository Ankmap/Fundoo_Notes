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
}
