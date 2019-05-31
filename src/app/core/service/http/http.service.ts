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
   * @Purpose : get data and access without refresh
   **/
  getdDta(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : change color
   **/
  chnageColor(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Delete Note
   **/
  deleteNote(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }
  /**
   * @Purpose :  Add label
   **/
  postDataForAddLabel(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }

  /**
   * @Purpose : ShowLabel
   **/
  postDataForShowLabel(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose : Collabarator
   **/
  postDataForSearchUser(path, body) {
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
   * @Purpose : UpdateNote
   **/
  postDataForUpdateNote(path, body) {
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
   * @Purpose : Delete Label
   **/
  postDataForDeleteLabel(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.delete(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose : Delete Label
   **/
  postDataForUpdateLabel(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Archive Note
   **/
  postDataForArchiveNote(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Archive Note
   **/
  postDataForArchiveNoteGetList(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : Chnage Reminder
   **/
  chnageReminder(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Remove Reminder
   **/
  removeReminderNotes(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Archive Note
   **/
  postDataForgetReminderNotesList(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : Delete Label
   **/
  postDataFortrashNote(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose : Archive Note
   **/
  postDataForgetTrashNotesList(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  // uploadProfileImage
  postDataForuploadProfileImage(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  // addLabelToNotes
  postDataForaddLabelToNotes(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }
}
