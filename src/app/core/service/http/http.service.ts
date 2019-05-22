/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - http.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * @Purpose : Login, registration, forgotPassword
   **/ 
  postData(path, body) {
    return this.http.post(environment.baseUrl + path, body);
  }

  /**
   * @Purpose : Reset Passwoprd
   **/
  getEncodData(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

   postDataForEncodedReset(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, this.getEncodData(body), httpOptions);
  }

  
  /**
   * @Purpose : Add Note
   **/ 
  postDataForEncoded(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }
  
  /** 
   * @Purpose : Logout
   **/
  postDataForJSON(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }

  /**
   * @Purpose : get data without refresh
   **/
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

  /**
   * @Purpose : change color
   **/
  chnageColor(path,body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path,body, httpOptions);
  }

  /**
   * @Purpose : Delete Note
   **/
  deleteNote(path,body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path,body, httpOptions);
  }
  /**
   * @Purpose : Edit label
   **/
  postDataForEdit(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }

  postDataForShowLabel(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(environment.baseUrl + path, httpAuthOptions);
  }



}
