/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - user-service.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {


  constructor(private service: HttpService) { }

  /**
   * @Purpose : Login
   **/
  userLogin(body){
    return this.service.postData("/user/login",body)
  }

  /**
   * @Purpose : Register
   **/
  userSignup(body){
    return this.service.postData("/user/userSignUp",body)
  }

  /**
   * @Purpose : ForgotPassword
   **/
  userReset(body){
    return this.service.postData("/user/reset",body)
  }

  /**
   * @Purpose : Reset
   **/
  userResetpassword(body){
    return this.service.postDataForEncodedReset("/user/reset-password",body)
  }

  /**
   * @Purpose : Logout
   **/
  userLogout(){
    return this.service.postDataForJSON("/user/logout",{})
  }
  /**
   * @Purpose : Logout
   **/
  searchUserList(body){
    return this.service.postDataForSearchUser("/user/searchUserList",body)
  }
}
