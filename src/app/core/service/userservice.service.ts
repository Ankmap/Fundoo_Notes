import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  baseUrl = environment.baseUrl
  postRequest(url, data) {
    return this.http.post(this.baseUrl + url, data);
  }

  constructor(private http: HttpClient) { }

  /**
   * @description : Convert the data into encoded form 
   */
  getEncodData(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  post(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token', localStorage.getItem('token'));
    return this.http.post(this.baseUrl + url, this.getEncodData(data), httpOptions);
  }
}

// https://github.com/angular/angular/issues/13241