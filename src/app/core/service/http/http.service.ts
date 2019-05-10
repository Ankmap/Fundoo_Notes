import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(path, body) {
    return this.http.post(environment.baseUrl + path, body);
  }

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

}
