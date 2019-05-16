import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(path, body) {
    return this.http.post(environment.baseUrl + path, body);
  }

  // Reset Passwoprd
  postDataForEncodedReset(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  // Add Note
  postDataForEncoded(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    // console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }
  
  //Logout
  postDataForJSON(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }
  //get data
  getdDta(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path,httpOptions);
  }
  //change color
  chnageColor(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path,httpOptions);
  }
  //Edit label
  postDataForEdit(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }
}
