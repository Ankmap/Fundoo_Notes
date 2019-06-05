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
   *1. @Purpose : Login the user
   **/
  userLogin(body){
    return this.service.postData("/user/login",body)
  }

  /**
   *2. @Purpose : Register new user
   **/
  userSignup(body){
    return this.service.postData("/user/userSignUp",body)
  }

  /**
   *3. @Purpose : ForgotPassword
   **/
  userReset(body){
    return this.service.postData("/user/reset",body)
  }

  /**
   *4. @Purpose : Reset password
   **/
  userResetpassword(body){
    return this.service.postDataForEncodedReset("/user/reset-password",body)
  }

  /**
   *5. @Purpose : Logout the user
   **/
  userLogout(){
    return this.service.postDataForJSON("/user/logout",{})
  }
  /**
   *6. @Purpose : Search userList for collaborator
   **/
  searchUserList(body){
    return this.service.postDataForSearchUser("/user/searchUserList",body)
  }

  /**
   *7. @Purpose : Upload Profile Image
   **/
  uploadProfileImage(body){
    return this.service.postDataForuploadProfileImage("/user/uploadProfileImage",body)
  }
}
