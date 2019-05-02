import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  //  baseUrl = envir
  // url set
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  // Registration
  postRequest(url,data){
    return this.http.post(this.baseUrl + url, data);
  }
  // Login
  postRequest1(url,data){
    return this.http.post(this.baseUrl + url, data);
  }
  // forgotpassword
  postRequest2(url,data){
    return this.http.post(this.baseUrl + url, data);
  }
}
