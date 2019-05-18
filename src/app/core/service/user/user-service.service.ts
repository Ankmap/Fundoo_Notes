import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {


  constructor(private service: HttpService) { }

  userLogin(body){
    return this.service.postData("/user/login",body)
  }

  userSignup(body){
    return this.service.postData("/user/userSignUp",body)
  }

  userReset(body){
    return this.service.postData("/user/reset",body)
  }

  userResetpassword(body){
    return this.service.postDataForEncodedReset("/user/reset-password",body)
  }

  userLogout(){
    return this.service.postDataForJSON("/user/logout",{})
  }
}
